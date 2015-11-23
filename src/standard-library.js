'use strict';

var Collection = function () {
    this.struct = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};
Collection.prototype.pickFirst = function () {
    this.first = this.struct.shift();
    this.length = this.struct.length;
    if (this.length === 0) {
        this.isEmpty = true;
    }
    return this.first;
};

Collection.prototype.pickLast = function () {
    this.last = this.struct.pop();
    this.length = this.struct.length;
    if (this.length === 0) {
        this.isEmpty = true;
    }
    return this.last;
};

Collection.prototype.insertFirst = function (elem) {
    this.first = elem;
    this.struct.unshift(elem);
    this.length = this.struct.length;
    this.last = this.struct[this.length - 1];
    this.isEmpty = false;
};

Collection.prototype.insertLast = function (elem) {
    this.last = elem;
    this.struct.push(elem);
    this.length = this.struct.length;
    this.first = this.struct[0];
    this.isEmpty = false;
};

Collection.prototype.empty = function () {
    this.struct = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

var Queue = function () {
    this.struct = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};
Queue.prototype = Object.create(Collection.prototype);
Queue.prototype.constructor = Queue;
Queue.prototype.enqueue = function (elem) {
    Queue.prototype.insertLast.call(this, elem);
};
Queue.prototype.dequeue = function (elem) {
    return Queue.prototype.pickFirst.call(this, elem);
};

var FixedArray = function (size) {
    this.struct = Array(size);
    this.first = null;
    this.last = null;
    this.length = size;
    this.isEmpty = false;
};
FixedArray.prototype = Object.create(Collection.prototype);
FixedArray.prototype.constructor = FixedArray;
FixedArray.prototype.insertAt = function (index, elem) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Out of range');
    }
    this.struct[index] = elem;
};

FixedArray.prototype.getAt = function (index) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Out of range');
    }
    return this.struct[index];
};

var Set = function () {
    this.struct = [];
    this.length = 0;
};
Set.prototype = Object.create(Collection.prototype);
Set.prototype.constructor = Set;
//Object.defineProperty(Set, "length", {
//    get: function() {
//        return this.struct.length;
//    }
//});
Set.prototype.has = function (elem) {
    var didFound = false;
    this.struct.forEach(function (item) {
        if (elem === item) {
            didFound = true;
        }
    });
    return didFound;
};

Set.prototype.insert = function (elem) {
    if (!this.has(elem)) {
        this.struct.push(elem);
        this.length++;
    }
};

Set.prototype.remove = function (elem) {
    if (this.has(elem)) {
        this.struct.forEach(function (item, index) {
            if (elem === item) {
                this.struct.splice(index, 1);
                this.length--;
            }
        }, this);
    }
};

Set.prototype.intersect = function (set) {
    var tmpSet = new Set();
    set.struct.forEach(function (item) {
        if (this.has(item)) {
            tmpSet.insert(item);
        }
    }, this);
    return tmpSet;
};

Set.prototype.union = function (set) {
    var tmpSet = new Set();
    this.struct.forEach(function (item) {
        tmpSet.insert(item);
    }, this);
    set.struct.forEach(function (item) {
        if (!this.has(item)) {
            tmpSet.insert(item);
        }
    }, this);
    return tmpSet;
};

var PriorityQueue = function () {

};

var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
