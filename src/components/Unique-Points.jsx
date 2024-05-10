import { useState, useEffect } from 'react';
import getToken from '../services/get-token';

const host = import.meta.env.VITE_API_HOST;

function UniquePoints() {
    const [votes, setVotes] = useState([]);
    const token = getToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}/dashboard/user`, {
                    method: 'GET',
                    headers: {
                        "Authorization": token,
                        'Content-Type': "application/json"
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const responseData = await response.json();
                setVotes(responseData.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <section>
            <h2>Tus Votos</h2>
            <ul>
                {votes.map((vote, index) => (
                    <li key={index[0]}>
                        {vote.country}: {vote.points}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default UniquePoints;
