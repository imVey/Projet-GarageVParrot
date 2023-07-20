import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { proxy } from "../App.jsx";

export default function OurCars() {
    const [voitures, setVoitures] = useState([]);
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

    return <>
        <section className="home flex flex-row flex-wrap gap-5 w-full  justify-center ">
            {voitures.map((voiture, i) => (
                <div class="max-w-sm overflow-hidden shadow-lg mb-3 rounded-xl cursor-pointer hover:-translate-y-4 ease-in duration-300" key={i} onClick={() =>navigation(`/voiture/${voiture.id}`)}>
  <img class="w-full h-2/4 object-cover" src={voiture.photo} alt={`${voiture}-${i}`} />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">
                                                 <Link className="link" to={`/voiture/${voiture.id}`}>
                            <h1>{voiture.nom}</h1>
                        </Link>
    </div>
    <p class="text-gray-700 text-base">
     {voiture.description}
    </p>
  </div>
                    <div class="px-6 pt-4 pb-2">
                        <ul class="flex flex-col gap-5 mb-5 w-20">
                            <li className="flex gap-3">Prix: <span>{voiture.prix}</span></li>
                            <li className="flex gap-3">Année: <span>{voiture.annee}</span></li>
                            <li className="flex gap-3">Km: <span>{voiture.km}</span></li>

                            </ul>
  </div>
</div>
            ))}
        </section>
    </>
}
