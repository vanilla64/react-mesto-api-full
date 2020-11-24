import React from 'react'
import InitialLayout from './InitialLayout'

function Register(props) {

  function handleSubmit(data) {
    props.onSubmit(data)
  }

  return(
    <InitialLayout
      title="Регистрация"
      btnText="Зарегистрироваться"
      onSubmit={handleSubmit}
      redirect={true}/>
  )
}

export default Register;
