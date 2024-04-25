// src/contracts/UserContract.js

import web3 from '../ethereum';
import UserContractData from '/Users/teja/Desktop/new_project/iot-data-marketplace/src/build/contracts/UserContract.json'; 

const getUserContractInstance = (networkId = '5777') => {
    const deployedNetwork = UserContractData.networks[networkId];
    return new web3.eth.Contract(
        UserContractData.abi,
        deployedNetwork && deployedNetwork.address,
    );
};

export default getUserContractInstance;
