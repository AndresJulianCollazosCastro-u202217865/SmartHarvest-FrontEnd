import {Component, inject} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {UserService} from '../../services/user-service';
import {User} from '../../model/user';

@Component({
  selector: 'app-sign-up-component',
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
  ],
  templateUrl: './sign-up-component.html',
  styleUrl: './sign-up-component.css'
})
export class SignUpComponent {
  SignUpForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  edicion:Boolean = false;
  route:ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.SignUpForm = this.fb.group({
      userId: [''],
      userName: ['', Validators.required],
      userEmail: ['', [ Validators.required, Validators.email ]],
      userPassword: ['', Validators.required],
      userLocation: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    })
  }

  onSubmit() {
    if(this.SignUpForm.valid){
      console.log('FORM VALUE:', this.SignUpForm.value);
      const user:User = new User();
      user.userId = this.id;
      user.userName = this.SignUpForm.value.userName;
      user.userEmail = this.SignUpForm.value.userEmail;
      user.userPassword = this.SignUpForm.value.userPassword;
      user.userLocation = this.SignUpForm.value.userLocation;

      this.userService.insert(user)
        .subscribe((data) => {
          console.log(data);
        });
    }else{
      console.log("Formulario no valido")
    }
 }
}
