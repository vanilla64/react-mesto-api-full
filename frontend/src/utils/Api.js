// import React from 'react'

export class Api {
  constructor({ url, token}) {
    this._url = url
    this._token = token
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
      return fetch(`${this._url}${'/cards/likes'}/${id}`, {
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
      return fetch(`${this._url}${'/cards/likes'}/${id}`, {
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
  // url: 'https://mesto.nomoreparties.co/v1/cohort-14',
  url: 'http://84.201.172.179:4000',
  // url: 'http://vanillaen.students.nomoreparties.xyz:4000',
  token: '3afbb2b4-9ecc-4aaa-9813-505ad2c004fc'
})

export default api