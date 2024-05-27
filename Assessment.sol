// SPDX-License-Identifier: GPL-3.0 pragma solidity 0.8.13;

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
