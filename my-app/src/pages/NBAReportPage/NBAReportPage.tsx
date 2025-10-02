import MainTable from "../../components/MainTable/MainTable";
import useNBAReportPageHook from "./useNBAReportPageHook";

export default function NBAReportPage() {
  const {state, handler} = useNBAReportPageHook();
  return (
    <div className=" overflow-hidden p-5 w-full flex flex-wrap items-center gap-5 justify-evenly bg-amber-200 text-white">
      <div className=" h-9/12 w-full md:w-6/12 flex justify-evenly items-center">
        <div className="w-full max-h-9/12">
          <MainTable tableFooterTitle={state?.tableMainData?.tableFooterTitle} tableTitle = {state?.tableMainData?.tableTitle} tableMainData={state?.tableMainData?.tableMainData} />
        </div>
      </div>
      <div className=" h-9/12 w-full md:w-6/12 flex justify-evenly items-center">
        <div className="w-full max-h-9/12">
        <MainTable tableFooterTitle={state?.tableMainData?.tableFooterTitle} tableTitle = {state?.tableMainData?.tableTitle} tableMainData={state?.tableMainData?.tableMainData} />
        </div>
      </div>
    </div>
  );
}
