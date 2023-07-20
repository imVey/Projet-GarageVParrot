import { useContext, useEffect, useState } from "react";
import { proxy } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";
import AddRevue from "../Components/Revues/AddRevue.jsx";

export default function Revue() {
    const [revues, setRevues] = useState([]);
    const [isEmployed, setIsEmployed] = useState(false)
    const [isEmployeChecked, setIsEmployeChecked] = useState(false)
    const [notification, setNotification] = useState(null)

    const { currentUser, isEmploye } = useContext(AuthContext);


    useEffect(() => {
        const fetchData = async () => {
            const employe = await isEmploye();
            setIsEmployed(employe);
            setIsEmployeChecked(true);
            if (employe) {
                try {
                    const res = await axios.get(`${proxy}/revues/all`);
                    setRevues(res.data);
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    const res = await axios.get(`${proxy}/revues`);
                    setRevues(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchData();
    }, [currentUser, notification]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${proxy}/revues/${id}`);
            setNotification(res.data);
        } catch (err) {
            console.log(err);
        }

    }

    const handleApprouve = async (id) => {
        try {
            const res = await axios.put(`${proxy}/revues/${id}`);
            setNotification(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return <>
        <section className="revues">
            <AddRevue />
            {notification && <span>{notification}</span>}
            {isEmployeChecked && revues.map((item) => {
                return <>
                    
<a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={item.id}>

    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">                                                 {item.commentaire}
                        </h5>
                                             <h1 className="text-xl font-bold">
                            {item.nom}
                        </h1>
    
    <p class="font-normal text-gray-700 dark:text-gray-400">                            {item.note}
</p>
</a>


                </>
            })
            }
        </section>
    </>
}