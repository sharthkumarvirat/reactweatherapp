import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Favorites({ setSearch }) {
    const [favorites, setFavorites] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const [favCity, setFavCity] = useState('');
    const [editId, setEditId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/favorites')
            .then((res) => {
                setFavorites(res.data);
                setIsPending(false);
                console.log(res);
            })
            .catch((err) => {
                setIsPending(true);
                console.log(err.message);
            });
    }, [isPending]);

    const handleEdit = (id, city) => {
        setOpenForm(true);
        setFavCity(city);
        setEditId(id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:3000/favorites/${editId}`, { city: favCity })
            .then((res) => {
                console.log(res);
                setIsPending(true);
                setOpenForm(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/favorites/${id}`)
            .then((res) => {
                console.log(res);
                setIsPending(true);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const setTheCity = (city) => {
        setSearch(city);
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500'>
            <div className='w-full px-4 py-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'>
                <div className='flex flex-col items-center gap-4'>
                    {favorites.map((fav) => (
                        <div key={fav.id} className='bg-[#13131333] p-6 rounded-xl grid gap-2 text-white cursor-pointer'>
                            <div onClick={() => setTheCity(fav.city)}>
                                <p>{fav.city}</p>
                            </div>
                            <div className='flex gap-2'>
                                <button type='button' className='bg-yellow-500 p-2 rounded-md' onClick={() => handleEdit(fav.id, fav.city)}>Edit</button>
                                <button type='button' className='bg-red-500 p-2 rounded-md' onClick={() => handleDelete(fav.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                    <Link to='/'>
                        <button type='button' className='border-2 text-white bg-blue-500 p-2 rounded-lg'>Go to Home</button>
                    </Link>
                </div>
                {openForm && (
                    <div className='p-4 mt-4 bg-white rounded-lg shadow-lg'>
                        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
                            <input className='flex-1 py-2 px-4 rounded-lg' type='text' value={favCity} onChange={(e) => setFavCity(e.target.value)} />
                            <button className='bg-green-400 p-2 rounded-lg text-white'>Update</button>
                            <button className='bg-red-400 p-2 rounded-lg text-white' onClick={() => setOpenForm(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
            {isPending && (
                <div className='absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75'>
                    <h2 className='text-white text-xl'>Loading...</h2>
                </div>
            )}
        </div>
    );
}
