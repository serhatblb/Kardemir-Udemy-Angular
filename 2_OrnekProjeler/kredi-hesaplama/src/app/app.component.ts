import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>Kredi Hesaplama</h2>

        <label>Kredi Tutarı (₺)</label>
        <input type="number" [(ngModel)]="krediTutari">

        <label>Vade (Ay)</label>
        <input type="number" [(ngModel)]="vade">

        <label>Yıllık Faiz Oranı (%)</label>
        <input type="number" [(ngModel)]="faizOrani">

        <button (click)="hesapla()">Hesapla</button>

        <div *ngIf="aylikTaksit > 0" class="sonuc">
          <p><strong>Aylık Taksit:</strong> ₺{{ aylikTaksit | number:'1.2-2' }}</p>
          <p><strong>Toplam Geri Ödeme:</strong> ₺{{ toplamOdeme | number:'1.2-2' }}</p>
        </div>
      </div>

      <div class="plan" *ngIf="odemePlani.length > 0">
        <h3>Ödeme Planı</h3>
        <table>
          <thead>
            <tr>
              <th>Dönem</th>
              <th>Taksit (₺)</th>
              <th>Kalan Bakiye (₺)</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let taksit of odemePlani">
              <td>{{ taksit.ay }}</td>
              <td>{{ taksit.taksit | number:'1.2-2' }}</td>
              <td>{{ taksit.kalan | number:'1.2-2' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      font-family: Arial, sans-serif;
      background-color: #f4f6f9;
      min-height: 100vh;
    }

    .card {
      background-color: white;
      padding: 24px 30px;
      border-radius: 16px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
      margin-bottom: 40px;
    }

    h2 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-top: 12px;
      font-weight: bold;
      color: #34495e;
    }

    input {
      width: 100%;
      padding: 8px;
      margin-top: 6px;
      margin-bottom: 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #2980b9;
    }

    .sonuc {
      margin-top: 20px;
      background-color: #ecf0f1;
      padding: 15px;
      border-radius: 8px;
    }

    .plan {
      width: 100%;
      max-width: 600px;
    }

    .plan h3 {
      margin-bottom: 12px;
      text-align: center;
      color: #2c3e50;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border-radius: 10px;
      overflow: hidden;
    }

    th, td {
      padding: 12px;
      text-align: center;
      border-bottom: 1px solid #eee;
    }

    th {
      background-color: #3498db;
      color: white;
    }
  `
})
export class AppComponent {
  krediTutari: number = 0;
  vade: number = 0;
  faizOrani: number = 0;

  aylikTaksit: number = 0;
  toplamOdeme: number = 0;

  odemePlani: { ay: number, taksit: number, kalan: number }[] = [];

  hesapla() {
    const aylikFaiz = this.faizOrani / 12 / 100;

    if (this.vade > 0 && aylikFaiz > 0) {
      this.aylikTaksit =
        this.krediTutari * (aylikFaiz * Math.pow(1 + aylikFaiz, this.vade)) /
        (Math.pow(1 + aylikFaiz, this.vade) - 1);
    } else if (this.vade > 0) {
      this.aylikTaksit = this.krediTutari / this.vade;
    }

    this.toplamOdeme = this.aylikTaksit * this.vade;

    // Ödeme planı oluştur
    this.odemePlani = [];
    let kalan = this.toplamOdeme;
    for (let i = 1; i <= this.vade; i++) {
      kalan -= this.aylikTaksit;
      this.odemePlani.push({
        ay: i,
        taksit: this.aylikTaksit,
        kalan: kalan > 0 ? kalan : 0
      });
    }
  }
}
