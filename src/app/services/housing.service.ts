import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
 
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getProperty(id:number)
  {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.id === id) as Property; 
      })
    )
  }

  getAllProperties(SellRent?: Number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map((data: any) => {
        const propertiesArray: Array<IPropertyBase> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp') || '[]');       
        localProperties.forEach((property: Property) => {     
          if(SellRent)
          {
            if (property.sellRent === SellRent) {            
              propertiesArray.push(property);              
            }
          }   
          else
          {
            propertiesArray.push(property);            
          }
        });
        data.forEach((property: Property) => {
          if(SellRent)
          {
            if (property.sellRent === SellRent) {            
              propertiesArray.push(property);              
            }
          }   
          else
          {
            propertiesArray.push(property);           
          }
          console.log(propertiesArray);
        });        
        return propertiesArray;
      })
    );
  }

  addProperty(property: Property): void {
    let newProp: Property[] = JSON.parse(localStorage.getItem('newProp') || '[]');
    console.log('Property to be added to localStorage:', property);
    newProp.push(property);
    localStorage.setItem('newProp', JSON.stringify(newProp));
    console.log('Property added to localStorage:', newProp);
  }

  newPropID(){
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID',String(+(localStorage.getItem('PID') as string)+1));
      return +(localStorage.getItem('PID') as string);
    }
    else{
      localStorage.setItem('PID','101');
      return 101;
    }
  }
}
