import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css'
import NameForm from './forms/NameForm';
import Vote from './pages/Vote';

function App() {

    return (
        <Router>
        <h1>Euovisión MiauMiau</h1>
            <Routes>
                <Route path="/" element={<NameForm />}></Route>
                <Route path="/vote" element={<Vote />}></Route>
            </Routes>
        </Router>
    )
}

export default App
