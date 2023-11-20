import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";
import { API_URL } from "../App.jsx";

export default function Header() {
  const { currentUser, logout } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(null);

  const getAdminRight = async () => {
    // run asynchronous tasks here
    if (currentUser) {
      try {
        const isAdmin = await axios.get(`${API_URL}/users/isAdmin`);
        setIsAdmin(isAdmin.data.isAdmin);
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsAdmin(null);
    }
  };

  useEffect(() => {
    getAdminRight();
  }, [currentUser]); // Note the curly braces around myFunction!
  return (
    <>
      <nav className="header ">
        <ul className="header__links mx-auto">
          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300">
            <Link to={"/"}>Acceuil</Link>
          </li>
          {isAdmin && (
            <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300 text-green-600 hover:text-green-500">
              <Link to={"/cars/add"}>Ajouter une voiture</Link>
            </li>
          )}

          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300">
            <Link to={"/our-cars"}>Nos voitures</Link>
          </li>
          <div className="header__logo hover:-translate-y-2 ease-in duration-300">
            <Link to={"/"}>
              <img src="./LOGO.png" alt="" />
            </Link>
          </div>
          {isAdmin && (
            <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300 text-green-600 hover:text-green-500">
              <Link to={"/register"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
              </Link>
            </li>
          )}

          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300">
            <Link to={"/reviews"}>Avis</Link>
          </li>
          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300">
            <Link to={"/hours"}>Horaires d'ouverture</Link>
          </li>
          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300">
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300">
            {currentUser ? (
              <span onClick={logout} className="hover:text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </span>
            ) : (
              <Link to={"/login"} className="hover:text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
