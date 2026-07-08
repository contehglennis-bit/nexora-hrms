export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}) {
  const baseStyle =
    "px-5 py-3 rounded-xl font-medium transition duration-200";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    success:
      "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}