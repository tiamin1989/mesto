export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.headers.authorization;
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getPersonData(func) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        func(res.name, res.about);
        return res;
      })
      .catch((err) => {
        func(err, err);
      });
  }
  savePersonData({ first, second }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: first,
        about: second
      })
    })
      .then(res => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  saveCardData({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteCardData(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
  }
  likeCard(id, card) {
    const myLike = card._likes.some(function (likesItem) {
      return likesItem._id === id;
    });
    if (myLike) {
      return fetch(`${this.baseUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
          res.json()
            .then(res => {
              card._card.querySelector('.photo-grid__like-count').textContent = res.likes.length;
              card.likeCard();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return fetch(`${this.baseUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        res.json()
          .then(res => {
            card._card.querySelector('.photo-grid__like-count').textContent = res.likes.length;
            card.likeCard();
          });
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  changeAvatar(url) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    })
      .then(res => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
