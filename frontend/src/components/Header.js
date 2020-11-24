import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import logoPath from '../images/logo.svg'

function Header(props) {
  return (
    <Switch>
      <Route path="/404" exact></Route>
      <Route path="*">
        <header className={
          props.isInitialScreen ?
          'header_screen_initial' :
          'header'
        }>
          <img
            className="header__logo"
            src={logoPath}
            alt="Логотип" />
          <Switch>
            <Route path="/" exact>
              <div className={
                props.isBurgerActive ?
                'header__info header__info_active' :
                'header__info'
              }>
              <div className="header__email">
                { props.email }
              </div>
                <Link
                  to="/sign-in"
                  className="header__navlink"
                  onClick={props.handleClick}>
                  Выйти
                </Link>
              </div>
            </Route>

            <Route path="/sign-up">
              <Link
                to="/sign-in"
                className={
                  props.isInitialScreen ?
                  'header__navlink_screen_initial' :
                  'header__navlink'
                }>
                Войти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link
                to="/sign-up"
                className={
                  props.isInitialScreen ?
                  'header__navlink_screen_initial' :
                  'header__navlink'
                }>
                Регистрация
              </Link>
            </Route>
          </Switch>

          <Route path="/" exact>
          <div
            className={
              props.isBurgerActive ?
              'header__burger header__burger_active' :
              'header__burger'
            }
            onClick={props.handleBurgerClick}>
            <div className={
              props.isBurgerActive ?
              'header__burger-line header__burger-line_active_pos_top' :
              'header__burger-line'
              } />
            <div className={
              props.isBurgerActive ?
              'header__burger-line header__burger-line_active_pos_middle' :
              'header__burger-line'
              } />
            <div className={
              props.isBurgerActive ?
              'header__burger-line header__burger-line_active_pos_bottom' :
              'header__burger-line'
              } />
          </div>
          </Route>

        </header>
      </Route>
    </Switch>
  )
}

export default Header