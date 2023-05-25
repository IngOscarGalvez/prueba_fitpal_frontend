import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../clase.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    public claseService: ClaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre:       new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      descripcion:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
    });


  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.claseService.create(this.form.value).subscribe(res => {
         console.log('clase created successfully!');
         this.router.navigateByUrl('clase/index');
    })
  }

}
