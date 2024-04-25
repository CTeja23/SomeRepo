import React, { useState, useEffect } from 'react';
import DeviceComponent from './components/Device';
import UserComponent from './components/User';
import PaymentComponent from './components/Payment';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable(); // Request account access if needed
      } catch (error) {
        console.error("Access to your Ethereum account rejected.");
      }
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.error("No Ethereum account found. Please make sure MetaMask is connected.");
    } else {
      setAccount(accounts[0]); // Set the first account as the user's account
    }
  };

  return (
      <Router>
          <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <Link className="navbar-brand" to="/">IoT Data Marketplace</Link>
                  <div className="navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <Link className="nav-link" to="/device">Manage Devices</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/user">User Profiles</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/payment">Payments</Link>
                          </li>
                      </ul>
                  </div>
              </nav>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/device" element={<DeviceComponent account={account} />} />
                  <Route path="/user" element={<UserComponent account={account} />} />
                  <Route path="/payment" element={<PaymentComponent account={account} />} />
              </Routes>
          </div>
      </Router>
  );
};

const Home = () => (
  <div className="jumbotron">
      <div className="container text-center">
          <h1>Welcome to the IoT Data Marketplace</h1>
          <p>Your one-stop hub for managing IoT device interactions, user engagements, and secure transactions.</p>
          <hr className="my-4" />
          <p>Explore the marketplace, manage devices, users, and handle payments efficiently and securely.</p>
          <p className="lead">
              <Link className="btn btn-primary btn-lg" to="/device" role="button">Manage Devices</Link>
              <Link className="btn btn-secondary btn-lg ml-2" to="/user" role="button">Manage Users</Link>
              <Link className="btn btn-success btn-lg ml-2" to="/payment" role="button">Handle Payments</Link>
          </p>
      </div>
  </div>
);

export default App;
