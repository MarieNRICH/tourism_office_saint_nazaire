import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/esm/Button';
import Menu from '../../components/Menu';
import axios from 'axios';
import { BASE_URL } from '../../config/config';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
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
            setPlaces(res.data);
        });
    };
    const deleteEvent = (id) => {
        axios.delete(`${BASE_URL}/Events/${id}`).then(displayEvents);
    };

    const getNamePlace = (placeId) => {
        const foundPlace = places.find((place) => place.id === placeId);
        return foundPlace ? foundPlace.namePlace : "error - place not found !";
    }
    return (
        <div>
            <Menu />
            <div className="container mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Image</th>
                            <th>Details</th>
                            <th>Date de l'évènement</th>
                            <th>Status</th>
                            <th>Lieu de l'évènement</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                <td>{event.image}</td>
                                <td>{event.detail}</td>
                                <td>{event.dateEvent}</td>
                                <td>{event.status}</td>
                                <td>{event.place.namePlace}</td>
                                <td>
                                    <img
                                        src={`${BASE_URL}/${places.photoPlace}`}
                                        width="75px"
                                    />
                                </td>
                                <Link to={`/events/edit/${event.id}`} className='btn btn-success me-2'>
                                    Edit
                                </Link>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deleteEvent(event.id);
                                        }}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
export default Events;