import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../clase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  clase: any;
  form: FormGroup;

  constructor(
    public claseService: ClaseService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idclase'];
    this.claseService.buscarClase(this.id)
      .subscribe(response => {
        this.clase = response.result;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      nombre: [this.clase.nombre, [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
      descripcion: [this.clase.descripcion, [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.claseService.update(this.id, this.form.value).subscribe(res => {
      console.log('Clase updated successfully!');
      this.router.navigateByUrl('clase/index');
    });
  }
}
