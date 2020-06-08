import React, { useState } from 'react'
import "../css/header.css";

function Header(): JSX.Element {
  const [text, setText] = useState<string>('')
  function handleChange(e: any) {
    const value = e.target.value
    setText(value)
  }
  return (
    <header className="Header flex-center">
      <div className="wrapper">
        <input
          type="text"
          id="search-bar"
          className="default-input"
          onChange={handleChange}
          value={text}
        />
      </div>
    </header>
  )
}
export default Header