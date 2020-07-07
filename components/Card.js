export default class Card {
  constructor({ name, link }, templateSelector, photoPopup, handleCardClick) {
    this._template = document.querySelector(templateSelector),
      this._popup = photoPopup,
      this._name = name,
      this._link = link,
      this._handleCardClick = handleCardClick;
  }
  _deleteCard() {
    this._card.remove();
    delete this._card;
  }
  _likeCard() {
    this._card.querySelector('.photo-grid__heart').classList.toggle('photo-grid__heart_liked');
  }
  _setEventListeners() {
    this._card.querySelector('.photo-grid__delete').addEventListener('click', () => this._deleteCard());
    this._card.querySelector('.photo-grid__heart').addEventListener('click', () => this._likeCard());
    this._card.querySelector('.photo-grid__photo').addEventListener('click', this._handleCardClick);
  }
  _getTemplate() {
    const cardTemplate = this._template
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);
    return cardTemplate;
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
