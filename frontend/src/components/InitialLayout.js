import React from 'react';
import { Link } from 'react-router-dom'

function InitialLayout(props) {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  })

  function handleChange(evt) {
    const { name, value } = evt.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    props.onSubmit(data)
  }

  return (
    <section className="initial-layout">
      <h2 className="initial-layout__title">{ props.title }</h2>
        <form
          className="initial-layout__form"
          onSubmit={handleSubmit}>
          <label className="initial-layout__label">
            <input
              id="email-input"
              type="email"
              name="email"
              onChange={handleChange}
              className="initial-layout__input"
              required
              placeholder="Email">
            </input>
          </label>
          <label className="initial-layout__label">
            <input
              id="password-input"
              type="password"
              name="password"
              onChange={handleChange}
              className="initial-layout__input"
              required
              placeholder="Пароль">
            </input>
          </label>
          <button
            type="submit"
            className="initial-layout__btn">
            { props.btnText }
          </button>
        </form>
        {
          props.redirect ?
          <div className="initial-layout__redirect">
            <p className="initial-layout__text">Уже зарегистрированы?</p>
              <Link
                to="/sign-in"
                className="initial-layout__link">Войти
              </Link>
          </div>
          :
          null
        }
    </section>
  )
}

export default InitialLayout;
