// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserContract {
    struct User {
        address userAddr;
        string username;
        string email;
        string fullName;
        bool isActive;
        uint256 registeredOn;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed userAddr, string username);
    event UserUpdated(address indexed userAddr, string username);
    event UserDeactivated(address indexed userAddr);

    function registerUser(
        address userAddr, 
        string memory username, 
        string memory email, 
        string memory fullName
    ) public {
        require(users[userAddr].userAddr == address(0), "User already registered");
        
        users[userAddr] = User({
            userAddr: userAddr,
            username: username,
            email: email,
            fullName: fullName,
            isActive: true,
            registeredOn: block.timestamp
        });
        
        emit UserRegistered(userAddr, username);
    }

    function updateUser(
        address userAddr, 
        string memory email, 
        string memory fullName
    ) public {
        require(users[userAddr].userAddr != address(0), "User not registered");
        require(users[userAddr].isActive, "User not active");
        
        users[userAddr].email = email;
        users[userAddr].fullName = fullName;
        
        emit UserUpdated(userAddr, users[userAddr].username);
    }

    function deactivateUser(address userAddr) public {
        require(users[userAddr].userAddr != address(0), "User not registered");
        
        users[userAddr].isActive = false;
        
        emit UserDeactivated(userAddr);
    }

    function isUserRegistered(address userAddr) public view returns (bool) {
        return users[userAddr].userAddr != address(0);
    }
}
