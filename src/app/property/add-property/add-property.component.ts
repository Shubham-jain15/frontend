import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  addPropertyForm: FormGroup;
  nextClicked: boolean;

  propertyTypes: Array<string> = ['House','Apartment','Duplex'];
  furnishTypes: Array<string> = ['Semi','Fully','Unfurnished'];
  directions: Array<string> = ['North','East','South','West'];
  bhk: Array<number>= [1,2,3,4];

  propertyView: IPropertyBase = {
    id: 1,
    name: 'Default',
    price: 1,
    sellRent: 1,
    propertyType: '',
    furnishingType:'',    
    bhk: 1,
    builtArea: 1,
    city: '',   
    readyToMove: false,
    estPossessionOn: ''
  };

  constructor(private fb:FormBuilder , private route: Router) { 
    this.formTabs = {} as TabsetComponent;
    this.addPropertyForm = {} as FormGroup;
    this.nextClicked = false as boolean;
  }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1',Validators.required],
        PType: [null,Validators.required],
        Name: [null,Validators.required],
      }),  
      PriceInfo: this.fb.group({
        Price: [null,Validators.required],
        BuiltArea: [null,Validators.required],
        CarpetArea: [null],
        Security: [0],
        Maintenance: [0]
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),
      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null, Validators.required],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
     })
    });
  }

  get BasicInfo()
  {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo()
  {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo()
  {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }

  get SellRent()
  {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
}

get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
}

get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
}

get City() {
    return this.BasicInfo.controls['City'] as FormControl;
}

get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
}

get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
}

get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
}

get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
}

get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
}

get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
}

get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
}

get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
}

get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
}

get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
}

get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
}

get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
}

get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
}

get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
}

get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
}

  onBack()
  {
    this.route.navigate(['/']);
  }

  onSubmit()
  {
    this.nextClicked = true;
    if(this.BasicInfo.invalid)
    {
      this.formTabs.tabs[0].active = true;
    } 
    if(this.PriceInfo.invalid)
    {
      this.formTabs.tabs[1].active = true;
    } 
    if(this.OtherInfo.invalid)
    {
      this.formTabs.tabs[3].active = true;
    } 
    if(this.AddressInfo.invalid)
    {
      this.formTabs.tabs[2].active = true;
    } 
    console.log('Form submitted');
    console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm)
  }

  selectTab(tabId : number, IsCurrentTabValid: boolean)
  {
    this.nextClicked = true;
    if(IsCurrentTabValid){
      this.formTabs.tabs[tabId].active = true;
    }  
  }
}
