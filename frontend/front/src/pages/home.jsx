import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import Logo from '../components/Logo';
import Video from '../components/Video';
import { BASE_URL } from '../config/config';
// import EventCard from '../components/cards/EventCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import EventCard from '../components/cards/EventCard';

const Home = () => {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        displayPlaces();
    }, []);

    const displayPlaces = async () => {
        await axios.get(`${BASE_URL}/Places`).then((res) => {
            setPlaces(res.data);
            console.log(res.data);
        });
    };


    return (
        <React.Fragment>
            <div>
                <Logo />
                <Menu />
            </div>
            {/* <div>
                <Video />
            </div> */}
            <section>
                <h1>Toto</h1>
                {places.map((place) => {
                    <div xs={12} sm={6} md={3}>
                        <h1>Toto</h1>
                        <EventCard place_id={place.id} />
                    </div>
                }
                )}

            </section>
        </React.Fragment>
    )
}
export default Home;