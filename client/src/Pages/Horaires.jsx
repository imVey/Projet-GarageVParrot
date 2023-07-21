import { useContext, useEffect, useState } from "react";
import { proxy } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";

export default function Horaires() {
  const [horaires, setHoraires] = useState([]);
  const [isAdminCheck, setisAdminCheck] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const { currentUser, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const employe = await isAdmin();
      setisAdminCheck(true);
      try {
        const res = await axios.get(`${proxy}/horaires`);
        setHoraires(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser]);

  const handleApprouve = async (id) => {
    try {
      const res = await axios.put(`${proxy}/revues/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  // Variables d'état pour le formulaire de contact
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter du code pour envoyer les données du formulaire à votre backend ou effectuer d'autres actions.
    // Pour cet exemple, nous allons simplement afficher les données du formulaire dans la console.
    console.log("Nom :", name);
    console.log("Email :", email);
    console.log("Téléphone :", phone);
    console.log("Message :", message);
    // Réinitialiser les champs du formulaire après la soumission
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    // Afficher la notification de message envoyé
    setIsMessageSent(true);
    // Masquer la notification après 3 secondes (3000 millisecondes)
    setTimeout(() => setIsMessageSent(false), 3000);
  };
  // Fonction pour réinitialiser le formulaire
  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <section className="horaires p-4 pb-56">
      <div className="flex">
        <div className="flex-1">
          {isAdminCheck &&
            horaires.map((item) => {
              console.log(item);
              return (
                <div
                  className="max-w-md bg-white border border-gray-200 rounded-lg shadow p-4 mb-4"
                  key={item.id}
                >
                  <h1 className="uppercase font-semibold">{item.jour_semaine} :</h1>
                  {item.heure_ouverture && (
                    <div className="flex flex-row flex-wrap gap-5 w-full justify-center">
                      <p>
                        {item.heure_ouverture} - {item.heure_fermeture}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        <div className="flex-1 float-right">
          <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Formulaire de contact</h2>
            {isMessageSent && (
              <div className="bg-green-500 text-white p-2 mb-4 rounded">
                Message envoyé !
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block font-medium text-gray-700">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded resize-none"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Envoyer
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Vider tout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
