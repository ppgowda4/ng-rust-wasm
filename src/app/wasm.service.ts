import { Injectable } from '@angular/core';

declare var WebAssembly: any;
declare var TextDecoder;

@Injectable({
  providedIn: 'root'
})
export class WasmService {
  wasmModuleRef: any;

  constructor() {
    this.instantiateWASM();
  }

  public calculateFactorial(val: number): string {
      const result = this.wasmModuleRef.factorial_number_str(val);
      return this.copyCStr(this.wasmModuleRef, result);
  }

  public calculateFebinacci(val: number): string {
    const result = this.wasmModuleRef.febonacci_number_str(val);
    return this.copyCStr(this.wasmModuleRef, result);
  }

  private instantiateWASM() {
    fetch('./../assets/rustwasm_modules_sm.wasm', { method: 'GET', mode: 'no-cors'})
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes, {}))
    .then(mod => {
      this.wasmModuleRef = mod.instance.exports;
    })
    .catch(err => console.log(err));
  }

  private copyCStr(module, ptr) {
    const orig_ptr = ptr;
    const collectCString = function* () {
      const memory = new Uint8Array(module.memory.buffer);
      while (memory[ptr] !== 0) {
        if (memory[ptr] === undefined) {
          throw new Error('Tried to read undef mem');
        }
        yield memory[ptr];
        ptr += 1;
      }
    };

    const buffer_as_u8 = new Uint8Array(collectCString());
    const utf8Decoder = new TextDecoder('UTF-8');
    const buffer_as_utf8 = utf8Decoder.decode(buffer_as_u8);
    module.dealloc_str(orig_ptr);
    return buffer_as_utf8;
  }
}
