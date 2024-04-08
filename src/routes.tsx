import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import HomePage from "./HomePage";


const AppRouter = () => {

    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
      </>
    );
}

export default AppRouter;