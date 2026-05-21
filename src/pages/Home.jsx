import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addTurfs } from "../utils/turfSlice";
import TurfCard from "../components/TurfCard";

const Home = () => {
    const dispatch = useDispatch();

    const turfs = useSelector((store) => store.turf);

    const getPublicTurfs = async () => {
        try {
            const res = await axios.get(BASE_URL + "/public/turfs");
            dispatch(addTurfs(res.data.data));

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPublicTurfs();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8">
                Available Turfs
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {turfs?.map((turf) => (
                    <TurfCard key={turf._id} turf={turf} />
                ))}
            </div>
        </div>
    );
};

export default Home;