import SelectModel from './model';
import SelectView from './view';
import SelectController from './controller';

const model = new SelectModel();
const view = new SelectView();

export default new SelectController(model, view);
