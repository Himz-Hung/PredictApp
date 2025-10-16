import AddNewRecord from "../../components/AddNewRecord/AddNewRecord";
import MainTable from "../../components/MainTable/MainTable";
import useAdminPageHook from "./useAdminPageHook";

export default function AdminPage() {
  const { state, handler } = useAdminPageHook();
  return (
    <div className=" p-5 w-full flex flex-col items-center text-white">
      <div className="flex w-11/12 flex-col lg:flex-row justify-between items-center flex-wrap gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 tracking-wide uppercase text-center drop-shadow-md">
          Predict Records Management
        </h1>
        <AddNewRecord
          isOpenRecord={state?.isOpenRecord}
          setIsOpenRecord={handler?.setIsOpenRecord}
        />
      </div>

      <div className="flex flex-wrap w-full items-start gap-8 justify-evenly">
        {/* Bảng 1 */}
        <div className=" w-full lg:w-12/12 flex flex-col items-center backdrop-blur-md shadow-lg ">
          <MainTable
            isAdmin={state?.isAdmin}
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
