import * as styles from "./App.module.css"

import React from "react"

import Category from "./Component/Category"
import Store from "./Component/Store"

class App extends React.Component {
  render() {
    return (
      <div className={styles.Main}>
        <Category />
        <Store />
      </div>
    )
  }
}

export default App
