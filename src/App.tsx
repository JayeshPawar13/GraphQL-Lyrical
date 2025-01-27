import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/create" element={<SongCreate />} />
        <Route path="/view/:id" element={<SongDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
