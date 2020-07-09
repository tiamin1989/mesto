export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._template = document.querySelector(templateSelector),
      this._name = name,
      this._link = link,
      this._handleCardClick = handleCardClick;
      this._deleteCardListener = this._deleteCard.bind(this);
      this._likeCardListener = this._likeCard.bind(this);
  }
  _deleteCard() {
    this._card.querySelector('.photo-grid__delete').removeEventListener('click', this._deleteCardListener);
    this._card.querySelector('.photo-grid__heart').removeEventListener('click', this._likeCardListener);
    this._card.querySelector('.photo-grid__photo').removeEventListener('click', this._handleCardClick);
    this._card.remove();
    delete this._card;
  }
  _likeCard() {
    this._card.querySelector('.photo-grid__heart').classList.toggle('photo-grid__heart_liked');
  }
  _setEventListeners() {
    this._card.querySelector('.photo-grid__delete').addEventListener('click', this._deleteCardListener);
    this._card.querySelector('.photo-grid__heart').addEventListener('click', this._likeCardListener);
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
    const image = this._card.querySelector('.photo-grid__photo');
    image.setAttribute('src', this._link);
    image.setAttribute('alt', this._name);
    this._card.querySelector('.photo-grid__title').textContent = this._name;
    this._setEventListeners();
    return this._card;
  }
}
