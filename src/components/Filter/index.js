import FilterModel from "./model";
import FilterView from './view';
import FilterController from './controller';

const model = new FilterModel();
const view = new FilterView();

export default new FilterController(model, view);
