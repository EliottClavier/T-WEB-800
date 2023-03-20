import { HeaderComponent } from './header.component'
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ HeaderComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to /login when login button is clicked', () => {
    spyOn(component['router'], 'navigate');

    const loginButton = fixture.nativeElement.querySelector('.login');
    loginButton.click();

    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to /register when register button is clicked', () => {
    spyOn(component['router'], 'navigate');

    const registerButton = fixture.nativeElement.querySelector('.register');
    registerButton.click();

    expect(component['router'].navigate).toHaveBeenCalledWith(['/register']);
  });
})
