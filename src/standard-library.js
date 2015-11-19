'use strict';

/**
 * Выделяем новую сущность, хранящую общие для всех коллекций методы и свойства.
 * @param size
 * @constructor
 */
var Properties = function (size) {
    if (size === undefined) {
        this.collection = [];
    } else {
        this.collection = new Array(size);
    }
    this.update();
};
Properties.prototype.update = function () {
    this.length = this.collection.length;
};
// Метод, реализующий операции над коллекциями, и обновляющий их
Properties.prototype.actionAboveCollection = function (from, count, element) {
    if (element === undefined) {
        var answer = this.collection.splice(from, count);
    } else {
        var answer = this.collection.splice(from, count, element);
    }
    this.update();
    return answer[0];
};
Properties.prototype.empty = function () {
    this.collection = [];
    this.update();
};
Properties.prototype.raiseErrorIfEmpty = function (isEmpty) {
    if (isEmpty) {
        throw new RangeError('ERROR! Collection is empty!');
    }
};

var Collection = function () {
    Properties.call(this);
    this.isEmpty = true;
    this.update();
};
Collection.prototype = Object.create(Properties.prototype);
Collection.prototype.constructor = Collection;
Collection.prototype.pickFirst = function () {
    this.raiseErrorIfEmpty(this.isEmpty);
    return this.actionAboveCollection(0, 1);
};
Collection.prototype.pickLast = function () {
    this.raiseErrorIfEmpty(this.isEmpty);
    return this.actionAboveCollection(this.length - 1, 1);
};
Collection.prototype.insertFirst = function (element) {
    return this.actionAboveCollection(0, 0, element);
};
Collection.prototype.insertLast = function (element) {
    return this.actionAboveCollection(this.length, 0, element);
};
// Затенение Properties.prototype.update, чтобы правильно обновляться :)
Collection.prototype.update = function () {
    this.length = this.collection.length;
    this.isEmpty = (this.length === 0) ? true : false;
    if (!this.isEmpty) {
        this.first = this.collection[0];
        this.last = this.collection[this.length - 1];
    } else {
        this.first = null;
        this.last = null;
    }
};

var Queue = function () {
    Properties.call(this);
};
Queue.prototype = Object.create(Properties.prototype);
Queue.prototype.constructor = Queue;
Queue.prototype.enqueue = function (element) {
    return this.actionAboveCollection(this.length, 0, element);
};
Queue.prototype.dequeue = function () {
    this.raiseErrorIfEmpty(this.length === 0);
    return this.actionAboveCollection(0, 1);
};

var FixedArray = function (size) {
    Properties.call(this, size);
};
FixedArray.prototype = Object.create(Properties.prototype);
FixedArray.prototype.constructor = FixedArray;
FixedArray.prototype.correctIndex = function (index) {
    if (index >= this.length) {
        throw new RangeError('ERROR! Index must be between 0 and ' + this.length);
    }
};
FixedArray.prototype.insertAt = function (index, item) {
    this.correctIndex(index);
    return this.actionAboveCollection(index, 1, item);
};
FixedArray.prototype.getAt = function (index) {
    this.correctIndex(index);
    return this.actionAboveCollection(index, 1, this.collection[index]);
};

var Set = function () {
    Properties.call(this);
};
Set.prototype = Object.create(Properties.prototype);
Set.prototype.constructor = Set;
Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        return this.actionAboveCollection(0, 0, item);
    }
};
Set.prototype.remove = function (item) {
    this.raiseErrorIfEmpty(this.length === 0);
    var index = this.collection.indexOf(item);
    if (index === -1) {
        console.log('Error!! Wrong item: ' + item);
    } else {
        return this.actionAboveCollection(index, 1);
    }
};
Set.prototype.has = function (item) {
    return (this.collection.indexOf(item) === -1) ? false : true;
};
Set.prototype.intersect = function (otherSet) {
    var answerSet = new Set();
    answerSet.collection = otherSet.collection.filter(function (item) {
        if (this.has(item)) {
            return item;
        }
    }, this);
    answerSet.update();
    return answerSet;
};
Set.prototype.union = function (otherSet) {
    var answerSet = new Set();
    answerSet.collection = otherSet.collection.slice();
    answerSet.update();
    this.collection.forEach(function (item) {
        answerSet.insert(item);
    });
    return answerSet;
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
