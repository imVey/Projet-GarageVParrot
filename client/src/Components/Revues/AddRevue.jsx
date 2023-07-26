import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { proxy } from "../../App.jsx";
import axios from "axios";
import { AuthContext } from "../../context/AuthContex.jsx";

export default function AddRevue() {
  const [inputs, setInputs] = useState({
    nom: "",
    commentaire: "",
    note: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${proxy}/revues`, inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section className="register flex justify-center p-4">
      <div className="max-w-sm bg-blue-200 border border-gray-200 rounded-lg shadow p-4 mb-56">
        <h1 className="text-3xl font-bold mb-4 text-blue-500 text-center ">Votre avis</h1>
        <form>
          <input
            required
            type="text"
            placeholder="Nom"
            name="nom"
            onChange={handleChange}
            className="mb-2 w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            required
            type="text"
            placeholder="Votre avis"
            name="commentaire"
            onChange={handleChange}
            className="mb-2 w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            required
            type="number"
            min={0}
            max={5}
            step={0.25}
            placeholder="Note"
            name="note"
            onChange={handleChange}
            className="mb-2 w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-green-600 "
          >
            Envoyé
          </button>
          {err && <p className="text-red-500">{err}</p>}
        </form>
      </div>
    </section>
  );
}
