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
        if(currentUser){
            try{
                const isAdmin = await axios.get(`${proxy}/users/isAdmin`);
                setIsAdmin(isAdmin.data.isAdmin)
            } catch(err){
                console.log(err)
            }
        } else {
            setIsAdmin(null)
        }
    };
    
    useEffect(() => {
        myFunction();
    }, [currentUser]); // Note the curly braces around myFunction!
    return <>

        <nav className="header">
            <ul className="header__links mx-auto">
                {
                    isAdmin && <li className="header__link">
                    <Link to={"/register"} >
                        Register
                    </Link>
                </li>
                }
                {
                    isAdmin && <li className="header__link">
                    <Link to={"/cars/add"} >
                        Ajouter une voiture
                    </Link>
                </li>
                }
                <li className="header__link uppercase font-semibold ">
                    <Link to={"/"} >
                        Home
                    </Link>
                </li>
       
                         <li className="header__link uppercase font-semibold">
                    <Link to={"/our-cars"} >
                        Nos voitures
                    </Link>
                </li>
                            <div className="header__logo">
                <img src="./LOGO.png" alt="" />
                </div>
                         <li className="header__link uppercase font-semibold">
                    <Link to={"/reviews"} >
                        Avis
                    </Link>
                </li>
                <li className="header__link uppercase font-semibold">
                    <Link to={"/hours"} >
                        Horaires d'ouverture
                    </Link>
                </li>
                <li className="header__link uppercase font-semibold">
                    {
                        currentUser ?
                            <span onClick={logout}>Logout</span>
                            :
                            <Link to={"/login"} >
                                Login
                            </Link>
                    }
                </li>
            </ul>
        </nav>
    </>
}