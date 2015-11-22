'use strict';

var Collection = function () {
    this.collection = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

Collection.prototype.pickFirst = function () {
    if (this.length === 1) {
        this.isEmpty = true;
    };
    if (this.length === 0) {
        return null;
    } else {
        var first = this.collection[0];
        this.collection = this.collection.slice(1);
        this.length = this.length - 1;
        this.first = this.collection[0];
        return first;
    }
};

Collection.prototype.pickLast = function () {
    if (this.length === 1) {
        this.isEmpty = true;
    };
    if (this.length === 0) {
        return null;
    } else {
        var last = this.collection[this.length - 1];
        this.last = this.collection[this.length - 2];
        this.collection = this.collection.slice(0, this.length - 1);
        this.length = this.length - 1;
        return last;
    }
};

Collection.prototype.insertFirst = function (item) {
    if (this.length === 0) {
        this.first = item;
        this.last = item;
        this.length = 1;
        this.collection = [item];
    } else {
        this.first = item;
        this.collection = [item].concat(this.collection);
        this.length = this.length + 1;
    };
    this.isEmpty = false;
};

Collection.prototype.insertLast = function (item) {
    if (this.length === 0) {
        this.first = item;
        this.last = item;
        this.length = 1;
        this.collection = [item];
    } else {
        this.last = item;
        this.collection = this.collection.concat([item]);
        this.length = this.length + 1;
    };
    this.isEmpty = false;
};

Collection.prototype.empty = function () {
    this.collection = [];
    this.isEmpty = true;
};

var Queue = function () {
    this.queue = [];
    this.length = 0;
};

Queue.prototype.enqueue = function (item) {
    this.queue = this.queue.concat([item]);
    this.length = this.length + 1;
};

Queue.prototype.dequeue = function () {
    var first = this.queue[0];
    this.queue = this.queue.slice(1);
    this.length = this.length - 1;
    return first;
};

Queue.prototype.empty = function () {
    this.queue = [];
    this.length = 0;
};

var FixedArray = function (size) {
    this.fixedArray = [];
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index > this.length - 1 || index < 0) {
        throw new RangeError('Выход за пределы массива');
    };
    this.fixedArray[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index > this.length - 1 || index < 0) {
        throw new RangeError('Выход за пределы массива');
    };
    return this.fixedArray[index];
};

var Set = function () {
    this.set = [];
    this.length = 0;
};

Set.prototype.insert = function (item) {
    if (this.set.indexOf(item) === -1) {
        this.set = this.set.concat([item]);
        this.length = this.length + 1;
    };
};

Set.prototype.remove = function (item) {
    this.set.splice(this.set.indexOf(item), 1);
    this.length = this.length - 1;
};

Set.prototype.has = function (item) {
    return this.set.indexOf(item) != -1;
};

Set.prototype.intersect = function (set) {
    var intersect = new Set();
    this.set.forEach(function (item) {
        if (set.has(item)) {
            intersect.insert(item);
        }
    });
    return intersect;
};

Set.prototype.union = function (set) {
    var union = new Set();
    this.set.forEach(function (item) {
        union.insert(item);
    });
    set.set.forEach(function (item) {
        union.insert(item);
    });
    return union;
};

Set.prototype.empty = function () {
    this.set = [];
    this.length = 0;
};


var PriorityQueue = function () {
    this.priorityQueue = [];//массив массивов: приоритет соответствует индексу
    this.length = 0;
    this.listOfPriorities = [];//список приоритетов
};

PriorityQueue.prototype.enqueue = function (item, priority) {
    this.length = this.length + 1;
    if (this.listOfPriorities.indexOf(priority) == -1) {
        this.listOfPriorities.push(priority);
    };
    if (this.priorityQueue[priority] === undefined) {
        this.priorityQueue[priority] = [item];
    } else {
        this.priorityQueue[priority] = this.priorityQueue[priority].concat([item]);
    };
};

PriorityQueue.prototype.dequeue = function () {
    if (this.listOfPriorities[0] == undefined) {
        throw new Error('Элементов больше нет');
    };
    var maxPriority = Math.max.apply(Math, this.listOfPriorities);
    var item = this.priorityQueue[maxPriority][0];
    this.length = this.length - 1;
    if (this.priorityQueue[maxPriority].length === 1) {
        this.listOfPriorities.splice(this.listOfPriorities.indexOf(maxPriority), 1);
        this.priorityQueue[maxPriority].splice(0, 1);
    } else {
        this.priorityQueue[maxPriority].splice(this.priorityQueue[maxPriority].indexOf(item),
                                                                                             1);
    };
    return item;
};

var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
