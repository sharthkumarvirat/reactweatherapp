import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(search) {

    const [apidata1, setApidata1] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    let api_key = '254fd3f4518eadaf1a26287b44021b87';

    useEffect(() => {
        if (search !== "") {
            fetchData();
        }
    }, []);

    const fetchData = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${api_key}&units=metric`)
            .then((res) => { console.log(res.data.list); setApidata1(res.data.list); setIsPending(false); setError(null) })
            .catch((err) => { console.log(err); setError(err); })
    }

    return [apidata1, isPending, error, fetchData];

}
