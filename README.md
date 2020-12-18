![logo](https://github.com/TART-tokyo/iroiro/blob/develop/frontend/packages/react-app/public/iroiro_logo.svg)
  
# iroiro

This is a project build for ETHOnline Hackathon.

- [Project Description on ETHOnline](https://hack.ethglobal.co/showcase/iroiro-rec1kljmTWH9KjdDG)
- [Demo video](https://youtu.be/HyvpCEV-mc8)

## Description

iroiro is a decentralized creators support platform.

There two types of users: creators and fans.

Creators who want to earn funds or return own profit to their fans can create an own token to achieve it.

They can decide a basic token property such as token name, symbol, total supply, and additionally special property like token allocation and staking status.

Token allocation enable creator to choose how tokens are distributed between creator and fans.

When token created, tokens allocated for creators are locked on Vesting contract to prevent fraud like ICO.

And tokens allocated for fans are transferred to creators address currently (we want to distributes it without transferring to creator future).

If a creator is a musician utilizing Audius, they can easily distribute tokens to their followers within Audius.

On the other hands, fans can be distributed by creators or get on DEX to support creator.

They can use token for own purpose but this time we made a staking feature on this platform.

If user want more creator token they can stake tokens on a platform, and user can mint a new token according to staked amount and time (we plant that user can get a original creator's NFT by staking a creator token as supporting creator and motivation).

Finally, project name "iroiro" means a diversity, various, or colorful in Japanese, we hope this application create "iroiro" tokens for creators and fans.

## How It's Made

Our DApp uses following technologies:

1. Ethereum and Solidity
Ethereum and Solidity is used for building fundamental application functionality. 
Technically our TokenFactory contract is a Factory to create a users own token.
But when we create a multiple token, token explorer page have to fetch all token information one by one.

2. The Graph
That's where The Graph comes in.  
The graph fetch an events which emmited when TokenFactory contracts create new token and that tokens transfer. And then frontend fetches most of token information using GraphQL provided by subgraph. 

So our DApp gets more efficiency with The Graph.

3. Audius, IPFS and Chainlink
When creator creates a new token, they may want to distribute tokens to their fans.
In this hackathon we achieve this with Audius and Chainlink.
Audius provides followers of creator(artist) and followers wallet address. 
DApp save followers address as withdrawable address which can withdraw a creator token. 
However, followers could be tons of people and saving all followers address on contract can take a lot of gas fees.

So we use IPFS to save that information as JSON.
After that when DApp user want to withdraw a creator token, he sends withdraw request transaction to contract, and then contract request a Chainlink to check a user's address is contained in that JSON file, finally Chainlink fulfill address existent status to contract.

## How to develop 

### Frontend 

1. To generate contract types, run `yarn` on `contracts/` dir. 
When command finished, `types/` dir is generated on a frontend src dir.
