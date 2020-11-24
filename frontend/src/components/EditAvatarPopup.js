import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {

  const avatarRef = React.useRef()

  function handleSubmit(evt) {
    evt.preventDefault()

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      name='avatar-upd'
      title='Обновить аватар'
      type='confirm'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onOverlayClose={props.onOverlayClose}
    >

      <>
        <label className="popup__label">
          <input
            id="link-input-avatar"
            name="linkavatar"
            ref={avatarRef}
            className="popup__input popup__input_text_link"
            type="url"
            placeholder="Ссылка на картинку"
            onKeyDown={props.onKeyDown}
            required />
          <span
            id="link-input-avatar-error"
            className={props.checkValid ?
            `popup__error` :
            `popup__error popup__error_visible`}>Error</span>
        </label>
        <button className="popup__btn" type="submit">Сохранить</button>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup