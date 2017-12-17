import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accountButton = 'Log In';

  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    console.log('in open dialog');
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login/login.component.html',
  styleUrls: ['./login/login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {}

  submit(): void {
    console.log('submit clicked ' + this.username + ' pass: ' + this.password );

    const request_data = {'username': this.username, 'password': this.password};
    const headers =  new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .post('http://127.0.0.1:8080/token', request_data, { 'headers': headers, withCredentials: true })
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log('Something went wrong! code: ' + err.status);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
