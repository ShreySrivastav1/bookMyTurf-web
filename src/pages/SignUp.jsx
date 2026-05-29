import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signUp", {
                firstName, lastName, emailId, password, phoneNumber,
            }, { withCredentials: true });

            dispatch(addUser(res.data.data));
            return navigate("/profile");

        } catch (err) {
            setError(err?.response?.data || "Something went wrong!");

        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold">
                        Create Account
                    </h2>

                    <div className="space-y-4 mt-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="input input-bordered w-full"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            className="input input-bordered w-full"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="input input-bordered w-full"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <button
                            className="btn btn-primary w-full"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                    </div>

                    <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <span
                            className="text-primary cursor-pointer font-semibold"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );




}

export default SignUp;