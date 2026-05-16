import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {

  const user = useSelector((store) => store.user);

  return (
    <div>

      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">BookMyTurf</Link>
        </div>
        <div className="flex gap-2">

          {user && (<div className="dropdown dropdown-end flex">
            <p className="px-2">Welcome, {user.firstName}</p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user.photoUrl || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>)}
        </div>
      </div>
    </div>)
}

export default NavBar;