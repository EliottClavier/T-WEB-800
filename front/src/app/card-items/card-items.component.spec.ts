import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardItemsComponent } from './card-items.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {ItemModel} from "../model/ItemModel";
import {MatCardModule} from "@angular/material/card";
import {AppModule} from "../app.module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";


describe('CardItemsComponent', () => {
  let component: CardItemsComponent;
  let fixture: ComponentFixture<CardItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemsComponent ],
      imports: [ TranslateModule.forRoot(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Cards Display', () => {
  let spectator: Spectator<CardItemsComponent>;
  let threeCardItems: ItemModel[];
  const createComponent = createComponentFactory({
    component: CardItemsComponent,
    imports: [
      MatCardModule,
      AppModule,
     TranslateModule.forRoot(),
    ],
    providers: [TranslateService ],
  });

  beforeEach(() => {
    spectator = createComponent();

    threeCardItems = new Array<ItemModel>();
    for(let i = 0; i < 3; i++) {
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

  // it('should appear at least 6 cards by default', () => {
  //   expect(spectator.queryAll('[data-cy-card-item]')).toBeGreaterThanOrEqual(6);
  //
  //
  // });

  });
