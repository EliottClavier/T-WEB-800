import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-card-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit, AfterContentChecked {

  private _suggests: LeisureItemModel[] = new Array<LeisureItemModel>;
  category: string = "";

  constructor(private _suggestionsStore: SuggestionsStoreService, private _translateService: TranslateService) {
  }

  get suggestionsStore(): SuggestionsStoreService {
    return this._suggestionsStore;
  }

  set suggestionsStore(value: SuggestionsStoreService) {
    this._suggestionsStore = value;
  }

  ngOnInit() {
    this.subscribeItems();
  };

  ngAfterContentChecked(): void {

    this.category = this.translateService.instant(this.suggests[0].categoryTranslateKey());
    console.log(this.category);
  }


  get suggests(): LeisureItemModel[] {
    return this._suggests;
  }
  get translateService(): TranslateService {
    return this._translateService;
  }

  set translateService(value: TranslateService) {
    this._translateService = value;
  }
  set suggests(value: LeisureItemModel[]) {
    this._suggests = value;
  }

  subscribeItems() {
    this?._suggestionsStore?.suggestions$?.subscribe((suggestions) => {
        this._suggests = suggestions;
    });
  }
  unsubscribeItems() {
    this?._suggestionsStore?.suggestions$?.unsubscribe();
  }


}
