import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/models/pagination';
import { IProduct } from './shared/models/products';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Skinet';

    constructor(private basketService: BasketService){}

  ngOnInit() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('Initialized basket');
      }, error => {
        console.log(error);
      });
    }
  }
}
