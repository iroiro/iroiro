# Iroiro

## Overview

Iroiro is a management system for Social Tokens.

We think of Social Token as a way to visualize the relationship between the issuer and the holder of the token. And we define it as a kind of communication tool.

We are working on developing protocols that can leverage Social Token with the goal of expanding new possibilities for creators. We use the Ethereum blockchain to provide new options for creators to continue their sustainable creative work.

## Resource

- Interface: [app.iroiro.social](https://app.iroiro.social/)
- Interface Rinekby Test Nework: [rinkeby.iroiro.social](https://rinkeby.iroiro.social/)
- Twitter: [@IroiroTokens](https://twitter.com/IroiroTokens/)
- Discord: [Iroiro](https://discord.gg/fhmPyp7U8c)
- Blog: [Iroiro Social Token](https://medium.com/iroiro-social-token/)

## How to develop

### Contract 

1. Set environment variables on `contracts/`. 
1. Run `yarn && yarn compile` on `contracts/` dir to compile contracts. 
1. Run `ganache-cli` and `yarn migrate:dev` to deploy contracts locally.

### Frontend

1. To generate contract types, run `yarn` on `contracts/`.
   When command finished, `types/` is generated on a frontend src.
1. Create `.env` file from `.env.example` file on `frontend/packages/react-app/`, and set environment variables(Currently only `REACT_APP_RPC_URL` is necessary).
   See [subgraph config](https://github.com/iroiro/iroiro/tree/develop/subgraph/config) to check deployed contract addresses.
1. Run `yarn && yarn react-app:start` on `frontend/`, then frontend app starts. 

## Other

This project started with the [ETHOnline Hackathon](https://ethonline.org/). We respect and are grateful to this wonderful community.

- [Project Description on ETHOnline](https://hack.ethglobal.co/showcase/iroiro-rec1kljmTWH9KjdDG)
