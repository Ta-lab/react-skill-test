import React, { useState } from 'react';

const UserInfo = ({ setUser }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    setUser(name);
  };

  return (
    <div>
      <h2>Enter Your Information</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UserInfo;
