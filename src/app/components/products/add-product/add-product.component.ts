import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  formGroup!: FormGroup;
  submitted: boolean = false;

  constructor(private fb:FormBuilder, private productService:ProductService, private router:Router){}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
       name: ["", [Validators.required,Validators.minLength(3)]],
       price: [500, [Validators.required, Validators.min(500)]],
       quantity: [0, Validators.required],
       selected: [true, Validators.required],
       available: [true, Validators.required]
    })
  }

  onSaveProduct(){
    this.submitted = true;
    if(this.formGroup.invalid) return;
    this.productService.saveProduct(this.formGroup.value)
       .subscribe( data => {
            alert('Product added successfully');
            this.router.navigateByUrl('/')
       })
  }

}
