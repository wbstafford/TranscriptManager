import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import Transcript from "./Transcript";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/transcript/:email" element={<Transcript />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
