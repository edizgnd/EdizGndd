import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🔐 Attempting login to:', `${BACKEND_URL}/api/admin/login`);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Login response:', response.data);
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        onLogin();
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      if (err.response?.status === 401) {
        setError('Geçersiz kullanıcı adı veya şifre');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Backend sunucusuna bağlanılamıyor. Lütfen backend URL\'ini kontrol edin.');
      } else {
        setError(`Hata: ${err.response?.data?.detail || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Girişi</h1>
        
        {/* Backend URL Display for debugging */}
        <div className="mb-4 p-3 bg-blue-50 rounded text-xs">
          <p className="text-gray-600">Backend URL:</p>
          <p className="font-mono text-blue-600 break-all">{BACKEND_URL}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Kullanıcı Adı</label>
            <Input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              className="w-full"
              data-testid="admin-username-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Şifre</label>
            <Input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              className="w-full"
              data-testid="admin-password-input"
            />
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
            data-testid="admin-login-button"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
        
        {/* Credentials hint for testing */}
        <div className="mt-6 p-3 bg-gray-100 rounded text-xs text-gray-600">
          <p className="font-semibold mb-1">Test Credentials:</p>
          <p>Username: edizgndd</p>
          <p>Password: 280620Gndd.</p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
