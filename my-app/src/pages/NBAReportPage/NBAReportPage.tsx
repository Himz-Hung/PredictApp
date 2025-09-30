import MainTable from "../../components/MainTable/MainTable";
import useNBAReportPageHook from "./useNBAReportPageHook";

export default function NBAReportPage() {
  const {state, handler} = useNBAReportPageHook();
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 items-center justify-center text-white">
      <div className="md:col-span-1 flex justify-evenly items-center">
        <div className="w-11/12">
          <MainTable tableFooterTitle={state?.tableMainData?.tableFooterTitle} tableTitle = {state?.tableMainData?.tableTitle} tableMainData={state?.tableMainData?.tableMainData} />
        </div>
      </div>
      <div className="md:col-span-1 flex justify-evenly items-center">
        <div className="w-11/12">
        <MainTable tableFooterTitle={state?.tableMainData?.tableFooterTitle} tableTitle = {state?.tableMainData?.tableTitle} tableMainData={state?.tableMainData?.tableMainData} />
        </div>
      </div>
    </div>
  );
}
