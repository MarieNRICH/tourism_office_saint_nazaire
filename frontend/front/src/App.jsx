import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from './pages/categories/Categories';
import AddCategory from './pages/categories/AddCategory';
import EditCategory from './pages/categories/EditCategory';
import Events from './pages/events/Events';
import AddEvent from './pages/events/AddEvent';
import EditEvent from './pages/events/EditEvent';
import AddPlace from './pages/places/AddPlace';
import EditPlace from './pages/places/EditPlace';
import Places from './pages/places/Places';

import Home from './pages/home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/add" element={<AddCategory />} />
        <Route path="/categories/edit/:category" element={<EditCategory />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/add" element={<AddEvent />} />
        <Route path="/events/edit/:event" element={<EditEvent />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/add" element={<AddPlace />} />
        <Route path="/places/edit/:place" element={<EditPlace />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
