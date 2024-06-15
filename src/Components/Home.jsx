import { useState } from 'react';
import useFetch from '../CustomHook/useFetch'
import Left from './Left';
import Right from './Right';
//Icons
import _01d from '../assets/icons/01d.png';
import _01n from '../assets/icons/01n.png';
import _02d from '../assets/icons/02d.png';
import _02n from '../assets/icons/02n.png';
import _03d from '../assets/icons/03d.png';
import _03n from '../assets/icons/03n.png';
import _04d from '../assets/icons/04d.png';
import _04n from '../assets/icons/04n.png';
import _09d from '../assets/icons/09d.png';
import _10d from '../assets/icons/10d.png';
import _10n from '../assets/icons/10n.png';
import _11d from '../assets/icons/11d.png';
import _11n from '../assets/icons/11n.png';
import _13d from '../assets/icons/13d.png';
import _13n from '../assets/icons/13n.png';
import _50d from '../assets/icons/50d.png';
import _50n from '../assets/icons/50n.png';
import _unknown from '../assets/icons/unknown.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const iconMap = {
    "01d": _01d,
    "01n": _01n,
    "02d": _02d,
    "02n": _02n,
    "03d": _03d,
    "03n": _03n,
    "04d": _04d,
    "04n": _04n,
    "09d": _09d,
    "10d": _10d,
    "10n": _10n,
    "11d": _11d,
    "11n": _11n,
    "13d": _13d,
    "13n": _13n,
    "50d": _50d,
    "50n": _50n,
    "unknown": _unknown,
};

export default function Home({ search, setSearch }) {

    const [apidata1, isPending, error, fetchData] = useFetch(search);
    const [changeTemp, setChangeTemp] = useState(true);

    const notify = (msg) => toast.success(msg, "Toast");

    const addToFav = () => {
        axios.post("http://localhost:3000/favorites", { city: search })
            .then((res) => {
                notify("Added to favorites!")
                console.log("Res = ", res.data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    if (error) {
        return (
            <div>
                <div className='h-full w-full font-extrabold flex items-center justify-center text-white text-4xl'>
                    <h1>{error.message}</h1>
                </div>
                <div className='flex justify-center items-center w-full h-screen overflow-x-auto'>
                    <div className='max-sm:w-[90%] md:[60%] lg:w-[60%] border-2 p-6 border-gray-300 bg-transparent shadow-current'>
                        <div className='flex justify-center items-center mt-4 gap-4'>
                            <input type="text" className="p-2 border-2 rounded-md" onChange={(e) => { setSearch(e.target.value) }} />
                            <button type="button" className='border-2 bg-yellow-500 p-2 rounded-lg' onClick={fetchData}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='flex justify-center items-center w-full min-h-screen overflow-x-auto'>
                <div className='max-w-screen-sm w-full min-w-[90%] md:min-w-[60%] lg:min-w-[70%] border-2 border-gray-400 bg-transparent shadow-current mt-10 text-xs'>
                    <div className='flex flex-col md:flex-row justify-center items-center mt-4 gap-2'>
                        <input type="text" className="py-2 px-4 bg-slate-400 text-white rounded-md mb-2 md:mb-0" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                        <button type="button" className='bg-yellow-500 text-white p-2 rounded-lg mb-2 md:mb-0' onClick={fetchData}>Search</button>
                        <button type="button" className='bg-green-500 text-white p-2 rounded-lg mb-2 md:mb-0' onClick={addToFav}>Add to Favorites</button>
                        <Link to='/fav'>
                            <button type="button" className='bg-blue-500 text-white p-2 rounded-lg'>Go to Favorites</button>
                        </Link>
                        <label className="inline-flex items-center me-5 cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" onClick={()=>setChangeTemp(!changeTemp)} />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                                {
                                    changeTemp ?
                                    <span className="ms-3 text-sm font-medium text-white dark:text-gray-300"> <sup>o</sup> C</span>
                                    :
                                    <span className="ms-3 text-sm font-medium text-white dark:text-gray-300"> F</span>
                                }
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row justify-evenly items-center gap-2 p-4 text-cyan-50'>
                        {!isPending && <Left data={apidata1} changeTemp={changeTemp} search={search} iconMap={iconMap} />}
                        {!isPending && <Right data={apidata1} iconMap={iconMap} changeTemp={changeTemp} />}
                    </div>
                </div>
                <ToastContainer/>
            </div>
        )
    }

}
