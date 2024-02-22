import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../../config/config';

import Events from '../../pages/events/Events';



function EventCard({ event }) {
    
    return (

        <Card style={{ width: "100%" }} className='my-2' >
            <Card.Img variant="top" src={`${BASE_URL}/${event.image}`} alt="Event Image" />
            
                <Card.Body>
                    <Card key={event.id}>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text>
                            {event.detail}
                        </Card.Text>
                        
                        <Link to={`/events/${event.id}`} className='btn btn-success me-2'>En savoir + </Link>
                    </Card>
                </Card.Body>
           
        </Card>
    );
}

export default EventCard;