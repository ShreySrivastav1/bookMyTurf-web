import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");

    const fetchMyBookings = async () => {
        try {
            const res = await axios.get(BASE_URL + "/booking/my", {
                withCredentials: true,
            });

            setBookings(res.data.data || []);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to fetch bookings");
        }
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const cancelBooking = async (bookingId) => {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) return;

        try {
            await axios.patch(
                BASE_URL + `/booking/cancel/${bookingId}`,
                {},
                { withCredentials: true }
            );

            fetchMyBookings();
        } catch (err) {
            setError(
                err?.response?.data?.message || "Unable to cancel booking"
            );
        }
    };

    return (
        <div className="min-h-screen bg-base-200 px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>

            {error && <p className="text-error text-center">{error}</p>}

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
                                <span className="font-semibold">Date:</span>{" "}
                                {booking.bookingDate}
                            </p>

                            <p>
                                <span className="font-semibold">Time:</span>{" "}
                                {booking.startTime} - {booking.endTime}
                            </p>

                            <p>
                                <span className="font-semibold">Amount:</span> ₹
                                {booking.totalPrice}
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

                            {booking.turfId?.address && (
                                <p>
                                    <span className="font-semibold">Address:</span>{" "}
                                    {booking.turfId.address}, {booking.turfId.city}
                                </p>
                            )}
                            <div className="card-actions justify-end mt-4">
                                {booking.bookingStatus !== "cancelled" &&
                                    booking.bookingStatus !== "completed" && (
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => cancelBooking(booking._id)}
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;