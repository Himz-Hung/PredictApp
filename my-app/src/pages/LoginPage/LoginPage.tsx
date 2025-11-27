import ThemeButton from "../../components/ThemeButton/ThemeButton";
import styles from "./LoginPage.module.scss";
import useLoginPageHook from "./useLoginPageHook";

export default function LoginPage(): React.JSX.Element {
  const { state, handler } = useLoginPageHook();
  const { username, password, error, loading } = state;
  const { setUsername, setPassword, handleSubmit } = handler;

  return (
    <div
      className={`${styles.loginPage} min-h-screen min-w-screen
                  grid grid-cols-1 md:grid-cols-2 items-center justify-center text-[#FFA447]`}
    >
      {/* Sidebar */}
      <aside className={`${styles.aside} flex items-center justify-center`}>
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF8C42]">
            Welcome Back
          </h1>
          <p className="text-[#9f7f63] text-base md:text-lg">
            Please login to continue using our services.
          </p>
        </div>
      </aside>

      {/* Form */}
      <main className="flex items-center justify-center w-11/12 justify-self-center self-start md:self-center">
        <form
          onSubmit={handleSubmit}
          className={`${styles.loginForm} p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm`}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#FF8C42]">
            Login
          </h2>

          {error && (
            <div className="bg-[#ffb899] text-[#992f00] p-2 rounded-md text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <label className="block mb-4">
            <span className="block mb-1 text-sm text-[#CC7A3F]">Username</span>
            <input
              type="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white text-[#333]
                         border border-[#ffd7ba]
                         focus:outline-none focus:ring-2 focus:ring-[#FFA447]"
              placeholder="you@example.com"
            />
          </label>

          <label className="block mb-6">
            <span className="block mb-1 text-sm text-[#CC7A3F]">Password</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white text-[#333]
                         border border-[#ffd7ba]
                         focus:outline-none focus:ring-2 focus:ring-[#FFA447]"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full
              bg-[#FFA447]
              hover:bg-[#ff8c42]
              text-white font-semibold
              py-2 px-4
              rounded-lg
              shadow-md hover:shadow-xl
              transform hover:scale-105
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-[#FFB37B]
              hover:cursor-pointer
              ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </main>
      <div className="fixed bottom-10 right-4 z-10 mb:bottom-15">
        <ThemeButton />
      </div>
    </div>
  );
}
