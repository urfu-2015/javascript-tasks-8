'use strict';

var Collection = function () {
    this.array = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};
Collection.prototype.pickFirst = function () {
    if (!this.isEmpty) {
        var res = this.array.shift();
        this.length--;
        if (this.length === 0) {
            this.isEmpty = true;
        } else {
            this.isEmpty = false;
        }
        if (!this.isEmpty) {
            this.first = this.array[0];
            this.last = this.array[this.length - 1];
        }
        return res;
    }
    return undefined;
};

Collection.prototype.pickLast = function () {
    if (!this.isEmpty) {
        var res = this.array.pop();
        this.length--;
        if (this.length === 0) {
            this.isEmpty = true;
        } else {
            this.isEmpty = false;
        }
        if (!this.isEmpty) {
            this.first = this.array[0];
            this.last = this.array[this.length - 1];
        }
        return res;
    }
    return undefined;
};

Collection.prototype.insertFirst = function (elem) {
    this.array.unshift(elem);
    this.first = elem;
    this.length++;
    this.last = this.array[this.length - 1];
    this.isEmpty = false;
};

Collection.prototype.insertLast = function (elem) {
    this.last = elem;
    this.array.push(elem);
    this.length++;
    this.first = this.array[0];
    this.isEmpty = false;

};

Collection.prototype.empty = function () {
    this.isEmpty = true;
    this.first = null;
    this.last = null;
    this.array = [];
    this.length = 0;
};

var Queue = function () {
    this.array = [];
    this.length = 0;
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.enqueue = function (item) {
    this.insertFirst(item);
};

Queue.prototype.dequeue = function () {
    return this.pickLast();
};

Queue.prototype.empty = function () {
    this.empty();
};

var FixedArray = function (size) {
    this.array = [];
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index > this.length - 1 || index < 0) {
        throw new RangeError('Индекс больше' + this.length + 'или меньше 0');
    }
    this.array[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index > this.length - 1 || index < 0) {
        throw new RangeError('Индекс больше' + this.length + 'или меньше 0');
    }
    return this.array[index];
};


var Set = function () {
    this.length = 0;
    this.array = [];
};

Set.prototype = Object.create(Collection.prototype);

Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        this.insertFirst(item);
    }
};

Set.prototype.remove = function (item) {
    var deletItem = this.array.indexOf(item);
    if (deletItem === -1) {
        return 'элемент отсутствует';
    } else {
        this.array.splice(deletItem, 1);
        this.length--;
    }
};
Set.prototype.has = function (item) {
    if (this.array.indexOf(item) < 0) {
        return false;
    } else {
        return true;
    }
};

Set.prototype.intersect = function (set) {
    var result = new Set();
    for (var i = 0; i < this.array.length; i++) {
        if (set.has(this.array[i])) {
            result.insert(this.array[i]);
        }
    }
    for (i = 0; i < set.array.length; i++) {
        if (set.has(set.array[i]) && this.has(set.array[i])) {
            result.insert(set.array[i]);
        }
    }
    return result;
};

Set.prototype.union = function (set) {
    var result = new Set();
    for (i = 0; i < set.array.length; i++) {
        result.insert(set.array[i]);
    }
    for (var i = 0; i < this.array.length; i++) {
        result.insert(this.array[i]);
    }
    return result;
};
Set.prototype.empty = function () {
    this.empty();
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
