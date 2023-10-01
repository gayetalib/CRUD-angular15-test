import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionEvent, ProductActionType } from 'src/app/enums/product.enum';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  @Input() product!: Product;
  @Input() order!:number;
  @Output() productEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  ngOnInit(): void {

  }

  onSelect(product: Product){
    this.productEmitter.emit({type:ProductActionType.SELECT_PRODUCT, payload:product});
  }

  onDelete(product: Product){
    this.productEmitter.emit({type:ProductActionType.DELETE_PRODUCT, payload:product});
  }

  onEdit(product: Product){
    this.productEmitter.emit({type:ProductActionType.EDIT_PRODUCT, payload:product});
  }

}
