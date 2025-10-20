import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      console.log('Token found, redirecting to panel...');
      window.location.href = '/admin/panel';
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Backend URL:', BACKEND_URL);
      console.log('Attempting login to:', `${BACKEND_URL}/api/admin/login`);
      console.log('Credentials:', { username: credentials.username, password: '***' });
      
      const response = await axios.post(`${BACKEND_URL}/api/admin/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Login response received:', response.data);
      console.log('Response status:', response.status);
      
      if (response.data.success && response.data.token) {
        console.log('Login successful, saving token...');
        localStorage.setItem('adminToken', response.data.token);
        
        toast({ 
          title: 'Başarılı!', 
          description: 'Giriş yapıldı, yönlendiriliyorsunuz...' 
        });
        
        console.log('Redirecting to /admin/panel...');
        
        // Use window.location for guaranteed redirect
        setTimeout(() => {
          window.location.href = '/admin/panel';
        }, 1000);
        
      } else {
        console.error('Login failed - invalid response:', response.data);
        setError('Giriş başarısız oldu');
      }
    } catch (err) {
      console.error('Login error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      const errorMessage = err.response?.data?.detail || 'Kullanıcı adı veya şifre yanlış';
      setError(errorMessage);
      
      toast({ 
        title: 'Hata!', 
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Girişi</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Kullanıcı Adı</label>
            <Input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              className="w-full"
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
