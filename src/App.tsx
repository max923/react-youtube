import * as React from 'react'
import { hot } from "react-hot-loader";
import Header from './components/Header'
import Container from './components/Container'
import "./css/normalize.css"
import "./css/index.css";

function App (): JSX.Element {
  return (
    <main className="App">
      <Header />
      <Container />
    </main>
  )
}

export default hot(module)(App);
