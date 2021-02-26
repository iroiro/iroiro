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

### Rinkeby 

- tIRO(Test Token): 0xb0da4177f4a4d79a9611e69071e67e3367930339
- UUIDDistributor: 0x8b5abD70339787DF920C982a46fF6066EB13Ab68
- WalletDistributor: 0xa79c1B3e529c34bA3B7373d95119B16b0714E155
