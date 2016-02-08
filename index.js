module.exports = toLdp
module.exports.traverse = traverse

var jsonpointer = require('jsonpointer')

function isLeaf (resource) {
  return ['string', 'number'].indexOf(typeof resource) > -1
}

function toLdp (json, depth) {
  if (!json) {
    return null
  }

  if (!depth) depth = 1
  var preds = {'contains': []}

  Object.keys(json)
    .forEach(function (resource) {
      // never skip @ properties
      if (resource.substr(0, 1) === '@') {
        preds[resource] = json[resource]
      } else
      // Add leafs
      if (isLeaf(json[resource])) {
        preds[resource] = json[resource]
      }
      // add containment triple
      else {
        preds['contains'].push(resource)
        // if we are allowed to show more, recurse
        if (depth - 1 > 0) {
          preds[resource] = toLdp(json[resource], depth - 1)
        }
        // otherwise, show whether things are containers
        else {
          // TODO maybe everything is a container?
        }
      }
    })

  if (preds['contains'].length === 0) {
    delete preds['contains']
  }
  // TODO: preds['@type'] = 'https://www.w3.org/ns/ldp#Container'
  return preds
}

function traverse (json, path, depth) {
  if (path === '/') path = ''
  return toLdp(jsonpointer.get(json, path), depth)
}
