export default class Card {
  constructor({ name, link, likes, owner, _id }, templateSelector, handleCardClick, isMine, handleCardDelete, handleCardLike, currentUserId) {
    this._template = document.querySelector(templateSelector);
    this._first = name;
    this._second = link;
    this._likes = likes;
    this._id = _id;
    this._currentUserId = currentUserId;
    this._owner = owner;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._isMine = isMine;
    this._handleCardDelete = handleCardDelete;
  }
  deleteCard() {
    if (this._isMine) this._card.querySelector('.photo-grid__delete').removeEventListener('click', this._handleCardDelete);
    this._card.querySelector('.photo-grid__heart').removeEventListener('click', this._handleCardLike);
    this._card.querySelector('.photo-grid__photo').removeEventListener('click', this._handleCardClick);
    this._card.remove();
    delete this._card;
  }
  likeCard() {
    this._card.querySelector('.photo-grid__heart').classList.toggle('photo-grid__heart_liked');
  }
  _setEventListeners() {
    if (this._isMine) this._card.querySelector('.photo-grid__delete').addEventListener('click', this._handleCardDelete);
    this._card.querySelector('.photo-grid__heart').addEventListener('click', this._handleCardLike);
    this._card.querySelector('.photo-grid__photo').addEventListener('click', this._handleCardClick);
  }
  _getTemplate() {
    return this._template
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);
  }
  generateCard() {
    this._card = this._getTemplate();
    const myLike = this._likes.some(likesItem => {
      return likesItem._id === this._currentUserId;
    });
    if (myLike) this.likeCard();
    if (!this._isMine) this._card.querySelector('.photo-grid__delete').remove();
    const image = this._card.querySelector('.photo-grid__photo');
    image.setAttribute('src', this._second);
    image.setAttribute('alt', this._first);
    this._card.querySelector('.photo-grid__title').textContent = this._first;
    this._card.querySelector('.photo-grid__like-count').textContent = this._likes.length;
    this._setEventListeners();
    return this._card;
  }
}
