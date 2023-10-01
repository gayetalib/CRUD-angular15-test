import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionEvent, ProductActionType } from 'src/app/enums/product.enum';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit{

  ngOnInit(): void {

  }

  destroy$:Subject<boolean> = new Subject();
  @Input() products!:Product[];
  @Output() listEventEmetter: EventEmitter<ActionEvent> = new EventEmitter();
  p!:Product;


  onSelect(p:Product){
    this.listEventEmetter.emit({type:ProductActionType.SELECT_PRODUCT, payload:p});
  }

  onDelete(product:Product){
    this.listEventEmetter.emit({type:ProductActionType.DELETE_PRODUCT, payload:product})
  }

  onEdit(product:Product){
    this.listEventEmetter.emit({type:ProductActionType.EDIT_PRODUCT, payload:product})
  }

  onActionEvent($event:ActionEvent){
    this.listEventEmetter.emit($event);
    // or ....
    // switch ($event.type) {
    //   case ProductActionType.SELECT_PRODUCT:
    //     this.onSelect($event.payload);
    //     break;

    //     case ProductActionType.EDIT_PRODUCT:
    //     this.onEdit($event.payload);
    //     break;

    //     case ProductActionType.DELETE_PRODUCT:
    //     this.onDelete($event.payload);
    //     break;

    //   default:
    //     break;
    // }
  }

}
