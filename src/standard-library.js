'use strict';

var Container = function (obj, prev, next) {
    this.value = obj;
    this.prev = prev;
    this.next = next;
};

var Collection = function () {
    this.length = 0;
    this.last = undefined;
    this.first = undefined;
    this.firstElement = null;
    this.lastElement = null;
    this.isEmpty = true;
};

Collection.prototype.insertLast = function (obj) {
    var newObj = new Container(obj, this.lastElement, null);
    if (this.lastElement !== null) {
        this.lastElement.next = newObj;
    }
    if (this.firstElement === null) {
        this.firstElement = newObj;
        this.first = getElement(this.firstElement);
    }
    this.lastElement = newObj;
    this.last = getElement(this.lastElement);
    this.length++;
    this.isEmpty = false;
};

Collection.prototype.insertFirst = function (obj) {
    var newObj = new Container(obj, null, this.firstElement);
    if (this.firstElement !== null) {
        this.firstElement.prev = newObj;
    }
    if (this.lastElement === null) {
        this.lastElement = newObj;
        this.last = getElement(this.lastElement);
    }
    this.firstElement = newObj;
    this.first = getElement(this.firstElement);
    this.length++;
    this.isEmpty = false;
};

Collection.prototype.pickFirst = function () {
    var res = this.firstElement;
    this.firstElement = this.firstElement.next;
    if (this.firstElement !== null) {
        this.firstElement.prev = null;
    }
    this.first = getElement(this.firstElement);
    this.isEmpty = --this.length === 0;
    if (this.length === 0) {
        this.empty();
    }
    return res.value;
};

Collection.prototype.pickLast = function () {
    var res = this.lastElement;
    if (res === null) {
        return undefined;
    }
    this.lastElement = this.lastElement.prev;
    if (this.lastElement !== null) {
        this.lastElement.next = null;
    }
    this.last = getElement(this.lastElement);
    this.isEmpty = --this.length === 0;
    if (this.length === 0) {
        this.empty();
    }
    return res.value;
};

Collection.prototype.empty = function () {
    this.length = 0;
    this.firstElement = null;
    this.lastElement = null;
    this.isEmpty = true;
    this.first = undefined;
    this.last = undefined;
};

function getElement(obj) {
    if (obj === null) {
        return undefined;
    }
    if ('value' in obj) {
        return obj.value;
    }
    return undefined;
}

var Queue = function () {
    this.last = undefined;
    this.first = undefined;
    this.firstElement = null;
    this.lastElement = null;
    this.isEmpty = true;
    this.length = 0;
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.enqueue = function (value) {
    this.insertLast(value);
};

Queue.prototype.dequeue = function () {
    return this.pickFirst();
};

var FixedArray = function (size) {
    this.last = undefined;
    this.first = undefined;
    this.firstElement = null;
    this.lastElement = null;
    this.isEmpty = true;
    this.length = 0;

    for (var i = 0; i < size; i++) {
        this.insertLast(undefined);
    }
};

FixedArray.prototype = Object.create(Collection.prototype);

FixedArray.prototype.insertAt = function (index, item) {
    if (this.length <= index) {
        throw new RangeError('Index out of range');
    }
    var element = getElementByIndex(index, this);
    if (element === null || element.next === null) {
        this.insertLast(item);
        this.length--;

        return;
    }
    if (element.prev === null) {
        this.insertFirst(item);
        this.length--;

        return;
    }
    var newElement = new Container(item, element.prev, element.next);
    element.prev.next = newElement;
    element.next.prev = newElement;
};

FixedArray.prototype.getAt = function (index) {
    if (this.length <= index) {
        throw new RangeError('Index out of range');
    }
    return getElementByIndex(index, this).value;
};

function getElementByIndex(index, collection) {
    var element = collection.firstElement;
    for (var i = 0; i < index; i++) {
        if (element === null) {
            return null;
        }
        element = element.next;
    }
    return element;
}

function getElementByValue(item, collection) {
    var element = collection.firstElement;
    for (var i = 0; i < collection.length; i++) {
        if (element.value === item) {
            return element;
        }
        element = element.next;
    }
    return null;
}

var Set = function () {
    this.length = 0;
    this.firstElement = null;
    this.lastElement = null;
    this.isEmpty = true;
    this.first = undefined;
    this.last = undefined;
};

Set.prototype = Object.create(Collection.prototype);

Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        this.insertLast(item);
    }
};

Set.prototype.remove = function (item) {
    var element = getElementByValue(item, this);
    if (element === null) {
        return;
    }
    if (element.prev === null) {
        this.pickFirst();
        return;
    }
    if (element.next === null) {
        this.pickLast();
        return;
    }
    element.prev.next = element.next;
    element.next.prev = element.prev;
};

Set.prototype.has = function (item) {
    var element = getElementByValue(item, this);
    return element !== null;
};

Set.prototype.intersect = function (_set) {
    var element = _set.firstElement;
    var result = new Set();
    for (var i = 0; i < _set.length; i++) {
        if (this.has(element.value)) {
            result.insert(element.value);
        }
        element = element.next;
    }
    return result;
};

Set.prototype.union = function (_set) {
    var element = _set.firstElement;
    var result = new Set();
    for (var i = 0; i < _set.length; i++) {
        result.insert(element.value);
        element = element.next;
    }
    element = this.firstElement;
    for (i = 0; i < this.length; i++) {
        result.insert(element.value);
        element = element.next;
    }
    return result;
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
