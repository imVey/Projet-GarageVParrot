import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex.jsx";

export default function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs)
            navigate("/");
        } catch (err) {
            setError(err.response.data);
        }
    };

    return <>
    <section className="login min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded border"
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded border"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        {err && <p className="text-red-500">{err}</p>}
      </form>
    </section>
    </>
}
