import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../../config/config';


function EventCard() {
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        // Fonction asynchrone pour effectuer la requête
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/Events`);
                setEventData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        };
        // Appel de la fonction pour récupérer les données
        fetchData();
    }, []); // Le tableau vide [] assure que cela ne se déclenchera qu'une seule fois lors du montage


    return (
        <Card style={{ width: "100%" }} className='my-2' >
            <Card.Img variant="top" src={eventData.imageSrc} alt="Event Image" />
            <Card.Body>
                <Card.Title>{eventData.title}</Card.Title>
                <Card.Text>
                    {eventData.detail}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default EventCard;