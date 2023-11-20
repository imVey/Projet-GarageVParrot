import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import UpdateCar from "../Components/Cars/UpdateCar.jsx";

export default function Single() {
  const [voiture, setVoiture] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const voitureId = location.pathname.split("/")[2];
  const [isAdminChecked, setIsAdminCheked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { currentUser, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/voitures/${voitureId}`);
        setVoiture(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [voitureId]);

  const CheckIfIsAdmin = async () => {
    const admin = await isAdmin();
    setIsAdminCheked(admin);
  };

  useEffect(() => {
    CheckIfIsAdmin();
  }, [currentUser]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/voitures/${voitureId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    setIsUpdating(!isUpdating);
  };

  return (
    <>
          <section className="single flex flex-col justify-center items-center">
              
<div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 ">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={voiture.photo} alt={voiture.nom} />
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{voiture.nom}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{voiture.description}</p>
          <div class="flex items-center">
              <div class="text-sm">
                <p class="text-gray-900 leading-none">{voiture.prix}</p>
                <p class="text-gray-900 leading-none">{voiture.annee}</p>
                <p class="text-gray-900 leading-none">{voiture.km}</p>
                {isAdminChecked && (
                  <div className="flex flex-row gap-3">
                    <button
                      className="bg-red-400 text-white font-bold py-2 px-4 rounded"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-400 text-white font-bold py-2 px-4 rounded"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            </div>
    </div>
</div>
      </section>
    </>
  );
}
