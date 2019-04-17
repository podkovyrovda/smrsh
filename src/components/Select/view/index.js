import {createElement} from '../../../utils/helpers';
import {classNames} from '../keys';

export default class SelectView {
  create(data) {
    const select = createElement('select', {className: classNames.filterSelect, name: data.name});
    //добавляем опции
    data.forEach(element => {
      const option = createElement('option', {value: element}, element);
      select.appendChild(option);
    });
    return select;
  }
}
