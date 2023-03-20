import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-map-filters',
  templateUrl: './map-filters.component.html',
  styleUrls: ['./map-filters.component.scss']
})
export class MapFiltersComponent {

  @Input() public selectedSearchForm: FormGroup = new FormGroup<any>({});

}
