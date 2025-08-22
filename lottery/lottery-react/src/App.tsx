import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Game, Home, Wrapper } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
