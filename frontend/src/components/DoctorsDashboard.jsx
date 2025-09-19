import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const emailRecords = [
    'randomuser1@gmail.com',
    'quirkyname2@gmail.com',
    'testaccount3@gmail.com',
    'coolguy4@gmail.com',
    'randomname5@gmail.com',
    'usernumber6@gmail.com',
    'awesomeuser7@gmail.com',
    'dummyemail8@gmail.com',
    'fakeaccount9@gmail.com',
    'uniqueuser10@gmail.com',
  ];

  // Filter emails based on search term
  const filteredEmails = emailRecords.filter(email =>
    email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Doctor Dashboard</h2>
      <input
        type="text"
        placeholder="Search for a user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />

      <h4>User Email Records</h4>
      <ul className="list-group">
        {filteredEmails.length > 0 ? (
          filteredEmails.map((email, index) => (
            <li key={index} className="list-group-item">
              <Link to={`/user/${email}`} className="text-decoration-none">
                {email}
              </Link>
            </li>
          ))
        ) : (
          <li className="list-group-item">No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
