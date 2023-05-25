import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../horario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  opciones : [] = [];

  constructor(
    public horarioService: HorarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      clase_id:       new FormControl('', [ Validators.required ]),
      fecha:          new FormControl('', [ Validators.required, ]),
      hora_inicio:    new FormControl('', [ Validators.required, ]),
      hora_final:     new FormControl('', [ Validators.required, ]),
    });

    this.horarioService.obtenerListaClase()
      .subscribe(response => {
        this.opciones = response.result;
      });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.horarioService.create(this.form.value).subscribe(res => {
         console.log('Horario created successfully!');
         this.router.navigateByUrl('horarios/index');
    })
  }

}
