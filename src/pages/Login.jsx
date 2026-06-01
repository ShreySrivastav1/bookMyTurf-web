import { useState } from "react";
import bgImage from "../assets/bg.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {

    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => {
        try{
            const res = await axios.post(BASE_URL + "/login",
                {emailId,password},{withCredentials: true});
                dispatch(addUser(res.data.data));
                return navigate("/");

        }catch(err){
            setError(err?.response?.data || "something went wrong");
        }
    }


    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="min-h-screen bg-black/70 flex justify-center items-center">

                <div className="w-96 p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20">

                    <h2 className="text-white text-3xl font-bold text-center mb-6">
                        <div className="flex justify-center py-10">
                            <div className="card w-96 bg-base-300 card-md shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-title flex justify-center">Login</h2>
                                    <div className="space-y-4 py-4">
                                        <label className="input validator">
                                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    strokeWidth="2.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                                </g>
                                            </svg>
                                            <input 
                                            type="email" 
                                            value={emailId} 
                                            placeholder="Email Id" 
                                            required 
                                            onChange={(e) => setEmailId(e.target.value)} />
                                        </label>
                                        <div className="validator-hint hidden">Enter valid email address</div>


                                        <label className="input validator mt-2">
                                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    strokeWidth="2.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                                    ></path>
                                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                                </g>
                                            </svg>
                                            <input
                                                type="password"
                                                value={password}
                                                required
                                                placeholder="Password"
                                                minLength="8"
                                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}"
                                                title="Must be at least 8 characters and include uppercase, lowercase, number, and special character"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </label>
                                        <p className="validator-hint hidden">
                                            Must be more than 8 characters, including
                                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                                        </p>
                                        <p className="text-red-500">{error}</p>



                                    </div>
                                    <div className="justify-center card-actions">
                                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                                    </div>
                                    <p className="" onClick={() => navigate("/signup")}>New user? SignUp now!</p>
                                </div>
                            </div>
                        </div>
                    </h2>

                </div>

            </div>
        </div>
    )
}

export default Login;