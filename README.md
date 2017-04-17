fivetwelve-cli-debug-driver
===========================

A driver to help debugging your applications. Will simply output the
current channel-values of the universe into your terminal.

> **PLEASE NOTE** As all fivetwelve-modules, this module was written
> in ES6 using modules-syntax. To consume this module, you will need
> to configure your application accordingly.
>
> For example by using `babel-register` like this:
>
> ```javascript
> require('babel-register')({
>   presets: ['node6'],
>   ignore: /node_modules\/(?!fivetwelve)/
> });
