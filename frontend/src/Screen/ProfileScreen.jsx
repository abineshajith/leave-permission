import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Sidenavbar from "./Sidenavbar";
import '../Screen/ProfileScreen.css'

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Container fluid>
      <Row>
        <Col sm={2} md={2} lg={2}>
          <Sidenavbar />
        </Col>
        <Col sm={10} md={10} lg={10}>
          <div className="profile-content">
            <h1>Profile Details</h1>
            <div className="profile-details">
              <h2 style={{ color: "white" }}>Name: {userInfo.name}</h2>
              <h2 style={{ color: "yellowgreen" }}>Email: {userInfo.email}</h2>
              <h2 style={{ color: "yellowgreen" }}>Phone: {userInfo.phone}</h2>
              <h2 style={{ color: "yellowgreen" }}>Country: {userInfo.country}</h2>
              {/* Add other user details here */}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;