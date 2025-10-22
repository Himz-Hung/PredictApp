import MainTable from "../../components/MainTable/MainTable";
import useNBAReportPageHook from "./useNBAReportPageHook";

export default function NBAReportPage() {
  const { state } = useNBAReportPageHook();
  return (
    <div className="overflow-hidden p-5 w-full flex flex-col items-center text-white">
      <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 tracking-wide uppercase text-center drop-shadow-md">
        NBA Scientific Betting {state?.todayDate}
      </h1>

      <div className="flex flex-wrap w-full items-start gap-8 justify-evenly">
        <div className="overflow-hidden w-full lg:max-w-[45vw] flex flex-col items-center backdrop-blur-md shadow-lg ">
          <MainTable
            tableFooterTitle={state?.tableMainData?.tableFooterTitle}
            tableTitle={state?.tableMainData?.tableTitle}
            tableMainData={state?.tableMainData?.tableMainData}
            tableName={state?.tableMainData?.tableName}
          />
        </div>

        <div className="overflow-hidden w-full lg:max-w-[45vw] flex flex-col items-center backdrop-blur-md  shadow-lg">
          <MainTable
            isFromTo={true}
            tableFooterTitle={state?.tableMainDataHistory?.tableFooterTitle}
            tableTitle={state?.tableMainDataHistory?.tableTitle}
            tableMainData={state?.tableMainDataHistory?.tableMainData}
            tableName={state?.tableMainDataHistory?.tableName}
            sportType={'nba-basketball'}
          />
        </div>
      </div>
    </div>
  );
}
