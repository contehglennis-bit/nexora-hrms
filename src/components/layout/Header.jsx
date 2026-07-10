export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-600">
          🔔
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          GC
        </div>
      </div>
    </header>
  );
}