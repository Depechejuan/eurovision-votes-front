import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import NameForm from './forms/NameForm';
import Vote from './pages/Vote';
import Dashboard from './pages/Dashboard';

function App() {

    return (
        <Router>
        <h1>Euovisión MiauMiau</h1>
            <Routes>
                <Route path="/" element={<NameForm />}></Route>
                <Route path="/vote" element={<Vote />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
        </Router>
    )
}

export default App
