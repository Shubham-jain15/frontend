import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllProperties(SellRent: Number): Observable<IPropertyBase[]>{
    return this.http.get('data/properties.json').pipe(
        map(data => {
          const propertiesArray: Array<IPropertyBase> = [];
          for (const id in data){
            if(data[id].SellRent == SellRent)
            propertiesArray.push(data[id]);
          }
          return propertiesArray;
        })
    );
  }
}
