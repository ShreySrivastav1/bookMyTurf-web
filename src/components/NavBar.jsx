import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());

      return navigate("/login");

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm px-4">

        {/* LEFT */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            BookMyTurf
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex gap-3 items-center">

          {/* IF USER NOT LOGGED IN */}
          {!user && (
            <>
              <Link to="/login">
                <button className="btn btn-outline btn-primary">
                  Login
                </button>
              </Link>

            </>
          )}

          {/* IF USER LOGGED IN */}
          {user && (
            <div className="dropdown dropdown-end relative flex items-center">
              <p className="px-2">Welcome, {user.firstName}</p>

              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user photo"
                    src={user.photoUrl || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content absolute top-full right-0 bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link to="/my-bookings">
                    My Bookings
                  </Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>

                {user?.role === "owner" && (
                  <li>
                    <Link to="/owner/turf/create">
                      Create Turf
                    </Link>
                  </li>
                )}

                {user?.role === "owner" && (<li>
                  <Link to="/owner/turfs">
                    My Turfs
                  </Link>
                </li>)}

                {user?.role === "owner" && (<li>
                  <Link to="/owner/bookings">
                    Your Bookings
                  </Link>
                </li>)}


              </ul>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default NavBar;