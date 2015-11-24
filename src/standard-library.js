'use strict';

var Collection = function () {
    this.isEmpty = true;
    this.list = [];
};
Object.defineProperty(Collection, 'first', { enumerable: true, get: function () {
    return this.list[0];
}});
Object.defineProperty(Collection, 'last', { enumerable: true, get: function () {
    return this.list[this.list.length - 1];
}});
Object.defineProperty(Collection, 'length', { enumerable: true, get: function () {
    return this.list.length;
}});

Collection.prototype.pickFirst = function () {
    var first = this.list.shift() || null;
    this.isEmpty = this.length === 0;
    return first;
};

Collection.prototype.pickLast = function () {
    var last = this.list.pop() || null;
    this.isEmpty = this.length === 0;
    return last;
};

Collection.prototype.insertFirst = function (elem) {
    this.isEmpty = false;
    this.list.unshift(elem);
};

Collection.prototype.insertLast = function (elem) {
    this.isEpmty = false;
    this.list.push(elem);
};

Collection.prototype.empty = function () {
    this.isEmpty = true;
    this.list = [];
};

var Queue = function () {
    this.queue = [];
};

Object.defineProperty(Queue, 'length', { enumerable: true, get: function () {
    return this.queue.length;
}});
Object.defineProperty(Queue, 'isEpmty', { enumerable: true, get: function () {
    return this.queue.length === 0;
}});

Queue.prototype.enqueue = function (elem) {
    this.queue = this.queue.concat([elem]);
};

Queue.prototype.dequeue = function () {
    if (this.isEmpty) {
        return null;
    }
    var elem = this.queue[0];
    this.queue = this.queue.slice(1);
    return elem;
};

Queue.prototype.empty = function () {
    this.queue = [];
};

var FixedArray = function (size) {
    if (size === undefined && typeof size !== 'number' && size < 0) {
        throw new TypeError('проблемы с типом size');
    }
    this.length = size;
    this.fixedArray = [];
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index > this.length - 1) {
        throw new RangeError('Элемент за пределами указанного диапазона ');
    }
    if (item === undefined) {
        throw new TypeError('проблемы с типом item');
    }
    this.fixedArray[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index > this.length - 1) {
        throw new RangeError('Элемент за пределами указанного диапазона ');
    } else {
        return this.fixedArray[index];
    }
};

var Set = function () {
    this.length = 0;
    this.elements = [];
};
// Object.defineProperty(Set, 'length', { enumerable: true, get: function () {
//     return Set.elements.length;
// }});

Set.prototype.insert = function (item) {
    if (this.elements.indexOf(item) < 0) {
        this.elements.push(item);
        this.length++;
    }
};

Set.prototype.remove = function (item) {
    var index = this.elements.indexOf(item);
    if (index > -1) {
        this.elements.splice(index, 1);
        this.length--;
    }
};

Set.prototype.has = function (item) {
    return this.elements.indexOf(item) > -1;
};

Set.prototype.intersect = function (set) {
    var intersection = new Set();
    intersection.elements = this.elements.filter(function (elem) {
        return set.has(elem);
    });
    intersection.length = intersection.elements.length;
    return intersection;
};

Set.prototype.union = function (set) {
    var union = new Set();
    union.elements = set.elements;
    var elemFirstSet = this.elements.filter(function (elem) {
        return !(set.has(elem));
    });
    union.elements = union.elements.concat(elemFirstSet);
    union.length = union.elements.length;
    return union;
};

Set.prototype.empty = function () {
    this.length = 0;
    this.elements = [];
};
// var PriorityQueue = function () {

// };

// var Map = function () {

// };
exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
// exports.PriorityQueue = PriorityQueue;
// exports.Map = Map;
