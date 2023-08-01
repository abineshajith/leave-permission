/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidenavbar from "./Sidenavbar";
import "../Screen/Leavestatus.css";

const Leavestatus = () => {
  const [leaveData, setLeaveData] = useState([]);
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  return (
    <div className="leavestatus-container">
      <Sidenavbar />
      <div className="leavestatus-content">
        <h1 className="leavestatus-heading">Leave Status</h1>
        <table className="leavestatus-table">
          <thead>
            <tr className="leavestatus-headingcolumn">
              <th>name</th>
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
                <td>{leave.name}</td>
                <td>{formatDate(leave.fromdate)}</td>
                <td>{formatDate(leave.todate)}</td>
                <td>{leave.leavetype}</td>
                <td>{leave.reason}</td>
                <td>{leave.totalleave}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leavestatus;