import React, { useState } from 'react';

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

    const handlePaisSelect = (index, pais) => {
        const updatedPuntuaciones = [...puntuaciones];
        updatedPuntuaciones[index].pais = pais;
        setPuntuaciones(updatedPuntuaciones);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedPaises = puntuaciones.map((item) => item.pais);
        const uniquePaises = [...new Set(selectedPaises)]; // Elimina duplicados
        if (selectedPaises.length !== uniquePaises.length) {
            alert('Cada puntaje debe asignarse a un país diferente.');
        } else {

            console.log('Enviar datos al servidor:', puntuaciones);
        }
    };

    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <h2>Formulario de Puntuaciones</h2>
            {puntuaciones.map((puntuacion, index) => (
                <div key={puntuacion.puntos}>
                    <label>
                        {puntuacion.puntos} Puntos -{' '}
                        <select
                            value={puntuacion.pais}
                            onChange={(e) => handlePaisSelect(index, e.target.value)}
                        >
                            <option value="">Elegir país</option>
                            {paisesDisponibles.map((pais) => (
                                <option key={pais} value={pais} disabled={!paisesDisponibles.includes(pais)}>
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
