# htmx-glue

This library provides several JS controls that can be paired with served side implementations (that you provide) in order to build more dynamic HTMX components, without having to implement it all yourself!

The idea is that these JS Controls are generic enough to be used by server-side components in any language.

This code was originally written to pair with Rust server side components. More documentation will follow as this gets fleshed out and used by some personal projects (namely, sharing the rust components, and a personal attempt at attempting the same thing in Unison)

## Usage

This package contains a single `out/common.js` file. You can use it in your HTML via [UNPKG](https://unpkg.com/):

```html
<script src="https://unpkg.com/htmx-glue/out/common.js"></script>
```

Then you can use the appropriate control's `data-*` attribute to wire up your component with the control.

See this example with a NotificationLiveRegion: https://github.com/breakthrough-rc/wallchart/blob/dcf8705bacb8b5df88627b6fb647c0b67e05d5ef/web-client/src/server/notification.rs#L16

This documentation is insufficient at the moment, and will be more thoroughly explained as I work through build this out.

## Authorship

The vast majority of the work implementing these controls and wiring them up with the rust components in our original project was done by [Paul Bouzakis](https://github.com/pbouzakis). This package exists to make those efforts reusable in my other projects (e.g. doing HTMX in every language)
