import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    //CarouselModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
