
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from "./components/Navbar/Navbar";
import ItemDetail from './components/ItemDetail/ItemDetail';



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/categoria/:categoria" element={<ItemListContainer />} />
          <Route path="/detalle/:id" element={<ItemDetail />} />
          <Route path="*" element={<p> 404 Route not found </p>} />

        </Routes>

      </BrowserRouter>
    </>
  );
};

export default App;
