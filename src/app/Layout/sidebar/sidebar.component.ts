import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItems } from '../../shared/menu-items';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent  implements OnInit{
  userService!:UserService

  mobileQuery: MediaQueryList;
  userRole:any;
  token:any | '' ='';
  tokenPayload:any;

  private _mobileQueryListener: () => void;

  constructor(
    userService: UserService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems:MenuItems
  ) {
    this.tokenPayload=  '';
    this.userRole= this.tokenPayload?.authorities || '';
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    try{
    this.token=localStorage.getItem('token')
    }catch(error){
      console.error('Error accessing localStorage:', error);
      
      this.token = '';
    }
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
