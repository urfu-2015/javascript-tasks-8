'use strict';

var Container = function (element) {
    this.value = element.value;
    this.prev = element.prev;
    this.next = element.next;
};

var Collection = function () {
    this.empty();
};

Object.defineProperty(Collection.prototype, 'isEmpty', {
    get: function () {
        return this.length === 0;
    }
});

Object.defineProperty(Collection.prototype, 'first', {
    get: function () {
        return getElement(this.firstElement);
    }
});

Object.defineProperty(Collection.prototype, 'last', {
    get: function () {
        return getElement(this.lastElement);
    }
});


Collection.prototype.insertLast = function (value) {
    var container = new Container({
        value: value,
        prev: this.lastElement,
        next: null
    });
    if (this.lastElement !== null) {
        this.lastElement.next = container;
    }
    if (this.firstElement === null) {
        this.firstElement = container;
    }
    this.lastElement = container;
    this.length++;
};

Collection.prototype.insertFirst = function (value) {
    var container = new Container({
        value: value,
        prev: null,
        next: this.firstElement
    });
    if (this.firstElement !== null) {
        this.firstElement.prev = container;
    }
    if (this.lastElement === null) {
        this.lastElement = container;
    }
    this.firstElement = container;
    this.length++;
};

Collection.prototype.pickFirst = function () {
    var res = this.firstElement;
    this.firstElement = this.firstElement.next;
    if (this.firstElement !== null) {
        this.firstElement.prev = null;
    }
    --this.length;
    return res.value;
};

Collection.prototype.pickLast = function () {
    var res = this.lastElement;
    if (res === null) {
        return;
    }
    this.lastElement = this.lastElement.prev;
    if (this.lastElement !== null) {
        this.lastElement.next = null;
    }
    --this.length;
    return res.value;
};

Collection.prototype.empty = function () {
    this.length = 0;
    this.firstElement = null;
    this.lastElement = null;
};

function getElement(container) {
    if (container === null) {
        return;
    }
    return container.value;
}

var Queue = function () {
    this.empty();
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.enqueue = function (value) {
    this.insertLast(value);
};

Queue.prototype.dequeue = function () {
    return this.pickFirst();
};

var FixedArray = function (size) {
    this.empty();
    for (var i = 0; i < size; i++) {
        this.insertLast();
    }
};

FixedArray.prototype = Object.create(Collection.prototype);

FixedArray.prototype.insertAt = function (index, item) {
    if (this.length <= index || index < 0) {
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
    var newElement = new Container({
        value: item,
        prev: element.prev,
        next: element.next
    });
    element.prev.next = newElement;
    element.next.prev = newElement;
};

FixedArray.prototype.getAt = function (index) {
    if (this.length <= index || index < 0) {
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
    this.empty();
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
