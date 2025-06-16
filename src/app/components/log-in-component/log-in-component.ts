import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {AuthService} from '../../services/auth-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthRequest} from '../../model/auth-request';

@Component({
  selector: 'app-log-in-component',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './log-in-component.html',
  styleUrl: './log-in-component.css'
})
export class LogInComponent {

  LogInForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route:ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.LogInForm = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.LogInForm.valid) {
      console.log('FORM VALUE:', this.LogInForm.value);
      const cred: AuthRequest = new AuthRequest();
      cred.username = this.LogInForm.value.userName
      cred.password = this.LogInForm.value.userPassword

      this.authService.login(cred).subscribe({
        next: () => {
          this.router.navigateByUrl('/SmartHarvest/dashboard');
        },
      })
    }else {
      console.log("Formulario no valido")
    }
  }
}
