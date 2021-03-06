import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(
    public crudservice: CrudService,
  ) { }

  ngOnInit(): void {

    // Get All products through api
    this.crudservice.getAll().subscribe((data: Product[]) =>{
      console.log(data);
      this.products = data;
    })
  }


}
