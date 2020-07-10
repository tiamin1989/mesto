export default class UserInfo {
  constructor(nameSelector, activitySelector) {
    this._name = document.querySelector(nameSelector),
    this._activity = document.querySelector(activitySelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      link: this._activity.textContent
    };
  }
  setUserInfo({ first, second }) {
    this._name.textContent = first;
    this._activity.textContent = second;
  }
}
