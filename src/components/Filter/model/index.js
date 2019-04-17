import {TYPE_TEXT, TYPE_NUMBER} from '../keys';

export default class FilterModel {
  constructor() {
    this._data = [
      {
        type: TYPE_TEXT,
        name: 'text',
        title: 'Text field',
        operations: [
          'Containing',
          'Exectly matching',
          'Begins with',
          'Ends with'
        ],
        default: true
      },
      {
        type: TYPE_NUMBER,
        name: 'number',
        title: 'Number field',
        operations: [
          'Equal',
          'Greater than',
          'Less than'
        ],
        default: false
      }
    ]
  }

  getData() {
    return this._data
  };
}
