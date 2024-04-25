// src/contracts/DeviceContract.js

import web3 from '../ethereum';
import DeviceContractData from '/Users/teja/Desktop/new_project/iot-data-marketplace/src/build/contracts/DeviceContract.json';

const getDeviceContractInstance = (networkId = '5777') => {
    const deployedNetwork = DeviceContractData.networks[networkId];
    return new web3.eth.Contract(
        DeviceContractData.abi,
        deployedNetwork && deployedNetwork.address,
    );
};

export default getDeviceContractInstance;
