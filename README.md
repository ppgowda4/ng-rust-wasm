# Angular, Rust & WebAssembly - NgRustWasm
A simple project showing how WebAssembly(based on RUST) could be used in Angular 6 in form of services.

## Prerequisites

You need to download and install node.js (preferably v8.11), Rust (nightly build).

Follow steps in the link to install `rustup`
https://github.com/rust-lang-nursery/rustup.rs/#installation

Install the latest nightly:
`rustup toolchain install nightly`

If you already installed nightly before, make sure it is up to date:
`rustup update`

Make your nightly as default for now:
`rustup defult nightly`

Install the required target:
`rustup target add wasm32-unknown-unknown --toolchain nightly`

Also, you need to install wasm-gc.
to install wasm-gc, run 
`cargo install --git https://github.com/alexcrichton/wasm-gc`

## Build

To build the demo, run the following in the root folder:
```
npm install
npm build-wasm        // compiles rust project and builds webassembly(wasm) and copies wasm file to assets folder
npm build             // builds angular application
npm start
```

Then you can open your browser at `http://localhost:4200` to see the demo.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Questions & contribution

You can follow me on Twitter [@ppgowda4](https://twitter.com/ppgowda4) and ask me questions you might have. You can also open an issue here on GitHub. Pull requests are welcome too :-)
