import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Favorites from './Components/Favorites'
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <BrowserRouter basename='/reactweatherapp'>
        <Routes>
          <Route exact path="/" element={<Home search={search} setSearch={setSearch} />} />
          <Route exact path="/fav" element={<Favorites setSearch={setSearch} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
