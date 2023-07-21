import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { proxy } from "../App.jsx";
import axios from "axios";
import { AuthContext } from "../context/AuthContex.jsx";

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const [isAdminChecked, setIsAdminCheked] = useState(false);

  const navigate = useNavigate();

  const { isAdmin } = useContext(AuthContext);

  const CheckIfIsAdmin = async () => {
    const admin = await isAdmin()
    !admin && navigate("/");
    setIsAdminCheked(true);
  }

  useLayoutEffect(() => {
    CheckIfIsAdmin()
  }, [])


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${proxy}/auth/register`, inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      {
        isAdminChecked && <section className="register flex justify-center items-center h-screen">
          <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow p-4">
            <h1 className="text-2xl font-semibold mb-4 ">Ajouter un employé</h1>
            <form>
              <input
                required
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
                className="mb-2 w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                required
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
                className="mb-2 w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                required
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                className="mb-2 w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Register
              </button>
              {err && <p className="text-red-500">{err}</p>}
            </form>
          </div>
        </section>
      }
    </>
  );
}
