import * as React from "react"
import { Link } from 'react-router-dom'
import { Button } from "rimble-ui"

export interface LinkOutlineButtonProps {
    readonly p: number
    readonly path: string
    readonly text: string
    readonly mainColor: string
}

const LinkOutlineButton = ({path, text, mainColor}: LinkOutlineButtonProps) => (
    <Link to={ path } style={{textDecoration: 'none'}}>
      <Button mainColor={mainColor} mr={2}>{ text }</Button>
    </Link>
  )

export default LinkOutlineButton
