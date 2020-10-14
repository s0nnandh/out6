import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  profileForm = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    Feedback: new FormControl(''),
    Comments: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
