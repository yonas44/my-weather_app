import { Route, Routes } from 'react-router';
import AllCountries from './components/AllCountries';
import DetailPage from './components/DetailPage';
import Header from './components/header';
import Notfound from './components/Notfound';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route element={<AllCountries />} exact path="/" />
        <Route element={<DetailPage />} path="/country" />
        <Route element={<Notfound />} exact path="*" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
