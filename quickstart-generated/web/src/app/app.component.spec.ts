//
// Source code generated by Celerio, a Jaxio product.
// Documentation: http://www.jaxio.com/documentation/celerio/
// Follow us on twitter: @jaxiosoft
// Need commercial support ? Contact us: info@jaxio.com
// Template pack-angular:web/src/app/app.component.spec.ts.p.vm
//
import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { AuthService } from "./service/auth.service";
import { MessageService } from "./service/message.service";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
          MessageService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should pass authentication check', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.authenticated).toEqual(false);
    fixture.detectChanges(); // will invoke ngOnInit
    fixture.whenStable().then(() => expect(app.authenticated).toEqual(true));

  }));
});


class AuthServiceMock {
  isAuthenticated() : Observable<boolean> {
    return Observable.create(observer => { observer.next(true);})
  }
}
