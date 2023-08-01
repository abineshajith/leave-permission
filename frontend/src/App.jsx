// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from './Components/Header';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer/>
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;