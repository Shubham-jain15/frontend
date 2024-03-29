import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/app/model/property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId : number = 1 ;
  property = new Property();
  constructor(private route:ActivatedRoute, private router: Router, private housingService: HousingService) {
    this.property = {} as Property;
   }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: any) => {
        this.property = data['prp'];
      }
    );
    this.route.params.subscribe(
      (params) => {
        this.propertyId = Number([params['id']]);
        this.housingService.getProperty(this.propertyId).subscribe(
          (data: Property) => { 
            this.property = data;
          }, error => this.router.navigate(['/'])
        );
      }
    )
  }

 
}
