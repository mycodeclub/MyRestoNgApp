export type MenuItems = MenuItem[];

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  pricing: Pricing[];
  isAvilable: boolean;
  foodItemImg: any;
  foodItemImgUrl?: string;
  categoryId: number;
  category: any;
  ingredients?: string;
  recipe?: string;
  lastUpdate: string;
  createDate: string;
  quantity: number;
};

export interface Pricing {
  id: number;
  foodItemId: number;
  quantityDesciption: string;
  cost: number;
}
