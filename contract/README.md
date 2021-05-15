## Naming convention of Distributor/Campaign

Since each Distributor/Campaign contract can be used for multiple platforms, an abstract name has been adopted.
The naming convention of the contract is as follows: 

- Recipients type: `Wallet`, `Email`, `UserId`, etc.
- Changeable claim target: `CCT` or none
- Distribution type: none(single campaign) or `Continuous`.

### Examples

- `EmailCampaign`: Single campaign for distributing email addresses.
- `UserIdCampaign`: Continuous distribution campaign for user IDs.

## Contract Addresses 

See: https://github.com/iroiro/iroiro/tree/develop/subgraph/config 

## Create Token with TokenFactory 

Run `npx hardhat help create-exclusive-token` for more detail. 

``` 
$ yarn create-exclusive-token --network [network] \
 --factory-address [factory address] \
 --creator-address [creator/your address] \
 --name [name] \
 --symbol [symbol] \
 --creator-fund-ratio [percentage with decimal 2 such as 500] \
 --donatee-ratio [percentage with decimal 2 such as 500] \
 --operation-ratio [percentage with decimal 2 such as 500] \
 --vesting-years [years with decimal 0 such as 3]
```
