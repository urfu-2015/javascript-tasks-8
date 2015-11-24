'use strict';

var Abstract = function (size) {
    if (size === undefined) {
        this.array = [];
        this.length = 0;
    } else {
        this.array = new Array(size);
        this.length = size;
    }
};

var Collection = function () {
    Abstract.call(this);
    this.first = undefined;
    this.last = undefined;
    this.isEmpty = true;
};
Collection.prototype = Object.create(Abstract.prototype);
Collection.prototype.constructor = Collection;
Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return undefined;
    }
    var first = this.array.splice(0, 1)[0];
    this.first = this.array[0];
    this.length -= 1;
    return first;
};
Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return undefined;
    }
    var first = this.array.splice(-1, 1)[0];
    this.length -= 1;
    this.last = this.array[this.array.length - 1];
    return first;
};
Collection.prototype.insertFirst = function (element) {
    this.array.splice(0, 0, element);
    this.first = this.array[0];
    this.length += 1;
    if (this.isEmpty) {
        this.last = this.array[0];
    }
    this.isEmpty = false;
};
Collection.prototype.insertLast = function (element) {
    this.array.push(element);
    this.length += 1;
    this.last = this.array[this.length - 1];
    if (this.isEmpty) {
        this.first = this.array[this.length - 1];
    }
    this.isEmpty = false;
};
Collection.prototype.empty = function () {
    this.first = undefined;
    this.last = undefined;
    this.isEmpty = true;
    this.length = 0;
    this.array = [];
};

var Queue = function () {
    Abstract.call(this);
};
Queue.prototype = Object.create(Abstract.prototype);
Queue.prototype.constructor = Queue;
Queue.prototype.enqueue = function (element) {
    //this.array.splice(-1, 0, element);
    this.array.push(element);
    this.length += 1;
};
Queue.prototype.dequeue = function () {
    this.length -= 1;
    return this.array.splice(0, 1)[0];
};
Queue.prototype.empty = function () {
    this.length = 0;
    this.array = [];
};

var FixedArray = function (size) {
    Abstract.call(this, size);
};
FixedArray.prototype = Object.create(Abstract.prototype);
FixedArray.prototype.constructor = FixedArray;
FixedArray.prototype.insertAt = function (index, item) {
    if (this.length - 1 < Math.abs(index)) {
        throw new RangeError('Going beyond the array');
    }
    if (index >= 0) {
        this.array[index] = item;
    } else {
        this.array[this.length - index] = item;
    }
};
FixedArray.prototype.getAt = function (index) {
    if (this.length - 1 < Math.abs(index)) {
        throw new RangeError('Going beyond the array');
    }
    if (index >= 0) {
        return this.array[index];
    }
    return this.array[this.length - index];
};

var Set = function () {
    Abstract.call(this);
};
Set.prototype = Object.create(Abstract.prototype);
Set.prototype.constructor = Set;
Set.prototype.insert = function (item) {
    //console.log(this.array.indexOf(item));
    if (this.array.indexOf(item) === -1) {
        this.array.push(item);
        this.length += 1;
    }
};
Set.prototype.remove = function (item) {
    if (this.array.indexOf(item) > -1) {
        this.array.splice(this.array.indexOf(item), 1);
        this.length -= 1;
    }
};
Set.prototype.has = function (item) {
    return this.array.indexOf(item) > -1;
};
Set.prototype.intersect = function (set) {
    var and = new Set();
    this.array.forEach(function (item) {
        for (var i = 0; i < set.length; i++) {
            if (set.array[i] === item) {
                and.insert(item);
                break;
            }
        }
    });
    return and;
};
Set.prototype.union = function (set) {
    var and = new Set();
    this.array.forEach(function (item) {
        and.insert(item);
    });
    set.array.forEach(function (item) {
        and.insert(item);
    });
    return and;
};
Set.prototype.empty = function () {
    this.length = 0;
    this.array = [];
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
