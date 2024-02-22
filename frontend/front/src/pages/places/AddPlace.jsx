import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";

import { BASE_URL } from "../../config/config"
import Places from "./Places";

const AddPlace = () => {
    const navigate = useNavigate();

    const [namePlace, setNamePlace] = useState("");
    const [longitudeLatitude, setLongitudeLatitude] = useState("");
    const [photoPlace, setPhotoPlace] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [validationError, setValidationError] = useState({});

    const [categories, setCategories] = useState([])

    const changeHandler = (event) => {
        setPhotoPlace(event.target.files[0]);
    }

    const handleChange = (event) => {
        setCategoryId(event.target.value);
    }

    useEffect(() => {
        getCategories()
    }, [])
    // Function to retrieve Category
    const getCategories = async () => {
        await axios.get(`${BASE_URL}/Categories`).then(res => {
            setCategories(res.data)
        })
    }
    // function to add Category
    const AddPlace = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("namePlace", namePlace);
        formData.append("longitudeLatitude", longitudeLatitude);
        formData.append("photoPlace", photoPlace);

        console.log(category_id)
        await axios
            .post(`${BASE_URL}/Places`, formData)
            .then((res) => {
                navigate('/places')
            })
            .catch(({ response }) => {
                if (response.status === 422) {
                    setValidationError(response.data.errors);
                }
            });
    };

    return (
        <div>
            <Menu />
            <div className="container-container-mt-5">
                <div className="row-justify-content-center">
                    <div className="col-12-col-sm-12-col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Nouveau Lieu</h4>
                                <hr />
                                <div className="form-wrapper">
                                    {Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert-atert-danger">
                                                    <ul className="mb-0">
                                                        {Object.entries(validationError).map(
                                                            ([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <Form onSubmit={AddPlace}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="namePlace">
                                                    <Form.Label>Nom du Lieu</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={namePlace}
                                                        onChange={(event) => {
                                                            setNamePlace(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="longitudeLatitude">
                                                    <Form.Label>Longitude / Latitude</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={longitudeLatitude}
                                                        onChange={(event) => {
                                                            setLongitudeLatitude(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="PhotoPlace" className="mb-3">
                                                    <Form.Label>Photo du Lieu</Form.Label>
                                                    <Form.Control type="file" onChange={changeHandler} />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Button variant="primary" className="mt-2" size="lg" block='block' type="submit">
                                            Créer un évènement
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlace;