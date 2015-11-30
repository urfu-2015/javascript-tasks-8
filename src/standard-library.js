'use strict';

var Collection = function () {
    this.empty();
};
Collection.prototype.pickFirst = function () {
    this.length--;
    if (this.length <= 0) {
        this.first = undefined;
        this.last = undefined;
        this.length = 0;
        this.isEmpty = true;
    } else {
        this.first = this.store[1];
    }
    return this.store.shift();
};

Collection.prototype.pickLast = function () {
    this.length--;
    if (this.length <= 0) {
        this.first = undefined;
        this.last = undefined;
        this.length = 0;
        this.isEmpty = true;
    } else {
        this.last = this.store[this.length];
    }
    return this.store.pop();
};

Collection.prototype.insertFirst = function (element) {
    this.length++;
    this.store.unshift(element);
    this.first = this.store[0];
    if (this.length - 1 === 0) {
        this.isEmpty = false;
        this.last = this.store[0];
    }
};

Collection.prototype.insertLast = function (element) {
    this.length++;
    this.store.push(element);
    this.last = this.store[this.length - 1];

    if (this.length - 1 === 0) {
        this.isEmpty = false;
        this.first = this.store[0];
    }
};

Collection.prototype.empty = function () {
    this.store = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

var Queue = function () {
    Collection.call(this);
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.constructor = Queue;

Queue.prototype.enqueue = function (item) {
    this.insertLast(item);
};

Queue.prototype.dequeue = function () {
    return this.pickFirst();
};

var FixedArray = function (size) {
    this.length = size;
    this.store = [];
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index < 0 || index >= this.length) {
        throw new RangeError();
    }
    this.store[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index < 0 || index >= this.length) {
        throw new RangeError();
    }
    return this.store[index];
};


var Set = function () {
    this.empty();
};

Set.prototype.insert = function (item) {
    if (this.has(item)) {
        return;
    }
    this.store.push(item);
    this.length++;

};

Set.prototype.remove = function (item) {
    if (!this.has(item)) {
        return 0;
    }
    this.store.splice(this.store.indexOf(item), 1);
    this.length--;
};

Set.prototype.has = function (item) {
    return this.store.indexOf(item) !== -1;
};

Set.prototype.intersect = function (set) {
    var inter = new Set();
    var new_array = this.store.filter(function (value) {

        return set.has(value);
    });
    new_array.forEach(function (item) {
        inter.insert(item);
    });


    return inter;
};


Set.prototype.union = function (set) {
    var uni = new Set();
    this.store.forEach(function (item) {

        uni.insert(item);

    });
    set.store.forEach(function (item) {
        if (!uni.has(item)) {
            uni.insert(item);
        }
    });
    return uni;
};


Set.prototype.empty = function () {
    this.store = [];
    this.length = 0;
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
