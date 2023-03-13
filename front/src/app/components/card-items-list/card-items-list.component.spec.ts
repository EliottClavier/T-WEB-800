import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CardItemsListComponent} from './card-items-list.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {ItemModel} from "../../models/item.model";
import {MatCardModule} from "@angular/material/card";
import {AppModule, HttpLoaderFactory} from "../../app.module";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";


describe('CardItemsComponent', () => {
  let component: CardItemsListComponent;
  let fixture: ComponentFixture<CardItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardItemsListComponent],
      imports: [TranslateModule.forRoot(),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Cards Display', () => {
  let spectator: Spectator<CardItemsListComponent>;
  let threeCardItems: ItemModel[];
  const createComponent = createComponentFactory({
    component: CardItemsListComponent,
    imports: [
      MatCardModule,
      AppModule,
      TranslateModule.forRoot(
        {
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        },
      )
    ],
    providers: [TranslateService],
  });

  beforeEach(() => {
    spectator = createComponent();

    threeCardItems = new Array<ItemModel>();
    for (let i = 0; i < 3; i++) {
      threeCardItems.push(new ItemModel());
    }
  });

  it('should display 3 items elements', () => {
    spectator.setInput('cardItems', threeCardItems);

    expect(spectator.queryAll('[data-cy-card-component]').length).toEqual(3);
  });
  it('should display empty message if array elements is empty', () => {

    const translateService = spectator.inject(TranslateService);
    spectator.setInput('cardItems', [] as ItemModel[]);

    expect(spectator.query('[data-cy-card-component-empty]')).toHaveText(translateService.instant('nothing_to_display'));
  });


});
