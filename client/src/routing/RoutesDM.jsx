import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';

export default function RoutesDM() {

    return(
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/About" element={<AboutPage />}/>
        </Routes>
    )

}