# json-to-ldp
Navigate JSON in a Linked Data Platform fashion

## Install

```
$ npm install json-to-ldp
```

## Usage

This module exposes two apis:

#### toLDP(json, depth)

```javascript
var toLdp = require('json-to-ldp')

var json = {
  people: [{
    name: "Nicola"
  }, {
    name: "Virginia"
  }]
}
toLDP(json)
/*
{
  contains: ["0", "1"]
}
*/

toLDP(json[0])
/*
{
  name: "Nicola"
}
*/
```

#### .traverse(data, path, depth)

```javascript
var traverse = require('json-to-ldp').traverse

var json = {
  title: "Address book"
  people: [{
    name: "Nicola"
  }, {
    name: "Virginia"
  }]
}

traverse(json, '/people/')
/*
{
  title: "Address book"
  contains: ["0", "1"]
}
*/

traverse(json, '/people/0')
/*
{
  name: "Nicola"
}
*/


```

## License

MIT
