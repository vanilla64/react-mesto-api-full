import React from 'react';
import imgOk from '../images/register-ok.png';
import imgFail from '../images/register-fail.png';

function InfoTooltip(props) {
  const msgOk = 'Вы успешно зарегистрировались!';
  const msgFail = 'Что-то пошло не так! Попробуйте ещё раз.';

  return(
    <section
      onClick={props.onOverlayClose}
      className={
        props.isOpen ?
        `popup popup_type_${props.name} popup_opened` :
        `popup popup_type_${props.name}`}>
      <div  className={`popup__container popup__container_type_${props.type}`}>
        <img
          src={ props.isRegistered ? imgOk : imgFail }
          alt="ok"
          className="popup__img"/>
        <div
          className="popup__close-btn"
          onClick={props.onClose}></div>
        <h2
          className="popup__title popup__title_type_tooltip">
          { props.isRegistered ? msgOk : msgFail }
        </h2>
      </div>
    </section>




    // <PopupWithForm
    //   title='Title'
    //   isOpen={props.isOpen}
    //   onClose={props.onClose}
    //   onOverlayClose={props.onOverlayClose}
    // />
  )
}

export default InfoTooltip;
