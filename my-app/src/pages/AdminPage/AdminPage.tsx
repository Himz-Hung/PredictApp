import AddNewRecord from "../../components/AddNewRecord/AddNewRecord";
import MainTable from "../../components/MainTable/MainTable";
import useAdminPageHook from "./useAdminPageHook";

export default function AdminPage() {
  const { state, handler } = useAdminPageHook();
  return (
    <div className="p-5 w-full flex flex-col items-center text-white">
      {/* responsive header: stack on small, row on md+ */}
      <div className="flex w-11/12 flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="w-full md:flex-1 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 tracking-wide uppercase drop-shadow-md text-center md:text-left">
          Predict Records Management
        </h1>

        <div className="flex w-full md:w-auto flex-col sm:flex-row items-center gap-3 justify-center md:justify-end">
          <label
            htmlFor="sport-select"
            className="text-sm text-gray-300 mr-0 sm:mr-2 hidden sm:inline"
          >
            Sport:
          </label>

          <select
            id="sport-select"
            value={state.sportType}
            onChange={e => handler.setSportType(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-green-400 w-full sm:w-48"
          >
            <option value="nba-basketball">NBA - Basketball</option>
            <option value="nfl-football">NFL - Football</option>
            <option value="nhl-hockey">NHL - Hockey</option>
            <option value="mlb-baseball">MLB - Baseball</option>
            <option value="ncaa-basketbal">NCAA - Basketball</option>
          </select>

          <div className="w-full sm:w-auto mt-2 sm:mt-0">
            <AddNewRecord
              isOpenRecord={state?.isOpenRecord}
              setIsOpenRecord={handler?.setIsOpenRecord}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap w-full items-start gap-8 justify-evenly">
        <div className="w-full lg:w-12/12 flex flex-col items-center backdrop-blur-md shadow-lg">
          <MainTable
            isFromTo={true}
            isAdmin={state?.isAdminRole}
            tableFooterTitle={state?.tableMainData?.tableFooterTitle}
            tableTitle={state?.tableMainData?.tableTitle}
            tableMainData={state?.tableMainData?.tableMainData}
            tableName={state?.tableMainData?.tableName}
            isOpenRecord={state?.isOpenRecord}
            setIsOpenRecord={handler?.setIsOpenRecord}
          />
        </div>
      </div>
    </div>
  );
}
