## How to deploy contract on local

(We assume using `oz` command)

1. Start Ganache
1. Deploy Vesting contract and StakingPool contract
1. Deploy TokenFacoty contract with deployed contracts address
1. To contracts works properly, you have to transfer ownership of Vesting and StakingPool contract to TokenFactory contract
So send a transaction with `transferOwnership()` function

