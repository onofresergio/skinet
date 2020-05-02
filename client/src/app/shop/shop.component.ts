import { ShopParams } from './../shared/models/shopParams';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/products';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(resp => {
      this.products = resp.data;
      this.shopParams.pageNumber = resp.pageIndex;
      this.shopParams.pageSize = resp.pageSize;
      this.totalCount = resp.count;
    }, erro => {
      console.log(erro);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe(resp => {
      this.brands = [{id: 0, name: 'All'}, ...resp];
    },
    erro => {
      console.log(erro);
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(resp => {
      this.types = [{id: 0, name: 'All'}, ...resp];
    },
    erro => {
      console.log(erro);
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
  }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
