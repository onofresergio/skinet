import { IPagination } from './models/pagination';
import { IProduct } from './models/products';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Skinet';
  products: IProduct[];

    constructor(private http: HttpClient){}

  ngOnInit() {
    this.http.get('https://localhost:5001/api/products?pageSize=50')
      .subscribe((resp: IPagination) => {
      this.products = resp.data;
    }, erro => {
      console.log(erro);
    }
    );
  }
}
