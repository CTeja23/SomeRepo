// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeviceContract {
    struct Device {
        string deviceID;
        address ownerAddr;
        string manufacturer;
        string deviceType;
        string model;
        bool isActive;
        string statusDetails;
        uint256 lastUpdated;
    }

    mapping(address => Device) public devices;
    address[] public deviceList;

    event DeviceRegistered(address indexed addr, string deviceID);
    event DeviceUpdated(address indexed addr, string details);
    event DeviceDeactivated(address indexed addr);

    // Register a new device in the system
    function registerDevice(
        address addr, 
        string memory deviceID, 
        address ownerAddr, 
        string memory manufacturer, 
        string memory deviceType, 
        string memory model
    ) public {
        require(devices[addr].ownerAddr == address(0), "Device already registered");

        devices[addr] = Device({
            deviceID: deviceID,
            ownerAddr: ownerAddr,
            manufacturer: manufacturer,
            deviceType: deviceType,
            model: model,
            isActive: true,
            statusDetails: "Operational",
            lastUpdated: block.timestamp
        });

        deviceList.push(addr);
        emit DeviceRegistered(addr, deviceID);
    }

    // Update the status of an existing device
    function updateDeviceStatus(address addr, string memory statusDetails, bool isActive) public {
        require(devices[addr].ownerAddr != address(0), "Device not registered");

        devices[addr].statusDetails = statusDetails;
        devices[addr].isActive = isActive;
        devices[addr].lastUpdated = block.timestamp;

        emit DeviceUpdated(addr, statusDetails);
        if (!isActive) {
            emit DeviceDeactivated(addr);
        }
    }

    // Check if a device is registered
    function isDeviceRegistered(address addr) public view returns (bool) {
        return devices[addr].ownerAddr != address(0);
    }
}
