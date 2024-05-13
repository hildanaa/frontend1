import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./screens/Dashboard";
import CourseScreen from "./screens/CourseScreen";


function App() {
    return ( 
    <>
        <div>
            <ToastContainer />
            <BrowserRouter > 
               <Header />
                <Routes >
                    <Route path="/" element = { < HomeScreen /> }/>
                    <Route path="/register" element = { < RegisterScreen /> }/>
                    <Route path="/login" element = { < LoginScreen /> }/>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/courses/:id" element={<CourseScreen />} />
                </Routes > 
                <Footer />
            </BrowserRouter>
        </div > 
    </>
    )
}

export default App
