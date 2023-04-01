import {LeisureItemModel} from "../leisures/leisure-item.model";
import {StepModel} from "./step.model";
import {LocationModel} from "../location/location.model";
import {getIsoStringFromDate} from "../../utils/date.utils";



describe('StepModel', () => {
  let step: StepModel;

  beforeEach(() => {
    step = new StepModel();
  });

  it('should create a new step', () => {
    expect(step).toBeTruthy();
  });

});
