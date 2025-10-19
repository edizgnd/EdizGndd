import React from \"react\";
import \"./App.css\";
import { BrowserRouter, Routes, Route } from \"react-router-dom\";
import Navbar from \"./components/Navbar\";
import Hero from \"./components/Hero\";
import About from \"./components/About\";
import Skills from \"./components/Skills\";
import Portfolio from \"./components/Portfolio\";
import Experience from \"./components/Experience\";
import Testimonials from \"./components/Testimonials\";
import Contact from \"./components/Contact\";
import Footer from \"./components/Footer\";
import { Toaster } from \"./components/ui/toaster\";
import AdminLogin from \"./pages/AdminLogin\";
import AdminDashboard from \"./pages/AdminDashboard\";

const Home = () => {
  return (
    <div className=\"min-h-screen\">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className=\"App\">
      <BrowserRouter>
        <Routes>
          <Route path=\"/\" element={<Home />} />
          <Route path=\"/admin\" element={<AdminLogin />} />
          <Route path=\"/admin/dashboard\" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;