import { Component, EventEmitter, Output } from '@angular/core';
import { ActionEvent, ProductActionType } from 'src/app/enums/product.enum';

@Component({
  selector: 'app-navbar-product',
  templateUrl: './navbar-product.component.html',
  styleUrls: ['./navbar-product.component.css']
})
export class NavbarProductComponent {

  @Output() productEventEmetter:EventEmitter<ActionEvent> = new EventEmitter();

  onGetProducts(){
    this.productEventEmetter.emit({type: ProductActionType.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts(){
    this.productEventEmetter.emit({type: ProductActionType.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts(){
    this.productEventEmetter.emit({type: ProductActionType.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct(){
    this.productEventEmetter.emit({type: ProductActionType.NEW_PRODUCT});
  }

  onSearch(value:string){
    this.productEventEmetter.emit({type: ProductActionType.SEARCH_PRODUCT, payload: value});
  }

}
