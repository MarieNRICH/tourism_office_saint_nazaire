import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/esm/Button';
import Menu from '../../components/Menu';
import axios from 'axios';
import { BASE_URL } from '../../config/config';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        displayCategories();
    }, []);

    const displayCategories = async () => {
        await axios.get(`${BASE_URL}/Categories`).then((res) => {
            setCategories(res.data);
        });
    };

    const deleteCategory = (id) => {
        axios.delete(`${BASE_URL}/Categories/${id}`).then(displayCategories);
    };

    return (
        <div>
            <Menu />
            <div className="container mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nom de la Catégorie</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <Link to={`/categories/edit/${category.id}`} className='btn btn-success'>
                                    Edit
                                </Link>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deleteCategory(category.id);
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
export default Categories;