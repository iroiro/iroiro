import React from "react"
import { Link } from 'react-router-dom'
import { Button } from "rimble-ui"

const LogoButton = ({path, text}) => (
    <Link to="/" style={{textDecoration: 'none'}}>
      <Button.Text mainColor="white" fontSize="32px">Fanstock</Button.Text>
    </Link>
  )

export default LogoButton
