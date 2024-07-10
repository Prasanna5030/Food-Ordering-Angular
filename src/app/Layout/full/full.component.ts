import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() { }



  openRegistrationPage(){
    this.router.navigateByUrl("signup");
    console.log("Signup called")
  }


  openLoginPage(){
    this.router.navigateByUrl("login");
  }




  actions: Array<{ id: Number; text: String; icon: String }> = [
    { id: 1, text: 'My profile', icon: 'user' },
    { id: 2, text: 'Messages', icon: 'email' },
    { id: 3, text: 'Contacts', icon: 'group' },
    { id: 4, text: 'Log out', icon: 'runner' }
];
dropDownOptions = {
    height: 150
};

logAction(e:any) {
    console.log(e.itemData.text + ' was clicked');
}

logButtonClick() {
    console.log('Main button was clicked');
}
}
