'use strict';

var Collection = function () {
    this.collection = [];
};

Object.defineProperty(Collection.prototype, 'length', {
    get: function () {
        return this.collection.length;
    }
});

Object.defineProperty(Collection.prototype, 'isEmpty', {
    get: function () {
        return this.length == 0;
    }
});

Object.defineProperty(Collection.prototype, 'first', {
    get: function () {
        return this.length > 0 ? this.collection[0] : undefined;
    }
});

Object.defineProperty(Collection.prototype, 'last', {
    get: function () {
        return this.length > 0 ? this.collection[this.length - 1] : undefined;
    }
});

Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return null;
    }
    var first = this.collection[0];
    this.collection = this.collection.slice(1);
    return first;
};

Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return null;
    }
    var last = this.collection[this.length - 1];
    this.collection = this.collection.slice(0, this.length - 1);
    return last;
};

Collection.prototype.insertFirst = function (element) {
    var newCollection = [element];
    newCollection = newCollection.concat(this.collection);
    this.collection = newCollection;
};

Collection.prototype.insertLast = function (element) {
    this.collection.push(element);
};

Collection.prototype.empty = function () {
    this.collection = [];
};

var Queue = function () {
    this.collection = [];
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.enqueue = function (item) {
    this.insertFirst(item);
};

Queue.prototype.dequeue = function () {
    return this.pickLast();
};

Queue.prototype.empty = function () {
    this.collection = [];
};

var FixedArray = function (size) {
    console.log(isFinite(size));
    if (size < 0 || !isFinite(size)) {
        throw new RangeError('Некорректный размер массива');
    }
    this.length = size;
    this.fixedArray = getFixedArray(size);
};

function getFixedArray(size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        arr.push(null);
    }
    return arr;
}

FixedArray.prototype.insertAt = function (index, item) {
    checkIndex(index, this.length);
    var newFixedArray1 = this.fixedArray.slice(0, index);
    var newFixedArray2 = this.fixedArray.slice(index);
    this.fixedArray = newFixedArray1.concat(item, newFixedArray2);
    this.fixedArray = this.fixedArray.slice(0, this.length);
};

FixedArray.prototype.getAt = function (index) {
    checkIndex(index, this.length);
    return this.fixedArray[index];
};

function checkIndex(index, length) {
    if (index < 0 || index >= length) {
        throw new RangeError('Index вышел за границы массива');
    }
}

var Set = function () {
    this.collection = [];
};

Set.prototype = Object.create(Queue.prototype);

Object.defineProperty(Set.prototype, 'length', {
    get: function () {
        return this.collection.length;
    }
});

Set.prototype.insert = function (item) {
    if (this.collection.indexOf(item) == -1) {
        this.collection.push(item);
    }
};

Set.prototype.remove = function (item) {
    var index = this.collection.indexOf(item);
    if (index != -1) {
        var newSet1 = this.collection.slice(0, index);
        var newSet2 = this.collection.slice(index + 1);
        this.collection = newSet1.concat(newSet2);
    }
};

Set.prototype.has = function (item) {
    return this.collection.indexOf(item) != -1;
};

Set.prototype.intersect = function (set) {
    var intersection = new Set();
    this.collection.forEach(function (item) {
        if (set.has(item)) {
            intersection.insert(item);
        }
    });
    return intersection;
};

Set.prototype.union = function (set) {
    var union = new Set();
    this.collection.forEach(function (item) {
        union.insert(item);
    });
    for (var i = 0; i < set.length; i++) {
        var item = set.dequeue();
        union.insert(item);
        set.enqueue(item);
    }
    return union;
};

var PriorityQueue = function () {
    this.collection = [];
};

PriorityQueue.prototype = Object.create(Collection.prototype);

PriorityQueue.prototype.enqueue = function (item, priority) {
    if (typeof priority !== 'number') {
        throw new Error('Приоритет не является числом');
    }
    var queue = this.collection;
    var obj = {
        item: item,
        priority: priority
    };
    if (this.length == 0 || queue[this.length - 1].priority >= priority) {
        this.insertLast(obj);
    } else {
        for (var index = 0; index < queue.length; index++) {
            if (queue[index].priority < priority) {
                var newQueue1 = queue.slice(0, index);
                var newQueue2 = queue.slice(index);
                this.collection = newQueue1.concat(obj, newQueue2);
                break;
            }
        }
    }
};

PriorityQueue.prototype.dequeue = function () {
    return this.pickFirst().item;
};

var Map = function () {
    this.keys = [];
    this.values = [];
};

Object.defineProperty(Map.prototype, 'length', {
    get: function () {
        return this.keys.length;
    }
});

Map.prototype.addItem = function (key, item) {
    var keyString = JSON.stringify(key);
    var index = this.keys.indexOf(keyString);
    if (index != -1) {
        this.values[index] = item;
    } else {
        this.keys.push(keyString);
        this.values.push(item);
    }
};

Map.prototype.removeItem = function (key) {
    var keyString = JSON.stringify(key);
    var index = this.keys.indexOf(keyString);
    if (index != -1) {
        var item = this.values[index];
        var prevKeys = this.keys.slice(0, index);
        this.keys = prevKeys.concat(this.keys.slice(index + 1));
        var prevValues = this.values.slice(0, index);
        this.values = prevValues.concat(this.values.slice(index + 1));
        return item;
    } else {
        return;
    }
};

Map.prototype.getItem = function (key) {
    var index = this.keys.indexOf(JSON.stringify(key));
    return index == -1 ? undefined : this.values[index];
};

Map.prototype.empty = function () {
    this.keys = [];
    this.values = [];
};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
