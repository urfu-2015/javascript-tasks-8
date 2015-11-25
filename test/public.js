var assert = require('assert');

var lib = require('../src/standard-library');

var Collection = lib.Collection;
var Stack = lib.Stack;
var FixedArray = lib.FixedArray;
var Queue = lib.Queue;
var Set = lib.Set;
var PriorityQueue = lib.PriorityQueue;
var Map = lib.Map;

describe('Standard Library', function () {
    describe('Collection', function () {
        it('first', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.first, 'foo');
        });

        it('last', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.last, 'baz');
        });

        it('length', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.length, 3);
        });

        it('isEmpty', function () {
            var collection = new Collection();

            assert.ok(collection.isEmpty);

            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.ok(!collection.isEmpty);

        });

        it('pickFirst()', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.pickFirst(), 'foo');
            assert.equal(collection.length, 2);

        });

        it('pickLast()', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.pickLast(), 'baz');
            assert.equal(collection.length, 2);
        });

        it('insertFirst()', function () {
            var collection = new Collection();
            collection.insertFirst('foo');
            collection.insertFirst('bar');
            collection.insertFirst('baz');

            assert.equal(collection.first, 'baz');
            assert.equal(collection.last, 'foo');
        });

        it('insertLast()', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.first, 'foo');
            assert.equal(collection.last, 'baz');
        });

        it('empty()', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');
            collection.empty();

            assert.ok(collection.isEmpty);
        });
    });

    describe('Queue', function () {
        it('enqueue(item)', function () {
            var queue = new Queue();

            assert.equal(queue.length, 0);

            queue.enqueue('foo');
            queue.enqueue('bar');
            queue.enqueue('baz');

            assert.equal(queue.length, 3);
        });

        it('dequeue()', function () {
            var queue = new Queue();
            queue.enqueue('foo');
            queue.enqueue('bar');
            queue.enqueue('baz');

            assert.equal(queue.dequeue(), 'foo');
            assert.equal(queue.dequeue(), 'bar');
            assert.equal(queue.dequeue(), 'baz');
        });
    });

    describe('FixedArray', function () {
        it('length', function () {
            var arr = new FixedArray(5);

            assert.equal(arr.length, 5);
        });

        it('insertAt(index, item)', function () {
            var arr = new FixedArray(2);

            assert.doesNotThrow(function () {
                arr.insertAt(0, 'foo');
                arr.insertAt(1, 'bar');
            });

            assert.throws(function () {
                arr.insertAt(2, 'baz');
            }, RangeError);
        });

        it('getAt(item)', function () {
            var arr = new FixedArray(2);
            arr.insertAt(0, 'foo');
            arr.insertAt(1, 'bar');

            assert.doesNotThrow(function () {
                arr.getAt(0);
                arr.getAt(1);
            });

            assert.throws(function () {
                arr.getAt(2);
            }, RangeError);
        });
    });

    describe('Set', function () {
        it('length / insert(item)', function () {
            var set = new Set();
            set.insert('foo');
            set.insert('bar');
            set.insert('foo');

            assert.equal(set.length, 2);
        });

        it('remove(item)', function () {
            var set = new Set();
            set.insert('foo');
            set.insert('bar');
            set.insert('foo');

            set.remove('foo');
            set.remove('bar');

            assert.equal(set.length, 0);
        });

        it('has(item)', function () {
            var set = new Set();
            set.insert('foo');
            set.insert('bar');

            set.remove('bar');

            assert.ok(set.has('foo'));
            assert.ok(!set.has('bar'));

        });

        it('intersect(set)', function () {
            var set1 = new Set();
            set1.insert('foo');
            set1.insert('bar');

            var set2 = new Set();
            set2.insert('bar');
            set2.insert('baz');

            var set3 = set1.intersect(set2);

            assert.equal(set1.length, 2);
            assert.equal(set2.length, 2);
            assert.equal(set3.length, 1);
            assert.ok(set3.has('bar'));
        });

        it('union(set)', function () {
            var set1 = new Set();
            set1.insert('foo');
            set1.insert('bar');

            var set2 = new Set();
            set2.insert('bar');
            set2.insert('baz');

            var set3 = set1.union(set2);

            assert.equal(set1.length, 2);
            assert.equal(set2.length, 2);
            assert.equal(set3.length, 3);
            assert.ok(set3.has('foo'));
            assert.ok(set3.has('bar'));
            assert.ok(set3.has('baz'));
        });
    });

    // доп. задание

    describe('PriorityQueue', function () {
        it('enqueue(item, priority)', function () {
            var queue = new PriorityQueue();

            assert.equal(queue.length, 0);

            queue.enqueue('foo', 2);
            queue.enqueue('bar');
            queue.enqueue('baz', 1);

            assert.equal(queue.length, 3);
        });

        it('dequeue()', function () {
            var queue = new PriorityQueue();
            queue.enqueue('foo', 1);
            queue.enqueue('bar', 3);
            queue.enqueue('baz', 2);

            assert.equal(queue.dequeue(), 'bar');
            assert.equal(queue.dequeue(), 'baz');
            assert.equal(queue.dequeue(), 'foo');
        });
    });

    describe('Map', function () {
        it('addItem(key, item)', function () {
            var map = new Map();

            assert.equal(map.length, 0);

            map.addItem({}, 2);
            map.addItem([], 2);
            map.addItem(new Date(), 2);

            assert.equal(map.length, 3);
        });

        it('removeItem(key)', function () {
            var map = new Map();

            assert.equal(map.length, 0);

            var date = new Date();

            map.addItem({}, 2);
            map.addItem([], 'aaa');
            map.addItem(date, 6);

            map.removeItem({});
            map.removeItem(date);

            assert.equal(map.length, 1);
        });

        it('getItem(key)', function () {
            var map = new Map();

            assert.equal(map.length, 0);

            var date = new Date();

            map.addItem({}, 2);
            map.addItem([], 'aaa');
            map.addItem(date, 6);

            assert.equal(map.getItem(date), 6);
        });
        it('getItem(function)', function () {
            var map = new Map();

            assert.equal(map.length, 0);

            var f1 = function () {
                console.log('1');
            };
            var f2 = function () {
                console.log('2');
            };
            map.addItem(f1, 1);
            map.addItem(f2, 2);
            assert.equal(map.length, 2);
        });
        it('empty()', function () {
            var map = new Map();

            assert.equal(map.length, 0);

            map.addItem({}, 2);
            map.addItem([], 'aaa');
            map.addItem(new Date(), 6);
            map.empty();

            assert.ok(map.isEmpty);
        });
    });

    // first возвращает null
    describe('Collection', function () {
        it('first', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.pickFirst();

            assert.ok(collection.first === null);
        });
    });

    // массив нулевой длины
    describe('FixedArray', function () {
        it('length', function () {
            var arr = new FixedArray(0);

            assert.equal(arr.length, 0);
        });
    });

    // одинаковые ключи
    describe('Map', function () {
        it('addItem(key, item)', function () {
            var map = new Map();

            assert.equal(map.length, 0);

            map.addItem({}, 1);
            map.addItem({}, 2);

            assert.ok(map.getItem({}) === 2);
        });
    });
});
