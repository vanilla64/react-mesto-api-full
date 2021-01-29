const { NODE_ENV } = process.env;

export class Api {
  constructor({ url }) {
    this._url = url
  }

  getInitialCards(token) {
    return fetch(`${this._url}${'/cards'}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  changeLikeCardStatus(id, isLicked, token) {
    if (!isLicked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    } else if (isLicked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  }

  getUserInfo(token) {
    return fetch(`${this._url}${'/users/me'}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  setUserInfo(name, about, token) {
    return fetch(`${this._url}${'/users/me'}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => {
      if (res.ok) {
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  setAvatar(avatar, token) {
    return fetch(`${this._url}${'/users/me/avatar'}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => {
      if (res.ok) {
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  createCard(name, link, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  deleteCard(id, token) {
    return fetch(`${this._url}${'/cards'}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
}

const api = new Api({
  url: NODE_ENV === 'production'
    ? 'https://api.mestophoto.site'
    : 'http://localhost:4000',
})

export default api