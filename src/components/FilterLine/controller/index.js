export default class FilterLineController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    this._view.on('remove', this.removeLine.bind(this));
  }

  render(data, id) {
    return this._view.create(data, id);
  }

  removeLine() {
    this._view.removeLine();
  }

  findLineId(id) {
    return this._view.findLineId(id);
  }
}
