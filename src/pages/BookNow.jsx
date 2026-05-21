import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const BookNow = () => {
  const { turfId } = useParams();

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [turf, setTurf] = useState(null);

  const fetchSlots = async () => {
    try {
      const res = await axios.get(
        BASE_URL + `/turfs/${turfId}/availability?date=${selectedDate}`,
        { withCredentials: true }
      );

      setSlots(res.data.availableSlots);
      setTurf(res.data.turf);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate, turfId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {turf && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{turf.name}</h1>
          <p className="text-gray-500">
            Open: {turf.openingTime} - {turf.closingTime}
          </p>
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Select Date</label>
        <input
          type="date"
          className="input input-bordered w-full max-w-xs"
          value={selectedDate}
          min={getTodayDate()}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot(null);
          }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {slots.length === 0 ? (
          <p className="col-span-full text-gray-500">
            No slots available for this date.
          </p>
        ) : (
          slots.map((slot) => (
            <button
              key={slot.startTime}
              onClick={() => setSelectedSlot(slot)}
              className={`btn ${
                selectedSlot?.startTime === slot.startTime
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >
              {slot.startTime} - {slot.endTime}
            </button>
          ))
        )}
      </div>

      {selectedSlot && (
        <div className="mt-6 p-4 bg-base-200 rounded-xl">
          <p>
            Selected Slot:{" "}
            <span className="font-bold">
              {selectedSlot.startTime} - {selectedSlot.endTime}
            </span>
          </p>

          <button className="btn btn-success mt-4">
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookNow;