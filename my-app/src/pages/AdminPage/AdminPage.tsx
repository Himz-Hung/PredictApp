import MainTable from "../../components/MainTable/MainTable";
import useAdminPageHook from "./useAdminPageHook";

export default function AdminPage() {
  const { state, handler } = useAdminPageHook();
  return (
    <div className="overflow-hidden p-5 w-full flex flex-col items-center text-white">
      <div className="flex w-11/12 flex-col lg:flex-row justify-between items-center flex-wrap gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 tracking-wide uppercase text-center drop-shadow-md">
          Predict Records Management
        </h1>
        <button
          type="button"
          className="flex items-center 
             text-green-400 border border-green-400 
             bg-transparent
             font-medium rounded-xl text-sm px-5 py-2.5 text-center 
             shadow-none 
             transition-all duration-300 ease-out 
             hover:text-white hover:bg-green-400/20 hover:border-green-500
             hover:shadow-lg hover:shadow-green-500/30
             hover:scale-[1.02] active:scale-[0.98] hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Record
        </button>
      </div>

      <div className="flex flex-wrap w-full items-start gap-8 justify-evenly">
        {/* Bảng 1 */}
        <div className="overflow-hidden w-full lg:w-12/12 flex flex-col items-center backdrop-blur-md shadow-lg ">
          <MainTable
            isAdmin={state?.isAdmin}
            tableFooterTitle={state?.tableMainData?.tableFooterTitle}
            tableTitle={state?.tableMainData?.tableTitle}
            tableMainData={state?.tableMainData?.tableMainData}
            tableName={state?.tableMainData?.tableName}
          />
        </div>
      </div>
    </div>
  );
}
