import { useCallback, useEffect, useState } from "react";
import "./PaymentPage.scss";
import { LABEL_BY_STATUS, type PaymentInfo } from "../../models/paymentModels";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserPackage } from "../../store/getUserPackageSlice";
import axiosClient from "../../api/axiosClient";
import type { AxiosError } from "axios";
import type { ErrorProps } from "../../models/errorProps";

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [data, setData] = useState<PaymentInfo | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [paymentLink, setPaymentLink] = useState<string>('');
  const currentPackage = useAppSelector(state => state.userPackageSlice.data);
  const getOrderById = useCallback(
    async (id: string, showPageLoading = true) => {
      try {
        if (showPageLoading) setLoading(true);
        const respond = await axiosClient.get(`/orders/${id}`);
        if (respond.status === 200 || respond.status === 201) {
          const order = respond.data;
          if(order.status === 'paid' || order.status === 'active') {
            dispatch(fetchUserPackage());
            return;
          }
          setPaymentLink(order.paymentUrl || '');
          setData({
            status: order.status as keyof typeof LABEL_BY_STATUS,
            packageCode: order.packageCode,
            sports: order.sports.member,
            expiresAt: "",
            limit: order.sports.member.length.toString(),
          });
        }
      } catch (error: unknown) {
        const err = error as AxiosError<ErrorProps>;
        if (err.status === 401) {
          navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
        }
      } finally {
        if (showPageLoading) setLoading(false);
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (orderId && !currentPackage) {
      setData(null);
      getOrderById(orderId);
      return;
    }

    if (!currentPackage || currentPackage.length === 0) {
      setLoading(true);
      dispatch(fetchUserPackage()).finally(() => setLoading(false));
      return;
    }

    const pkg = currentPackage[0];
    const expires = new Date(pkg.expiresAt).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    setData({
      status: pkg.status as keyof typeof LABEL_BY_STATUS,
      packageCode: pkg.packageCode,
      sports: pkg.sports,
      expiresAt: expires,
      limit: pkg.sports.length.toString(),
    });

    setLoading(false);
  }, [currentPackage, dispatch, getOrderById, orderId]);
  const handleGoToPayment = () => {
    if (!orderId) return;
    if (!paymentLink) return;
    window.open(paymentLink, "_blank");
  };
  const handleCheckStatus = async () => {
    if (!orderId) return;

    setChecking(true);
    await getOrderById(orderId, false);
    setChecking(false);
  };

  if (loading)
    return (
      <div className="p-6 text-center text-orange-300 animate-pulse">
        Loading payment details...
      </div>
    );

  if (!data)
    return (
      <div className="payment-page p-6 max-w-2xl mx-auto light">
        <div className="card p-6 text-center">
          <h2 className="text-xl font-semibold mb-2 text-orange-300">
            No Payment Found
          </h2>
          <p className="text-light">
            You don't have any active or pending subscription packages.
          </p>
        </div>
      </div>
    );

  return (
    <div className="payment-page p-6 max-w-2xl mx-auto light">
      <h1 className="title text-2xl font-bold mb-6">Your Payment Details</h1>

      <div className={`card p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-light text-sm">Package</p>
            <p className="text-xl font-semibold text-orange-300">
              {data.packageCode}
            </p>
          </div>

          <span className={`status-badge ${data.status}`}>
            {LABEL_BY_STATUS[data.status]}
          </span>
        </div>

        <p className="text-light text-sm mb-1">Sport limit based on package:</p>
        <p className="font-medium mb-4">{data.limit} sports</p>

        <p className="text-light text-sm mb-1 min-w-[270px] md:min-w-[400px]">
          Sports you selected:
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.sports.map((s, i) => (
            <div key={i} className="px-3 py-1 sport-tag text-sm">
              {s}
            </div>
          ))}
        </div>

        <p className="text-light text-sm mb-1">Expires at:</p>
        <p className="font-medium">{data.expiresAt}</p>

        {data.status === "pending" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={handleGoToPayment}
              disabled={checking}
              className="py-2 rounded-xl font-semibold check-btn go-payment-btn"
            >
              Go to Payment
            </button>

            <button
              onClick={handleCheckStatus}
              disabled={checking}
              className="py-2 rounded-xl font-semibold check-btn"
            >
              {checking ? "Checking..." : "Check Payment Status"}
            </button>
          </div>
        )}
      </div>

      {/* TIMELINE */}
      <div className="mt-8">
        <p className="font-semibold mb-3">Payment Timeline</p>

        <div
          className="border-l-2 ml-3 space-y-6"
          style={{ borderColor: "var(--payment-card-border)" }}
        >
          <div className="relative pl-4">
            <div className="w-3 h-3 rounded-full absolute -left-1.5 top-1 dot-green" />
            <p className="font-medium">Order Created</p>
            <p className="text-light text-sm">System created your order.</p>
          </div>

          <div className="relative pl-4">
            <div
              className={`w-3 h-3 rounded-full absolute -left-1.5 top-1 ${
                data.status === "cancelled"
                  ? "dot-red"
                  : data.status === "pending"
                  ? "dot-yellow"
                  : "dot-green"
              }`}
            />
            <p className="font-medium">Payment Status</p>
            <p className="text-light text-sm">
              Current status: {LABEL_BY_STATUS[data.status]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
