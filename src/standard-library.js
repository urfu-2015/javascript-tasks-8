'use strict';

class Collection {
    constructor() {
        this.array = [];
        Object.defineProperty(this, 'first', { get: function () {
            return this.array[0];
        } });
        Object.defineProperty(this, 'last', { get: function () {
            return this.array[this.array.length - 1];
        } });
        Object.defineProperty(this, 'length', { get: function () {
            return this.array.length;
        }, configurable: true});
        Object.defineProperty(this, 'isEmpty', { get: function () {
            return this.array.length === 0;
        } });
    }

    pickFirst() {
        return this.array.shift();
    }

    pickLast() {
        return this.array.pop();
    }

    insertFirst(item) {
        if (item === undefined) {
            throw new Error('item должен быть задан');
        }
        this.array.unshift(item);
    }

    insertLast(item) {
        if (item === undefined) {
            throw new Error('item должен быть задан');
        }
        this.array.push(item);
    }

    empty() {
        this.array = [];
    }
}

class Queue extends Collection {
    constructor() {
        super();

        this.enqueue = this.insertLast;
        this.dequeue = this.pickFirst;
    }
}

class FixedArray extends Collection {
    constructor(maxLength) {
        if (maxLength < 0) {
            throw RangeError('Максимальный размер массива не может быть меньше 0');
        }
        super();
        Object.defineProperty(this, 'length', { get: function () {
            return maxLength;
        } });
    }

    isIndexCorrect(index) {
        return index >= 0 && index < this.length;
    }

    insertAt(index, item) {
        if (item === undefined) {
            throw new Error('item должен быть задан');
        }
        if (!this.isIndexCorrect(index)) {
            throw RangeError();
        }
        this.array[index] = item;
    }

    getAt(index) {
        if (!this.isIndexCorrect(index)) {
            throw RangeError();
        }
        return this.array[index];
    }
}

class Set {
    constructor() {
        this.array = [];
        Object.defineProperty(this, 'length', { get: function () {
            return this.array.length;
        }});
    }

    has(item) {
        return (this.array.indexOf(item) >= 0);
    }

    insert(item) {
        if (item === undefined) {
            throw new Error('item должен быть задан');
        }
        if (!this.has(item)) {
            this.array.push(item);
        }
    }

    remove(item) {
        if (item === undefined) {
            throw new Error('item должен быть задан');
        }
        if (this.has(item)) {
            this.array.splice(this.array.indexOf(item), 1);
        }
    }

    intersect(otherSet) {
        var newSet = new Set();
        this.array.forEach(function (item) {
            if (otherSet.has(item)) {
                newSet.insert(item);
            }
        });
        return newSet;
    }

    union(otherSet) {
        var newSet = new Set();
        this.array.forEach(function (item) {
            newSet.insert(item);
        });

        otherSet.array.forEach(function (item) {
            newSet.insert(item);
        });
        return newSet;
    }

    empty() {
        this.array = [];
    }
}

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
