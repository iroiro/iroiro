## DevReceiver 

![EzZpOZ0UYAMoVBO](https://user-images.githubusercontent.com/12506798/118351729-8c64ba00-b598-11eb-8a41-4d3514c23a48.jpeg)

[DevReceiver](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/DevReceiver.sol) は [Dev Protocol](https://devprotocol.xyz/) における [Property](https://github.com/dev-protocol/protocol/blob/main/docs/WHITEPAPER.JA.md#property) に対するRewardを、iroiroの [TokenFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/TokenFactory.sol) などで作成されるCommunity Token保有者に対して分配を行うコントラクトです。

1. DevReceiverは [DevReceiverFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/DevReceiverFactory.sol) によって動的にデプロイすることができます。デプロイの際は$DEVにおけるProperty Tokenと、対応するCommunity Tokenのペアを指定する必要があります。
1. DevReceiverのデプロイ後、Propertyの作成者はProperty Tokenの一部（10%など）をDevReceiverに対してデポジットを実施します。DevReceiverコントラクトは保有するProperty Tokenの割合に応じて、[ブロックごとに引き出せる報酬が増加していきます](https://github.com/dev-protocol/protocol/blob/main/docs/WHITEPAPER.JA.md#withdraw-2) 。
1. 増加した報酬は自動的に分配に割り当てられるわけではなく、不特定のアカウントが `chargeReward` 関数によってDevReceiverへ報酬をデポジットします。
1. 別途TokenFactoryなどで作成され分配されているコミュニティトークンを保有するアカウントは、DevReceiverに対して `withdraw` を実行することができます。この際アカウントはburnするコミュニティトークンの量を指定します。DevReceiverはburnする量に対するコミュニティトークンの総供給量に応じた割合分の報酬をアカウントに対して送付します。
1. コミュニティトークンの全量がburnされ、DevReceiverがProperty Tokenを保有する必要性がなくなった場合などは、Propertyの作成者はDevReceiverが保有するProperty TokenやDEV tokenなどのERC20トークンを自由に引き出すことができます。

[DevReceiver](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/DevReceiver.sol) is a contract that distributes Reward for [Property](https://github.com/dev-protocol/protocol/blob/main/docs/WHITEPAPER.JA.md#property) in [Dev Protocol](https://devprotocol.xyz/) to Community Token holders created by [TokenFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/TokenFactory.sol) in iroiro.

1. DevReceiver can be deployed dynamically by [DevReceiverFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/DevReceiverFactory.sol). When deploying, you need to specify the Property Token in the Dev Protocol and the corresponding Community Token pair.
1. After the DevReceiver is deployed, the creator of the Property will deposit a portion (e.g. 10%) of the Property Token to the DevReceiver. The DevReceiver contract will [increase the amount of reward that can be withdrawn per block]((https://github.com/dev-protocol/protocol/blob/main/docs/WHITEPAPER.JA.md#withdraw-2)) according to the percentage of Property Token held.
1. The increased rewards are not automatically allocated for distribution, but unspecified accounts deposit rewards to the DevReceiver via the `chargeReward` function.
1. Accounts holding community tokens that have been created and distributed separately, such as by TokenFactory, can perform a `withdraw` to the DevReceiver.  The DevReceiver will send the account a reward based on the percentage of the total supply of community tokens compared to the amount to be burned.
1. When all of the community tokens have been burned and the DevReceiver no longer needs to hold the Property Token, the creator of the Property can freely withdraw the Property Token, DEV token and other ERC20 tokens held by the DevReceiver.
