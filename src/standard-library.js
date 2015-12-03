'use strict';

var MAX_FIXED_ARRAY_SIZE = 3000000;

var Node = function (value) {
    this.value = value;
    this.next = null;
    this.prev = null;
};

var DoublyLinkedList = function () {
    this.empty();
};

DoublyLinkedList.prototype.empty = function () {
    this.length = 0;
    this.first = null;
    this.firstNode = null;
    this.last = null;
    this.lastNode = null;
    this.isEmpty = true;
    this.current = this.firstNode;
};

DoublyLinkedList.prototype.update = function () {
    this.first = this.firstNode.value;
    this.last = this.lastNode.value;
    this.isEmpty = this.length === 0;
};

DoublyLinkedList.prototype.addFirst = function (value) {
    var node = new Node(value);
    this.firstNode = node;
    this.lastNode = node;
    this.length++;
    this.update();
};

DoublyLinkedList.prototype.setFirst = function (node) {
    this.firstNode = node;
    this.firstNode.prev = null;
    this.update();
};

DoublyLinkedList.prototype.setLast = function (node) {
    this.lastNode = node;
    this.lastNode.next = null;
    this.update();
};

DoublyLinkedList.prototype.insertFirst = function (value) {
    if (this.length === 0) {
        this.addFirst(value);
        return;
    }
    var node = new Node(value);
    this.firstNode.prev = node;
    node.next = this.firstNode;
    this.setFirst(node);
    this.length++;
};

DoublyLinkedList.prototype.insertLast = function (value) {
    if (this.length === 0) {
        this.addFirst(value);
        return;
    }
    var node = new Node(value);
    this.lastNode.next = node;
    node.prev = this.lastNode;
    this.setLast(node);
    this.length++;
};

DoublyLinkedList.prototype.findByValue = function (value) {
    var i = 0;
    var node = this.firstNode;
    while (i < this.length) {
        if (node.value === value) {
            return {node: node, index: i};
        }
        i++;
        node = node.next;
    }
    return null;
};

DoublyLinkedList.prototype.findByIndex = function (index) {
    if (index < 0 || index >= this.length) {
        throw new RangeError();
    }
    var i = 0;
    var node = this.firstNode;
    while (i < index) {
        i++;
        node = node.next;
    }
    return node;
};

DoublyLinkedList.prototype.deleteByIndex = function (index) {
    if (index < 0 || index > this.length - 1) {
        throw new RangeError;
    }
    if (!this.length) {
        throw new RangeError();
    }
    if (this.length === 1) {
        this.empty();
        return;
    }
    if (index === 0) {
        this.deleteFirst();
        return;
    }
    if (index === this.length - 1) {
        this.deleteLast();
        return;
    }
    var i = 0;
    var node = this.firstNode;
    while (i < index) {
        node = node.next;
        i++;
    }
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.length--;
};

DoublyLinkedList.prototype.deleteFirst = function () {
    if (!this.length) {
        throw new RangeError();
        return;
    }
    if (this.length === 1) {
        this.empty();
        return;
    }
    this.setFirst(this.firstNode.next);
    this.length--;
};

DoublyLinkedList.prototype.deleteLast = function () {
    if (!this.length) {
        throw new RangeError();
        return;
    }
    if (this.length === 1) {
        this.empty();
        return;
    }
    this.setLast(this.lastNode.prev);
    this.length--;
};

DoublyLinkedList.prototype.getNext = function () {
    if (!this.current) {
        this.current = this.firstNode;
    }
    if (this.current != this.lastNode) {
        this.current = this.current.next;
        return this.current.value;
    }
    return null;
};

var Collection = function () {
    DoublyLinkedList.call(this);
};
Collection.prototype = Object.create(DoublyLinkedList.prototype);
Collection.prototype.constructor = Collection;
Collection.prototype.pickFirst = function () {
    var item = this.first;
    if (this.length) {
        this.deleteFirst();
    }
    return item;
};

Collection.prototype.pickLast = function () {
    var item = this.last;
    if (this.length) {
        this.deleteLast();
    }
    return item;
};

var Queue = function () {
    DoublyLinkedList.call(this);
};
Queue.prototype = Object.create(DoublyLinkedList.prototype);
Queue.prototype.constructor = Queue;
Queue.prototype.enqueue = function (item) {
    this.insertLast(item);
};
Queue.prototype.dequeue = function () {
    var item = this.first;
    if (this.length) {
        this.deleteFirst();
    }
    return item;
};

var FixedArray = function (size) {
    DoublyLinkedList.call(this);
    if (size < 1 || size > MAX_FIXED_ARRAY_SIZE) {
        throw new RangeError();
    }
    for (var i = 0; i < size; i++) {
        this.insertLast(undefined);
    }
};
FixedArray.prototype = Object.create(DoublyLinkedList.prototype);
FixedArray.prototype.constructor = FixedArray;
FixedArray.prototype.insertAt = function (index, item) {
    if (!item) {
        throw new Error();
    }
    this.findByIndex(index).value = item;
};
FixedArray.prototype.getAt = function (index) {
    return this.findByIndex(index).value;
};

var Set = function () {
    DoublyLinkedList.call(this);
};

Set.prototype = Object.create(DoublyLinkedList.prototype);
Set.prototype.constructor = Set;
Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        this.insertLast(item);
    }
};
Set.prototype.remove = function (item) {
    var obj = this.findByValue(item);
    if (obj) {
        this.deleteByIndex(obj.index);
    }
};

Set.prototype.has = function (item) {
    return this.findByValue(item) ? true : false;
};

Set.prototype.intersect = function (set) {
    var newSet = new Set();
    var value = this.first;
    while (value) {
        if (set.has(value)) {
            newSet.insert(value);
        }
        value = this.getNext();
    }
    return newSet;
};
Set.prototype.union = function (set) {
    var newSet = new Set();
    var value = this.first;
    while (value) {
        newSet.insert(value);
        value = this.getNext();
    }
    value = set.first;
    while (value) {
        newSet.insert(value);
        value = set.getNext();
    }
    return newSet;
};

var Heap = function () {
    this.length = 0;
    this.array = [];
};

Heap.prototype.heapify = function (i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    if (left < this.length) {
        if (this.array[i].priority < this.array[left].priority) {
            var temp = this.array[i];
            this.array[i] = this.array[left];
            this.array[left] = temp;
            this.heapify(left);
        }
    }
    if (right < this.length) {
        if (this.array[i].priority < this.array[right].priority) {
            var temp = this.array[i];
            this.array[i] = this.array[right];
            this.array[right] = temp;
            this.heapify(right);
        }
    }
};

Heap.prototype.heapInsert = function (value, priority) {
    var i = this.length;
    this.array[i] = {value: value, priority: priority};
    var parent = Number((i - 1) / 2).toFixed();
    while (parent >= 0 && i > 0) {
        if (this.array[i].priority > this.array[parent].priority) {
            var temp = this.array[i];
            this.array[i] = this.array[parent];
            this.array[parent] = temp;
        }
        i = parent;
        parent = (i - 1) / 2;
    }
    this.length++;
};

Heap.prototype.extractMax = function () {
    if (this.length < 1) {
        throw new RangeError();
    }
    var max = this.array[0];
    this.array[0] = this.array[this.length - 1];
    this.length--;
    this.heapify(0);
    return max.value;
};

var PriorityQueue = function () {
    Heap.call(this);
};
PriorityQueue.prototype = Object.create(Heap.prototype);
PriorityQueue.prototype.constructor = PriorityQueue;
PriorityQueue.prototype.enqueue = function (item, priority) {
    if (!priority) {
        throw new Error();
    }
    this.heapInsert(item, priority);
};
PriorityQueue.prototype.dequeue = function () {
    if (this.length) {
        return this.extractMax();
    }
    return null;
};

var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
