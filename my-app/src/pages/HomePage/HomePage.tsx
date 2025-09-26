export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Hello Tailwind</h1>
      <button
        className="
    px-4 py-2
    bg-indigo-600 hover:bg-indigo-700
    text-white font-semibold
    rounded-lg shadow-md
    transition duration-300
  "
      >
        Tailwind Button
      </button>
    </div>
  );
}
