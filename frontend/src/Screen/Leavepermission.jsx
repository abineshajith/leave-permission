/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidenavbar from "./Sidenavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Table, Row, Col } from "react-bootstrap";

const LeavePermission = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [existingDates, setExistingDates] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/leavepermission/${userInfo.name}`
      );
      setLeaveData(response.data.data);
      const dates = response.data.data.map((leave) => leave.fromdate);
      setExistingDates(dates);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      fromDate === null ||
      toDate === null ||
      leaveType === "" ||
      reason.trim() === ""
    ) {
      alert("Please fill all the fields");
      return; // Prevent submission if any field is empty
    }
    if (fromDate > toDate) {
      alert("'From' date cannot be after 'To' date");
      return; // Prevent submission if 'from' date is after 'to' date
    }
    if (existingDates.includes(formatDate(fromDate))) {
      alert("Leave already applied for the selected date");
      return; // Prevent submission if 'from' date already exists
    }

    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    let totalDays = Math.round(Math.abs((toDate - fromDate) / oneDay)) + 1; // Calculate total days
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    // Exclude weekends (Saturday and Sunday)
    let excludedDays = 0;
    while (startDate <= endDate) {
      const dayOfWeek = startDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        excludedDays++; // Increment excluded days for weekends
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    totalDays -= excludedDays; // Subtract the excluded days from the total days
    setTotalDays(totalDays); // Update the totalDays state

    try {
      // Make the API call to submit the leave permission
      const response = await axios.post(
        "http://localhost:5000/api/user/leavepermission",
        {
          name: userInfo.name,
          fromdate: formatDate(fromDate),
          todate: formatDate(toDate),
          leavetype: leaveType,
          reason: reason,
          totalleave: totalDays, // Include the modified total days in the API request
        }
      );
      // Handle the response as desired (e.g., show success message, update UI)
      console.log(response.data);
      // Fetch updated leave data
      fetchLeaveData();
      // Reset form fields
      setFromDate(null);
      setToDate(null);
      setLeaveType("");
      setReason("");
      
      // Prepare the WhatsApp message
      const phoneNumber = "+919710087209";
      const currentDate = new Date().toLocaleDateString();
      const message = `Leave Details:\nEmployee Name: ${userInfo.name}\nApplying Date: ${currentDate}\nFrom: ${formatDate(fromDate)}\nTo: ${formatDate(toDate)}\nNumber of Leave Days: ${totalDays}\nReason: ${reason}`;
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp with the pre-filled message
      window.open(whatsappLink);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="leavepermission-container">
      <Row>
        <Col xs={2}>
          <Sidenavbar />
        </Col>
        <Col xs={10}>
          <div className="leavepermission-content">
            <h1 className="leavepermission-heading">Leave Status</h1>
            <div className="leavepermission-status">
              <h1>Leave status:</h1>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Leave Type</th>
                    <th>Reason</th>
                    <th>Total Days</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveData.map((leave) => (
                    <tr key={leave._id}>
                      <td>{leave.name.toUpperCase()}</td>
                      <td>{formatDate(leave.fromdate)}</td>
                      <td>{formatDate(leave.todate)}</td>
                      <td>{leave.leavetype}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.totalleave}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="leavepermission-request">
              <h2>Name: {userInfo.name.toUpperCase()}</h2>
              <h2>Leave Permission Request</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    From Date:
                  </Form.Label>
                  <Col sm={10}>
                    <DatePicker
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      dateFormat="dd-MM-yyyy"
                      minDate={new Date()}
                      excludeDates={existingDates.map((date) => new Date(date))}
                      placeholderText="Select a date"
                      className="form-control"
                      required
                    />
                  </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    To Date:
                  </Form.Label>
                  <Col sm={10}>
                    <DatePicker
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      dateFormat="dd-MM-yyyy"
                      minDate={fromDate || new Date()}
                      placeholderText="Select a date"
                      className="form-control"
                      required
                    />
                  </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row} controlId="leaveType">
                  <Form.Label column sm={2}>
                    Leave Type:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="select"
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      style={{ width: "200px" }}
                      required
                    >
                      <option value="">Select Leave Type</option>
                      <option value="sickleave">Sick Leave</option>
                      <option value="maternityleave">Maternity Leave</option>
                      <option value="casualLeave">Casual Leave</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row} controlId="reason">
                  <Form.Label column sm={2}>
                    Reason:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
                <br />

                <Button
                  type="submit"
                  disabled={existingDates.includes(formatDate(fromDate))}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LeavePermission;