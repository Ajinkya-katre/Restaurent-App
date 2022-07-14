import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './dashboard.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  restaurentModelObj: RestaurentData = new RestaurentData
  allRestaurentData: any;
  showAdd!:boolean;
  showbtn!:boolean;
  constructor(private formBuilder: FormBuilder, private api:ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    })
  //Now Suscribing our data which is maped via Services

   this.getAllData(); 
  }
    clickAddResto()
     {
       this.formValue.reset();
       this.showAdd=true;
       this.showbtn=false;
     }

  addResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res =>{
      console.log(res);
      alert("Restaurent Record Added Succesfully ")
      let ref = document.getElementById('clear');
      ref?.click();
      
      this.formValue.reset()
      this.getAllData()
    },
    err =>{
      alert("Something Went Wrong!!!")
    }
    )
  }
  
    //get alldata
    getAllData()
    {
      this.api.getRestaurent().subscribe(res=>{
        this.allRestaurentData = res;
      })
    }

    // delete
    deleteResto(data:any)
    {
      this.api.deleteRestaurent(data.id).subscribe(res => {
        alert('Record delete')
        this.getAllData();
      }
      )
    }

    onEditResto(data:any)
    {
      this.showAdd=false;
      this.showbtn=true;
      this.restaurentModelObj.id = data.id;
      this.formValue.controls['name'].setValue(data.name);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['mobile'].setValue(data.mobile);
      this.formValue.controls['address'].setValue(data.address);
      this.formValue.controls['services'].setValue(data.services);

    }
    updateResto()
    {
      this.restaurentModelObj.name = this.formValue.value.name;
      this.restaurentModelObj.email = this.formValue.value.email;
      this.restaurentModelObj.mobile = this.formValue.value.mobile;
      this.restaurentModelObj.address = this.formValue.value.address;
      this.restaurentModelObj.services = this.formValue.value.services;

      this.api.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
        alert('Restaurent Records Updated'); 
        let ref = document.getElementById('clear');
        ref?.click();
        
        this.formValue.reset();
        this.getAllData(); // when you post any data
      })
    }
}
function clickAddResto() {
  throw new Error('Function not implemented.');
}

function addClickResto() {
  throw new Error('Function not implemented.');
}

