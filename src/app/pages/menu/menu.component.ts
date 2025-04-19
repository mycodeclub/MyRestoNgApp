import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItemType } from '../../model/menu.item.type';
import { MenuItems } from '../../model/menuItems';
import { MenuItem } from '../../model/menuItems';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  // providers: [MenuService],
})
export class MenuComponent implements OnInit {
  _menuService = inject(MenuService);
  _menuItems = signal<Array<MenuItem>>([]);

  ngOnInit(): void {
    this._menuService
      .getMenuItemsFromApi()
      .pipe(
        catchError((err) => {
          console.error('Error fetching menu items:', err);
          throw err;
        })
      )
      .subscribe((data) => {
        this._menuItems.set(data);
      });
  }
}
