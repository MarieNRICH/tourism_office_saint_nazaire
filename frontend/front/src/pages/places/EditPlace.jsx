import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { BASE_URL } from "../../config/config";

const EditPlace = () => {
    const { place } = useParams()
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCategoryId(event.target.value);
    }

    const [namePlace, setNamePlace] = useState("");
    const [longitudeLatitude, setLongitudeLatitude] = useState("");
    const [photoPlace, setPhotoPlace] = useState("");
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState("");
    const [validationError, setValidationError] = useState({});

    useEffect(() => {
        getPlace()
        getCategories()
    }, [])

    // GET - Retrieve the values from the record using the API.
    const getPlace = async () => {
        await axios
            .get(`${BASE_URL}/Places/${place}`)
            .then(res => {
                setNamePlace(res.data.namePlace)
                setLongitudeLatitude(res.data.longitudeLatitude)
                setPhotoPlace(res.data.photoPlace)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Function to retrieve categories
    const getCategories = async () => {
        await axios.get(`${BASE_URL}/Categories`).then(res => {
            setCategories(res.data)
        })
    }

    const changeHandler = (event) => {
        setPhotoPlace(event.target.files[0]);
    }

    const updatePlace = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('_method', 'PATCH');
        formData.append("namePlace", namePlace);
        formData.append("longitudeLatitude", longitudeLatitude);
        formData.append("photoPlace", photoPlace);
        formData.append("category_id", category_id);
        await axios
            .post(`${BASE_URL}/Places/${place}`, formData)
            .then((res) => {
                navigate("/places")
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
                                <h4 className="card-place">Modifier un Lieu</h4>
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
                                    <Form onSubmit={updatePlace}>
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
                                                    <Form.Label>Longitude & Latitude</Form.Label>
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
                                                <Form.Group controlId="category">
                                                    <Form.Label>Catégorie</Form.Label>
                                                    <Form.Select aria-label="Default select example"
                                                        onChange={handleChange}>
                                                        <option>Choisissez un lieu</option>
                                                        {categories.map(category => (
                                                            <option
                                                                key={category.id}
                                                                value={category.id}>
                                                                {category.name}
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

export default EditPlace;