import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
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
