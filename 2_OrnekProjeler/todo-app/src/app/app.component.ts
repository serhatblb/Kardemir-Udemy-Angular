import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template:`
  <h1>ToDo App</h1>
  @if(!isUpdateWorkFormActive){
    <div>
    <label for="">Work</label>
    <input placeholder="Yapılacak iş" [(ngModel)]='work'>
    <button (click)="save()">Save</button>
  </div>
  }@else {
    <div>
    <label for="">Update Work</label>
    <input [(ngModel)]='updateWork'>
    <button (click)="update()">Update</button>
  </div>
  }
  <hr>

  <div>
    <ul>
      @for (data of todos; track data) {
      <li>{{ data }}
      @if(!isUpdateWorkFormActive){
        <button (click)="get($index)">Update</button>
        <button (click)="delete($index)">Delete</button>
      }
    </li>
}

    </ul>
  </div>
  
  `,
  styles:`
  h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

div {
  margin: 10px auto;
  max-width: 400px;
  padding: 10px;
}

label {
  display: block;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 6px;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 8px 12px;
  margin-right: 6px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f2f2f2;
  margin-bottom: 6px;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

`
})
export class AppComponent {
  work:string = '';
  updateWork:string = "";
  updateIndex:number = 0;
  todos:string[] = [];
  isUpdateWorkFormActive:boolean = false;

  save(){
    this.todos.push(this.work);
    this.work = '';
  }

  delete(index:number){
    this.todos.splice(index,1)
  }

get(index: number) {
  this.updateIndex = index; 
  this.updateWork = this.todos[index];
  this.isUpdateWorkFormActive = true;
}

  update(){
    this.todos[this.updateIndex] = this.updateWork;
    this.isUpdateWorkFormActive = false;
    this.updateWork = '';
  }
}
