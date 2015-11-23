'use strict';

var Collection = function () {
    this._init();
};

Object.defineProperties(Collection.prototype, {
    _init: {
        value: function () {
            this.collection = [];
            this.length = 0;
            this.isEmpty = true;
            this.first = null;
            this.last = null;
        }
    },
    _update: {
        value: function () {
            this.length = this.collection.length;
            this.isEmpty = this.length === 0;
            this.first = this.collection[0];
            this.last = this.collection[this.length - 1]
        }
    },
    pickFirst: {
        value: function () {
            var first = this.first;
            this.collection.shift();
            this._update();
            return first;
        }
    },
    pickLast: {
        value: function () {
            var first = this.last;
            this.collection.pop();
            this._update();
            return first;
        }
    },
    insertFirst: {
        value: function (item) {
            this.collection.unshift(item);
            this._update();
        }
    },
    insertLast: {
        value: function (item) {
            this.collection.push(item);
            this._update();
        }
    },
    empty: {
        value: function () {
            this._init();
        }
    }
});

var Queue = function () {
    Collection.apply(this, arguments);
};

Queue.prototype = Object.create(Collection.prototype);
Queue.prototype.constructor = Queue;

Object.defineProperties(Queue.prototype, {
    enqueue: {
        value: function (item) {
            this.insertLast(item);
        }
    },
    dequeue: {
        value: function () {
            return this.pickFirst();
        }
    }
});

var FixedArray = function (size) {
    this._init(size);
};

Object.defineProperties(FixedArray.prototype, {
    _init: {
        value: function (size) {
            if (size < 0 || !isFinite(size)) {
                throw RangeError;
            }
            this.array = [];
            this.length = size;
        }
    },
    insertAt: {
        value: function (index, item) {
            if (index < 0 || index >= this.length || item === undefined) {
                throw new RangeError;
            }
            this.array[index] = item;
        }
    },
    getAt: {
        value: function (index) {
            if (index < 0 || index >= this.length) {
                throw new RangeError;
            }
            return this.array[index] === undefined ? null : this.collection[index];
        }
    }
});

var Set = function () {
    Collection.apply(this, arguments);
};

Set.prototype = Object.create(Collection.prototype);
Set.prototype.constructor = Set;

Object.defineProperties(Set.prototype, {
    has: {
        value: function (item) {
            return this.collection.indexOf(item) !== -1;
        }
    },
    insert: {
        value: function (item) {
            if (!this.has(item)) {
                this.insertLast(item);
            }
        }
    },
    remove: {
        value: function (item) {
            if (this.has(item)) {
                this.collection.splice(this.collection.indexOf(item), 1);
                this._update();
            }
        }
    },
    intersect: {
        value: function (set) {
            var result = new Set();
            this.collection.forEach(function (item) {
                if (set.has(item)) {
                    result.insert(item);
                }
            });
            return result;
        }
    },
    union: {
        value: function (set) {
            var result = new Set();
            this.collection.forEach(function (item) {
                result.insert(item);
            });
            set.collection.forEach(function (item) {
                result.insert(item);
            });
            return result;
        }
    }
});


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
