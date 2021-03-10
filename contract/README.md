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

To be deployed soon...

### Rinkeby

- tIRO(Test Token): 0xb0da4177f4a4d79a9611e69071e67e3367930339
- UUIDDistributor: 0xEE88b9d4378E5f506568a446d8Bff575FB3E233c
- WalletDistributor: 0x26e2eAc7977046Fe92735263A51b44F68b6fb379

### Kovan

- UUIDDistributor: 0x2bc33Da1A1866d92a2f045E4Ed63921802061C34
- WalletDistributor: 0x85399fD7FDC409710aB5F1d6aff8A5CF1B68AA21
