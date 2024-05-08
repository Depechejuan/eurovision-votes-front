import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const host = import.meta.env.VITE_API_HOST;

function NameForm() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Guardar el valor del input en el LocalStorage con clave "User"
        localStorage.setItem('user_EU', name);

        try {
            // Enviar el contenido con una solicitud POST a {host}/user con el valor del input
            const response = await fetch(`${host}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });
            const data = await response.json();
            const token = data.data.token;
            localStorage.setItem('token_EU', token);
            if (response.ok) {
                console.log('Datos enviados correctamente');
                navigate("/vote")
            } else {
                console.error('Error al enviar datos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
            />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default NameForm;
