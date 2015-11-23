'use strict';
var Collection = function () {
    this.items = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};
Collection.prototype.pickFirst = function () {
    var first = this.first;
    this.items.splice(0, 1);
    this.length--;
    this.first = this.items[0];
    this.last = this.items[this.length - 1];
    this.isEmpty = this.length < 1 ? true : false;
    return first;
};
Collection.prototype.pickLast = function () {
    var last = this.last;
    this.items.splice(this.items.length - 1, 1);
    this.length--;
    this.last = this.items[this.length - 1];
    this.first = this.items[0];
    this.isEmpty = this.length < 1 ? true : false;
    return last;
};
Collection.prototype.insertFirst = function (element) {
    this.items.splice(0, 0, element);
    this.first = this.items[0];
    this.length++;
    this.last = this.items[this.length - 1];
    this.isEmpty = this.length < 1 ? true : false;
    return element;
};
Collection.prototype.insertLast = function (element) {
    this.items.splice(this.items.length, 0, element);
    this.length++;
    this.last = element;
    this.first = this.items[0];
    this.isEmpty = this.length < 1 ? true : false;
    return element;
};
Collection.prototype.empty = function () {
    this.items = [];
    this.length = 0;
    this.last = null;
    this.first = null;
    this.isEmpty = true;
};

var Queue = function () {
    this.items = [];
    this.length = 0;
};
Queue.prototype.enqueue = function (element) {
    this.items.push(element);
    this.length++;
    return element;
};
Queue.prototype.dequeue = function () {
    var dequeueElement = this.items[0];
    this.items.splice(0, 1);
    this.length--;
    return dequeueElement;
};
this.empty = function () {
    this.items = [];
    this.length = 0;
};

var FixedArray = function (size) {
    this.items = [];
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index > this.length - 1) {
        throw new RangeError('Индекс выше допустимого');
    } else {
        this.items[index] = item;
    };
    // this.length++;
};
FixedArray.prototype.getAt = function (index) {
    if (index > this.length - 1) {
        throw new RangeError('Индекс выше допустимого');
    } else {
        return this.items[index];
    };
};

var Set = function () {
    this.items = [];
    this.length = 0;
};
Set.prototype.insert = function (item) {
    var index = this.findIndex(item);
    if (index !== null) {
        return item;
    } else {
        this.items.push(item);
        this.length++;
    };
};
Set.prototype.findIndex = function (item) {
    for (var index = 0; index < this.length; index++) {
        if (this.items[index] === item) {
            return index;
        };
    };
    return null;
};
Set.prototype.remove = function (item) {
    var index = this.findIndex(item);
    if (index !== null) {
        this.items.splice(index, 1);
        this.length--;
        return item;
    };
    return null;
};
Set.prototype.has = function (item) {
    var index = this.findIndex(item);
    if (index !== null) {
        return true;
    } else {
        return false;
    };
};
Set.prototype.intersect = function (set) {
    function filterFunc(value) {
        var goodElement = false;
        for (var i = 0; i < set.length; i++) {
            if (value === set.items[i]) {
                goodElement = true;
            }
        }
        if (goodElement) {
            return value;
        };
    };
    var temp = this.items.filter(filterFunc);
    var resultSet = new Set();
    resultSet.items = temp;
    resultSet.length = temp.length;
    return resultSet;
};
Set.prototype.union = function (set) {
    function filterFunc(value) {
        var goodElement = true;
        for (var i = 0; i < set.length; i++) {
            if (value === set.items[i]) {
                goodElement = false;
            }
        }
        if (goodElement) {
            return value;
        };
    };
    var temp = this.items.filter(filterFunc);
    temp = temp.concat(set.items);
    var resultSet = new Set();
    resultSet.items = temp;
    resultSet.length = temp.length;
    return resultSet;
};
Set.prototype.empty = function () {
    this.items = [];
    this.length = 0;
};

var PriorityQueue = function () {
    this.priority = [];
    this.items = [];
};
PriorityQueue.prototype.enqueue = function (item, priority) {
    this.priority.push(priority);
    this.items.push(item);
}
PriorityQueue.prototype.dequeue = function () {
    var max = Math.max.apply(null, this.priority);
    this.items.splice(max, 1);
    this.priority.splice(max, 1);

}
PriorityQueue.prototype.getMaxIndex = function (max) {
    for (var i = 0; i < this.priority.length; i++) {
        if (this.priority[i] === max) {
            return i;
        };
    };
};
var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
