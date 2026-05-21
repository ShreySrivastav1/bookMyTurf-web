import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [ownerLoading, setOwnerLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const dispatch = useDispatch();

  const showMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const saveProfile = async () => {
    try {
      setLoading(true);

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, phoneNumber, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      showMessage("Profile updated successfully!", "success");
    } catch (err) {
      showMessage(
        err?.response?.data?.message || "Failed to update profile",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    try {
      if (!oldPassword || !newPassword) {
        return showMessage("Please enter both passwords", "error");
      }

      setPasswordLoading(true);

      await axios.patch(
        BASE_URL + "/profile/updatePassword",
        { oldPassword, newPassword },
        { withCredentials: true }
      );

      setOldPassword("");
      setNewPassword("");
      showMessage("Password updated successfully!", "success");
    } catch (err) {
      showMessage(
        err?.response?.data?.message || "Failed to update password",
        "error"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const becomeOwner = async () => {
    try {
      setOwnerLoading(true);

      const res = await axios.patch(
        BASE_URL + "/profile/become-owner",
        {},
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      showMessage("You are now a turf owner!", "success");
    } catch (err) {
      showMessage(
        err?.response?.data?.message || "Failed to become owner",
        "error"
      );
    } finally {
      setOwnerLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-10 mb-32 px-4">
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div
            className={`alert ${
              toastType === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="card w-full max-w-md bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Phone Number</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>

          <button
            className="btn btn-primary mt-4"
            onClick={saveProfile}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

          {user?.role !== "owner" && (
            <button
              className="btn btn-outline btn-secondary"
              onClick={becomeOwner}
              disabled={ownerLoading}
            >
              {ownerLoading ? "Updating..." : "Become Owner"}
            </button>
          )}
        </div>
      </div>

      <div className="card w-full max-w-md bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Update Password</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Old Password</legend>
            <input
              type="password"
              className="input input-bordered w-full"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">New Password</legend>
            <input
              type="password"
              className="input input-bordered w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </fieldset>

          <button
            className="btn btn-primary mt-4"
            onClick={updatePassword}
            disabled={passwordLoading}
          >
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;