import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItemType } from '../../model/menu.item.type';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  // providers: [MenuService],
})
export class MenuComponent implements OnInit {
  _menuService = inject(MenuService);
  _menuItems = signal<Array<MenuItemType>>([]);

  ngOnInit(): void {
    this._menuItems.set(this._menuService.menuItems);
    console.log(this._menuItems());
  }
}
