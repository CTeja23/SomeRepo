import React, { useState, useEffect } from 'react';
import getDeviceContractInstance from '/Users/teja/Desktop/new_project/iot-data-marketplace/src/contracts/DeviceContract.js';
import web3 from '../ethereum';

const DeviceComponent = () => {
    const [deviceId, setDeviceId] = useState('');
    const [device, setDevice] = useState(null);
    const [contract, setContract] = useState(null);

    const handleRegisterDevice = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.registerDevice(deviceId).send({ from: accounts[0] });
        alert('Device registered!');
    };

    const handleFetchDevice = async () => {
        const details = await contract.methods.getDeviceDetails(deviceId).call();
        setDevice(details);
    };

    useEffect(() => {
        const init = async () => {
            const networkId = await web3.eth.net.getId();
            setContract(getDeviceContractInstance(networkId));
        };
        init();
    }, []);

    return (
        <div className="container mt-3">
            <h2>Device Management</h2>
            <div className="form-group">
                <label>Device ID:</label>
                <input type="text" className="form-control" value={deviceId} onChange={e => setDeviceId(e.target.value)} placeholder="Enter device ID" />
            </div>
            <button className="btn btn-primary" onClick={handleRegisterDevice}>Register Device</button>
            <button className="btn btn-secondary" onClick={handleFetchDevice}>Fetch Device</button>
            {device && (
                <div className="mt-3">
                    <h4>Device Details:</h4>
                    <pre>{JSON.stringify(device, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default DeviceComponent;
