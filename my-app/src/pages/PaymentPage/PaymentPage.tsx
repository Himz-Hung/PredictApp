import { useEffect, useState } from "react";
import "./PaymentPage.scss";
import {
  LABEL_BY_STATUS,
  type CheckStatusResponse,
  type PaymentInfo,
} from "../../models/paymentModels";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { fetchUserPackage } from "../../store/getUserPackageSlice";

// Fake API check payment status
function checkPaymentStatus(): Promise<CheckStatusResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ status: "active" });
    }, 1200);
  });
}

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [data, setData] = useState<PaymentInfo | null>(null);
  const dispatch = useAppDispatch();
  const currentPackage = useAppSelector(state => state.userPackageSlice.data);

  useEffect(() => {
    if (orderId) {
      setData(null);
      setLoading(false);
      return;
    }
    if (!currentPackage || currentPackage.length === 0) {
      dispatch(fetchUserPackage());
      setData(null);
      setLoading(false);
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
  }, [currentPackage, dispatch, orderId]);

  const handleCheckStatus = async () => {
    setChecking(true);
    const res = await checkPaymentStatus();
    setData(prev => (prev ? { ...prev, status: res.status } : prev));
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

      <div className="card p-6">
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
          <button
            onClick={handleCheckStatus}
            disabled={checking}
            className="mt-6 w-full py-2 rounded-xl font-semibold check-btn"
          >
            {checking ? "Checking..." : "Check Payment Status"}
          </button>
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
