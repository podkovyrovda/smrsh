import Select from '../../Select';
import * as selectTypes from '../../Select/keys';

import Button from '../../Button';
import * as buttonTypes from '../../Button/keys';

import Input from '../../Input';

import {appendChildren, createElement, EventEmitter} from '../../../utils/helpers';

import {classNames} from '../keys';

export default class FilterLineView extends EventEmitter {
  constructor() {
    super();
  }
  create(data, id) {
    const filterLine = createElement('div', 
      {className: classNames.filterLine, id:`${classNames.filterLine}-${id}`});

    const select = Select.render(data, selectTypes.TYPES);
    const select2 = Select.render(data, selectTypes.TYPE_TEXT);
    const input = Input.render('text');

    const deleteButton = Button.render(buttonTypes.DELETE_BUTTON);
    deleteButton.addEventListener('click', this._handleRemove.bind(this));

    return appendChildren(filterLine, select, select2, input, deleteButton)
  }

  _handleRemove({target}) {
    event.preventDefault();
    
    const line = target.parentNode;
    this.emit('remove', line.getAttribute('id'));
  }

  findLineId(id) {
    return `${classNames.filterLine}-${id}`
  }

  removeLine(id) {
    const line = this.findLine(id);
    this._form.removeChild(line);
  }
}
