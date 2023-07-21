import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";
import { proxy } from "../App.jsx";

export default function Header() {
  const { currentUser, logout } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(null);

  const myFunction = async () => {
    // run asynchronous tasks here
    if (currentUser) {
      try {
        const isAdmin = await axios.get(`${proxy}/users/isAdmin`);
        setIsAdmin(isAdmin.data.isAdmin);
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsAdmin(null);
    }
  };

  useEffect(() => {
    myFunction();
  }, [currentUser]); // Note the curly braces around myFunction!
  return (
    <>
      <nav className="header ">
        <ul className="header__links mx-auto">
          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300">
            <Link to={"/"}>Home</Link>
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
          <Link to={"/"}><img src="./LOGO.png" alt="" /></Link>
          </div>
          {isAdmin && (
            <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300 text-green-600 hover:text-green-500">
              <Link to={"/register"}>Ajouter</Link>
            </li>
          )}

          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300">
            <Link to={"/reviews"}>Avis</Link>
          </li>
          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300">
            <Link to={"/hours"}>Horaires d'ouverture</Link>
          </li>
          <li className="header__link uppercase font-semibold hover:-translate-y-1 ease-in duration-300 hover:text-red-500">
            {currentUser ? (
              <span onClick={logout}>Deconnexion</span>
            ) : (
              <Link to={"/login"}>Connexion</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
