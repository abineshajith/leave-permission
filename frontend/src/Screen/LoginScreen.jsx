/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import{useDispatch,useSelector} from 'react-redux'
import FormContainer from "../Components/FormContainer";
import { useLoginMutation } from "../slices/usersApislice";
import { setCredential } from "../slices/authSlice";
import {toast} from 'react-toastify';
import Loader from "../Components/Loader";
import Sidenavbar from "./Sidenavbar";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  const[login,{isLoading}]=useLoginMutation();

  const {userInfo}=useSelector((state)=>state.auth);

  useEffect(()=>{
    if(userInfo){
      navigate('/');
    }
  },[navigate,userInfo]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
    try{
      const res=await login({email,password}).unwrap();
      dispatch(setCredential({...res}))
      navigate('/')
    }catch(err){
      toast.error("invalid email or password");
    }
  };

  return (
   <div className="mt-5">
    <FormContainer>
       <Sidenavbar/>
      <h1>Sign in</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {isLoading && <Loader/>}
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
        <Row className="py-3">
          <Col>
            New customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
    </div>
  );
};

export default LoginScreen;