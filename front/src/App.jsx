// import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate} from "react-router";
import Header from './components/Header/Header.jsx';
import Booking from './components/Booking/Booking.jsx';
import Navbar from './components/NavBar/Navbar.jsx';
import Connexion from './pages/Connexion.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* Will help to use our page as a single page */}
      <Header/>
      <div className='page'>
          <Navbar/>
          
          <main className='contenu'>       
              <Routes>
                {/* Place to fill when the code will be more advanced */}
                <Route path="/" element={<Booking/>}/>
                <Route path="/connexion" element={<Connexion/>}/>
              </Routes>
          </main>
      </div>
    </>
  )
}

export default App
