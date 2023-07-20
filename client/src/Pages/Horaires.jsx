import { useContext, useEffect, useState } from "react";
import { proxy } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";

export default function Horaires() {
    const [horaires, setHoraires] = useState([]);
    const [isAdminCheck, setisAdminCheck] = useState(false)

    const { currentUser, isAdmin } = useContext(AuthContext);


    useEffect(() => {
        const fetchData = async () => {
            const employe = await isAdmin();
            setisAdminCheck(true);
            try {
                const res = await axios.get(`${proxy}/horaires`);
                setHoraires(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [currentUser]);

    const handleApprouve = async (id) => {
        try {
            const res = await axios.put(`${proxy}/revues/${id}`);
        } catch (err) {
            console.log(err);
        }
    }

    return <>
        <section className="horaires">
            {isAdminCheck && horaires.map((item) => {
                console.log(item)
                return <>
                    <div className="flex flex-row flex-wrap gap-5 w-full  justify-center" key={item.id}>
                        <h1 className="uppercase font-semibold">
                            {item.jour_semaine} :
                        </h1>
                        {
                            item.heure_ouverture && <div> 

                                <p className="flex flex-row flex-wrap gap-5 w-full  justify-center">
                                    {
                                        item.heure_ouverture
                                    } - 
                                    
                                    {
                                        item.heure_fermeture
                                    }
                                </p>

                            </div>
                        }
                </div >
                </>
            })
            }
    </section >
    </>
}