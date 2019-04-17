import {createElement} from '../../../utils/helpers';
import {classNames, names} from '../keys';

export default class InputView {
  create(type) {
    return createElement('input', {className: classNames.filterInput, name: names.filterInput, type: type});
  }
}
