import { Link } from "react-router-dom";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-300 p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Liens utiles</h3>
            <ul className="text-gray-600">
              <li><Link to={"/"} >Home</Link></li>
              <li><Link to={"/our-cars"}>Nos voitures</Link></li>
              <li><Link to={"/reviews"}>Avis</Link></li>
              <li><Link to={"/hours"}>Contact</Link></li> 
              <li><Link to={"/"}>À propos</Link></li> 
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Coordonnées</h3>
            <p className="text-gray-600">
              Adresse : 38 Rue Jean de Pins, 31300 Toulouse, France
            </p>
            <p className="text-gray-600">
              Téléphone : +33 1 23 45 67 89
            </p>
            <p className="text-gray-600">
              Email : contact@garagevparot.com
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Suivez-nous</h3>
            <div className="flex items-center gap-2 text-gray-600 ">
              <a href="#"><i className="fab fa-facebook">Facebook</i></a>
              <a href="#"><i className="fab fa-twitter">Twitter</i></a>
              <a href="#"><i className="fab fa-instagram">Instagram</i></a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-gray-600 text-sm">
          © {new Date().getFullYear()} Mon Site Web. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
