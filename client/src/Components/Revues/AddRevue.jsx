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
    <section className="register flex justify-end p-4">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow p-4">
        <form>
          <input
            required
            type="text"
            placeholder="nom"
            name="nom"
            onChange={handleChange}
            className="mb-2 w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            required
            type="text"
            placeholder="commentaire"
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
            placeholder="note"
            name="note"
            onChange={handleChange}
            className="mb-2 w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Envoyé
          </button>
          {err && <p className="text-red-500">{err}</p>}
        </form>
      </div>
    </section>
  );
}
