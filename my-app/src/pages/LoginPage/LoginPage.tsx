import styles from "./LoginPage.module.scss";
import useLoginPageHook from "./useLoginPageHook";

export default function LoginPage(): React.JSX.Element {
  const { state, handler } = useLoginPageHook();
  const { username, password, error, loading } = state;
  const { setUsername, setPassword, handleSubmit } = handler;

  return (
    <div
      className={`${styles.loginPage} app-dark-bg min-h-screen min-w-screen
                  grid grid-cols-1 md:grid-cols-2 items-center justify-center text-white`}
    >
      {/* Sidebar */}
      <aside className={`${styles.aside} flex items-center justify-center md:grid-cols-1`}>
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-gray-300 text-base md:text-lg">
            Please login to continue using our services.
          </p>
        </div>
      </aside>

      {/* Form */}
      <main className="flex items-center justify-center w-11/12 justify-self-center self-start md:grid-cols-1 md:self-center">
        <form
          onSubmit={handleSubmit}
          className={`${styles.loginForm} bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm`}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          {error && (
            <div className="bg-red-500/20 text-red-300 p-2 rounded-md text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <label className="block mb-4">
            <span className="block mb-1 text-sm">Username</span>
            <input
              type="username"
              
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-black/30 text-white
                         focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
            />
          </label>

          <label className="block mb-6">
            <span className="block mb-1 text-sm">Password</span>
            <input
              type="password"
              
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-black/30 text-white
                         focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full
              bg-gradient-to-r from-indigo-500 to-purple-500
              hover:from-indigo-600 hover:to-purple-600
              text-white font-semibold
              py-2 px-4
              rounded-lg
              shadow-lg hover:shadow-xl
              transform hover:scale-105
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-indigo-300
              ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
}
