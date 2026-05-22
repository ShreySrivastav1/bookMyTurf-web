import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const EditTurf = () => {
    const { turfId } = useParams();
    const navigate = useNavigate();

    const sportsOptions = ["football", "cricket", "badminton", "pickleball"];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sportsSupported, setSportsSupported] = useState([]);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pricePerHour, setPricePerHour] = useState("");
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [amenitiesInput, setAmenitiesInput] = useState("");
    const [photosInput, setPhotosInput] = useState("");

    const [pageLoading, setPageLoading] = useState(true);
    const [loading, setLoading] = useState(false);

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

    const getTurfById = async () => {
        try {
            setPageLoading(true);

            const res = await axios.get(BASE_URL + "/public/turf/" + turfId, {
                withCredentials: true,
            });

            const turfData = res.data.data;

            setName(turfData.name || "");
            setDescription(turfData.description || "");
            setSportsSupported(turfData.sportsSupported || []);
            setAddress(turfData.address || "");
            setCity(turfData.city || "");
            setPricePerHour(turfData.pricePerHour || "");
            setOpeningTime(turfData.openingTime || "");
            setClosingTime(turfData.closingTime || "");
            setAmenities(turfData.amenities || []);
            setPhotos(turfData.photos || []);
            setAmenitiesInput((turfData.amenities || []).join(", "));
            setPhotosInput((turfData.photos || []).join(", "));

        } catch (err) {
            showMessage(
                err?.response?.data?.message || "Failed to load turf details",
                "error"
            );
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        getTurfById();
    }, [turfId]);

    const handleSportChange = (sport) => {
        if (sportsSupported.includes(sport)) {
            setSportsSupported(sportsSupported.filter((s) => s !== sport));
        } else {
            setSportsSupported([...sportsSupported, sport]);
        }
    };

    const updateTurf = async () => {
        try {
            setLoading(true);

            await axios.patch(
                BASE_URL + "/turf/edit/" + turfId,
                {
                    name,
                    description,
                    sportsSupported,
                    address,
                    city,
                    pricePerHour,
                    openingTime,
                    closingTime,
                    amenities,
                    photos,
                },
                { withCredentials: true }
            );

            showMessage("Turf updated successfully!", "success");

            setTimeout(() => {
                navigate("/owner/turfs");
            }, 1000);
        } catch (err) {
            showMessage(
                err?.response?.data?.message || "Failed to update turf",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-start my-10 mb-32 px-4">
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

            <div className="card w-full max-w-md bg-base-300 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Turf</h2>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Name</legend>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Description</legend>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Address</legend>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Price Per Hour</legend>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={pricePerHour}
                            onChange={(e) => setPricePerHour(e.target.value)}
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

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Amenities</legend>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={amenitiesInput}
                            onChange={(e) => {
                                setAmenitiesInput(e.target.value);
                                setAmenities(
                                    e.target.value
                                        .split(",")
                                        .map((item) => item.trim())
                                        .filter((item) => item !== "")
                                );
                            }}
                            placeholder="Parking, Washroom, Lights"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo URLs</legend>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            value={photosInput}
                            onChange={(e) => {
                                setPhotosInput(e.target.value);
                                setPhotos(
                                    e.target.value
                                        .split(",")
                                        .map((item) => item.trim())
                                        .filter((item) => item !== "")
                                );
                            }}
                            placeholder="https://image1.jpg, https://image2.jpg"
                        />
                    </fieldset>


                    <button
                        className="btn btn-primary mt-4"
                        onClick={updateTurf}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Turf"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTurf;