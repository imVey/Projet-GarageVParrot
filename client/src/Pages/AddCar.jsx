import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { proxy } from "../App.jsx";
import axios from "axios";
import { AuthContext } from "../context/AuthContex.jsx";

export default function addCar() {
  const [inputs, setInputs] = useState({
    nom: "",
    photo: "",
    km: "",
    annee: "",
    prix: "",
    description: "",
  });

  const [err, setError] = useState(null);
  const [isAdminChecked, setIsAdminCheked] = useState(false);

  const navigate = useNavigate();

  const { isAdmin } = useContext(AuthContext);

  const CheckIfIsAdmin = async () => {
    const admin = await isAdmin();
    !admin && navigate("/");
    setIsAdminCheked(true);
  };

  useLayoutEffect(() => {
    CheckIfIsAdmin();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${proxy}/voitures`, inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      {isAdminChecked && (
        <section className="register flex justify-center items-center h-screen bg-gray-50">
          <div className="max-w-md bg-white border border-gray-300 rounded-lg shadow p-4">
            <h2 className="text-2xl font-semibold mb-4">Ajout de voiture</h2>
            <div className="flex flex-col items-center">
              <input
                required
                type="text"
                placeholder="Nom"
                name="nom"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                required
                type="file"
                accept=".png, .jpg, .jpeg"
                placeholder="Photo"
                name="photo"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                required
                type="text"
                placeholder="Kilométrage"
                name="km"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                required
                type="text"
                placeholder="Année"
                name="annee"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                required
                type="text"
                placeholder="Prix (€)"
                name="prix"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                required
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                className="w-full p-2 mb-8 border border-gray-300 rounded"
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ajouter
              </button>
              {err && <p className="text-red-500 mt-2">{err}</p>}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
