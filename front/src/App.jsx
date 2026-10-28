// import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate} from "react-router";
import Header from './components/Header/Header';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* Will help to use our page as a single page */}
      <Routes>
        {/* Place to fill when the code will be more advanced */}
        <Route path="/" element={<Header/>}/>
      </Routes>
    </>
  )
}

export default App
