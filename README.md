# htmx-glue

This library provides several JS controls that can be paired with served side implementations (that you provide) in order to build more dynamic HTMX components, without having to implement it all yourself!

The idea is that these JS Controls are generic enough to be used by server-side components in any language.

This code was originally written to pair with Rust server side components. More documentation will follow as this gets fleshed out and used by some personal projects (namely, sharing the rust components, and a personal attempt at attempting the same thing in Unison)

This project was created using `bun init` in bun v1.0.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Installation

```bash
bun build ./src/common.js --outdir ./out
```
