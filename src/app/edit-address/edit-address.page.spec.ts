import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAddressPage } from './edit-address.page';
import { Router, ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('EditAddressPage', () => {
  let component: EditAddressPage;
  let fixture: ComponentFixture<EditAddressPage>;
  let router: Router;

  const mockActivatedRoute = {
    queryParams: of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAddressPage],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAddressPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize as new address by default', () => {
    expect(component.isNewAddress).toBe(true);
    expect(component.pageTitle).toBe('Add Address');
  });

  it('should initialize with empty address fields for new address', () => {
    expect(component.address.fullName).toBe('');
    expect(component.address.phone).toBe('');
    expect(component.address.street).toBe('');
    expect(component.address.city).toBe('');
    expect(component.address.postalCode).toBe('');
    expect(component.address.country).toBe('');
  });

  it('should navigate back to address-list when goBack is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/address-list']);
  });

  it('should navigate back to address-list when saveAddress is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.saveAddress();
    expect(navigateSpy).toHaveBeenCalledWith(['/address-list']);
  });

  it('should load existing address when addressId is provided', () => {
    component.loadAddress('1');
    expect(component.address.fullName).toBe('Hitori Gotoh');
    expect(component.address.city).toBe('Setagaya-ku Tokyo');
  });
});
