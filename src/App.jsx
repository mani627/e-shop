import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes'; 
import ProtectedRoute from './components/ProtectedRoute'; 


const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;
const Dashboard = () => <div>Dashboard (Protected)</div>;
const Profile = () => <div>Profile (Protected)</div>;
const Login = () => <div>Login Page</div>;

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<ProtectedRoute element={route.component} authRequired={route.authRequired} />}
          />
        ))}
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  );
};

export default App;

