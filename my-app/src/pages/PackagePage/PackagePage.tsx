import { useState } from "react";
import usePackagePageHook from "./usePackagePageHook";
import ConfirmPopup from "../../components/CustomComponent/CustomPopUp/ConfirmPopup";
import "./PackagePage.scss";
import type { SportImg, StepCircleProps } from "../../models/packageModels";

export default function PackagePage() {
  const { state, handler } = usePackagePageHook();
  const {
    selectedPackage,
    selectedSports,
    packageList,
    purchasedCode,
    purchasedSports,
  } = state;
  const { selectPackage, toggleSport, confirmSelection } = handler;

  const [showConfirm, setShowConfirm] = useState(false);

  const sportImages: SportImg = {
    NBA: "https://wallpapers.com/images/hd/nba-logo-3840-x-2400-m54hudw7ky3u000c.jpg",
    MLB: "https://cdn.wallpapersafari.com/88/59/lrc52E.jpg",
    NFL: "https://wallpapers.com/images/featured/nfl-3qwui2pc1pdhvzwf.jpg",
    NHL: "https://wallpaperset.com/w/full/3/d/1/84239.jpg",
    NCAA: "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2024/04/1294/728/ncaaH.jpg?ve=1&tl=1",
  };

  return (
    <div className="packagePage-Wrapper overflow-hidden p-5 w-full flex flex-col items-center text-white">
      {/* HEADER */}
      <h1
        className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text 
        bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 
        uppercase tracking-wide text-center drop-shadow-xl"
      >
        Prediction Packages
      </h1>

      {/* STEP BAR */}
      <div className="w-full max-w-xl flex items-center justify-between mb-10 relative">
        <StepCircle active={true} number={1} label="Choose Package" />

        {/* LINE 1 */}
        <div
          className={`step-line ${selectedPackage.limit > 0 ? "active" : ""}`}
        />

        <StepCircle
          active={selectedPackage.limit > 0}
          number={2}
          label="Pick Sports"
        />

        {/* LINE 2 */}
        <div
          className={`step-line ${
            selectedSports.length === selectedPackage?.limit &&
            selectedPackage.limit > 0
              ? "active"
              : ""
          }`}
        />

        <StepCircle
          active={
            selectedSports.length === selectedPackage?.limit &&
            selectedPackage.limit > 0
          }
          number={3}
          label="Confirm Packages"
        />
      </div>

      {/* PACKAGE OPTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mb-10">
        {packageList.map(pkg => {
          const isPurchased = purchasedCode.includes(pkg.title);
          return (
            <div
              key={pkg.id}
              onClick={() => !isPurchased && selectPackage(pkg)}
              className={`
        cursor-pointer p-6 rounded-xl border shadow-xl text-center relative
        transition-all duration-300
        ${
          selectedPackage?.title === pkg.title && !isPurchased
            ? "bg-orange-500 border-orange-300 scale-105 shadow-orange-400/50 shadow-2xl"
            : "bg-gray-800 border-gray-700"
        }
        ${isPurchased ? "package-disabled" : "hover:scale-105"}
      `}
            >
              {/* Lock icon khi gói này đã mua */}
              {isPurchased && (
                <svg
                  className="package-lock"
                  width="25px"
                  height="25px"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill=""
                  stroke=""
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      d="M4 6v2H2.5A1.5 1.5 0 001 9.5v9A1.5 1.5 0 002.5 20h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 8H16V6A6 6 0 004 6zm6-4a4 4 0 00-4 4v2h8V6a4 4 0 00-4-4zm1 14v-4H9v4h2z"
                      fill="#ff7800"
                    ></path>
                  </g>
                </svg>
              )}

              <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
              <p className="text-lg font-semibold text-orange-300">
                {pkg.description}
              </p>
              <p className="text-xs mt-2 opacity-80">{pkg.price}</p>
            </div>
          );
        })}
      </div>

      {/* SPORTS */}
      {selectedPackage.limit > 0 && (
        <>
          <h2 className="text-xl font-bold mb-3 text-orange-300 tracking-wide">
            Select up to {selectedPackage.limit} sports
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-4xl fade-list">
            {Object.keys(sportImages).map((sport, index) => {
              const isSelected = selectedSports.includes(sport);
              const isPurchasedSport = purchasedSports.includes(sport);

              return (
                <div
                  key={sport}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => !isPurchasedSport && toggleSport(sport)}
                  className={`sport-card 
    ${isSelected ? "active" : ""} 
    ${isPurchasedSport ? "sport-disabled" : ""}
  `}
                >
                  {isPurchasedSport && (
                    <svg
                      className="sport-lock"
                      width="25px"
                      height="25px"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      fill=""
                      stroke=""
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill-rule="evenodd"
                          d="M4 6v2H2.5A1.5 1.5 0 001 9.5v9A1.5 1.5 0 002.5 20h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 8H16V6A6 6 0 004 6zm6-4a4 4 0 00-4 4v2h8V6a4 4 0 00-4-4zm1 14v-4H9v4h2z"
                          fill="#ff7800"
                        ></path>
                      </g>
                    </svg>
                  )}

                  <img src={sportImages[sport]} className="sport-img" />

                  <div className="sport-overlay" />
                  <div className="sport-title">{sport}</div>
                </div>
              );
            })}
          </div>

          {selectedSports.length === selectedPackage.limit &&
            selectedPackage.limit > 0 && (
              <button
                onClick={() => setShowConfirm(true)}
                className="confirm-btn mt-2.5"
              >
                Confirm Selection
              </button>
            )}
        </>
      )}

      {/* CONFIRM POPUP */}
      <ConfirmPopup
        open={showConfirm}
        selectedPackage={selectedPackage}
        selectedSports={selectedSports}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          confirmSelection();
        }}
      />
    </div>
  );
}

function StepCircle({ active, number, label }: StepCircleProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={`step-circle ${active ? "active" : "inactive"}`}>
        {number}
      </div>
      <p className="text-xs mt-1 opacity-80">{label}</p>
    </div>
  );
}
