import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { proxy } from "../App.jsx";

export default function OurCars() {
  const [voitures, setVoitures] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    marque: "",
    modele: "",
    carburant: "",
    prix: "",
    annee: "",
  });

  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${proxy}/voitures`);
        setVoitures(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Filtrer les voitures en fonction des critères de recherche
  const filteredVoitures = voitures.filter((voiture) => {
    const marqueMatch =
      searchFilters.marque === "" ||
      voiture.marque.toLowerCase().includes(searchFilters.marque.toLowerCase());
    const modeleMatch =
      searchFilters.modele === "" ||
      voiture.modele.toLowerCase().includes(searchFilters.modele.toLowerCase());
    const carburantMatch =
      searchFilters.carburant === "" ||
      voiture.carburant.toLowerCase().includes(searchFilters.carburant.toLowerCase());
    const prixMatch =
      searchFilters.prix === "" || voiture.prix <= parseInt(searchFilters.prix);
    const anneeMatch =
      searchFilters.annee === "" || voiture.annee.toString().startsWith(searchFilters.annee);

    return marqueMatch && modeleMatch && carburantMatch && prixMatch && anneeMatch;
  });

      const handleSearch = () => {
    setFilteredVoitures(filteredVoitures);
  };
    
  return (
    <>
           
      <section className="home flex flex-row flex-wrap gap-5 w-full  justify-center pb-56">
         <div className="search-filters p-2 bg-gray-100 rounded-lg mb-7 w-10/12">
        <label className="block mb-2 font-bold text-center">Filtre</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Marque"
            value={searchFilters.marque}
            onChange={(e) => setSearchFilters({ ...searchFilters, marque: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Modèle"
            value={searchFilters.modele}
            onChange={(e) => setSearchFilters({ ...searchFilters, modele: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Carburant"
            value={searchFilters.carburant}
            onChange={(e) => setSearchFilters({ ...searchFilters, carburant: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Prix"
            value={searchFilters.prix}
            onChange={(e) => setSearchFilters({ ...searchFilters, prix: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Année"
            value={searchFilters.annee}
            onChange={(e) => setSearchFilters({ ...searchFilters, annee: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Km"
            value={searchFilters.km}
            onChange={(e) => setSearchFilters({ ...searchFilters, km: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 self-center flex "
        >
          Rechercher
        </button>
      </div>
        {filteredVoitures.map((voiture, i) => (
          <div
            className="max-w-sm overflow-hidden shadow-lg mb-3 rounded-xl cursor-pointer hover:-translate-y-4 ease-in duration-300"
            key={i}
            onClick={() => navigation(`/cars/${voiture.id}`)}
          >
            <img className="w-full h-2/4 object-cover" src={voiture.photo} alt={`${voiture}-${i}`} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                <Link className="link" to={`/voiture/${voiture.id}`}>
                  <h1>{voiture.nom}</h1>
                </Link>
              </div>
              <p className="text-gray-700 text-base">{voiture.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <ul className="flex flex-col gap-5 mb-5 w-20">
                <li className="flex gap-3">
                  Prix: <span>{voiture.prix}</span>
                </li>
                <li className="flex gap-3">
                  Année: <span>{voiture.annee}</span>
                </li>
                <li className="flex gap-3">
                  Km: <span>{voiture.km}</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
