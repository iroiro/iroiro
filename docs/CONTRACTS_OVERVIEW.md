## TokenIssuance

TokenIssuanceとは、任意のSocialToken(CommunityToken)を作成可能なIroiroの機能です。

トークンを発行したいアカウントは、 [TokenFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/TokenFactory.sol) の `createToken()` を利用して [SocialToken](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/SocialToken.sol) をデプロイします。
この際にユーザーはトークンの名称、シンボル、Iroiro運営及びIroiroアプリへのトークンの配布率を引数で指定して、任意のトークンを発行することができます。
トークンが発行されると、デフォルトの場合下記の割合でトークンが各アドレスに対して送付されます。
- トークン発行者: 20%
  これはトークン発行者が保有するものではく、 [Iroiro](https://app.iroiro.social) などを利用したコミュニティへの配布を行ったり、Uniswapなどでの流動性提供に用いられることを想定しています。
- [TreasuryVester](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/TreasuryVester.sol): 80%
  (寄付率が指定された場合減少します)。トークン発行者が将来的に受け取ることができるトークンはTreasuryVesterへ送られ、3年間ロックされます。引き出せるトークン量は時間の経過に応じて線形的に増加し、自由なタイミングでアンロックされたトークンを引き出すことができます。
- Iroiro運営及びIroiroアプリ:
  指定された寄付率に応じてTreasuryVesterへの割り当て分から分割したトークン量をIroiroへ寄付として送ります。
  送られたトークンは運営者への割り当てと、Iroiroのアプリ上で将来的に利用されるために二等分されます。

## TokenIssuance
TokenIssuance is a feature of Iroiro that allows you to create any SocialToken (CommunityToken).

An account that wants to issue a token deploys a [SocialToken](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/SocialToken.sol) using `createToken()` in [TokenFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/TokenFactory.sol).
At this time, the user can issue any token by specifying the token name, symbol, and the distribution rate of the token to Iroiro operator and Iroiro app as arguments.
When a token is issued, the default percentage of tokens will be sent to each address as follows

- Token issuer: 20%
  This will not be held by the token issuer, but will be distributed to the community via [Iroiro](https://app.iroiro.social), or used to provide liquidity via Uniswap.
- [TreasuryVester](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/TreasuryVester.sol): 
  80% (will be reduced if donation rate is specified). Tokens that the token issuer can receive in the future will be sent to TreasuryVester and locked for 3 years. The amount of tokens that can be withdrawn increases linearly with time, and the unlocked tokens can be withdrawn at any time.
- Iroiro Operator and Iroiro App:
  The amount of tokens divided from the allocation to TreasuryVester according to the specified donation rate will be sent to Iroiro as donation.
  The sent tokens will be divided into two parts: one for the operator and the other for future use in the Iroiro app.

## DevReceiver 

![EzZpOZ0UYAMoVBO](https://user-images.githubusercontent.com/12506798/118351729-8c64ba00-b598-11eb-8a41-4d3514c23a48.jpeg)

[DevReceiver](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/DevReceiver.sol) は [Dev Protocol](https://devprotocol.xyz/) における [Property](https://github.com/dev-protocol/protocol/blob/main/docs/WHITEPAPER.JA.md#property) に対するRewardを、iroiroの [TokenFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/TokenFactory.sol) などで作成されるCommunity Token保有者に対して分配を行うコントラクトです。
(図中で示している [CryptoVizor](https://twitter.com/CryptoVizorNFT) はiroiroチームが別個に開発しているアプリケーションであり、CryptoVizorは [stakes.social](https://stakes.social/0x3059bD281418179A83cAE3771b0dD6C47807EA3a) でPropertyとして登録されています。）

1. DevReceiverは [DevReceiverFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/DevReceiverFactory.sol) によって動的にデプロイすることができます。デプロイの際は$DEVにおけるProperty Tokenと、対応するCommunity Tokenのペアを指定する必要があります。
1. DevReceiverのデプロイ後、Propertyの作成者はProperty Tokenの一部（10%など）をDevReceiverに対してデポジットを実施します。DevReceiverコントラクトは保有するProperty Tokenの割合に応じて、[ブロックごとに引き出せる報酬が増加していきます](https://github.com/dev-protocol/protocol/blob/main/docs/WHITEPAPER.JA.md#withdraw-2) 。
1. 増加した報酬は自動的に分配に割り当てられるわけではなく、不特定のアカウントが `chargeReward` 関数によってDevReceiverへ報酬をデポジットします。
1. 別途TokenFactoryなどで作成され分配されているコミュニティトークンを保有するアカウントは、DevReceiverに対して `withdraw` を実行することができます。この際アカウントはburnするコミュニティトークンの量を指定します。DevReceiverはburnする量に対するコミュニティトークンの総供給量に応じた割合分の報酬をアカウントに対して送付します。
1. コミュニティトークンの全量がburnされ、DevReceiverがProperty Tokenを保有する必要性がなくなった場合などは、Propertyの作成者はDevReceiverが保有するProperty TokenやDEV tokenなどのERC20トークンを自由に引き出すことができます。

[DevReceiver](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/DevReceiver.sol) is a contract that distributes Reward for [Property](https://github.com/dev-protocol/protocol/blob/main/docs/WHITEPAPER.JA.md#property) in [Dev Protocol](https://devprotocol.xyz/) to Community Token holders created by [TokenFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/TokenFactory.sol) in iroiro.
([CryptoVizor](https://twitter.com/CryptoVizorNFT) shown in the figure is a separate application developed by iroiro team, and CryptoVizor is registered as a Property in [stakes.social](https://stakes.social/0x3059bD281418179A83cAE3771b0dD6C47807EA3a)).

1. DevReceiver can be deployed dynamically by [DevReceiverFactory](https://github.com/iroiro/iroiro/blob/develop/contract/contracts/issuance/DevReceiverFactory.sol). When deploying, you need to specify the Property Token in the Dev Protocol and the corresponding Community Token pair.
1. After the DevReceiver is deployed, the creator of the Property will deposit a portion (e.g. 10%) of the Property Token to the DevReceiver. The DevReceiver contract will [increase the amount of reward that can be withdrawn per block]((https://github.com/dev-protocol/protocol/blob/main/docs/WHITEPAPER.JA.md#withdraw-2)) according to the percentage of Property Token held.
1. The increased rewards are not automatically allocated for distribution, but unspecified accounts deposit rewards to the DevReceiver via the `chargeReward` function.
1. Accounts holding community tokens that have been created and distributed separately, such as by TokenFactory, can perform a `withdraw` to the DevReceiver.  The DevReceiver will send the account a reward based on the percentage of the total supply of community tokens compared to the amount to be burned.
1. When all of the community tokens have been burned and the DevReceiver no longer needs to hold the Property Token, the creator of the Property can freely withdraw the Property Token, DEV token and other ERC20 tokens held by the DevReceiver.
