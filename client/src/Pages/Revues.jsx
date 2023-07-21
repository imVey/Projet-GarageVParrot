import { useContext, useEffect, useState } from "react";
import { proxy } from "../App.jsx";
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
          const res = await axios.get(`${proxy}/revues/all`);
          setRevues(res.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await axios.get(`${proxy}/revues`);
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
      const res = await axios.delete(`${proxy}/revues/${id}`);
      setNotification(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApprouve = async (id) => {
    try {
      const res = await axios.put(`${proxy}/revues/${id}`);
      setNotification(res.data);
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
          <div className="bg-blue-200 p-2 rounded-xl"
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
                <h1 className="text-xl font-bold">{item.nom}</h1>
                <p className="text-sm text-gray-700 font-semibold">{item.note}/5</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
