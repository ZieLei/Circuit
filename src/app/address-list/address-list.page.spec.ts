import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressListPage } from './address-list.page';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';

describe('AddressListPage', () => {
  let component: AddressListPage;
  let fixture: ComponentFixture<AddressListPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressListPage],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressListPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with mock addresses', () => {
    expect(component.addresses.length).toBe(2);
    expect(component.addresses[0].isDefault).toBe(true);
    expect(component.addresses[1].isDefault).toBe(false);
  });

  it('should navigate back to profile when goBack is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/tabs/profile']);
  });

  it('should navigate to edit-address for new address when addNewAddress is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.addNewAddress();
    expect(navigateSpy).toHaveBeenCalledWith(['/edit-address']);
  });

  it('should navigate to edit-address with id when editAddress is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const testAddress = component.addresses[0];
    component.editAddress(testAddress);
    expect(navigateSpy).toHaveBeenCalledWith(['/edit-address'], {
      queryParams: { id: testAddress.id }
    });
  });

  it('should set address as default when selectDefault is called', () => {
    component.selectDefault(component.addresses[1]);
    expect(component.addresses[0].isDefault).toBe(false);
    expect(component.addresses[1].isDefault).toBe(true);
  });
});
