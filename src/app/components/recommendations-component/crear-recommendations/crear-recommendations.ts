import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {RecomendacionesService} from '../../../services/recommendations-service';
import {Router} from '@angular/router';
import {Recomendaciones} from '../../../model/recommendations';

@Component({
  selector: 'app-crear-recommendations',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatButton,
    MatOption,
    MatFormFieldModule, //add
    MatInputModule, //add
    MatDatepickerModule, // add
    MatNativeDateModule, //add
  ],
  templateUrl: './crear-recommendations.html',
  styleUrl: './crear-recommendations.css'
})
export class CrearRecommendations {
  formulario: FormGroup;
  recommendationService = inject(RecomendacionesService);
  categorias = [
    {id_category: 'FERTILIZACIÓN', tipo: 'FERTILIZACIÓN'},
    {id_category: 'RIEGO', tipo: 'RIEGO'},
    {id_category: 'ROTACIÓN DE CULTIVOS', tipo: 'ROTACIÓN DE CULTIVOS'},
  ]

  constructor(private fb: FormBuilder, private router: Router){
    this.formulario = this.fb.group({
      recommendationId: [null],
      rTitle: ['', Validators.required],
      rDescription: ['', Validators.required],
      rCategory: [null, Validators.required],
    });
  }

  onSubmit(){
    if(this.formulario.valid){
      alert("Ok");
      let recommendation = new Recomendaciones();
      recommendation = this.formulario.value;
      console.log(recommendation);
      this.recommendationService.insert(recommendation).subscribe({
        next: result => {
          console.log("Recomendación registrada ", result);
          alert("Recomendación registrada exitosamente");
          this.router.navigate(['/recommendations']);
          this.formulario.reset();
        },
        error: error => {
          console.log(error);
          alert("Error, no se puede registrar");
        }
      })
    } else{
      alert("Form incorrecto");
      this.formulario.markAsTouched();
    }
  }
}
