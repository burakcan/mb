var mb=require('./mb')

var data = {
  a: 1,
  b: null,
  c: undefined,
  d: {
    _: 'object',
    e: {},
    f: null,
    g: function () {},
    get h () {
      return 3
    },
    j: 1,
    k: "string"
  },
  l: {
    m: [
      {n: 1},
      {n: 2},
      {n: 3}
    ],
    o: {
      p: {
        q: true,
        r: false,
        s: {
          t: 1,
          "spaced keys": "hey"
        }
      }
    }
  }
}

console.assert(mb('a')(data) === 1, 'a')
console.assert(mb('b')(data) === null, 'b')
console.assert(mb('c')(data) === undefined, 'c')
console.assert(mb('d')(data)._ === 'object', 'd')
console.assert(JSON.stringify(mb('d', 'e')(data)) === '{}', 'e')
console.assert(mb('d', 'f')(data) === null, 'f')
console.assert(typeof mb('d', 'g')(data) === 'function', 'g')
console.assert(mb('d', 'h')(data) === 3, 'h')
console.assert(mb('d', 'j')(data) === 1, 'j')
console.assert(mb('d', 'k')(data) === 'string', 'k')
console.assert(mb('l', 'm')(data).length === 3, 'm')
console.assert(mb('l', 'm', 0, 'n')(data) === 1, 'n')
console.assert(mb('l', 'm', 1, 'n')(data) === 2, 'n')
console.assert(mb('l', 'm', 2, 'n')(data) === 3, 'n')
console.assert(mb('l', 'o', 'p', 'q')(data) === true, 'q')
console.assert(mb('l', 'o', 'p', 'r')(data) === false, 'r')
console.assert(mb('l', 'o', 'p', 's', 't')(data) === 1, 't')
console.assert(mb('l', 'o', 'p', 's', 'spaced keys')(data) === 'hey', 'spaced keys')
