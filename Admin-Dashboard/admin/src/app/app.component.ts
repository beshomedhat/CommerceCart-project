import { Component } from '@angular/core';
import { AdminService } from './services/admin/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _user:AdminService) {}
  title = 'admin';
}
