const DeviceContract = artifacts.require("DeviceContract");
const UserContract = artifacts.require("UserContract");
const PaymentContract = artifacts.require("PaymentContract");

module.exports = function(deployer) {
    deployer.then(async () => {
        await deployer.deploy(DeviceContract);
        console.log('DeviceContract deployed at:', DeviceContract.address);

        await deployer.deploy(UserContract);
        console.log('UserContract deployed at:', UserContract.address);

        await deployer.deploy(PaymentContract);
        console.log('PaymentContract deployed at:', PaymentContract.address);
    });
};
