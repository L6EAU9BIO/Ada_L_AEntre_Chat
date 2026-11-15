// import { useState } from 'react'
import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Header from "./components/Header/Header.jsx";
import Layout from "./components/Layout/Layout.jsx";
import RouteProtegee from "./components/RouteProtegee/RouteProtegee.jsx";
import Booking from "./components/Booking/Booking.jsx";
import Connexion from "./pages/Connexion.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route element={<RouteProtegee />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Booking />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
