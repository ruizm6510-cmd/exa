import { Outlet } from 'react-router-dom';

import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Layout() {
  return (
    <div className="app">
      <Header />
      <Navbar />

      {/* Contenido que cambia según la URL */}
      <main className="contenido">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;