import {TYPES} from '../keys';

export default class SelectModel {
  constructor() {
  }
  
  getDataType(data, type) {
    let dataType = [];
    data.forEach((el) => {
      if(el.type === type) {
        dataType = el.operations;
      }
      if (type === TYPES) {
        dataType.push(el.title)
      }
    });
    return dataType;
  };
}
