import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const OwnerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const fetchOwnerBookings = async () => {
        try {
            const res = await axios.get(BASE_URL + "/owner/bookings", {
                withCredentials: true,
            });

            setBookings(res.data.data || []);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to fetch bookings");
        }
    };

    useEffect(() => {
        fetchOwnerBookings();
    }, []);

    const updateBookingStatus = async (bookingId, status) => {
        try {
            setError("");
            setMessage("");

            await axios.patch(
                BASE_URL + `/booking/${bookingId}/status/${status}`,
                {},
                { withCredentials: true }
            );

            setMessage(`Booking marked as ${status}`);
            fetchOwnerBookings();
            
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update booking");
        }
    };

    return (
        <div className="min-h-screen bg-base-200 px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Owner Bookings</h1>

            {error && <p className="text-error text-center mb-4">{error}</p>}
            {message && <p className="text-success text-center mb-4">{message}</p>}

            {bookings.length === 0 && !error && (
                <p className="text-center text-lg">No bookings found.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {bookings.map((booking) => (
                    <div key={booking._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">
                                {booking.turfId?.name || "Turf Booking"}
                            </h2>

                            <p>
                                <span className="font-semibold">User:</span>{" "}
                                {booking.userId?.firstName} {booking.userId?.lastName}
                            </p>

                            <p>
                                <span className="font-semibold">Date:</span>{" "}
                                {booking.bookingDate}
                            </p>

                            <p>
                                <span className="font-semibold">Time:</span>{" "}
                                {booking.startTime} - {booking.endTime}
                            </p>

                            <p>
                                <span className="font-semibold">Amount:</span> ₹
                                {booking.totalAmount}
                            </p>

                            <p>
                                <span className="font-semibold">Booking Status:</span>{" "}
                                <span className="badge badge-info">
                                    {booking.bookingStatus}
                                </span>
                            </p>

                            <p>
                                <span className="font-semibold">Payment Status:</span>{" "}
                                <span className="badge badge-success">
                                    {booking.paymentStatus}
                                </span>
                            </p>

                            <div className="card-actions justify-end mt-4">
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() =>
                                        updateBookingStatus(booking._id, "confirmed")
                                    }
                                    disabled={booking.bookingStatus === "confirmed"}
                                >
                                    Confirm
                                </button>

                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        updateBookingStatus(booking._id, "completed")
                                    }
                                    disabled={booking.bookingStatus === "completed"}
                                >
                                    Complete
                                </button>

                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() =>
                                        updateBookingStatus(booking._id, "cancelled")
                                    }
                                    disabled={booking.bookingStatus === "cancelled"}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OwnerBookings;