import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/http/auth.service';
import { SessionService } from 'ng-urxnium';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  form: FormGroup;
  load: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.load = false;
    this.createForm();
  }

  signIn() {
    if (this.form.invalid) {
      return;
    }

    this.load = true;
    this.form.disable();

    this.authService.signIn(this.form.value).subscribe(resp => {
      this.sessionService.signIn(resp.data.session, resp.data);
      this.router.navigate(['period']);
      this.load = false;
      this.form.get('userName').enable();
      this.form.get('password').enable();
    }, ({ error }) => {
      this.form.enable();

      if (error.message.includes('usuario')) this.form.get('userName')
        .setErrors({ server: error.message });

      if (error.message.includes('contraseña')) this.form.get('password')
        .setErrors({ server: error.message });

      this.load = false;
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
