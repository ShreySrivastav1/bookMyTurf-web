import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTurfs } from "../utils/turfSlice";
import { useNavigate } from "react-router-dom";

const CreateTurf = () => {
  const sportsOptions = ["football", "cricket", "badminton", "pickleball"];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sportsSupported, setSportsSupported] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSportChange = (sport) => {
    if (sportsSupported.includes(sport)) {
      setSportsSupported(sportsSupported.filter((s) => s !== sport));
    } else {
      setSportsSupported([...sportsSupported, sport]);
    }
  };

  const createTurf = async () => {

    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/turf/create",
        {
          name,
          description,
          sportsSupported,
          address,
          city,
          pricePerHour: Number(pricePerHour),
          openingTime,
          closingTime,
        },
        { withCredentials: true }
      );

      dispatch(addTurfs(res.data.data));
      showMessage("Turf added successfully!", "success");

      setTimeout(() => {
        navigate("/owner/turfs");
      }, 1000);
    } catch (err) {
      showMessage(
        err?.response?.data?.message || "Failed to add turf!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start my-10 mb-32 px-4">
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
          <h2 className="card-title justify-center">Create Turf</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter turf name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea textarea-bordered w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description about your turf"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Sports Supported</legend>

            <div className="grid grid-cols-2 gap-3">
              {sportsOptions.map((sport) => (
                <label
                  key={sport}
                  className="label cursor-pointer justify-start gap-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={sportsSupported.includes(sport)}
                    onChange={() => handleSportChange(sport)}
                  />
                  <span className="capitalize">{sport}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">City</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Address</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter full address"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Price Per Hour</legend>
            <input
              type="number"
              className="input input-bordered w-full"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              placeholder="Example: 800"
              min="1"
            />
          </fieldset>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Opening Time</legend>
              <input
                type="time"
                className="input input-bordered w-full"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Closing Time</legend>
              <input
                type="time"
                className="input input-bordered w-full"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
              />
            </fieldset>
          </div>

          <button
            className="btn btn-primary mt-4"
            onClick={createTurf}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Turf"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTurf;