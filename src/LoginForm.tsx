import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginResponse {
  token: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
  };
}

const loginUser = async (userData: { email: string; password: string }): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>('http://localhost:3001/test', userData);
  return data;
};

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation<LoginResponse, Error, { email: string; password: string }>(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token); // Save the token to localStorage or your preferred storage
      console.log("About to navigate");
      navigate('/home'); // Navigate to the home page upon successful login
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log In</button>
      {isError && <div>Error: {error?.message}</div>}
    </form>
  );
};