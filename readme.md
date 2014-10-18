Salsa 20
===

Pure JavaScript Salsa 20 implimentation, based off [this gist](https://gist.github.com/dchest/4582374) so credit for good parts should go to [@dchest](https://github.com/dchest) while blame for bad parts lies with me.

API
===

```js
var cipher = new Salsa20(key<32 byte buffer>, iv <8 byte buffer>);
// cipher is a transform stream
```