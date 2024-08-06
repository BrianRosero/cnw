import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Auth() {
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get('http://192.168.200.155:8080/generate')
      .then(response => {
        setQrCode(response.data.qr_code);
      });
  }, []);

  const handleVerify = () => {
    axios.post('http://192.168.200.155:8080/verify', { token })
      .then(response => {
        if (response.data.verified) {
          setIsAuthenticated(true);
        } else {
          alert('Invalid token, please try again');
        }
      });
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>Scan the QR Code with Google Authenticator</h2>
          <img src={qrCode} alt="QR Code" />
          <br />
          <input
            type="text"
            placeholder="Enter the token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={handleVerify}>Verify</button>
        </div>
      ) : (
        <div>
          <h2>Action Button</h2>
          <button onClick={() => alert('Action executed!')}>Execute Action</button>
        </div>
      )}
    </div>
  );
}

export default Auth;
