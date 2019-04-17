import {createElement} from '../../../utils/helpers';

export default class ButtonView {
  create(data) {
    return createElement('button', {className: data.className}, data.textOnButton);
  }
}
