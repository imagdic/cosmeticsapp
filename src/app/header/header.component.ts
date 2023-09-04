import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  userEmail: string | null = null;

  items: MenuItem[] = [
    {
      label: this.userEmail || 'User', // Postavite inicijalnu vrednost
      icon: 'pi pi-user',
    },
    {
      label: 'Wishlist',
      icon: 'pi pi-fw pi-heart',
      routerLink: '/wishlist',
    },
    {
      label: 'Logout',
      icon: 'pi pi-power-off',
      command: () => {
        this.logout();
      }
    }
  ];

  constructor(private authService: AuthService) { }

  isDropdownOpen = false;

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.userEmail = user ? user.email : null; // Postavi userEmail na email korisnika ili null ako korisnik nije prijavljen

      // Ažurirajte label atribut za "User" stavku
      if (this.user) {
        this.items[0].label = this.user.email;
      } else {
        this.items[0].label = 'User';
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
