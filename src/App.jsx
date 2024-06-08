import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import DonationCampaigns from './Pages/DonationCampaigns/DonationCampaigns';
import DonationDetails from './DonationDetails';
import PetDetails from './Pages/PetDetails/PetDetails';
import PetListing from './Pages/PetListing/PetListing';
import { AuthProvider } from "./context/AuthProvider";
import 'tailwindcss/tailwind.css';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Dashboard from './Layout/Dashboard';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const user = { name: 'John Doe', email: 'john@example.com' };

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Routes>
            <Route exact path="/" component={PetListing} />
            <Route path="/PetDetails/:id" render={(props) => <PetDetails {...props} user={user} />} />
            <Route exact path="/" component={DonationCampaigns} />
            <Route exact path="/DonationDetails/:id" render={(props) => <DonationDetails {...props} user={user} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          </Routes>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
