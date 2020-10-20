import React from "react";
import { Link } from 'react-router-dom'
import { Button, Heading } from "rimble-ui";

const TopPageBody = () => (
  <div>
    <Heading as={"h1"}>A world where fans and creators are connected through tokens.</Heading>
    <Link to="/create"><Button>Create</Button></Link>
    <Link to="/explore"><Button ml={3}>Explore</Button></Link>
    <Heading as={"h3"} mt={4}>Get token from your Audius account</Heading>
    <Link to="/audius-token"><Button>get token with Audius</Button></Link>
  </div>
)

export default TopPageBody
