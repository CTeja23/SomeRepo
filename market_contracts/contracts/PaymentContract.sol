// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PaymentContract {
    address payable public owner;
    uint public marketplaceFeePercent = 5; // Marketplace fee as a percentage of total sales

    event PaymentReceived(address from, uint amount, string productId);
    event PaymentSplit(uint paymentToProvider, uint marketplaceFee, string productId);
    event SubscriptionPurchased(address subscriber, string productId, uint256 duration);

    constructor()  {
        owner = payable(msg.sender); // Set the marketplace owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Set the marketplace fee percentage
    function setMarketplaceFee(uint _newFeePercent) public onlyOwner {
        marketplaceFeePercent = _newFeePercent;
    }

    // Handle one-time product purchase payments
    function purchaseProduct(string memory productId, address payable provider) public payable {
        require(msg.value > 0, "Payment must be greater than zero");

        uint marketplaceFee = calculateMarketplaceFee(msg.value);
        uint paymentToProvider = msg.value - marketplaceFee;

        // Transfer funds to the provider
        provider.transfer(paymentToProvider);
        // Transfer marketplace fee to the owner
        owner.transfer(marketplaceFee);

        emit PaymentReceived(msg.sender, msg.value, productId);
        emit PaymentSplit(paymentToProvider, marketplaceFee, productId);
    }

    // Handle subscription purchase payments
    function purchaseSubscription(string memory productId, address payable provider, uint256 duration) public payable {
        require(msg.value > 0, "Payment must be greater than zero");
        require(duration > 0, "Subscription duration must be positive");

        uint marketplaceFee = calculateMarketplaceFee(msg.value);
        uint paymentToProvider = msg.value - marketplaceFee;

        // Transfer funds to the provider
        provider.transfer(paymentToProvider);
        // Transfer marketplace fee to the owner
        owner.transfer(marketplaceFee);

        emit SubscriptionPurchased(msg.sender, productId, duration);
        emit PaymentSplit(paymentToProvider, marketplaceFee, productId);
    }

    // Calculate the marketplace fee based on a payment amount
    function calculateMarketplaceFee(uint _amount) private view returns (uint) {
        return (_amount * marketplaceFeePercent) / 100;
    }
}
