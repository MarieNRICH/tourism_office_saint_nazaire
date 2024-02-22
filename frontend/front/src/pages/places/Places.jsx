import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/esm/Button';
import Menu from '../../components/Menu';
import axios from 'axios';
import { BASE_URL } from '../../config/config';

const Places = () => {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        displayPlaces();
    }, []);

    const displayPlaces = async () => {
        await axios.get(`${BASE_URL}/Places`).then((res) => {
            setPlaces(res.data);
        });
    };

    const deletePlace = (id) => {
        axios.delete(`${BASE_URL}/Places/${id}`).then(displayPlaces);
    };

    return (
        <div>
            <Menu />
            <div className="container mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nom du Lieu</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {places.map((places) => (
                            <tr key={places.id}>
                                <td>{places.namePlace}</td>
                                <Link to={`/places/edit/${places.id}`} className='btn btn-success'>
                                    Edit
                                </Link>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deletePlace(places.id);
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
export default Places;