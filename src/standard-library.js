'use strict';

var Collection = function () {
    this.collection = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

// извлекает первый элемент из коллекции и возвращает его
Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return null;
    }
    var firstElement = this.collection.shift();
    --this.length;
    if (this.length === 0) {
        this.empty();
    } else {
        this.first = this.collection[0];
        this.last = this.collection[this.length - 1];
    }
    return firstElement;
};

// извлекает последний элемент из коллекции и возвращает его
Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return null;
    }
    var lastElement = this.collection.pop();
    --this.length;
    if (this.length === 0) {
        this.empty();
    } else {
        this.first = this.collection[0];
        this.last = this.collection[this.length - 1];
    }
    return lastElement;
};

// вставляет элемент в начало колекции
Collection.prototype.insertFirst = function (item) {
    this.collection.unshift(item);
    ++this.length;
    this.first = this.collection[0];
    if (this.isEmpty) {
        this.last = this.collection[0];
        this.isEmpty = false;
    } else {
        this.last = this.collection[this.length - 1];
    }
};

// вставляет элемент в конец коллекции
Collection.prototype.insertLast = function (item) {
    this.collection.push(item);
    ++this.length;
    if (this.isEmpty) {
        this.isEmpty = false;
        this.first = this.collection[0];
    }
    this.last = this.collection[this.length - 1];
};

// очищает коллекцию
Collection.prototype.empty = function () {
    this.collection = [];
    this.length = 0;
    this.first = null;
    this.last = null;
    this.isEmpty = true;
};

var Queue = function () {
    Collection.call(this);
};

Queue.prototype.enqueue = function (item) {
    return Collection.prototype.insertLast.call(this, item);
};

Queue.prototype.dequeue = function () {
    return Collection.prototype.pickFirst.call(this);
};

Queue.prototype.empty = function () {
    return Collection.prototype.empty.call(this);
};

var FixedArray = function (size) {
    Collection.call(this);
    this.length = size;
    this.collection = new Array(size);
};

//  записывает элемент в массив по заданному индексу
FixedArray.prototype.insertAt = function (index, item) {
    if (index < this.length && index >= 0) {
        this.collection[index] = item;
    } else {
        throw new RangeError();
    }
};

// возвращает элемент по указанному индексу.
FixedArray.prototype.getAt = function (index) {
    if (index < this.length && index >= 0) {
        return this.collection[index];
    } else {
        throw new RangeError();
    }
};

var Set = function () {
    Collection.call(this);
};

// добавляет элемент в множество
Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        this.collection.push(item);
        ++this.length;
    }
};

// удаляет элемент из множества
Set.prototype.remove = function (item) {
    var index = this.collection.indexOf(item);
    if (index !== -1) {
        this.collection.splice(index, 1);
        --this.length;
    }
};

// проверяет, входит ли элемент в множество
Set.prototype.has = function (item) {
    return this.collection.some(itemFrom => itemFrom === item);
};

// возвращает множество элементов входящих в исходное множество и в
// переданное множество (в оба сразу)
Set.prototype.intersect = function (set) {
    var intersectSet = new Set();
    this.collection.forEach(function (item) {
        if (set.has(item)) {
            intersectSet.insert(item);
        }
    });
    return intersectSet;
};

// возвращает множество элементов входящих в исходное множество или в переданное
// множество (в любое из двух)
Set.prototype.union = function (set) {
    var unionSet = new Set();
    this.collection.forEach(function (item) {
        unionSet.insert(item);
    });
    set.collection.forEach(function (item) {
        unionSet.insert(item);
    });
    return unionSet;
};

Set.prototype.empty = function () {
    return Collection.prototype.empty.call(this);
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
