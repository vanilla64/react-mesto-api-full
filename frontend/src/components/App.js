import React from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { setToken, getToken, removeToken } from '../utils/token'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Register from './Register'
import Login from './Login'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'
import PopupWithForm from './PopupWithForm'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import InfoTooltip from './InfoTooltip'
import api from '../utils/Api'
import auth from '../utils/UserAuth'
import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {
  const [headerEmail, setHeaderEmail] = React.useState('')
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isRegistered, setIsRegistered] = React.useState(false)
  const [isInitialScreen, setinitialScreen] = React.useState(true)

  const history = useHistory()

  const token = getToken()

  const tokenCheck = (jwt) => {

    if (!jwt) {
      return
    }

    auth.checkToken(jwt).then((res) => {

      setLoggedIn(true)
      setHeaderEmail(res.email)
      history.push('/')
    })
    .catch((err) => {console.log(err)})
  }

  React.useEffect(() => {
    tokenCheck(token)
  }, [])

  React.useEffect(() => {

    if (token === null) {
      return
    }

    api.getUserInfo(token).then((res) => {
      setCurrentUser(res)
    }).catch((err) => {console.log(err)})
  }, [token])

  React.useEffect(() => {

    if (token === null) {
      return
    }

    api.getInitialCards(token)
      .then((res) => {
        setCards(res)
      }).catch((err) => {console.log(err)})
  }, [token])

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }

    document.addEventListener('keydown', handleEscClose)
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups()
    }
  }

  const [isValid, setIsValid] = React.useState(true)

  function handleKeydown(evt) {
    setIsValid(evt.target.checkValidity())
    console.log(evt.target.value)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id)

    api.changeLikeCardStatus(card._id, isLiked, token).then((res) => {
      const newCards = cards.map(
        (updCard) => updCard._id === card._id ? res : updCard)

      setCards(newCards)
    }).catch((err) => {console.log(err)})
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, token)
    .then(() => {
      const newCards = cards.filter(item => item._id !== card._id)
      setCards(newCards)
      api.getInitialCards(token).then((res) => {
        setCards(res)
      }).catch((err) => {console.log(err)})
    }).catch((err) => {console.log(err)})
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }


  function handleUpdateUser(user) {
    api.setUserInfo(user.name, user.about, token)
      .then(() => {
        api.getUserInfo(token).then((res) => {
          setCurrentUser(res)
          closeAllPopups()
        }).catch((err) => {console.log(err)})
      }).catch((err) => {console.log(err)})
  }

  function handleUpdateAvatar(url) {
    api.setAvatar(url.avatar, token)
      .then(() => {
        api.getUserInfo(token)
          .then((res) => {
            setCurrentUser(res)
            closeAllPopups()
          }).catch((err) => {console.log(err)})
      }).catch((err) => {console.log(err)})
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data.location, data.link, token)
      .then((res) => {
        setCards([...cards, res])
        api.getInitialCards(token).then((res) => {
          setCards(res)
        }).catch((err) => {console.log(err)})

        closeAllPopups()
      }).catch((err) => {console.log(err)})
  }

  function handleRegisterSubmit(data) {

    auth.register(data)
      .then((res) => {
        setIsRegistered(true)
        setInfoTooltipOpen(true)
        history.push('/sign-in')
      })
      .catch((err) => {
        console.log(err)
        setIsRegistered(false)
        setInfoTooltipOpen(true)
      })
  }

  function handleAuthSubmit(data) {
    auth.authorize(data)
      .then((res) => {
        console.log(res)
        setLoggedIn(true)
        setHeaderEmail(data.email)
        setToken(res.token)
        setinitialScreen(false)
        history.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleLogOut() {
    removeToken()
    setinitialScreen(true)
  }

  const [isBurgerActive, setBurgerActive] = React.useState(false)

  function handleBurgerClick() {
    isBurgerActive ?
    setBurgerActive(false)
    :
    setBurgerActive(true)

  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setInfoTooltipOpen(false)
    setSelectedCard(null)
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={headerEmail}
          handleClick={handleLogOut}
          handleBurgerClick={handleBurgerClick}
          isBurgerActive={isBurgerActive}
          isInitialScreen={isInitialScreen}
        />
        <Switch>
          <ProtectedRoute
            path="/" exact
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main} />
          <Route path="/sign-up">
            <Register onSubmit={handleRegisterSubmit}/>
          </Route>
          <Route path="/sign-in">
            <Login onSubmit={handleAuthSubmit}/>
          </Route>
          <Route path="/404">
            <NotFound />
          </Route>
          <Redirect to="/404"></Redirect>

        </Switch>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
          onUpdateAvatar={handleUpdateAvatar}
          onKeyDown={handleKeydown}
          checkValid={isValid}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
          onUpdateUser={handleUpdateUser}
          />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
          type='confirm'
          onClose={closeAllPopups}
        >
          <>
            <button
              className="popup__btn popup__btn_type_confirm"
              type="submit">Да</button>
          </>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />

        <InfoTooltip
          name='tooltip'
          type='tooltip'
          title={loggedIn}
          isRegistered={isRegistered}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
