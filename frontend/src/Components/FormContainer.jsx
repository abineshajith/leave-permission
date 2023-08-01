/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = (props) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={10} md={6} className='card p-5'>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;