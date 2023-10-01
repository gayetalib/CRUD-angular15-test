import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  destroy$:Subject<boolean> = new Subject();
  products!:Product[];

  constructor(private productService:ProductService, private router: Router){}

  ngOnInit(): void {
    this.onGetProducts();
  }

  onGetProducts(){
     this.productService.getProducts().subscribe({
        next:  (data) => {
          this.products = data;
          console.log(this.products);
        },
        error: (error) => {
          console.log(error);
        }
     });
  }

  onGetSelectedProducts(){
    this.productService.getSelectedProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) =>{
          console.log(error);

        }
      })
  }

  onGetAvailableProducts(){
    this.productService.getAvailableProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) =>{
          console.log(error);

        }
      })
  }

  onSearch(dataForm:any){
    //alert(dataForm.keyword);
    this.productService.getSearchProducts(dataForm.keyword)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) =>{
        console.log(error);

      }
    })
  }

  onSelect(p:Product){
    this.productService.selectProduct(p).subscribe({
      next: data => {
          p.selected = data.selected
      } ,
      error: error => {
        console.log(error);

      }
    })
  }

  onDelete(p:Product){
    let v = confirm("Etes vous sur de vouloir supprimer ? ")
    if(v==true)
    this.productService.deleteProduct(p)
    .subscribe({
        next: data => {
          this.onGetProducts();
        } ,
        error: error => {
          console.log(error);

        }
    })
  }

  onNewProduct(){
    this.router.navigate(['/new'])
  }

  onEdit(product:Product){
    this.router.navigate(['/edit/' + product.id ])
  }
}
