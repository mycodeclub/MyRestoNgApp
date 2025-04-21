import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { MenuItem, Pricing } from '../../model/menuItems';

@Component({
  selector: 'app-add-menu-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: 'add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.scss']
})
export class AddMenuItemComponent {
  private menuService = inject(MenuService);
  private fb = inject(FormBuilder);

  menuItemForm: FormGroup;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor() {
    this.menuItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      ingredients: [''],
      recipe: [''],
      isAvailable: [true],
      pricing: this.fb.array([this.createPricingGroup()])
    });
  }

  get pricingArray(): FormArray {
    return this.menuItemForm.get('pricing') as FormArray;
  }

  createPricingGroup(): FormGroup {
    return this.fb.group({
      quantityDescription: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]]
    });
  }

  addPricing(): void {
    this.pricingArray.push(this.createPricingGroup());
  }

  removePricing(index: number): void {
    this.pricingArray.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.menuItemForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.menuItemForm.get('name')?.value);
      formData.append('description', this.menuItemForm.get('description')?.value);
      formData.append('categoryId', this.menuItemForm.get('categoryId')?.value);
      formData.append('ingredients', this.menuItemForm.get('ingredients')?.value);
      formData.append('recipe', this.menuItemForm.get('recipe')?.value);
      formData.append('isAvailable', this.menuItemForm.get('isAvailable')?.value);
      formData.append('pricing', JSON.stringify(this.menuItemForm.get('pricing')?.value));
      formData.append('image', this.selectedFile);

      this.menuService.addMenuItem(formData).subscribe({
        next: (response: MenuItem) => {
          alert('Menu item added successfully!');
          this.resetForm();
        },
        error: (error: Error) => {
          console.error('Error adding menu item:', error);
          alert('Error adding menu item. Please try again.');
        }
      });
    }
  }

  resetForm(): void {
    this.menuItemForm.reset({
      isAvailable: true
    });
    this.pricingArray.clear();
    this.addPricing();
    this.imagePreview = null;
    this.selectedFile = null;
  }
} 