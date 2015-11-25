'use strict';

function Node(value, priority) {
    this.value = value;
    this.previous = null;
    this.next = null;
    this.priority = priority;
};

function DoublyLinkedList() {
    this.length = 0;
    this.firstItem = null;
    this.lastItem = null;
};

DoublyLinkedList.prototype.add = function (value, priority) {
    var node = new Node(value, priority);
    if (this.length === 0) {
        this.firstItem = node;
        this.lastItem = node;
    } else {
        node.previous = this.lastItem;
        this.lastItem.next = node;
        this.lastItem = node;
    }
    this.length++;
    return node;
};

DoublyLinkedList.prototype.insertAsFirst = function (value, priority) {
    var node = new Node(value, priority);
    if (this.length === 0) {
        this.add(value, 0);
    } else {
        node.next = this.firstItem;
        this.firstItem.previous = node;
        this.firstItem = node;
        this.length++;
        return node;
    }
};

DoublyLinkedList.prototype.getAtIndex = function (index) {
    var currentNode = this.firstItem;
    var length = this.length;
    var position = 0;

    if (index >= 0 && index < length && length > 0) {
        while (index > position) {
            currentNode = currentNode.next;
            position++;
        }
        return currentNode;
    }
    throw new RangeError('Index out of range or collection has no elements');
};

DoublyLinkedList.prototype.delete = function (index) {
    var currentNode = this.firstItem;
    var length = this.length;
    var position = 0;
    var deletedNode = null;

    if (index >= 0 && index < length && length > 0) {
        if (index === 0) {
            deletedNode = this.firstItem;
            this.firstItem = this.firstItem.next;
            if (this.firstItem != null) {
                this.firstItem.previous = null;
            } else {
                this.lastItem = null;
            }
        } else {
            if (index === length - 1) {
                deletedNode = this.lastItem;
                this.lastItem = this.lastItem.previous;
                this.lastItem.next = null;
            } else {
                while (index > position) {
                    currentNode = currentNode.next;
                    position++;
                }
                currentNode.previous.next = currentNode.next;
                currentNode.next.previous = currentNode.previous;
                deletedNode = currentNode;
            }
        }
    } else {
        throw new RangeError('Index out of range or collection has no elements');
    }
    this.length--;
    return deletedNode;
};

DoublyLinkedList.prototype.clear = function () {
    while (this.length > 0) {
        this.delete(0);
    }
};

var Collection = function () {
    this.length = 0;
    this.first = null;
    this.last = null;
    this.isEmpty = this.length === 0;
};
Collection.prototype = Object.create(DoublyLinkedList.prototype);
/*Object.defineProperty(Collection, 'first', {
    get: function () {
        console.log('here');
        return this.firstItem.value;
    }
});*/

Collection.prototype.refresh = function () {
    if (this.length === 0) {
        this.firstItem = null;
        this.lastItem = null;
        this.isEmpty = true;
        this.first = null;
        this.last = null;
    } else {
        this.first = this.firstItem.value;
        this.last = this.lastItem.value;
        this.isEmpty = false;
    }
};

Collection.prototype.insertLast = function (item) {
    this.add(item, 0);
    this.refresh();
};

Collection.prototype.pickFirst = function () {
    var res = this.delete(0).value;
    this.refresh();
    return res;
};

Collection.prototype.pickLast = function () {
    var res = this.delete(this.length - 1).value;
    this.refresh();
    return res;
};

Collection.prototype.insertFirst = function (item) {
    this.insertAsFirst(item);
    this.refresh();
};

Collection.prototype.empty = function () {
    this.clear();
    this.refresh();
};

var Queue = function () {
    this.length = 0;
};

Queue.prototype = Object.create(DoublyLinkedList.prototype);

Queue.prototype.enqueue = function (item) {
    this.add(item, 0);
};

Queue.prototype.dequeue = function () {
    return this.delete(0).value;
};

Queue.prototype.empty = function () {
    this.clear();
};

var FixedArray = function (size) {
    this.length = size;
};

FixedArray.prototype = Object.create(DoublyLinkedList.prototype);

FixedArray.prototype.insertAt = function (index, item) {
    if (this.firstItem === undefined) {
        var size = this.length;
        this.length = 0;
        while (this.length < size) {
            this.add(null, 0);
        }
    }
    var node = this.getAtIndex(index);
    node.value = item;
};

FixedArray.prototype.getAt = function (index) {
    return this.getAtIndex(index).value;
};

var Set = function () {
    this.length = 0;
};

Set.prototype = Object.create(DoublyLinkedList.prototype);

Set.prototype.insert = function (item) {
    if (this.length === 0) {
        this.add(item, 0);
    } else {
        if (!this.has(item)) {
            this.add(item, 0);
        }
    }
};

Set.prototype.remove = function (item) {
    for (var i = 0; i < this.length; i++) {
        if (this.getAtIndex(i).value === item) {
            this.delete(i);
        }
    }
};

Set.prototype.has = function (item) {
    var position = 0;
    while (position < this.length) {
        var value = this.getAtIndex(position).value;
        if (value === item) {
            return true;
        }
        position++;
    }
    return false;
};

Set.prototype.intersect = function (set) {
    var res = set.length > this.length ?
        findIntersect(this, set) : findIntersect(set, this);
    return res;
};

function findIntersect(firstSet, secSet) {
    var res = new Set();
    for (var i = 0; i < firstSet.length; i++) {
        var value = firstSet.getAtIndex(i).value;
        if (secSet.has(value)) {
            res.insert(value);
        }
    }
    return res;
};

Set.prototype.union = function (set) {
    var res = new Set();
    for (var i = 0; i < set.length; i++) {
        res.insert(set.getAtIndex(i).value);
    }
    for (var i = 0; i < this.length; i++) {
        res.insert(this.getAtIndex(i).value);
    }
    return res;
};

Set.prototype.empty = function () {
    this.clear();
};

var PriorityQueue = function () {
    this.length = 0;
};

PriorityQueue.prototype = Object.create(Queue.prototype);

PriorityQueue.prototype.enqueue = function (item, priority) {
    if (this.length === 0) {
        this.add(item, priority);
    } else {
        if (this.length === 1) {
            this.firstItem.priority >= priority ?
                this.add(item, priority) : this.insertAsFirst(item, priority);
        } else {
            var currentNode = this.firstItem;
            var currentPriority = this.firstItem.priority;
            var nextPriority = this.firstItem.next.priority;
            var hasNext = true;
            while (hasNext) {
                if (currentNode.next === null) {
                    hasNext = false;
                    this.add(item, priority);
                } else {
                    currentNode = currentNode.next;
                    currentPriority = currentNode.priority;
                    nextPriority = currentNode.next != null ?
                        currentNode.next.priority : -1;
                }
                if (currentPriority >= priority && priority > nextPriority) {
                    var node = new Node(item, priority);
                    if (currentNode.next != null) {
                        currentNode.next.previous = node;
                    }
                    node.next = currentNode.next;
                    currentNode.next = node;
                    node.previous = currentNode;
                    hasNext = false;
                    this.length++;
                } else {
                    if (currentPriority > priority && priority >= nextPriority) {
                        var node = new Node(item, priority);
                        currentNode = currentNode.next;
                        node.previous = currentNode;
                        node.next = currentNode.next != null ?
                            currentNode.next : null;
                        currentNode.next = node;
                        hasNext = false;
                        this.length++;
                    }
                }
            }
        }
    }
};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
