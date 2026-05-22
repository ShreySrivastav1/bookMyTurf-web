import axios from "axios";
import { useEffect, useState } from "react";
import TurfCard from "../components/TurfCard";
import { BASE_URL } from "../utils/constants";

const MyTurfs = () => {
  const [turfs, setTurfs] = useState([]);

  const getMyTurfs = async () => {
    try {
      const res = await axios.get(BASE_URL + "/owner/turfs", {
        withCredentials: true,
      });

      setTurfs(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyTurfs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Turfs</h1>

      {turfs.length === 0 ? (
        <p className="text-center text-lg">You have not created any turf yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {turfs.map((turf) => (
            <TurfCard
              key={turf._id}
              turf={turf}
              ownerView={true}
              refreshTurfs={getMyTurfs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTurfs;