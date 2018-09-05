import { Component } from '@angular/core';
import { WasmService } from './wasm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular + WebAssembly + Rust';

  _factorial: string;
  _fibonacci: string;

  factor: any = 0;
  fibo: any = 1;

  constructor(private service: WasmService) {
  }

  get factorial() {
    return this._factorial;
  }

  get fibonacci() {
    return this._fibonacci;
  }

  public async calcFactorial() {
    this._factorial = await this.service.calculateFactorial(this.factor);
  }

  public async calcFibonacci() {
    this._fibonacci = await this.service.calculateFebinacci(this.fibo);
  }
}
