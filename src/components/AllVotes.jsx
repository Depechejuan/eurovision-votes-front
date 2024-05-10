import { useState, useEffect } from 'react';
import getToken from '../services/get-token';

const host = import.meta.env.VITE_API_HOST;

function AllVotes() {
    const [votesData, setVotesData] = useState([]);
    const token = getToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}/dashboard/all`, {
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
                
                // Ordenar los votos de cada usuario por puntos
                const sortedVotesData = responseData.data.map(user => ({
                    ...user,
                    votes: user.votes.sort((a, b) => b.puntos - a.puntos)
                }));
                
                setVotesData(sortedVotesData);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <section>
            <h2>Los votos de los usuarios</h2>
            {votesData.map((userData, index) => (
                <div key={index[0]}>
                    <h3>{userData.userName}</h3>
                    <ul>
                        {userData.votes.map((vote, voteIndex) => (
                            <li key={voteIndex[0]}>
                                {vote.country}: {vote.puntos}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
}

export default AllVotes;
