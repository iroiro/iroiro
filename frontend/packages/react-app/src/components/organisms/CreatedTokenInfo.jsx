import React from "react";
import { Card, Text, Button, Box, Flex} from "rimble-ui";
import { Link } from 'react-router-dom'

const CreatedTokenInfo = ({token, withdrawToken, restartStaking, stopStaking}) => (
    <Card color="black" p="2" mt={4}>
      <Box m={4}>
        <Link to={`token/${token.address}`} style={{textDecoration: 'none'}}>
          <Text fontWeight={"bold"} fontSize={5} color="itred">{token.name}</Text>
        </Link>
        <Box mt={3}>
          <Text>Token address: {token.address}</Text>
          <Text>Locked amount: {token.vestingAmount} {token.symbol}</Text>
        </Box>
        <Box mt={4}>
          <Text fontWeight={"bold"} mb={2}>Withdrawable amount</Text>
          <Flex style={{ alignItems: "center"}}>
            <Text fontWeight="bold" fontSize={5} mr={3}>{token.redeemableAmount} {token.symbol}</Text>
            <Button onClick={() => withdrawToken(token.address)}>Withdraw</Button>
          </Flex>
        </Box>
        <Box my={4}>
          <Text fontWeight={"bold"} mb={2}>Change Staking status</Text>
          {token.isStakingPaused
            ? <Box><Text mb={2}>Inactive</Text><Button onClick={() => restartStaking(token.address)}>Restart Staking</Button></Box>
            : <Box><Text mb={2}>Active</Text><Button.Outline size="small" variant="danger" onClick={() => stopStaking(token.address)}>Stop Staking</Button.Outline></Box>
          }
        </Box>
        <Box mt={4}>
          <Text fontWeight={"bold"} mb={2}>Distribute token with Audius</Text>
          <Link style={{textDecoration: 'none'}} to={`/audius/${token.address}`}><Button.Outline size="small" mainColor="#333">Go to Audius setting</Button.Outline></Link>
        </Box>
      </Box>
    </Card>
)

export default CreatedTokenInfo
