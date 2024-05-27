## Smart Contract Management - ETH + AVAX
A basic contract containing 2-3 functions that display their output values in the application's front end.
## Description
This basic contract will include 2-3 functions that demonstrate their outputs on the application's front end. These functions might include depositing funds, viewing the account balance, and withdrawing money. The front end will display the current balance, allow users to make deposits, and update the balance accordingly.
## Features
* Authenticate users and sign transactions using the MetaMask wallet.
* Facilitate transactions like deposits and withdrawals directly from the MetaMask wallet.
* Offer a personalized experience by fetching user account details from MetaMask.
* Support upgradability to modify the contract logic without affecting existing functionality.
## How I excute the program
1. Open VS Code and create a new file for contract.
2. Use the template provided by Meta Crafters (Chris).
3. Open the terminal and follow the instructions from readme.md.
4. After completing the terminal setup and coding, navigate to localhost:3000.
5. Connect your wallet to MetaMask, creating an account and network first.
6. Once connected, you can deposit and withdraw funds.
## Note
Ensure that the balance updates when depositing and withdrawing. If you see the balance change, it means the transaction was successful.
## Smart Contract
// SPDX-License-Identifier: GPL-3.0 
pragma solidity 0.8.13;

contract Assessment {
    address payable public galera;
    uint256 public amount;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint initAmount) payable {
        galera = payable(msg.sender);
        amount = initAmount;
    }

    function getamount() public view returns(uint256){
        return amount;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = amount;

        require(msg.sender == galera, "You are not the owner of this account");

        amount += _amount;

        assert(amount == _previousBalance + _amount);

        emit Deposit(_amount);
    }
    
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == galera, "You are not the owner of this account");
        uint _previousBalance = amount;
        if (amount < _withdrawAmount) {
            revert InsufficientBalance({
                balance: amount,
                withdrawAmount: _withdrawAmount
            });
        }

        
        amount -= _withdrawAmount;

        assert(balance == (_previousBalance - _withdrawAmount)); 

        emit Withdraw(_withdrawAmount);
    }
}
## Template
Template used by Metacrafters Chris (https://github.com/MetacrafterChris/SCM-Starter.git)
## Authors
Aaron Gabrielle A. Galera email : 8214785@ntc.edu.ph
## License
Unlicensed.








