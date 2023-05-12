import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home';
import UserEdit from './components/UserEdit';
import UserAdd from './components/UserAdd';

// import UserAdd from "./components/UserAdd";

function App() {
  
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/user" element={<Home/>} />
          <Route path="/edit/:id" element={<UserEdit />} />
          <Route path="/add" element={<UserAdd />} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
