'use strict';

var Node = function (data, prev, next) {
    this.data = data || null;
    this.prev = prev || null;
    this.next = next || null;
};

Node.prototype.setData = function (data) {
    this.data = data;
};

Node.prototype.setPrev = function (prev) {
    this.prev = prev;
};

Node.prototype.setNext = function (next) {
    this.next = next;
};

var DualLinkedList = function () {
    this.first = null;
    this.last = null;
};

DualLinkedList.prototype.insertFirst = function (data) {
    var newNode = new Node(data);
    if (this.first != null) {
        this.first.setPrev(newNode);
        newNode.setNext(this.first);
    }
    this.first = newNode;
    if (this.last === null) {
        this.last = newNode;
    }
};

DualLinkedList.prototype.insertLast = function (data) {
    var newNode = new Node(data);
    if (this.last != null) {
        this.last.setNext(newNode);
        newNode.setPrev(this.last);
    }
    this.last = newNode;
    if (this.first === null) {
        this.first = newNode;
    }
};

DualLinkedList.prototype.pickFirst = function () {
    var firstNode = this.first;
    if (firstNode.next === null) {
        this.last = null;
        this.first = null;
    } else {
        this.first = firstNode.next;
    }
    return firstNode;
};

DualLinkedList.prototype.pickLast = function () {
    var lastNode = this.last;
    if (lastNode.prev === null) {
        this.last = null;
        this.first = null;
    } else {
        this.last = lastNode.prev;
    }
    return lastNode;
};

var Data = function () {
    this.data = new DualLinkedList();
    this.length = 0;
};

var Collection = function () {
    Data.call(this);
    this.first = null;
    this.last = null;
    this.isEmpty = true;
};

Collection.prototype = Object.create(Data.prototype);

Collection.prototype.insertLast = function (item) {
    this.data.insertLast(item);
    updateData(this);
    this.length++;
    this.isEmpty = false;
};

function updateData(collection) {
    collection.data.first ? collection.first = collection.data.first.data : collection.first = null;
    collection.data.last ? collection.last = collection.data.last.data : collection.last = null;
}

Collection.prototype.insertFirst = function (item) {
    this.data.insertFirst(item);
    updateData(this);
    this.length++;
    this.isEmpty = false;
};

Collection.prototype.pickFirst = function () {
    var first = this.first;
    this.data.pickFirst();
    updateData(this);
    this.length = Math.abs(--this.length);
    this.isEmpty = this.length === 0;
    return first;
};

Collection.prototype.pickLast = function () {
    var last = this.last;
    //проверять не пуста ли?
    this.data.pickLast();
    updateData(this);
    this.length = Math.abs(--this.length);
    this.isEmpty = this.length === 0;
    return last;
};

Collection.prototype.empty = function () {
    while (this.first != null) {
        this.pickFirst();
    }
};

var Queue = function () {
    Data.call(this);
};

Queue.prototype = Object.create(Data.prototype);

Queue.prototype.enqueue = function (item) {
    this.data.insertLast(item);
    this.length++;
};

Queue.prototype.dequeue = function () {
    var first = this.data.pickFirst().data;
    this.length = Math.max(0, --this.length);
    return first;
};

Queue.prototype.empty = function () {
    while (this.length != 0) {
        this.dequeue();
    }
};

var FixedArray = function (size) {
    Data.call(this);
    for (var i = 0; i < size; i++) {
        this.data.insertLast(undefined);
    }
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Индекс выходит за пределы массива');
    }
    var currentNode = this.data.first;
    for (var i = 0; i < index; i++) {
        currentNode = currentNode.next;
    }
    currentNode.data = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Индекс выходит за пределы массива');
    }
    var currentNode = this.data.first;
    for (var i = 0; i < index; i++) {
        currentNode = currentNode.next;
    }
    return currentNode.data;
};

var Set = function () {
    Data.call(this);
};

Set.prototype = Object.create(Data.prototype);

Set.prototype.insert = function (item) {
    if (this.has(item)) {
        return;
    }
    this.data.insertLast(item);
    this.length++;
};

Set.prototype.remove = function (item) {
    var length = this.length;
    for (var i = 0; i < length; i++) {
        var currentNode = this.data.first;
        if (currentNode.data === item) {
            if (currentNode.prev === null) {
                this.data.first = currentNode.next;
            } else {
                currentNode.prev.next = currentNode.next;
            }
            if (currentNode.next === null) {
                this.data.last = null;
            } else {
                currentNode.next.prev = currentNode.prev;
            }
        }
    }
    this.length = Math.max(0, --this.length);
};

Set.prototype.has = function (item) {
    var currentNode = this.data.first;
    var length = this.length;
    for (var i = 0; i < length; i++) {
        if (currentNode.data === item) {
            return true;
        }
        currentNode = currentNode.next;
    }
    return false;
};

Set.prototype.intersect = function (set) {
    var res = new Set();
    var length = this.length;
    var currentNode = this.data.first;
    for (var i = 0; i < length; i++) {
        if (set.has(currentNode.data)) {
            res.insert(currentNode.data);
        }
        currentNode = currentNode.next;
    }
    return res;
};

Set.prototype.union = function (set) {
    var res = new Set();
    var length = this.length;
    var currentNode = this.data.first;
    for (var i = 0; i < length; i++) {
        res.insert(currentNode.data);
        currentNode = currentNode.next;
    }
    length = set.length;
    currentNode = set.data.first;
    for (var j = 0; j < length; j++) {
        res.insert(currentNode.data);
        currentNode = currentNode.next;
    }
    return res;
};

Set.prototype.empty = function () {
    var length = this.length;
    var currentNode = this.data.first;
    for (var i = 0; i < length; i++) {
        this.remove(currentNode.data);
        currentNode = currentNode.next;
    }
};

var PriorityQueue = function () {
    Data.call(this);
    this.priority = new DualLinkedList();
};

PriorityQueue.prototype = Object.create(Data.prototype);

PriorityQueue.prototype.enqueue = function (item, priority) {
    if (priority > 100 && priority < 1) {
        console.log('Приоритет должен быть от 1 до 100');
        return;
    }
    this.data.insertLast(item);
    this.priority.insertLast(priority);
    this.length++;
};

PriorityQueue.prototype.dequeue = function () {
    var length = this.length;
    var item = null;
    var priority = 0;
    var currentNode = this.data.first;
    var currentPriorityNode = this.priority.first;
    for (var i = 0; i < length; i++) {
        if (currentPriorityNode.data > priority) {
            item = currentNode.data;
            priority = currentPriorityNode.data;
        }
        currentNode = currentNode.next;
        currentPriorityNode = currentPriorityNode.next;
    }
    this.remove(item, priority);
    return item;
};

PriorityQueue.prototype.remove = function (item, priority) {
    var length = this.length;
    var currentNode = this.data.first;
    var currentPriorityNode = this.priority.first;
    for (var j = 0; j < length; j++) {
        if (currentNode.data === item && currentPriorityNode.data === priority) {
            if (currentNode.prev === null) {
                this.data.first = currentNode.next;
                this.priority.first = currentPriorityNode.next;
            } else {
                currentNode.prev.next = currentNode.next;
                currentPriorityNode.prev.next = currentPriorityNode.next;
            }
            if (currentNode.next === null) {
                this.data.last = currentNode.prev;
                this.priority.last = currentPriorityNode.prev;
            } else {
                currentNode.next.prev = currentNode.prev;
                currentPriorityNode.next.prev = currentPriorityNode.prev;
            }
        }
        currentNode = currentNode.next;
        currentPriorityNode = currentPriorityNode.next;
    }
    this.length = Math.max(0, --length);
};

PriorityQueue.prototype.empty = function () {
    this.data = new DualLinkedList();
    this.priority = new DualLinkedList();
    this.length = 0;
};

var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
