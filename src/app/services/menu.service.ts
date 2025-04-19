import { Injectable } from '@angular/core';
import { MenuItemType } from '../model/menu.item.type';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
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
  constructor() {}
}
