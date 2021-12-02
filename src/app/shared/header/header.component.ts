import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormIndicatorComponent } from '../form-indicator/form-indicator.component';
import { FaqComponent } from '../faq/faq.component';
import { SessionService } from 'ng-urxnium';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  signIn: boolean;

  private warning: boolean;

  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.warning = false;
    this.subscribeOnSingIn();
  }

  onSignOut(): void {
    this.sessionService.signOut();
    this.router.navigate(['auth']);
  }

  onSettings(): void {
    this.dialog.open(
      FormIndicatorComponent,
      {
        maxWidth: 'none',
        maxHeight: 'none',
        width: '40%',
        height: '393px'
      }
    );
  }

  onFAQ(): void {
    this.dialog.open(
      FaqComponent,
      {
        maxWidth: 'none',
        maxHeight: 'none',
        width: '500px',
        height: '510px'
      }
    );
  }

  private subscribeOnSingIn(): void {
    this.sessionService.onSignIn.subscribe(resp => {
      this.signIn = resp;
    });
  }

}
