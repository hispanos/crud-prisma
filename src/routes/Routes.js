import React, { useContext, useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes, Route, Navigate, useLocation
} from "react-router-dom";

import '../utils/axiosConfig'

import Login from '../containers/login';
import Home from '../containers/home';

export const AuthContext = React.createContext();


const Router = () => {

    const [session, setSession] = useState(null);
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
      const dataSession = JSON.parse(sessionStorage.getItem('session'));
      if (dataSession) {
          setSession(dataSession);
      }
    }, [])
    

    return (
        <AuthContext.Provider value={{ session, setSession, showModal, setShowModal }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" >
                        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

const ProtectedRoute = ({ children }) => {
    let location = useLocation();
    const { session } = useContext(AuthContext);

    if (session != null) {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
}

export default Router
