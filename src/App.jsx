import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DonationCampaigns from './Pages/DonationCampaigns/DonationCampaigns';
import DonationDetails from './DonationDetails';
import PetDetails from './Pages/PetDetails/PetDetails';
import PetListing from './Pages/PetListing/PetListing';

function App() {
  const user = { name: 'John Doe', email: 'john@example.com' };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PetListing} />
        <Route path="/PetDetails/:id" render={(props) => <PetDetails {...props} user={user} />} />
        <Route exact path="/" component={DonationCampaigns} />
        <Route exact path="/DonationDetails/:id" render={(props) => <DonationDetails {...props} user={user} />} />

      </Switch>
    </Router>
  );
};

export default App;
