'use strict';

var DoubleLinkedList = require('../src/DoubleLinkedList').LinkedList;

var Collection = function () {
    this.empty.call(this);
};
Collection.prototype.updateState = function () {
    this.isEmpty = this.length == 0;
    this.first = this.list.getFirst();
    this.last = this.list.getLast();
};
Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return null;
    }
    this.length--;
    var first = this.list.removeFirst();
    this.updateState();
    return first;
};
Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return null;
    }
    this.length--;
    var last = this.list.removeLast();
    this.updateState();
    return last;
};
Collection.prototype.insertFirst = function (element) {
    this.list.addFirst(element);
    this.length++;
    this.updateState();
};
Collection.prototype.insertLast = function (element) {
    this.list.addLast(element);
    this.length++;
    this.updateState();
};
Collection.prototype.empty = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.list = new DoubleLinkedList();
};

var Queue = function () {
    this.empty.call(this);
};
Queue.prototype.enqueue = function (item) {
    this.length++;
    this.list.addLast(item);
};
Queue.prototype.dequeue = function () {
    if (this.length == 0) {
        return null;
    }
    this.length--;
    return this.list.removeFirst();
};
Queue.prototype.empty = function () {
    this.list = new DoubleLinkedList();
    this.length = 0;
};
var FixedArray = function (size) {
    this.length = size;;
    this.list = [];
};
FixedArray.prototype.insertAt = function (index, item) {
    if (index > this.length - 1) {
        throw new RangeError();
    }
    this.list[index] = item;
};
FixedArray.prototype.getAt = function (index) {
    if (index > this.length - 1) {
        throw new RangeError();
    }
    return this.list[index];
};
var Set = function () {
    this.empty.call(this);
};
Set.prototype.insert = function (item) {
    if (this.list[item] == undefined) {
        this.list[item] = false;
        this.length++;
    }
};
Set.prototype.remove = function (item) {
    delete this.list[item];
    this.length--;
};
Set.prototype.has = function (item) {
    return this.list[item] != undefined;
};
Set.prototype.empty = function () {
    this.list = {};
    this.length = 0;
};
Set.prototype.intersect = function (set) {
    var newSet = new Set();
    var firstSet = Object.keys(this.list);
    var secondSet = Object.keys(set.list);
    for (var e of firstSet) {
        if (secondSet.indexOf(e) >= 0) {
            newSet.insert(e);
        }
    }
    return newSet;
};
Set.prototype.union = function (set) {
    var newSet = new Set();
    var firstSet = Object.keys(this.list);
    var secondSet = Object.keys(set.list);
    for (var e of firstSet) {
        if (secondSet.indexOf(e) < 0) {
            newSet.insert(e);
        }
    }
    for (var i of secondSet) {
        newSet.insert(i);
    }
    return newSet;
};

var PriorityQueue = function () {
    this.queue = [];
};
PriorityQueue.prototype.enqueue = function (item, priority) {
    this.queue.push({
        value: priority,
        item: item
    });
    var i = this.queue.length - 1;
    var parent = parseInt((i - 1) / 2);
    while (i > 0 && this.queue[parent].value < this.queue[i].value) {
        var temp = this.queue[i];
        this.queue[i] = this.queue[parent];
        this.queue[parent] = temp;

        i = parent;
        parent = (i - 1) / 2;
    }
};
PriorityQueue.prototype.dequeue = function () {
    var result = this.queue[0];
    this.queue[0] = this.queue[this.queue.length - 1];
    this.queue.pop();
    this.heapify(0);
    return result == undefined ? null : result.item;
};
PriorityQueue.prototype.heapify = function (i) {
    while (true) {
        var leftChild = 2 * i + 1;
        var rightChild = 2 * i + 2;
        var largestChild = i;

        if (leftChild < this.queue.length &&
            this.queue[leftChild].value > this.queue[largestChild].value) {
            largestChild = leftChild;
        }

        if (rightChild < this.queue.length &&
            this.queue[rightChild].value > this.queue[largestChild].value) {
            largestChild = rightChild;
        }

        if (largestChild == i) {
            break;
        }

        var temp = this.queue[i];
        this.queue[i] = this.queue[largestChild];
        this.queue[largestChild] = temp;
        i = largestChild;
    }
};
var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
