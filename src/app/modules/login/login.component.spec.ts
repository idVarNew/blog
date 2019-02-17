import { EmailComponent } from './email/email.component';
import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { LoginComponent } from './login.component';
import { PasswordComponent } from './password/password.component';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoginRoutingModule } from './login-routing.module';
import { AngularFireAuth } from 'angularfire2/auth';

describe('Login component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element;
  const formBuilder: FormBuilder = new FormBuilder();

  const authStub: any = {
    authState: {},
    auth: {
      signInWithEmailAndPassword() {
        return Promise.resolve();
      }
    }
  };

  beforeEach(async(() => {
    const authenticationMock: AuthenticationService = jasmine.createSpyObj('AuthenticationService', ['login']);

    const mockAngularFireAuth: any = {
      auth: jasmine.createSpyObj('AuthenticationService', {
        login: function() {}
      })
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent, EmailComponent, PasswordComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, LoginRoutingModule],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        ChangeDetectorRef,
        { provide: AuthenticationService, useValue: authenticationMock },
        { provide: AngularFireAuth, useValue: authStub }
      ]
    }).compileComponents();
    authStub.authState = of(null);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    element = fixture.debugElement.nativeElement;
    component = fixture.debugElement.componentInstance;

    component.loginForm = formBuilder.group({
      email: '',
      password: ''
    });

    fixture.detectChanges();
  });

  describe('Login form', () => {
    it('should form be valid on valid values', () => {
      component.loginForm.controls['email'].setValue('test@test.com');
      component.loginForm.controls['password'].setValue('1245');
      expect(component.loginForm.valid).toBeTruthy();
    });

    it('should form be invalid on invalid email', () => {
      component.loginForm.controls['email'].setValue('test');
      expect(component.loginForm.valid).toBeFalsy();
      component.loginForm.controls['password'].setValue('');
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should form be invalid on empty password', () => {
      component.loginForm.controls['password'].setValue('');
      expect(component.loginForm.valid).toBeFalsy();
    });
  });

  describe('Login form', () => {
    it('should call login method on click', async(() => {
      component.loginForm.controls['email'].setValue('test@test.com');
      component.loginForm.controls['password'].setValue('12345');
      expect(component.loginForm.valid).toBeTruthy();

      spyOn(component, 'signIn');

      fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);

      fixture.detectChanges();

      expect(component.signIn).toHaveBeenCalled();
    }));


    it('should call signInWithPasswordAndEmail', inject([AuthenticationService], (service: AuthenticationService) => {
      component.loginForm.controls['email'].setValue('sample@sampleblog.com');
      component.loginForm.controls['password'].setValue('12345');
      expect(component.loginForm.valid).toBeTruthy();

      const user = {
        email: 'sample@sample.pl',
        password: '1477'
      };

      const mock = TestBed.get(AngularFireAuth);
      mock.auth = authStub.auth;

      service.login(user);
      expect(service.login).toHaveBeenCalled();
      expect(service.login).toHaveBeenCalledWith(user);
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
