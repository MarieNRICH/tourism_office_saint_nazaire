import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { BASE_URL } from "../../config/config";

const EditEvent = () => {
    const { event } = useParams()
    const navigate = useNavigate();

    const handleChange = (event) => {
        setPlaceId(event.target.value);
    }

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [dateEvent, setDateEvent] = useState("");
    const [status, setStatus] = useState("");
    const [places, setPlaces] = useState([]);
    const [place_id, setPlaceId] = useState("");
    const [photoPlace, setPhotoPlace] = useState("");
    const [validationError, setValidationError] = useState({});

    useEffect(() => {
        getEvent()
        getPlaces()
    }, [])

    // GET - Retrieve the values from the record using the API.
    const getEvent = async () => {
        await axios
            .get(`${BASE_URL}/Events/${event}`)
            .then(res => {
                setTitle(res.data.title)
                setDetail(res.data.detail)
                setDateEvent(res.data.dateEvent)
                setStatus(res.data.status)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Function to retrieve places
    const getPlaces = async () => {
        await axios.get(`${BASE_URL}/Places`).then(res => {
            setPlaces(res.data)
        })
    }

    const changeHandler = (event) => {
        setPhotoPlace(event.target.files[0]);
    }

    const updateEvent = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('_method', 'PATCH');
        formData.append("title", title);
        formData.append("detail", detail);
        formData.append("dateEvent", dateEvent);
        formData.append("status", status);
        formData.append("place_id", place_id);
        if (photoPlace !== null) {
            formData.append("photoPlace", photoPlace)
        }
        await axios
            .post(`${BASE_URL}/Events/${event}`, formData)
            .then((res) => {
                navigate("/events")
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
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Modifier un évènement</h4>
                                <hr />
                                <div className="form-wrapper">
                                    {Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
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
                                    <Form onSubmit={updateEvent}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="Title">
                                                    <Form.Label>Nom de l'évènement</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={title}
                                                        onChange={(event) => {
                                                            setTitle(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="detail">
                                                    <Form.Label>Détail</Form.Label>
                                                    <Form.Control
                                                        as="textarea" rows={3}
                                                        type="text"
                                                        value={detail}
                                                        onChange={(event) => {
                                                            setDetail(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="dateEvent">
                                                    <Form.Label>Date de l'évènement</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={dateEvent}
                                                        onChange={(event) => {
                                                            setDateEvent(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="status">
                                                    <Form.Label>Statut</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={status}
                                                        onChange={(event) => {
                                                            setStatus(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="place">
                                                    <Form.Label>Lieu</Form.Label>
                                                    <Form.Select aria-label="Default select example"
                                                        onChange={handleChange}>
                                                        <option>Choisissez un lieu</option>
                                                        {places.map(place => (
                                                            <option
                                                                key={place.id}
                                                                value={place.id}>
                                                                {place.namePlace}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
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
                                        <Button
                                            variant="primary"
                                            className="mt-2"
                                            size="lg"
                                            block="block"
                                            type="submit"
                                        >
                                            Mise à jour
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

export default EditEvent;