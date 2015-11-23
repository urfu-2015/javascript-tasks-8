'use strict';

var Collection = function () {
    this.length = 0;
    this.isEmpty = true;
    this.list = [];
};
Object.defineProperty(Collection, 'first', { enumerable: true, get: function () {
    return Collection.list[0];
}});
Object.defineProperty(Collection, 'last', { enumerable: true, get: function () {
    return Collection.list[Collection.list.length - 1];
}});

Collection.prototype.pickFirst = function () {
    var first = this.list.shift() || null;
    this.length = first === null ? 0 : this.length - 1;
    this.isEmpty = this.length === 0;
    return first;
};

Collection.prototype.pickLast = function () {
    var last = this.list.pop() || null;
    this.length = last === null ? 0 : this.length - 1;
    this.isEmpty = this.length === 0;
    return last;
};

Collection.prototype.insertFirst = function (elem) {
    this.length = this.list.unshift(elem);
    this.first = elem;
    this.isEmpty = false;
    this.last = this.list[this.length - 1];
};

Collection.prototype.insertLast = function (elem) {
    if (this.isEmpty) {
        this.isEmpty = false;
        this.first = elem;
    }
    this.list.push(elem);
    this.length++;
    this.last = elem;
};

Collection.prototype.empty = function () {
    this.length = 0;
    this.isEmpty = true;
    this.list = [];
};

exports.Collection = Collection;
// exports.Queue = Queue;
// exports.FixedArray = FixedArray;
// exports.Set = Set;
// exports.PriorityQueue = PriorityQueue;
// exports.Map = Map;
