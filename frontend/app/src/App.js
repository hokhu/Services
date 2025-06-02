
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

// Páginas del juez virtual
import { Home } from "./pages/Home";
import { ProblemDetail } from "./pages/ProblemDetail";
import { Competition } from "./pages/Competition";
import { Profile } from "./pages/Profile";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";




function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="app-header-container">
            <nav>
              <a href="/">Inicio</a>
              <a href="/registro">Registro</a>
              <a href="/contacto">Contacto</a>
            </nav>
            <h1>Code executor</h1>
          </div>
        </header>

        <Navbar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problem/:id" element={<ProblemDetail />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/registro" element={<Register />} />

          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2025 Juez Virtual. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

