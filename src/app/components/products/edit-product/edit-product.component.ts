import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  productId:number;
  product!:Product;
  formGroup!:FormGroup;
  submitted: boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private fb:FormBuilder,
    private router:Router){
     this.productId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId)
      .subscribe({
        next: data => {
          this.formGroup = this.fb.group({
            name: [data.name, [Validators.required,Validators.minLength(3)]],
            price: [data.price, [Validators.required, Validators.min(500)]],
            quantity: [data.quantity, Validators.required],
            selected: [data.selected, Validators.required],
            available: [data.available, Validators.required]
         })
        }
      });
  }

  onUpdate(){
    this.submitted = true;
    if(this.formGroup.invalid) return;
    this.productService.editProduct(this.productId, this.formGroup.value)
    .subscribe(data => {
      alert('Product updated successfully !');
      this.router.navigateByUrl('/');
    })
  }

}
