import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const booking = location.state?.booking;

    if (!booking) {
        return <h1>No booking data found</h1>;
    }

    const bookingId = booking._id;

    const handlePayNow = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/payment/create",
                { bookingId },
                { withCredentials: true }
            );

            const options = {
                key: res.data.key_id,
                amount: res.data.data.amount,
                currency: res.data.data.currency,
                name: "BookMyTurf",
                description: "Turf Booking Payment",
                order_id: res.data.data.id,

                handler: async function (response) {
                    const verifyRes = await axios.post(
                        BASE_URL + "/payment/verify",
                        {
                            bookingId,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                        { withCredentials: true }
                    );

                    console.log("Payment verified:", verifyRes.data);

                    navigate("/booking-confirmed", {
                        state: {
                            bookingId,
                            paymentId: response.razorpay_payment_id,
                        },
                    });
                },
            };



            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response) {
                console.log(response.error);
                alert("Payment failed. Please try again.");
            });

            rzp.open();

        } catch (err) {
            console.error(err);
        }


    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Payment Page</h1>

            <div className="card bg-base-200 shadow-md">
                <div className="card-body">
                    <h2 className="card-title">Booking Summary</h2>

                    <p>Booking ID: {booking._id}</p>
                    <p>Date: {booking.bookingDate}</p>
                    <p>Time: {booking.startTime} - {booking.endTime}</p>
                    <p>Total Price: ₹{booking.totalPrice}</p>
                    <p>Status: {booking.bookingStatus}</p>
                    <p>Payment: {booking.paymentStatus}</p>

                    <button
                        onClick={handlePayNow}
                        className="btn btn-success mt-4">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;