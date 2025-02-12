import { Link } from "@tanstack/react-router";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">

      <img
        src="/logo.png"
        alt="Logo"
        className="h-20 w-20 object-cover"
      />
    </Link>
  )
}
