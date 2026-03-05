import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const FALLBACK_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23222'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23555'/%3E%3Cellipse cx='50' cy='85' rx='30' ry='20' fill='%23555'/%3E%3C/svg%3E";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const closeDropdown = () => {
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-[#222] px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-white font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
        DevTinder
      </Link>

      {/* Right side */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm hidden sm:block">
            {user.firstName}
          </span>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-9 h-9 rounded-full overflow-hidden border border-[#333] cursor-pointer hover:border-white transition-colors"
            >
              <img
                alt={user.firstName}
                src={user.photoUrl || FALLBACK_AVATAR}
                className="w-full h-full object-cover"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-[#111] border border-[#222] rounded-xl shadow-xl z-50 mt-2 w-52 p-2"
            >
              <li>
                <Link to="/profile" onClick={closeDropdown} className="text-white hover:bg-[#222] rounded-lg px-3 py-2 flex items-center gap-2">
                  <span>Profile</span>
                  <span className="ml-auto text-xs bg-white text-black px-1.5 py-0.5 rounded font-medium">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" onClick={closeDropdown} className="text-white hover:bg-[#222] rounded-lg px-3 py-2">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" onClick={closeDropdown} className="text-white hover:bg-[#222] rounded-lg px-3 py-2">
                  Connection Requests
                </Link>
              </li>
              <li>
                <Link to="/premium" onClick={closeDropdown} className="text-white hover:bg-[#222] rounded-lg px-3 py-2">
                  Premium
                </Link>
              </li>
              <li className="border-t border-[#222] mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-400 hover:bg-[#1a0000] rounded-lg px-3 py-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
