import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
  <h1>Döngüler</h1>

    <ul>
      @for (data of todos; track data) {
        <li>
          index: {{$index}} || 
          İlk kayıt mı?: {{$first}} ||
          Son kayıt mı?: {{$last}} ||
          Veri: {{data}}
        </li>
      }
    </ul>
  `
})
export class AppComponent {
  todos: TodoModel[] = [
    {work:"Example 1", isCompleted:true},
    {work:"Example 2", isCompleted:true},
    {work:"Example 3", isCompleted:true},
  ]

  constructor(){
    this.save();
  }

  save(){
    console.log("--------- For Döngüsü-----------")
    for(let i = 0;i < 10; i++){
      console.log(i)
    }
console.log("--------- Listeyi For ile Dönme-----------")
    for(let i = 0; i < this.todos.length; i++){
      console.log(this.todos[i].work);
    }
console.log("--------- Listeyi forEach ile Dönme-----------")
    this.todos.forEach((val)=>{
      console.log(val.work);
      console.log(val.isCompleted);
    })
console.log("--------- Listeyi For of ile Dönme-----------")
    for(let data of this.todos){
      console.log(data.work);
      console.log(data.isCompleted);
    }
    console.log("--------- Listeyi For in ile Dönme-----------")
    for(let index in this.todos){
      console.log(this.todos[index].work)
    }
  }
}

export class TodoModel{
  work:string = "";
  isCompleted:boolean = false;
}