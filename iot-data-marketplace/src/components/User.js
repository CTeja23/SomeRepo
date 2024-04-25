import React, { useState, useEffect } from 'react';
import getUserContractInstance from '/Users/teja/Desktop/new_project/iot-data-marketplace/src/contracts/UserContract.js';
import web3 from '../ethereum';

const UserComponent = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [contract, setContract] = useState(null);

    const handleRegisterUser = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.registerUser(userId).send({ from: accounts[0] });
        alert('User registered!');
    };

    const handleFetchUser = async () => {
        const details = await contract.methods.getUserDetails(userId).call();
        setUser(details);
    };

    useEffect(() => {
        const init = async () => {
            const networkId = await web3.eth.net.getId();
            setContract(getUserContractInstance(networkId));
        };
        init();
    }, []);

    return (
        <div className="container mt-3">
            <h2>User Management</h2>
            <div className="form-group">
                <label>User ID:</label>
                <input type="text" className="form-control" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter user ID" />
            </div>
            <button className="btn btn-primary" onClick={handleRegisterUser}>Register User</button>
            <button className="btn btn-secondary" onClick={handleFetchUser}>Fetch User</button>
            {user && (
                <div className="mt-3">
                    <h4>User Details:</h4>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default UserComponent;
