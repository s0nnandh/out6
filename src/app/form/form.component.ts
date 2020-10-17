import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsService} from '../forms.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  var;

  str = 'Hello';

  profileForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    feedback: new FormControl('',Validators.required),
    comment: new FormControl(''),
  });

  constructor(private formservice : FormsService) { }

  

  ngOnInit(): void {
    this.getData()
  }

  getData() : void{
    this.formservice.getForm()
        .subscribe((data : any) => {
          this.profileForm.setValue({
            name: data.name, 
            email: data.email,
            feedback:data.feedback,
            comment:data.comment
          });          
        });
  }

  PostData() : void{  
    console.log(this.profileForm.value)  
    this.formservice.PostForm(this.profileForm.value)
        .subscribe(          
          data => {
            console.log(data)
            this.profileForm.setValue({
              name: '', 
              email:  '',
              feedback:'',
              comment:''
            });                
          },
          error => console.error('Error',error)        
        );

  }

}
