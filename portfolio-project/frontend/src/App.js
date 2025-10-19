import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
     
<Router>
  <Routes>
    ...
  </Routes>
</Router>

    </LanguageProvider>
  );
}

export default App;
