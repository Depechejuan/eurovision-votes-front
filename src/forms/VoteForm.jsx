import { useState } from 'react';
import getToken from '../services/get-token';
import { useNavigate } from "react-router-dom"; 

const host = import.meta.env.VITE_API_HOST;

function VoteForm() {
    const [puntuaciones, setPuntuaciones] = useState([
        { puntos: 12, pais: '' },
        { puntos: 10, pais: '' },
        { puntos: 8, pais: '' },
        { puntos: 7, pais: '' },
        { puntos: 6, pais: '' },
        { puntos: 5, pais: '' },
        { puntos: 4, pais: '' },
        { puntos: 3, pais: '' },
        { puntos: 2, pais: '' },
        { puntos: 1, pais: '' },
    ]);
    const [paisesDisponibles, setPaisesDisponibles] = useState([
        'España',
        'Alemania',
        'Italia',
        'Francia',
        'Reino Unido',
        'Suecia',
        'Chipre',
        'Serbia',
        'Lituania',
        'Irlanda',
        'Ucrania',
        'Croacia',
        'Eslovenia',
        'Finlandia',
        'Portugal',
        'Luxemburgo'
    ]);
    const navigate = useNavigate();

    const handlePaisSelect = (index, pais) => {
        const updatedPuntuaciones = [...puntuaciones];
        updatedPuntuaciones[index].pais = pais;
        setPuntuaciones(updatedPuntuaciones);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedPaises = puntuaciones.map((item) => item.pais);
        const uniquePaises = [...new Set(selectedPaises)];
        if (selectedPaises.length !== uniquePaises.length) {
            alert('Cada puntaje debe asignarse a un país diferente.');
        } else {
            try {
                const token = getToken()
                console.log(token);
                const response = await fetch(`${host}/vote`, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `${token}`
                    },
                    body: JSON.stringify(puntuaciones)
                });
                if (response.ok) {
                    console.log('Datos enviados al servidor:', puntuaciones);
                    navigate("/dashboard")
                } else {
                    throw new Error('Error al enviar los datos al servidor.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    

    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <h2>Puntuaciones.</h2>
            <p>Inserta aquí tus votos y siéntete como el Jurado de Eurovisión.</p>
            <p>SPOILER: No lo eres.</p>
            {puntuaciones.map((puntuacion, index) => (
                <div className="form-puntuaciones" key={puntuacion.puntos}>
                    <label>
                        Los {puntuacion.puntos} Puntos - son para ... {' '}
                        <select
                            className="select-country"
                            value={puntuacion.pais}
                            onChange={(e) => handlePaisSelect(index, e.target.value)}
                        >
                            <option value="">Elegir país</option>
                            {paisesDisponibles.map((pais) => (
                                <option className="option" key={pais} value={pais} disabled={!paisesDisponibles.includes(pais)}>
                                    {pais}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            ))}
            <button type="submit">Enviar Puntuaciones</button>
        </form>
    );
}

export default VoteForm;
