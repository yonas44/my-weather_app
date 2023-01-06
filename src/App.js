import { Route, Routes } from 'react-router';
import AllCountries from './components/AllCountries';
import DetailPage from './components/DetailPage';
import Header from './components/header';
import Continents from './components/Continents';
import Notfound from './components/Notfound';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route element={<Continents />} path="/" />
        <Route element={<AllCountries />} exact path="/all-countries" />
        <Route element={<DetailPage />} path="/country" />
        <Route element={<Notfound />} exact path="*" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
