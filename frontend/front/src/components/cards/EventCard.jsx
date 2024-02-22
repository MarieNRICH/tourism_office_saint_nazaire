import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import Events from '../../pages/events/Events';



function EventCard({ props }) {
    const [events, setEvents] = useState({});
    const [eventPlaces, setEventPlaces] = useState({});
    const [photoPlace, setPhotoPlace] = useState({});
    const [places, setPlaces] = useState({});
    const place_id = props;


    useEffect(() => {
        console.log(place_id);
        displayEvents();
        displayPlaces();
    }, []);

    const displayEvents = async () => {
        await axios.get(`${BASE_URL}/Events`).then((res) => {
            setEvents(res.data);
        });
    };

    const displayPlaces = async () => {
        await axios.get(`${BASE_URL}/Places`).then((res) => {
            setEvents(res.data);
        });
    };


    return (

        <Card style={{ width: "100%" }} className='my-2' >
            <Card.Img variant="top" src={`${BASE_URL}/${places.photoPlace}`} alt="Event Image" />
            {events.map((event) => (
                <Card.Body>
                    <Card key={event.id}>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text>
                            {event.detail}
                        </Card.Text>
                        <Button variant="primary" onClick={() => {
                            displayEvents(event.id);
                        }}>Go somewhere</Button>
                    </Card>
                </Card.Body>
            ))}
        </Card>
    );
}

export default EventCard;