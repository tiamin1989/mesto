
export default class Card {
  constructor(cardObj, templateSelector) {
    this._template = document.querySelector(templateSelector),
    this._popup = document.querySelector('#photo-popup'),
    this._link = cardObj.link,
    this._name = cardObj.name
  }
  _escHandler(evt) {
    if (evt.key === 'Escape' &&
      this._popup.classList.contains('page_opened')) this._togglePhoto();
  }
  _deleteCard() {
    this._card.remove();
  }
  _togglePhoto() {
    this._popup.classList.toggle('page_opened');
    if (this._popup.classList.contains('page_opened')) document.addEventListener('keydown', evt => this._escHandler(evt));
    else document.removeEventListener('keydown', evt => this._escHandler(evt));
  }
  _showPhoto() {
    this._popup.querySelector('.popup__image').setAttribute('src', this._link);
    this._popup.querySelector('.popup__image').setAttribute('alt', this._name);
    this._popup.querySelector('.popup__caption').textContent = this._name;
    this._togglePhoto();
  }
  _likeCard() {
    this._card.querySelector('.photo-grid__heart').classList.toggle('photo-grid__heart_liked');
  }
  _setEventListeners() {
    this._card.querySelector('.photo-grid__delete').addEventListener('click', () => this._deleteCard());
    this._card.querySelector('.photo-grid__heart').addEventListener('click', () => this._likeCard());
    this._card.querySelector('.photo-grid__photo').addEventListener('click', () => this._showPhoto());
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
