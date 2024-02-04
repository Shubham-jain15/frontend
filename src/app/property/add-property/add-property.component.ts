import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  propertyTypes: Array<string> = ['House','Apartment','Duplex'];
  furnishTypes: Array<string> = ['Semi','Fully','Unfurnished'];
  directions: Array<string> = ['North','East','South','West'];


  constructor(private route: Router) { 
    this.formTabs = {} as TabsetComponent
  }

  ngOnInit() {
  }

  onBack()
  {
    this.route.navigate(['/']);
  }

  onSubmit()
  {
    console.log('Form submitted')
    console.log(this.addPropertyForm)
  }

  selectTab(tabId : number)
  {
    this.formTabs.tabs[tabId].active = true;
  }
}
