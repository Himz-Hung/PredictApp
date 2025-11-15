import AddNewRecord from "../../components/AddNewRecord/AddNewRecord";
import CustomSelectField from "../../components/CustomComponent/CustomSelectField/CustomSelectField";
import MainTable from "../../components/MainTable/MainTable";
import useAdminPageHook from "./useAdminPageHook";

export default function AdminPage() {
  const { state, handler } = useAdminPageHook();

  return (
    <div className="p-5 w-full flex flex-col items-center text-gray-800">
      {/* Header */}
      <div className="flex w-11/12 flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="w-full md:flex-1 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 tracking-wide uppercase drop-shadow-sm text-center md:text-left">
          Predict Records Management
        </h1>

        <div className="flex w-full md:w-auto flex-col sm:flex-row items-center gap-3 justify-center md:justify-end">
          <label
            htmlFor="sport-select"
            className="text-sm text-orange-500 mr-0 sm:mr-2 hidden sm:inline"
          >
            Sport:
          </label>

          <CustomSelectField
            width={200}
            options={[
              { value: "nba-basketball", label: "NBA - Basketball" },
              { value: "nfl-football", label: "NFL - Football" },
              { value: "nhl-hockey", label: "NHL - Hockey" },
              { value: "mlb-baseball", label: "MLB - Baseball" },
              { value: "ncaa-basketbal", label: "NCAA - Basketball" },
            ]}
            value={state.sportType}
            onChange={(e) => handler.onChangeSportType(e.toString())}
            placeholder="Select result..."
          />

          <div className="w-full sm:w-auto mt-2 sm:mt-0 flex justify-center items-center">
            <AddNewRecord
              sportTypeDefault={state.sportType}
              onchangeSportType={handler.setSportType}
              isOpenRecord={state?.isOpenRecord}
              setIsOpenRecord={handler?.setIsOpenRecord}
              tableMainData={state?.tableMainData?.tableMainData}
              adminFromDate={state?.adminFromDate}
              adminToDate={state?.adminToDate}
              onSearchDate={handler.onSearchDate}
              currentPageSize={state.currentPageSize}
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="flex flex-wrap w-full items-start gap-8 justify-evenly">
        <div className="w-full lg:w-full flex flex-col items-center  rounded-xl p-4 ">
          <MainTable
            isFromTo={true}
            isAdmin={state?.isAdminRole}
            tableFooterTitle={state?.tableMainData?.tableFooterTitle}
            tableTitle={state?.tableMainData?.tableTitle}
            tableMainData={state?.tableMainData?.tableMainData}
            tableName={state?.tableMainData?.tableName}
            isOpenRecord={state?.isOpenRecord}
            setIsOpenRecord={handler?.setIsOpenRecord}
            totalRecords={state?.tableMainData?.totalRecords}
            sportType={state?.sportType}
            isLoading={state?.loadingAdminRecords}
            onSearchDate={handler.onSearchDate}
            onPageChange={handler.onPageChange}
            setAdminFromDate={handler.setAdminFromDate}
            setAdminToDate={handler.setAdminToDate}
          />
        </div>
      </div>
    </div>
  );
}
