import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import Logo from "../components/Logo";
import Video from "../components/Video";
import { BASE_URL } from "../config/config";
// import EventCard from '../components/cards/EventCard';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import EventCard from "../components/cards/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    displayEvents();
  }, []);

  const displayEvents = async () => {
    await axios.get(`${BASE_URL}/Events`).then((res) => {
      setEvents(res.data);
      setIsLoading(true);
    });
  };

  console.log(events);

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
        {isLoading
          ? events.map((event) => (
              <div key={event.id} xs={12} sm={6} md={3}>
                <h1>Toto</h1>

                 <EventCard event={event} />
              </div>
            ))
          : null}
      </section>
    </React.Fragment>
  );
};
export default Home;
