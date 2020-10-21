import React from "react"
import { Link } from 'react-router-dom'
import { Button } from "rimble-ui"

const LinkOutlineButton = ({path, text, mainColor}) => (
    <Link to={ path } style={{textDecoration: 'none'}}>
      <Button mainColor={mainColor} mr={2}>{ text }</Button>
    </Link>
  )

export default LinkOutlineButton
