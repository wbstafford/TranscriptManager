import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import AppRouter from "./AppRoutes";
import APITest from "./APITest";
import { LoginForm } from "./LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      {/* <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </BrowserRouter> */}
    </QueryClientProvider>
  );
}

export default App;
