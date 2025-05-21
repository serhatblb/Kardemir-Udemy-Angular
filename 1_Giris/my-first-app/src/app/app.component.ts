import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  helloworld:string ="Hello, world from Kardemir"

  clickMe(){
    alert("Beni Tıkladın...")
  }

  pClassName:string = 'red';

  changeHelloWorldVariable(event:any){
    this.helloworld=event.target.value;
  }
}
