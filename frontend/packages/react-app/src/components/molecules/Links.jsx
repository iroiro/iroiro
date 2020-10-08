import React from "react";
import {Link} from "../index";

const Links = () => (
  <>
    <Link
      href="https://ethereum.org/developers/#getting-started"
      style={{ marginTop: "8px" }}
    >
      Learn Ethereum
    </Link>
    <Link href="https://reactjs.org">Learn React</Link>
    <Link href="https://thegraph.com/docs/quick-start" >Learn The Graph</Link>
  </>
)

export default Links
