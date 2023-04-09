import {AfterContentChecked, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
import {TranslateService} from "@ngx-translate/core";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {CardItemsListComponent} from "../../components/card-items-list/card-items-list.component";

@Component({
  selector: 'app-card-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit, AfterContentChecked {

  private _suggests: LeisureItemModel[] = new Array<LeisureItemModel>;
  category: string = "";
  private _itemsSelected?: LeisureItemModel;
  @Output() onGetSuggestions: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(CardItemsListComponent, {static: false}) cardItemsListComponent?: CardItemsListComponent;

  constructor( private _suggestionsStore: SuggestionsStoreService, private _translateService: TranslateService, private _suggestionsService: SuggestionsService) {
  }

  ngOnInit() {
    this.subscribeItems();
  };

  ngAfterContentChecked(): void {
    this.suggests.length > 0 && (this.category = this.translateService.instant(this.suggests[0].categoryTranslateKey()));
  }

  get itemsSelected(): LeisureItemModel {
    return this._itemsSelected!;
  }

  set itemsSelected(value: LeisureItemModel) {
    this._itemsSelected = value;
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
    this._suggestionsStore?.suggestions$?.subscribe((suggestions) => {
      this._suggests = suggestions;
    });
  }

  onItemSelected($event: any) {
    this._itemsSelected = $event as LeisureItemModel;
  }

  onItemSelectedFromMap($event: any) {
    this._itemsSelected = $event as LeisureItemModel;
    this.cardItemsListComponent?.onItemFromMapClicked(this._itemsSelected);
  }

  onCloseDetails() {
    this._itemsSelected = undefined;
  }

  onShowMoreItems() {
    this.onGetSuggestions.emit();

  }


}
