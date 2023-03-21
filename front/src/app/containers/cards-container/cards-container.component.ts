import {Component, OnInit} from '@angular/core';
import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";

@Component({
  selector: 'app-card-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {
  suggests: LeisureItemModel[] = new Array<LeisureItemModel>;

  constructor(private _suggestionsStore: SuggestionsStoreService) {
  }

  ngOnInit() {
    this.subscribeItems();
  };

  subscribeItems() {
    this._suggestionsStore.suggestions$.subscribe((suggestions) => {
        this.suggests = suggestions;
    });
  }


}
