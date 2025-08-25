import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Game, Home, Wrapper } from "./pages";
import { Web3Provider } from "./utils/Web3Context";
import { LotteryProvider } from "./utils/LotteryContext";

function App() {
  return (
    <Web3Provider>
      <LotteryProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Wrapper />}>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LotteryProvider>
    </Web3Provider>
  );
}

export default App;
