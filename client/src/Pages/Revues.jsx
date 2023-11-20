import { useContext, useEffect, useState } from "react";
import { API_URL } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";
import AddRevue from "../Components/Revues/AddRevue.jsx";

export default function Revue() {
  const [revues, setRevues] = useState([]);
  const [isEmployed, setIsEmployed] = useState(false);
  const [isEmployeChecked, setIsEmployeChecked] = useState(false);
  const [notification, setNotification] = useState(null);

  const { currentUser, isEmploye } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const employe = await isEmploye();
      setIsEmployed(employe);
      setIsEmployeChecked(true);
      if (employe) {
        try {
          const res = await axios.get(`${API_URL}/revues/all`);
          setRevues(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await axios.get(`${API_URL}/revues`);
          setRevues(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [currentUser, notification]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/revues/${id}`);
      setNotification("Revu supprimé avec succès");
    } catch (err) {
      console.log(err);
    }
  };

  const handleApprouve = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/revues/${id}`);
      setNotification("Revu ajoutée avec succès");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="revues py-16 pb-60 flex justify-evenly">
        <AddRevue />
        {notification && <span>{notification}</span>}
        {isEmployeChecked && (
          <div
            className="bg-blue-200 p-2 rounded-xl custom-scrollbar"
            style={{
              maxHeight: "500px", // Hauteur désirée pour le conteneur scrollable
              overflowY: "auto", // Activer le défilement vertical
              marginBottom: "0", // Supprime la marge inférieure
              color: "cornflowerblue", // ajoute couleur de pseudo
            }}
          >
            {revues.map((item) => (
              <div
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mb-4"
                key={item.id}
              >
                <h5 className="mb-2 text-lg font-bold text-gray-900">
                  {item.commentaire}
                </h5>
                {isEmployed && (
                  <>
                    {
                      item.approuve == 0 && <button onClick={()=>{handleApprouve(item.id)}} class="bg-green-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-3xl">
                      Approve
                    </button>
                    }

                    <button onClick={()=>{handleDelete(item.id)}} class="bg-red-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-3xl">
                      Delete
                    </button>
                  </>
                )}
                <h1 className="text-xl font-bold">{item.nom}</h1>
                <p className="text-sm text-gray-700 font-semibold">
                  {item.note}/5
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
