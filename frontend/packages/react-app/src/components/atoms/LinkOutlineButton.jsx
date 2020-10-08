import React from "react"
import { Link } from 'react-router-dom'
import { Button } from "rimble-ui"

const LinkOutlineButton = ({path, text}) => (
    <Link to={ path } style={{textDecoration: 'none'}}>
      <Button.Outline mainColor="white" mr={2}>{ text }</Button.Outline>
    </Link>
  )

export default LinkOutlineButton
