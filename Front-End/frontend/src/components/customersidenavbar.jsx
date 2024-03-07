// SideNavbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerSideNavbar = () => {



  return (
    <nav style={{
      backgroundColor: '#333',
      color: '#fff',
      width: '200px',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      overflowX: 'hidden',
      transition: 'width 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderBottom: '1px solid #555'
      }}>
        <h3> Admin Dashboard</h3>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '10px 20px', borderBottom: '1px solid #555' }}><Link style={{ textDecoration: 'none', color: '#fff', fontSize: '16px' }} to="/">Home</Link></li>
        <li style={{ padding: '10px 20px', borderBottom: '1px solid #555' }}><Link style={{ textDecoration: 'none', color: '#fff', fontSize: '16px' }} to="/orders">Orders</Link></li>
        <li style={{ padding: '10px 20px', borderBottom: '1px solid #555' }}><Link style={{ textDecoration: 'none', color: '#fff', fontSize: '16px' }} to="/customers">Customers</Link></li>
        <li style={{ padding: '10px 20px', borderBottom: '1px solid #555' }}><Link style={{ textDecoration: 'none', color: '#fff', fontSize: '16px' }} to="/staff">Staff</Link></li>
        <li style={{ padding: '10px 20px', borderBottom: '1px solid #555' }}><Link style={{ textDecoration: 'none', color: '#fff', fontSize: '16px' }} to="/payments">Payments</Link></li>
      </ul>
    </nav>
  );
};

export default CustomerSideNavbar;
