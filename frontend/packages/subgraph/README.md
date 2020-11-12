## @project/subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API.

## How to deploy subgraph onto local graph node

1. Confirm jsons in `../contracts/src/abis/` are up to date.
1. Start (See "1. Set up Ganache CLI" section of following link: https://thegraph.com/docs/quick-start#local-development)
1. Start graph-node(See "2. Run a local Graph Node" section of following link: https://thegraph.com/docs/quick-start#local-development)
1. Deploy contracts and rewrite address in `subgraph.yaml` with TokenFactory contract address(Detailed deployment processes is explained in /contract/README.md)
1. Run `yarn` to install dependencies
1. Run `yarn codegen` to generate necessary files
1. Run `yarn create-local` to allocate subgraph name on local graph-node
1. Run `yarn deploy-local` to deploy subgraph on local graph-node

Now you can see GraphiQL page on http://localhost:8000

## Available Scripts

In the project directory, you can run:

### Subgraph

#### `yarn codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### `yarn build`

Compiles the subgraph to WebAssembly.

#### `yarn auth`

Before deploying your subgraph, you need to sign up on the
[Graph Explorer](https://thegraph.com/explorer/). There, you will be given an access token. Drop it in the command
below:

```sh
GRAPH_ACCESS_TOKEN=your-access-token-here yarn subgraph:auth
```

#### `yarn deploy`

Deploys the subgraph to the official Graph Node.<br/>

Replace `paulrberg/create-eth-app` in the package.json script with your subgraph's name.

You may also want to [read more about the hosted service](https://thegraph.com/docs/quick-start#hosted-service).

## Learn More

To learn The Graph, check out the [The Graph documentation](https://thegraph.com/docs).

---

1. Generate types
2. Build distributable files
3. Deploy to the remote API

## Learn More

You can learn more in the [The Graph documentation](https://thegraph.com/docs).<br/>

Also consider joining [The Graph Discord server](https://discord.gg/vtvv7FP), where you can seek out help.

## Common Errors

### Failed to Compile

> ✖ Failed to compile subgraph: Failed to compile data source mapping: Import file 'src/types/schema.ts' not found.
> Error: Failed to compile data source mapping: Import file 'src/types/schema.ts' not found.

Run the `yarn subgraph` and this error will go away.

### No Access Token

> ✖ No access token provided

Make sure that you followed the instructions listed above for [yarn auth](#yarn-auth).

### Failed to Deploy

> ✖ Failed to deploy to Graph node https://api.thegraph.com/deploy/: Invalid account name or access token

Make sure that you:

1. Signed up on the [Graph Explorer](https://thegraph.com/explorer)
2. Followed the instructions listed above for [yarn auth](#yarn-auth)
3. Replaced `paulrberg/create-eth-app` with your subgraph's name
