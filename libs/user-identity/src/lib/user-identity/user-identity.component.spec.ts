import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserIdentityComponent } from './user-identity.component';

describe('UserIdentityComponent', () => {
  let component: UserIdentityComponent;
  let fixture: ComponentFixture<UserIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserIdentityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
