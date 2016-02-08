var toLdp = require('../')
var traverse = require('../').traverse

var data = {
  timestamp: (new Date()).toString(),
  owner: {
    name: 'Nicola'
  },
  friends: {
    rome: [{
      name: 'Francesco',
      geo: {
        lat: 10.37,
        lon: 20.56
      }
    }],
    london: [{
      name: 'Esben'
    }]
  },
  people: [{
    name: 'Nicola Greco'
  }, {
    name: 'Virginia Alonso'
  }]
}

console.log('Ldp-ized data')
console.log(JSON.stringify(toLdp(data, 1), null, 2))
console.log('Navigating /friends/rome')
console.log(JSON.stringify(traverse(data, '/friends/rome'), null, 2))
console.log('Navigating /friends/rome with depth 2')
console.log(JSON.stringify(traverse(data, '/friends/rome', 2), null, 2))
