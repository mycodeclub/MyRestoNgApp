import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItemType } from '../../model/menu.item.type';
import { MenuItems } from '../../model/menuItems';
import { MenuItem } from '../../model/menuItems';

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
    this._menuService.getMenuItemsFromApi().subscribe((data) => {
      this._menuItems.set(data);
      console.log(this._menuItems());
    });
    //    this._menuItems.set(this._menuService.menuItems);
    //   console.log(this._menuItems());
  }
}
