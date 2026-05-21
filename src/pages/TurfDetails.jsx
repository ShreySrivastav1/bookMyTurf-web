import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const TurfDetails = () => {
  const { turfId } = useParams();

  const [turf, setTurf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const fetchTurf = async () => {
    try {
      const res = await axios.get(BASE_URL + "/public/turf/" + turfId);

      setTurf(res.data.data);
      setSelectedImage(res.data.data.photos?.[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTurf();
  }, []);

  if (!turf) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const {
    _id,
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
    selectedImage ||
    photos?.[0] ||
    "https://images.unsplash.com/photo-1522778119026-d647f0596c20b?q=80&w=1200";

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Hero Image */}
        <div className="h-72 md:h-96">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image Gallery */}
        {photos?.length > 1 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 p-4 bg-base-100">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${name} ${index + 1}`}
                onClick={() => setSelectedImage(photo)}
                className={`h-24 w-full object-cover rounded-xl cursor-pointer border-2 ${
                  selectedImage === photo
                    ? "border-primary"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-gray-500 mt-2">
                {address}, {city}
              </p>
            </div>

            <div className="bg-base-200 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-2xl font-bold text-primary">
                ₹{pricePerHour}/hr
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Sports Supported</h2>
            <div className="flex flex-wrap gap-2">
              {sportsSupported?.map((sport) => (
                <span
                  key={sport}
                  className="badge badge-primary badge-outline p-4"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Timing</h2>
            <div className="bg-base-200 rounded-xl p-4 inline-block">
              <p>
                <span className="font-semibold">Open:</span> {openingTime}
              </p>
              <p>
                <span className="font-semibold">Close:</span> {closingTime}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>

            {amenities?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenities.map((item) => (
                  <div
                    key={item}
                    className="bg-base-200 rounded-xl p-4 text-center font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No amenities listed</p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Location</h2>
            <div className="bg-base-200 rounded-xl p-4">
              <p>{address}</p>
              <p>{city}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
            <button className="btn btn-outline" onClick={() => navigate("/")}>
              Back to Home
            </button>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/booking/" + _id)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;