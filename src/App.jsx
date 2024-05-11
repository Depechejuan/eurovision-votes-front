import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import NameForm from './forms/NameForm';
import Vote from './pages/Vote';
import Dashboard from './pages/Dashboard';

const host = import.meta.env.VITE_API_HOST;

function App() {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
console.log("miaumiau");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}/check`);
                const data = await response.json();
                console.log(data);
                if (data.success == true) {
                    console.log("ok")
                } else {
                    console.log("F");
                }
                setSuccess(data.success);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <progress />;
    }

    return (
        <Router>
            <h1>Euovisión MiauMiau</h1>
            <Routes>
                <Route
                    path="/"
                    element={success ? <NameForm /> : <progress />}
                />
                <Route path="/vote" element={<Vote />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
