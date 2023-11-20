import { useContext, useEffect, useState } from "react";
import { API_URL } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";

export default function Horaires() {
  const [horaires, setHoraires] = useState([]);
  const [isAdminCheck, setIsAdminCheck] = useState(false);
  const [selected, setSelected] = useState(null);
  const { currentUser, isAdmin } = useContext(AuthContext);

  const [hourForm, setHourForm] = useState({
    openingHours: "",
    closedHours: "",
  });

      const fetchData = async () => {
      const isAdminRight = await isAdmin();
      setIsAdminCheck(isAdminRight);
      try {
        const res = await axios.get(`${API_URL}/horaires`);
        setHoraires(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {

    fetchData();
  }, [currentUser]);

  const handleApprouve = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/revues/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setHourForm({ ...hourForm, [e.target.name]: e.target.value });
  };



  const getHoursByState = (hours) => {
    console.log(typeof hours.heure_ouverture)
    if (hours.heure_ouverture == null || hours.heure_fermeture == null) {
      return "Fermé";
    } else {
      return `${hours.heure_ouverture} - ${hours.heure_fermeture}`;
    }
  };


  const onSave = async (horaireId) => {
    try {
      const res = await axios.put(`${API_URL}/horaires/${horaireId}`, {
        heure_ouverture: hourForm.openingHours,
        heure_fermeture: hourForm.closedHours,
      });

      if (res.status === 200) {
        fetchData();
        setSelected(null);
        setHourForm({
          openingHours: "",
          closedHours: "",
        })
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <section className="horaires py-12 pb-80  bg-white">
      <div className="flex">
        <div className="flex-1 ml-60">
          {horaires.map((item) => {
              return (
                <div
                  className="max-w-md bg-blue-200 border border-gray-200 rounded-lg shadow p-4 mb-4"
                  key={item.id}
                >
                  <h1 className="uppercase font-semibold text-center">{item.jour_semaine} :</h1>
                  {item.heure_ouverture && (
                    <div className="flex flex-row flex-wrap gap-5 w-full justify-center">
                      {item.id === selected ?
                        <div className="flex flex-row gap-4">
                          <input type="text" name="openingHours" id="" defaultValue={item.heure_ouverture} onChange={handleChange} />
                          <input type="text" name="closedHours" id="" defaultValue={item.heure_fermeture} onChange={handleChange}/>
                        </div>:
                        (
                          <p>
                            {getHoursByState(item)}
                          </p>
                        )
                      }
                    </div>
                  )}
                  <div className="flex flex-row justify-center my-3">
                            {isAdminCheck && (
            item.id === selected ?
            (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => onSave(item.id)}>
            Sauvegarder
                </button>
              )
              : (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSelected(item.id)}>
            Modifier
                </button>
              ))}
                  </div>
                </div>
              );
            })}

        </div>
      </div>
    </section>
  );
}
