import FilterLine from '../../FilterLine';
import Button from '../../Button';
import * as buttonTypes from '../../Button/keys';
import {appendChildren, createElement, EventEmitter, insertAfter} from '../../../utils/helpers';
import {classNames} from "../keys";

export default class FilterView extends EventEmitter{
  constructor() {
    super();
  }

  render(data, parent, lineId) {
    this._form = createElement('form', {className: classNames.form});
    this._addButton = Button.render(buttonTypes.ADD_BUTTON);
    this._addButton.addEventListener('click', this._handleAdd.bind(this));
    this._applyButton = Button.render(buttonTypes.APPLY_BUTTON);
    this._clearButton = Button.render(buttonTypes.CLEAR_BUTTON);
    const line = FilterLine.render(data, lineId);
    appendChildren(this._form, line, this._addButton, this._applyButton, this._clearButton);
    return parent.appendChild(this._form)
    }

  addLine(data, id) {
    const lastLineId = FilterLine.findLineId(id - 1);
    const lastLine = this._form.querySelector(`#${lastLineId}`);
    const newLine = FilterLine.render(data, id);
    insertAfter(lastLine, newLine)
  }

  _handleAdd(event) {
    event.preventDefault();
    this.emit('add');
  }
}
