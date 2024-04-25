

import web3 from '../ethereum';
import PaymentContractData from '/Users/teja/Desktop/new_project/iot-data-marketplace/src/build/contracts/PaymentContract.json'; 

const getPaymentContractInstance = (networkId = '5777') => {
    const deployedNetwork = PaymentContractData.networks[networkId];
    return new web3.eth.Contract(
        PaymentContractData.abi,
        deployedNetwork && deployedNetwork.address,
    );
};

export default getPaymentContractInstance;
