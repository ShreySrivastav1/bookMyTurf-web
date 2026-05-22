import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeTurfs } from "../utils/turfSlice";

const TurfCard = ({ turf, ownerView }) => {

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const showMessage = (message, type = "success") => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        name,
        sportsSupported,
        address,
        city,
        pricePerHour,
        openingTime,
        closingTime,
        amenities,
        photos,
    } = turf;

    const imageUrl =
        photos?.[0] ||
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20b?q=80&w=1200";

    const deleteTurf = async () => {
        try {
            const res = await axios.delete(BASE_URL + "/turf/delete/" + turf._id,
                { withCredentials: true });
            dispatch(removeTurfs(turf._id));
            showMessage("Turf deleted successfully!", "success");


        } catch (err) {
            showMessage(
                err?.response?.data?.message || "Failed to delete turf",
                "error"
            );
        }
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-10 mb-32 px-4">
            {showToast && (
                <div className="toast toast-top toast-center z-50">
                    <div
                        className={`alert ${toastType === "success" ? "alert-success" : "alert-error"
                            }`}
                    >
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
                <figure className="h-52">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                </figure>

                <div className="card-body">
                    <h2 className="card-title">{name}</h2>

                    <p className="text-sm text-gray-500">
                        {address}, {city}
                    </p>

                    <div className="flex flex-wrap gap-2 my-2">
                        {sportsSupported?.map((sport) => (
                            <span key={sport} className="badge badge-primary badge-outline">
                                {sport}
                            </span>
                        ))}
                    </div>

                    <p>
                        <span className="font-semibold">Price:</span> ₹{pricePerHour}/hour
                    </p>

                    <p>
                        <span className="font-semibold">Timing:</span> {openingTime} -{" "}
                        {closingTime}
                    </p>

                    {amenities?.length > 0 && (
                        <p className="text-sm">
                            <span className="font-semibold">Amenities:</span>{" "}
                            {amenities.join(", ")}
                        </p>
                    )}

                    <div className="card-actions justify-end">

                        {ownerView ? (
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary"
                                    onClick={() => navigate("/turf/edit/" + turf._id)}
                                >
                                    Edit Turf
                                </button>

                                <button className="btn btn-error"
                                    onClick={deleteTurf}
                                >
                                    Delete Turf
                                </button>
                            </div>
                        ) : (
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-outline"
                                    onClick={() => navigate("/turfs/" + turf._id)}
                                >
                                    View Details
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/booking/" + turf._id)}
                                >
                                    Book Now
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
            );
};

            export default TurfCard;