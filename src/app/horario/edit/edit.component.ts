import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  opciones : [] = [];
  id: number;
  horario :  any;
  clase_id : any;

  constructor(
    public horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['idhorarios'];
    this.horarioService.buscarHorario(this.id)
    .subscribe( response => {
      this.horario = response.result;
      this.clase_id = response.result.clase_id;

      this.initializeForm();
    });
    this.horarioService.obtenerListaClase()
      .subscribe(response => {
        this.opciones = response.result;
      });




  }




  get f(){
    return this.form.controls;
  }

  initializeForm(): void {
    this.form = new FormGroup({
      clase_id:       new FormControl(this.clase_id, [ Validators.required ]),
      fecha:          new FormControl(this.horario.fecha, [ Validators.required, ]),
      hora_inicio:    new FormControl(this.horario.hora_inicio, [ Validators.required, ]),
      hora_final:     new FormControl(this.horario.hora_final, [ Validators.required, ]),
    });
  }

  submit(){
    console.log(this.form.value);
    this.horarioService.create(this.form.value).subscribe(res => {
         console.log('Horario created successfully!');
         this.router.navigateByUrl('horarios/index');
    })
  }

}
