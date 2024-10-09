import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from "./pages/Home";
import Post from "./pages/Post";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Router>
        <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/post" element={<Post />} />
            </Routes>
          </div>      
        <Footer />
      </Router>
    </>
  );
}

export default App;
