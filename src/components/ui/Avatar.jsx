export default function Avatar({
  initials = "NX",
}) {
  return (
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
      {initials}
    </div>
  );
}