// import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate} from "react-router";
import Header from './components/Header/Header.jsx';
import Booking from './components/Booking/Booking.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* Will help to use our page as a single page */}
      <Header/>
      <Routes>
        {/* Place to fill when the code will be more advanced */}
        <Route path="/" element={<Booking/>}/>
      </Routes>
    </>
  )
}

export default App
