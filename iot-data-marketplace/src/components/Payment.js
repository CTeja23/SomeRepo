import React, { useState, useEffect } from 'react';
import getPaymentContractInstance from '/Users/teja/Desktop/new_project/iot-data-marketplace/src/contracts/PaymentContract.js';
import web3 from '../ethereum';

const PaymentComponent = () => {
    const [productId, setProductId] = useState('');
    const [amount, setAmount] = useState('');
    const [contract, setContract] = useState(null);

    const handleMakePayment = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.purchaseProduct(productId, web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
        alert('Payment made!');
    };

    useEffect(() => {
        const init = async () => {
            const networkId = await web3.eth.net.getId();
            setContract(getPaymentContractInstance(networkId));
        };
        init();
    }, []);

    return (
        <div className="container mt-3">
            <h2>Payment for Products</h2>
            <div className="form-group">
                <label>Product ID:</label>
                <input type="text" className="form-control" value={productId} onChange={e => setProductId(e.target.value)} placeholder="Enter product ID" />
            </div>
            <div className="form-group">
                <label>Amount in ETH:</label>
                <input type="text" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount to pay" />
            </div>
            <button className="btn btn-primary" onClick={handleMakePayment}>Make Payment</button>
        </div>
    );
};

export default PaymentComponent;
