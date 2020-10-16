import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsService} from '../forms.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  var;

  profileForm = new FormGroup({
    Name: new FormControl('',Validators.required),
    Email: new FormControl('',Validators.required),
    Feedback: new FormControl('',Validators.required),
    Comments: new FormControl(''),
  });

  constructor(private formservice : FormsService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() : void{
    this.formservice.getForm()
        .subscribe((data : any) => {
          this.profileForm.setValue({
            Name: data.name, 
            Email: data.email,
            Feedback:data.feedback,
            Comments:data.comment
          });          
        });
  }

  PostData() : void{    
    this.formservice.PostForm(this.profileForm.value)
        .subscribe((data : any) => {
          console.log(data);
        });

  }

}
