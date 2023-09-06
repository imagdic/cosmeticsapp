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

  items: MenuItem[] = []; // Initialized as empty

  constructor(private authService: AuthService) { }

  isDropdownOpen = false;

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        this.authService.getCurrentUser().subscribe((user) => {
          this.user = user;
          this.userEmail = user ? user.email : null;
          this.setMenuItems(true);
          if (this.user) {
            this.items[0].label = this.user.email;
          } else {
            this.items[0].label = 'User';
          }
        });
      } else {
        this.user = null;
        this.userEmail = null;
        this.setMenuItems(false);
      }
    });
  }

  setMenuItems(isAuthenticated: boolean): void {
    if (isAuthenticated) {
      this.items = [
        {
          label: 'User', // Default label
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
    } else {
      this.items = [
        {
          label: 'User',
          icon: 'pi pi-user',
        },
        {
          label: 'Wishlist',
          icon: 'pi pi-fw pi-heart',
          routerLink: '/wishlist',
        },
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          routerLink: '/login'
        }
      ];
    }
  }

  logout() {
    this.authService.logout();
    this.setMenuItems(false); // Reset menu items after logout
  }
}
