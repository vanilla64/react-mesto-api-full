import React from 'react'
import { Route, Switch } from 'react-router-dom'

function Footer() {
  return (
    <Switch>
      <Route path="/404" exact></Route>
      <Route path="/" exact>
        <footer className="footer">
          <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
        </footer>
      </Route>
      <Route path="/sign-up"></Route>
      <Route path="/sign-in"></Route>
    </Switch>
  )
}

export default Footer