'use strict';

var Collection = function () {
    this.elements = [];
    Object.defineProperty(this, 'length', {
        get: function () {
            return this.elements.length;
        }
    });

    Object.defineProperty(this, 'first', {
        get: function () {
            return this.elements[0];
        }
    });

    Object.defineProperty(this, 'last', {
        get: function () {
            return this.elements[this.length - 1];
        }
    });

    Object.defineProperty(this, 'isEmpty', {
        get: function () {
            return this.length == 0;
        }
    });

    this.pickFirst = function () {
        if (this.isEmpty) {
            return null;
        }
        return this.elements.shift();
    };

    this.pickLast = function () {
        if (this.isEmpty) {
            return null;
        }
        return this.elements.pop();
    };

    this.insertFirst = function (element) {
        this.elements.unshift(element);
    };

    this.insertLast = function (element) {
        this.elements.push(element);
    };

    this.empty = function () {
        this.elements = [];
    };
};

var Queue = function () {
    this.elements = [];

    Object.defineProperty(this, 'length', {
        get: function () {
            return this.elements.length;
        }
    });

    this.enqueue = function (element) {
        this.elements.push(element);
    };

    this.dequeue = function () {
        if (this.length == 0) {
            return null;
        }
        return this.elements.shift();
    };

    this.empty = function () {
        this.elements = [];
    };
};

var FixedArray = function (size) {
    this.elements = [];
    this.length = size;
    this.insertAt = function (index, elem) {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Index out of range');
        }
        this.elements[index] = elem;
    };

    this.getAt = function (index) {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Index out of range');
        }
        return this.elements[index];
    };
};

var Set = function () {
    this.length = 0;
    this.elements = [];

    Object.defineProperty(this, 'length', {
        get: function () {
            return this.elements.length;
        }
    });

    this.insert = function (item) {
        if (!this.has(item)) {
            this.elements.push(item);
        }
    };

    this.remove = function (item) {
        var index = this.elements.indexOf(item);
        if (index != -1) {
            this.elements.splice(index, 1);
        }
    };

    this.has = function (item) {
        return this.elements.indexOf(item) != -1;
    };

    this.intersect = function (another) {
        var intersection = new Set();
        this.elements.forEach(function (elem) {
            if (another.has(elem)) {
                intersection.insert(elem);
            }
        });
        return intersection;
    };

    this.union = function (another) {
        var union = new Set();
        var insertion = function (elem) {
            union.insert(elem);
        };
        this.elements.forEach(insertion);
        another.elements.forEach(insertion);
        return union;
    };

    this.empty = function () {
        this.elements = [];
    };
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
