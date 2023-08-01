/* eslint-disable no-unused-vars */
import React from 'react';
import { FaHome, FaUser, FaCalendar, FaListAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import '../Screen/Sidenavbar.css';

const Sidenavbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

 

  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/">
            <FaHome /> Home
          </a>
        </li>
        <li>
          <a href="/profile">
            <FaUser /> Profile
          </a>
        </li>
        {userInfo && (
          <li>
            <a href="/leavestatus">
              <FaListAlt /> Leave Status
            </a>
          </li>
        )}
        <li>
          <a href="/calendar">
            <FaCalendar /> Calendar
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidenavbar;