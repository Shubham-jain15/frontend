import { HousingService } from 'src/app/services/housing.service';
import { Component, OnInit} from "@angular/core";
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Array<IPropertyBase> = [];

  constructor(private route:ActivatedRoute, private housingService: HousingService){}

  ngOnInit(): void {
      if(this.route.snapshot.url.toString()){
        this.SellRent=2;
      }
      this.housingService.getAllProperties(this.SellRent).subscribe(
        data=>{
          this.properties=data;
          // const newProperty = JSON.parse(localStorage.getItem('newProp') as string);

          // if(newProperty.SellRent == this.SellRent){
          //   this.properties = [newProperty, ...this.properties];
          // }            
          console.log(this.route.snapshot.url.toString())
        }, error => {
          console.log(error);
        }
      )
      
  }
}
