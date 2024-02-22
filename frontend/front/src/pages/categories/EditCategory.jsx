import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { BASE_URL } from "../../config/config";

const EditCategory = () => {
    const { category } = useParams()
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [validationError, setValidationError] = useState({});

    useEffect(() => {
        getCategory()
    }, [])

    // GET - Retrieve the values from the record using the API.
    const getCategory = async () => {
        await axios
            .get(`${BASE_URL}/Categories/${category}`)
            .then(res => {
                setName(res.data.name)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // const changeHandler = (event) => { }

    const updateCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('_method', 'PATCH');
        formData.append("name", name);

        await axios
            .post(`${BASE_URL}/Categories/${category}`, formData)
            .then(navigate("/categories"))
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
                                <h4 className="card-title">Modifier une categorie</h4>
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
                                    <Form onSubmit={updateCategory}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="Name">
                                                    <Form.Label>Nom de la Catégorie</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={name}
                                                        onChange={(event) => {
                                                            setName(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        {/* <Row>
                                            <Col>
                                                <Form.Group controlId="Logo" className="mb-3">
                                                    <Form.Label>Logo</Form.Label>
                                                    <Form.Control type="file" onChange={changeHandler} />
                                                </Form.Group>
                                            </Col>
                                        </Row> */}
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

export default EditCategory;