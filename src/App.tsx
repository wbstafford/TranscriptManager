import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import AppRouter from './routes';
import APITest from './APITest';
import { LoginForm } from './LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';

const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
