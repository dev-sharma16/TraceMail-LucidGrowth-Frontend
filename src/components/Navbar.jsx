import { Mail, Home } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 sm:px-20 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <Mail size={22} />
        <NavLink to="/"><span className="font-semibold text-lg">TraceMail Analyzer</span></NavLink>
      </div>
      <div className="space-x-4 sm:flex">
        <NavLink to="/" className="hover:underline flex items-center gap-1">
          <Home size={18} /> Home
        </NavLink>
        <NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink>
      </div>
    </nav>
  );
}
