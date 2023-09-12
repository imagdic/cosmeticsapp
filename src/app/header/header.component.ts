import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  user: any;
  userEmail: string | null = null;
  items: MenuItem[] = [];
  selectedProduct: any;
  searchValue: string = '';
  productsForDropdown: any[] = [];
  searchTimeout: any;


  constructor(private authService: AuthService, private router: Router, private productService: ProductsService,
    private elRef: ElementRef) { }

  isMenuActive = false;

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        this.authService.getCurrentUser().subscribe((user) => {
          this.user = user;
          this.userEmail = user ? user.email : null;
          this.setMenuItems(true);
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
          label: 'Hair',
          command: (event) => { this.navigateToCategory('Hair Care'); }
        },
        {
          label: 'Skin',
          command: (event) => { this.navigateToCategory('Skin Care'); }
        },
        {
          label: 'Body',
          command: (event) => { this.navigateToCategory('Body Care'); }
        },
        {
          label: this.user ? this.user.email : 'User',
          icon: 'pi pi-user',
          items: [
            {
              label: 'Wishlist',
              icon: 'pi pi-fw pi-heart',
              routerLink: '/wishlist'
            },
            {
              label: 'Logout',
              icon: 'pi pi-power-off',
              command: () => { this.logout(); }
            }
          ]
        }
      ];
    } else {
      this.items = [
        {
          label: 'Hair',
          command: (event) => { this.navigateToCategory('Hair Care'); }
        },
        {
          label: 'Skin',
          command: (event) => { this.navigateToCategory('Skin Care'); }
        },
        {
          label: 'Body',
          command: (event) => { this.navigateToCategory('Body Care'); }
        },
        {
          label: 'Login',
          icon: 'pi pi-user',
          routerLink: '/login'
        }
      ];
    }
  }

  logout() {
    this.authService.logout();
    this.setMenuItems(false);
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/category', category]);
  }

  onSearch(inputValue: string): void {
    if (inputValue && inputValue.trim() !== '') {
      this.productService.searchProductsByName(inputValue).subscribe(products => {
        this.productsForDropdown = products;
      });
    } else {
      this.productsForDropdown = [];
    }
  }

  onProductSelect(product: any): void {
    this.selectedProduct = product;
    this.productsForDropdown = [];

    if (this.selectedProduct && this.selectedProduct.id) {
      this.router.navigate(['/product', this.selectedProduct.id]);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target) && this.isMenuActive) {
      this.isMenuActive = false;
    }
  }

}
