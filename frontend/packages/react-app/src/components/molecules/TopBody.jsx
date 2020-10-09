import React from "react";
import { Link } from 'react-router-dom'
import { Button, Heading } from "rimble-ui";

const TopPageBody = () => (
  <div>
    <Heading>A world where fans and creators are connected through tokens.</Heading>
    <Link to="/create"><Button>Create</Button></Link>
    <Link to="/explore"><Button m={3}>Explore</Button></Link>
  </div>
)

export default TopPageBody
