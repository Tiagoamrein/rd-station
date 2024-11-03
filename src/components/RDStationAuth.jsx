import React, { useState, useEffect } from 'react';

const RDStationAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  
  const CLIENT_ID = 'seu_client_id';
  const REDIRECT_URI = 'http:///callback';
  
  const authUrl = `https://api.rd.services/auth/dialog?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = authUrl;
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch('https://api.rd.services/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: 'seu_client_secret',
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('rdAccessToken', data.access_token);
        localStorage.setItem('rdRefreshToken', data.refresh_token);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError('Erro ao autenticar com RD Station');
      console.error('Erro:', err);
    }
  };

  //incluir para adicionar o client-id e secret antes da autenticação

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Integração RD Station
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {!isAuthenticated ? (
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Conectar com RD Station
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-100 text-green-700 rounded-lg">
            Conectado com sucesso ao RD Station!
          </div>
        </div>
      )}
    </div>
  );
};

export default RDStationAuth;