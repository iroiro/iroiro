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

### Mainnet

- WalletDistributor: 0x689e325b55cead95c23cbd0e4b3a6d6ebfaf8fa7
- UUIDDistributor: 0xfa35371B5d5CC2a196358Bb9943e62E904478f86

### Rinkeby

- tIRO(Test Token): 0xb0da4177f4a4d79a9611e69071e67e3367930339
- WalletDistributor: 0xCb4F06081B7bD51d1203Acd66252179E10F4a638
- UUIDDistributor: 0xCe8Eac28F4264BC45Cc49BbD990533010414146e

### Kovan

- WalletDistributor: 0xE98dB5131B7fC7aB3BcEbb5093cd904308707E20
- WalletNFTDistributor: 0x931155Dd49192CdA6cA6Fcc72E44b470a02b81CB
- UUIDDistributor: 0x4DAFcf19A5DEF888e5D64A9577bcF883e3e9d405
- UUIDNFTDistributor: 0x9BaeDB90b0B938731b74B8ba9efFA9C8142B1d80 
