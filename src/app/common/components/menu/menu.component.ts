import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private cookiesService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.cookiesService.delete("isAuthenticated");
    this.cookiesService.delete("token");
    this.router.navigateByUrl("");
  }

}
