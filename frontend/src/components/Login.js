import React from 'react'
import InitialLayout from './InitialLayout'

function Login(props) {
  function handleSubmit(data) {
    props.onSubmit(data)
  }

  return(
    <InitialLayout
      title="Вход"
      btnText="Войти"
      onSubmit={handleSubmit}
      redirect={false}/>
  )
}

export default Login;