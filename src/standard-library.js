'use strict';

var Collection = function () {
    Object.defineProperty(this, 'first', {
        enumerable: false,
        get: function () {
            for (var prop in this) {
                if (!this.hasOwnProperty(prop)) {
                    continue;
                }
                if (this[prop] === 0) {
                    return prop;
                }
            }
        }
    });
    Object.defineProperty(this, 'last', {
        enumerable: false,
        get: function () {
            for (var prop in this) {
                if (!this.hasOwnProperty(prop)) {
                    continue;
                }
                if (this[prop] === this.length - 1) {
                    return prop;
                }
            }
        }
    });
    Object.defineProperty(this, 'length', {
        writable: true,
        value: 0,
        enumerable: false
    });
    Object.defineProperty(this, 'isEmpty', {
        enumerable: false,
        get: function () {
            return this.length === 0;
        }
    });
};

Collection.prototype.pickFirst = function () {
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        if (this[prop] === 0) {
            var firstElement = prop;
            delete this[prop];
            this.length--;
            continue;
        }
        this[prop]--;
    }
    return firstElement;
};

Collection.prototype.pickLast = function () {
    for (var prop in this) {
        if (this[prop] === this.length - 1) {
            var lastElement = prop;
            delete this[prop];
            this.length--;
            return lastElement;
        }
    }
};

Collection.prototype.insertFirst = function (element) {
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        this[prop]++;
    }
    this[element] = 0;
    this.length++;
};

Collection.prototype.insertLast = function (element) {
    this[element] = this.length++;
};

Collection.prototype.empty = function () {
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        delete this[prop];
        this.length--;
    }
};

var Queue = function () {
    Object.defineProperty(this, 'length', {
        writable: true,
        value: 0,
        enumerable: false
    });
};

Queue.prototype.enqueue = function (element) {
    this[element] = this.length++;
};

Queue.prototype.dequeue = function () {
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        if (this[prop] === 0) {
            var firstElement = prop;
            delete this[prop];
            this.length--;
            continue;
        }
        this[prop]--;
    }
    return firstElement;
};

Queue.prototype.empty = function () {
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        delete this[prop];
        this.length--;
    };
};

var FixedArray = function (size) {
    Object.defineProperty(this, 'length', {
        writable: true,
        value: size,
        enumerable: false
    });
};

var isActionValid = function (index) {
    if (!(index >= 0 && index < this.length)) {
        throw new RangeError('Out of range');
    }
};

FixedArray.prototype.insertAt = function (index, element) {
    isActionValid.call(this, index);
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        if (this[prop] >= index) {
            this[prop]++;
        }
    }
    this[element] = index;
};

FixedArray.prototype.getAt = function (index) {
    isActionValid.call(this, index);
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        if (this[prop] === index) {
            return prop;
        }
    }
};

var Set = function () {
    Object.defineProperty(this, 'length', {
        writable: true,
        value: 0,
        enumerable: false
    });
};

Set.prototype.insert = function (element) {
    if (!(this.has(element))) {
        this[element] = null;
        this.length++;
    }
};

Set.prototype.remove = function (element) {
    if (this.has(element)) {
        delete this[element];
        this.length--;
    }
};

Set.prototype.has = function (element) {
    return element in this;
};

Set.prototype.intersect = function (set) {
    var newSet = new Set();
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        if (set.has(prop)) {
            newSet.insert(prop);
        }
    }
    return newSet;
};

Set.prototype.union = function (set) {
    var newSet = new Set();
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        newSet.insert(prop);
    }
    for (var prop in set) {
        if (!set.hasOwnProperty(prop)) {
            continue;
        }
        newSet.insert(prop);
    }
    return newSet;
};

Set.prototype.empty = function () {
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        delete this[prop];
        this.length--;
    }
};

var PriorityQueue = function () {
    Object.defineProperty(this, 'maxPriority', {
        writable: true,
        value: 0,
        enumerable: false
    });
    Object.defineProperty(this, 'maxPriorityElements', {
        writable: true,
        value: 0,
        enumerable: false
    });
};

PriorityQueue.prototype.enqueue = function (item, priority) {
    if (!(priority > 1 && priority < 100)) {
        priority = 0;
    }
    if (priority > this.maxPriority) {
        this.maxPriority = priority;
        this.maxPriorityElements = 1;
    } else {
        if (priority === this.maxPriority) {
            this.maxPriorityElements++;
        }
    }
    this[item] = priority;
};

PriorityQueue.prototype.dequeue = function () {
    for (var item in this) {
        if (!this.hasOwnProperty(item)) {
            continue;
        }
        if (this[item] === this.maxPriority) {
            var element = item;
            delete this[item];
            this.maxPriorityElements--;
            if (this.maxPriorityElements === 0) {
                this.maxPriority = 0;
                for (var item in this) {
                    if (!this.hasOwnProperty(item)) {
                        continue;
                    }
                    if (this[item] > this.maxPriority) {
                        this.maxPriority = this[item];
                        this.maxPriorityElements = 1;
                    } else {
                        if (this[item] === this.maxPriority) {
                            this.maxPriorityElements++;
                        }
                    }
                }
            }
        }
    }
    return element === undefined ? null : element;
};

var Map = function () {};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
