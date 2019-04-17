import {ADD_BUTTON, APPLY_BUTTON, CLEAR_BUTTON, DELETE_BUTTON} from '../keys';

export default class ButtonModel {
  constructor() {
    this._data = [
      {
        type: ADD_BUTTON,
        className: 'filter__button--add',
        textOnButton: 'Add condition',
      },
      {
        type: APPLY_BUTTON,
        className: 'filter__button--apply',
        textOnButton: 'Apply',
      },
      {
        type: CLEAR_BUTTON,
        className: 'filter__button--clear',
        textOnButton: 'Clear filter',
      },
      {
        type: DELETE_BUTTON,
        className: 'filter__button--delete',
        textOnButton: ''
      },
    ];
  };

  getData(type) {
    let nameButton, className, textOnButton;
    //находим стили и текст на кнопке из базы
    this._data.forEach(function(button){
      if(button.type === type){
        nameButton = button.type;  
        className = button.className;
        textOnButton = button.textOnButton;
      }
    });
    return {nameButton, className, textOnButton}
  }
}
