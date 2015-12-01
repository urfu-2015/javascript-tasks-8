'use strict';

var Collection = function () {
    this.elements = [];
    this._first;
    this._last;
    this._length;
    Object.defineProperty(this, 'first', {
        get: function () {
            if (this.elements.length === 0) {
                return;
            }
            if (this._first !== undefined) {
                return this._first;
            }
            return this.elements[0];
        }
    });
    Object.defineProperty(this, 'last', {
        get: function () {
            if (this.elements.length === 0) {
                return;
            }
            if (this._first !== undefined) {
                return this._first;
            }
            return this.elements[this.elements.length - 1];
        }
    });
    Object.defineProperty(this, 'length', {
        get: function () {
            if (this._length === undefined) {
                return this.elements.length;
            }
            return this._length;
        }
    });
    Object.defineProperty(this, 'isEmpty', {
        get: function () {
            return this.elements.length === 0;
        }
    });

    this.pickFirst = function () {
        if (this.length != 0) {
            return this.elements.shift();
        }
    };
    this.pickLast = function () {
        if (this.length != 0) {
            return this.elements.pop();
        }
    };
    this.insertFirst = function (element) {
        this.elements.unshift(element);
    };
    this.insertLast = function (element) {
        this.elements.push(element);
    };
    this.empty = function () {
        this.elements = [];
        this._first = undefined;
        this._last = undefined;
        this._length = undefined;
    };
};

var Queue = function () {
    Collection.call(this);
    this.enqueue = function (element) {
        this.elements.push(element);
    };
    this.dequeue = function () {
        if (this.length === 0) {
            return;
        }
        return this.elements.shift();
    };
};

var FixedArray = function (size) {
    Collection.call(this);
    this._length = size;
    this.insertAt = function (index, item) {
        if (index === undefined || item === undefined || index >= this.length || index < 0) {
            throw new RangeError();
        }
        this.elements[index] = item;
    };
    this.getAt = function (index) {
        if (index === undefined || index >= this.length || index < 0) {
            throw new RangeError();
        }
        return this.elements[index];
    };
};

var Set = function () {
    Collection.call(this);
    this.insert = function (item) {
        var inCollection = this.elements.some(element => {
            if (element === item) {
                return true;
            }
        });
        if (inCollection) {
            return;
        }
        this.elements.push(item);
    };
    this.remove = function (item) {
        this.elements = this.elements.filter(element => {
            return element !== item;
        });
    };
    this.has = function (item) {
        return this.elements.some(element => {
            return item === element;
        });
    };
    this.intersect = function (set) {
        if (set === undefined) {
            return [].slice.call(this.elements);
        }
        var items = set.intersect();
        items = items.filter(item => {
            if (this.elements.indexOf(item) !== -1) {
                return true;
            }
        });
        return this.create(items);
    };
    this.union = function (set) {
        if (set === undefined) {
            return this.intersect();
        }
        var items = set.intersect();
        items = items.filter(item => {
            if (this.elements.indexOf(item) === -1) {
                return true;
            }
        });
        items = items.concat(this.elements);
        return this.create(items);
    };
    this.create = function (items) {
        var newset = new Set();
        items.forEach(item => {
            newset.insert(item);
        });
        return newset;
    };
};

var PriorityQueue = function () {
    Collection.call(this);
    this.priority = {};
    this.enqueue = function (item, priority) {
        if (priority < 1 || priority > 100) {
            throw new RangeError();
        }
        this.priority[item] = priority;
        this.insertLast(item);
    };
    this.dequeue = function () {
        if (this.length === 0) {
            return;
        }
        var maxPriority = 1;
        for (var item in this.priority) {
            maxPriority = this.priority[item] > maxPriority ? this.priority[item] : maxPriority;
        }

        for (var item of this.elements) {
            if (this.priority[item] === maxPriority) {
                var element = item;
                break;
            }
        }
        delete this.priority[element];
        this.elements = this.elements.filter(item => {
            if (item === element) {
                return false;
            }
            return true;
        });
        return element;
    };
};

var Map = function () {
    Collection.call(this);
    this.elements = {};
    this._length = 0;
    this.addItem = function (key, item) {
        if (!this.elements.hasOwnProperty(key)) {
            this._length++;
            this.elements[key] = item;
        }
    };
    this.removeItem = function (key) {
        if (this.elements.hasOwnProperty(key)) {
            delete this.elements[key];
            this._length--;
        }
    };
    this.getItem = function (key) {
        return this.elements[key];
    };
    this.empty = function () {
        this._length = 0;
        this.elements = {};
    };
};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
