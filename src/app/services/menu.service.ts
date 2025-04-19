import { inject, Injectable } from '@angular/core';
import { MenuItemType } from '../model/menu.item.type';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../model/menuItems';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  http = inject(HttpClient);
  menuItems: Array<MenuItemType> = [
    {
      title: 'Item 1',
      userId: 1,
      completed: false,
      id: 1,
    },
    {
      title: 'Item 2',
      userId: 2,
      completed: true,
      id: 2,
    },
    {
      title: 'Item 3',
      userId: 3,
      completed: false,
      id: 3,
    },
    {
      title: 'Item 4',
      userId: 4,
      completed: true,
      id: 4,
    },
  ];
  getToDosApi() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<Array<MenuItemType>>(url);
  }
  getMenuItemsFromApi() {
    const url = 'http://restro.bitprosofttech.com/api/FoodItems';
    return this.http.get<Array<MenuItem>>(url);
  }
  constructor() {}
}
