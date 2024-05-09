import React, { useState, useEffect } from 'react';
import getToken from '../services/get-token';

const host = import.meta.env.VITE_API_HOST;

function TotalPoints() {
    const [totalPoints, setTotalPoints] = useState([]);
    const token = getToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}/dashboard/total`, {
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
                setTotalPoints(responseData.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <section>
            <h2>LOS RESULTADOS FINALES</h2>
            <ul>
                {totalPoints.map((result, index) => (
                    <li key={index}>
                        {result.country}: {result.puntos}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default TotalPoints;
