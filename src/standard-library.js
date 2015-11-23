'use strict';

var DoubleLinkedList = require('../src/DoubleLinkedList').LinkedList;

var Collection = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.list = new DoubleLinkedList();
};
Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return null;
    }
    this.length--;
    this.isEmpty = this.length == 0;
    this.first = this.list.getFirst();
    return this.list.removeFirst();
};
Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return null;
    }
    this.length--;
    this.isEmpty = this.length == 0;
    this.last = this.list.getLast();
    return this.list.removeLast();
};
Collection.prototype.insertFirst = function (element) {
    this.list.addFirst(element);
    this.length++;
    this.isEmpty = false;
    this.first = this.list.getFirst();
    this.last = this.list.getLast();
};
Collection.prototype.insertLast = function (element) {
    this.list.addLast(element);
    this.length++;
    this.isEmpty = false;
    this.last = this.list.getLast();
    this.first = this.list.getFirst();
};
Collection.prototype.empty = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.list = new DoubleLinkedList();
};

var Queue = function () {
    this.list = new DoubleLinkedList();
    this.length = 0;
};
Queue.prototype.enqueue = function (item) {
    this.length++;
    this.list.addLast(item);
};
Queue.prototype.dequeue = function () {
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
    this.list = {};
    this.length = 0;
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

};

var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
