import React from 'react';
import Sidenavbar from './Sidenavbar';
import Calendar from '../Screen/Calander';
import { Container, Row, Col } from 'react-bootstrap';
import Thingstodo from '../Screen/Thingstodo';
import Imageslider from '../Screen/ImageSlider';

const HomeScreen = () => {
  return (
    <Container fluid>
      <Row className="mt-5"> {/* Add margin top to the Row component */}
        <Col sm={2} md={2} lg={2}>
          <Sidenavbar />
        </Col>
        <Col sm={10} md={10} lg={10}>
          <Row>
            <Col sm={12} md={6} lg={4} className='mt-5'>
              <Thingstodo />
            </Col>
            <Col sm={12} md={6} lg={4} className='mt-5'>
              <Imageslider />
            </Col>
            <Col sm={12} md={12} lg={4} className="calendar-col mt-5">
              <Calendar />
            </Col>
          </Row>
          <Row>
            <Col sm={12}></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;