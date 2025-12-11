import { useEffect, useRef, useState } from "react";
import type { PackageType } from "../../models/packageModels";
import axiosClient from "../../api/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useContextHook";
import type { ErrorProps } from "../../models/errorProps";
import type { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUserPackage } from "../../store/getUserPackageSlice";

export default function usePackagePageHook() {
  const location = useLocation();
  const { showToast } = useToast();
  const [purchasedCode, setPurchasedCode] = useState<string[]>([]);
  const [purchasedSports, setPurchasedSports] = useState<string[]>([]);
  const mess = location.state?.message;
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<PackageType>({
    id: "",
    title: "",
    price: "",
    description: "",
    limit: 0,
  });
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [packageList, setPackageList] = useState<PackageType[]>([]);
  const dispatch = useAppDispatch();
  const currentPackage = useAppSelector(state => state.userPackageSlice.data);
  const fetchedRef = useRef(false);
  const selectPackage = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    setSelectedSports([]);
  };
  useEffect(() => {
    document.title = "Everwin-Packages";
    if (mess === "UNAUTHORIZED") {
      showToast({
        title: "Unavailable Access",
        message: "You do not have permission to access the page.",
        type: "error",
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, mess, navigate, showToast]);
  useEffect(() => {
    if (Array.isArray(currentPackage) && currentPackage.length > 0) {
      currentPackage.forEach(pkg => {
        const { packageCode, sports } = pkg;
        setPurchasedCode(prev => {
          if (prev.includes(packageCode)) return prev;
          return [...prev, packageCode];
        });
        const normalizedSports = sports.map(s => s.split("-")[0].toUpperCase());
        setPurchasedSports(prev => {
          const merged = [...prev];
          normalizedSports.forEach(sport => {
            if (!merged.includes(sport)) merged.push(sport);
          });
          return merged;
        });
      });
    }
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    try {
      dispatch(fetchUserPackage());
      axiosClient
        .get("/packages")
        .then(res => {
          const memberList = [...res.data.member].reverse();

          for (const currPackage of memberList) {
            if (currPackage.defaultPrice && currPackage.description) {
              setPackageList(prev => [
                ...prev,
                {
                  id: currPackage.id,
                  title: currPackage.name,
                  price: currPackage.defaultPrice,
                  description: currPackage.description,
                  limit:
                    currPackage.name === "EW_003"
                      ? 5
                      : currPackage.name === "EW_002"
                      ? 3
                      : 1,
                },
              ]);
            }
          }
        })
        .catch(err => {
          if (err === "JWT-INVALID") {
            navigate("/login", {
              replace: true,
              state: { message: "EXP-JWT" },
            });
          } else {
            showToast({
              title: "Load failed",
              message: "Unable to load the Packages.",
              type: "error",
            });
          }
        });
    } catch (err) {
      if (err === "JWT-INVALID") {
        navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
      } else {
        showToast({
          title: "Load failed",
          message: "Unable to load the Packages.",
          type: "error",
        });
      }
    }
  }, [currentPackage, currentPackage?.length, dispatch, navigate, showToast]);
  const toggleSport = (sport: string) => {
    if (!selectedPackage) return;

    const limit = selectedPackage.limit;

    if (selectedSports.includes(sport)) {
      setSelectedSports(prev => prev.filter(s => s !== sport));
    } else {
      if (selectedSports.length < limit) {
        setSelectedSports(prev => [...prev, sport]);
      }
    }
  };
  const confirmSelection = async () => {
    const formattedSports = selectedSports.map(sport => {
      switch (sport) {
        case "NBA":
          return "nba-basketball";
        case "NFL":
          return "nfl-football";
        case "MLB":
          return "mlb-baseball";
        case "NHL":
          return "nhl-hockey";
        default:
          return "ncaa-basketball";
      }
    });
    const orderPackage = {
      packageCode: selectedPackage.title,
      sports: formattedSports,
    };
    try {
      const res = await axiosClient.post("/orders", orderPackage);
      const url = res.data?.paymentUrl;
      if (!url) {
        console.error("No URL returned from /orders");
        return;
      }
      window.open(url, "_blank");
    } catch (error) {
      const err = error as AxiosError<ErrorProps>;

      const message =
        err.response?.data?.description.toString() ||
        "Unable to place the order.";

      showToast({
        title: "Order failed",
        message,
        type: "error",
      });
    }
  };
  const state = {
    selectedPackage,
    selectedSports,
    packageList,
    purchasedCode,
    purchasedSports,
  };
  const handler = { selectPackage, toggleSport, confirmSelection };

  return { state, handler };
}
