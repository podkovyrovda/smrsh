export default class FilterController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    this._data = this._model.getData();
    this._counter = 1;

    this._view.on('add', this.addLine.bind(this));
  }

  init(id) {
    const div = document.getElementById(id);
    const lineId = this._counter;
    this._view.render(this._data, div, lineId);
    this._counter++;
  }

  addLine() {
    this._view.addLine(this._data, this._counter);
    this._counter++;
  }
}
