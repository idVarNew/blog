import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userEmail: string;
  navVisible = false;
  constructor(private router: Router, private serviceAuth: AuthenticationService) {}

  ngOnInit() {
    this.serviceAuth.user.subscribe(user => {
      if(user){
        this.userEmail = user.email;
      }
     
    });
  }
  changeNavVisible(value: boolean){
    this.navVisible = value
  }
  logout() {
    localStorage.removeItem('userBlogApp');
    this.serviceAuth.logout();
    this.router.navigate(['/login']);
  }
}
