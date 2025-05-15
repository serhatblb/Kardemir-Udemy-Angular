import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  helloworld:string ="Hello, world from Kardemir"

  clickMe(){
    alert("Beni Tıkladın...")
  }

  changeHelloWorldVariable(event:any){
    this.helloworld=event.target.value;
  }
}
