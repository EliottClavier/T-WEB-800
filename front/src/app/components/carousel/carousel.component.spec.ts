import { CarouselComponent } from './carousel.component'
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { Image } from 'src/app/types/image.types';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  let spectator: Spectator<CarouselComponent>;
  let wrongImage: Image[];

  const createComponent = createComponentFactory({
    component: CarouselComponent,
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      imports: [NgbModule]
    }).compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spectator = createComponent();
    component = spectator.component;

    component.images = [
      {
        src: 'https://picsum.photos/id/1055/900/500/',
        alt: 'img'
      },
      {
        src: 'https://picsum.photos/id/194/900/500/',
        alt: 'img'
      },
      {
        src: 'https://picsum.photos/id/368/900/500/',
        alt: 'img'
      }
    ];

    wrongImage = [
      {
        src: 'src/wrong-img.png',
        alt: 'default-wrong'
      },
    ];

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the bootstrap carousel', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ngb-carousel')).not.toBeNull();
  });

  it('should render the photo information', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    const img = compiled.querySelector('img')

    expect(img).toHaveAttribute('src', component.images[0].src);
    expect(img).toHaveAttribute('alt', component.images[0].alt);
  });

  it('should change the active image', fakeAsync(() => {

    const carousel = fixture.debugElement.query(By.directive(NgbCarousel));
    const img = carousel.query(By.css('img'));

    expect(img.nativeElement).toHaveAttribute('src', component.images[0].src);
    expect(img.nativeElement).toHaveAttribute('alt', component.images[0].alt);
    console.log(img.nativeElement);

    tick(3001);
    fixture.detectChanges();

    expect(img.nativeElement).toHaveAttribute('src', component.images[1].src);
    expect(img.nativeElement).toHaveAttribute('alt', component.images[1].alt);
    console.log(img.nativeElement);

    tick(3001);
    fixture.detectChanges();

    expect(img.nativeElement).toHaveAttribute('src', component.images[2].src);
    expect(img.nativeElement).toHaveAttribute('alt', component.images[2].alt);
    console.log(img.nativeElement);
  }));

  // it('should not render the photo information if wrong', () => {
  //   const img = spectator.query("#carousel");

  //   expect(img).toHaveAttribute('src', wrongImage[0].src);
  //   expect(img).toHaveAttribute('alt', wrongImage[0].alt);
  // });
});

function getSlideElements(nativeElement: any) {
  throw new Error('Function not implemented.');
}
