## Naming convention of Distributor/Campaign

Since each Distributor/Campaign contract can be used for multiple platforms, an abstract name has been adopted.
The naming convention of the contract is as follows: 

- Recipients type: `Wallet`, `Email`, `UserId`, etc.
- Changeable claim target: `CCT` or none
- Distribution type: none(single campaign) or `Continuous`.

### Examples

- `EmailCampaign`: Single campaign for distributing email addresses.
- `UserIdCampaign`: Continuous distribution campaign for user IDs.
- `CCTWalletCampaign`: Single campaign for sending a Wallet address that can be changed to send claims.

## How to deploy contract on local

(We assume using `oz` command)

1. Start Ganache
1. Deploy Vesting contract and StakingPool contract
1. Deploy TokenFacoty contract with deployed contracts address
1. To contracts works properly, you have to transfer ownership of Vesting and StakingPool contract to TokenFactory contract
   So send a transaction with `transferOwnership()` function
