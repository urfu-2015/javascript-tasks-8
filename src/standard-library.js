'use strict';

var Collection = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.elements = [];
};

//– извлекает первый элемент из коллекции и возвращает его
Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return null;
    }
    var firstElem = this.elements.shift();
    if (this.length === 1) {
        this.empty();
    } else {
        this.first = this.elements[0];
        this.length -= 1;
    }
    return firstElem;
};

// – извлекает последний элемент из коллекции и возвращает его
Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return null;
    }
    var lastElem = this.elements.pop();
    if (this.length === 1) {
        this.empty();
    } else {
        this.length -= 1;
        this.first = this.elements[this.length - 1];
    }
    return lastElem;
};

// – вставляет элемент в начало колекции
Collection.prototype.insertFirst = function (item) {
    if (this.isEmpty) {
        this.isEmpty = false;
    }
    this.length += 1;
    this.elements.unshift(item);
    this.first = this.elements[0];
    if (this.length === 1) {
        this.last = this.first;
    }
};

// – вставляет элемент в конец коллекции
Collection.prototype.insertLast = function (item) {
    if (this.isEmpty) {
        this.isEmpty = false;
    }
    this.length += 1;
    this.elements.push(item);
    this.last = this.elements[this.length - 1];
    if (this.length === 1) {
        this.first = this.last;
    }
};

// – очищает коллекцию
Collection.prototype.empty = function () {
    if (this.isEmpty) {
        return;
    }
    this.first = null;
    this.last = null;
    this.isEmpty = true;
    this.length = 0;
    this.elements = [];
};

var Queue = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.elements = [];
};

Queue.prototype = Object.create(Collection.prototype);

// //добавляет элемент в очередь
Queue.prototype.enqueue = function (item) {
    this.insertLast(item);
};

// //извлекает элемент из очереди
Queue.prototype.dequeue = function () {
    return this.pickFirst();
};


var FixedArray = function (size) {
    this.elements = [];
    this.length = size;
};

//записывает элемент в массив по заданному индексу
FixedArray.prototype.insertAt = function (index, item) {
    if (index >= this.length) {
        throw new RangeError('Элемент за пределами массива');
    }
    this.elements.splice(index, 0, item);
};

//возвращает элемент по указанному индексу.
FixedArray.prototype.getAt = function (index) {
    if (!this.elements[index]) {
        throw new RangeError('Элемент за пределами массива');
    }
    return this.elements[index];
};

var Set = function () {
    this.elements = [];
    this.length = 0;
};

//добавляет элемент в множество
Set.prototype.insert = function (item) {
    if (this.has(item)) {
        return;
    }
    this.elements.push(item);
    this.length += 1;
};

//удаляет элемент из множества
Set.prototype.remove = function (item) {
    if (!this.has(item)) {
        return;
    }
    this.elements.splice(this.elements.indexOf(item), 1);
    this.length -= 1;
};

//проверяет, входит ли элемент в множество
Set.prototype.has = function (item) {
    if (this.elements.indexOf(item) !== -1) {
        return true;
    }
    return false;
};

//возвращает множество элементов входящих в исходное множество
// и в переданное множество (в оба сразу)
Set.prototype.intersect = function (set) {
    var intersect = this.elements.filter(function (item) {
        return set.elements.indexOf(item) !== -1;
    });
    var newSet = new Set();
    newSet.elements = intersect;
    newSet.length = intersect.length;
    return newSet;
};

//возвращает множество элементов входящих в исходное множество
// или в переданное множество (в любое из двух)
Set.prototype.union = function (set) {
    var newSet = new Set();
    newSet.elements = this.elements.slice();
    newSet.length = newSet.elements.length;
    for (var i = 0; i < set.length; i++) {
        this.insert.bind(newSet, set.elements[i])();
    };
    return newSet;
};

//очищает множество
Set.prototype.empty = function () {
    this.length = 0;
    this.elements = [];
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
