import React from "react";
import { Link } from 'react-router-dom'
import { Button, Heading, Card, Text, Flex } from "rimble-ui";

const TopPageBody = () => (
  <div>
    <Heading fontSize={6}>Fans and creators can connect through social moneys.</Heading>
      <Card>
        <Heading mt={0} fontSize={5} color="itred">For creators</Heading>
        <Text mb={3} color="black">
          Show your fans how much you appreciate them and interact with them further by issuing your own tokens.
        </Text>
        <Link style={{textDecoration: 'none'}} to="/create"><Button mainColor="#E25E89">Create token</Button></Link>
        <Link style={{textDecoration: 'none'}} to="/dashboard"><Button.Outline mainColor="#E25E89" m={2}>Dashboard</Button.Outline></Link>
      </Card>
      <Card mt={3}>
        <Heading mt={0} fontSize={5} color="itblue">For fans</Heading>
        <Text mb={3}>
          Check out the tokens of your favorite creators and see if you can connect with them.
        </Text>
        <Link style={{textDecoration: 'none'}} to="/explore"><Button mainColor="#48C5D5">Explore</Button></Link>
      </Card>
    <Heading as={"h3"} mt={4}>Get token from your Audius account</Heading>
    <Link to="/audius-token"><Button>get token with Audius</Button></Link>
  </div>
)

export default TopPageBody
