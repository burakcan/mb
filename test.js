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

var results = { total: 0, passed: 0 };
function test(condition, data) {
  results.total++;

  if (condition) {
    results.passed++;
    return;
  }

  console.assert(condition, data);
}

console.group('mb tests');
test(mb('a')(data) === 1, 'a');
test(mb('b')(data) === null, 'b');
test(mb('c')(data) === undefined, 'c');
test(mb('d')(data)._ === 'object', 'd');
test(JSON.stringify(mb('d', 'e')(data)) === '{}', 'e');
test(mb('d', 'f')(data) === null, 'f');
test(typeof mb('d', 'g')(data) === 'function', 'g');
test(mb('d', 'h')(data) === 3, 'h');
test(mb('d', 'j')(data) === 1, 'j');
test(mb('d', 'k')(data) === 'string', 'k');
test(mb('l', 'm')(data).length === 3, 'm');
test(mb('l', 'm', 0, 'n')(data) === 1, 'n');
test(mb('l', 'm', 1, 'n')(data) === 2, 'n');
test(mb('l', 'm', 2, 'n')(data) === 3, 'n');
test(mb('l', 'o', 'p', 'q')(data) === true, 'q');
test(mb('l', 'o', 'p', 'r')(data) === false, 'r');
test(mb('l', 'o', 'p', 's', 't')(data) === 1, 't');
test(mb('l', 'o', 'p', 's', 'spaced keys')(data) === 'hey', 'spaced keys');

console.info(`Passed tests ${results.passed} out of ${results.total}.`);

if (results.passed == results.total) {
  console.info('Everything seems fine.');
}

console.groupEnd();
