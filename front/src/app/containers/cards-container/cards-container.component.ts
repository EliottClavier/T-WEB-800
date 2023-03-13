import { Component } from '@angular/core';
import {BarService} from "../../services/bar-service/bar.service";

@Component({
  selector: 'app-card-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent {

  constructor(private _barService: BarService) { }
}
