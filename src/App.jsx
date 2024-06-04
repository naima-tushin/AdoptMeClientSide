import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PetList from './PetList';
import PetDetails from './PetDetails';
import DonationCampaigns from './Pages/DonationCampaigns/DonationCampaigns';
import DonationDetails from './DonationDetails';

function App() {
  const user = { name: 'John Doe', email: 'john@example.com' };

  return (
    <Router>
            <Switch>
                <Route exact path="/" component={PetList} />
                <Route path="/PetDetails/:id" render={(props) => <PetDetails {...props} user={user} />} />
                <Route path="/DonationDetails">
                    <DonationDetails />
                </Route>
            </Switch>
            <DonationCampaigns></DonationCampaigns>
        </Router>
  );
};

export default App;
