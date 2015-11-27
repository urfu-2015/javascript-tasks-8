'use strict';

var Collection = function () {
    this._init();
};

Object.defineProperties(Collection.prototype, {
    _init: {
        value: function () {
            this.length = 0;
            this.isEmpty = true;
            this.first = null;
            this.last = null;
            this.collection = null;
        }
    },
    _update: {
        value: function (action, position) {
            action === 'drop' ? this.length-- : this.length++;
            this.isEmpty = this.length === 0;
            if (!this.isEmpty) {
                if (this.first === null && this.last === null) {
                    this.first = this.collection.data;
                    this.last = this.collection.data;
                } else {
                    if (position === 'first') {
                        this.first = this.collection.data;
                    } else {
                        this.last = this.collection.data;
                    }
                }
            }
        }
    },
    _inEnd: {
        value: function () {
            while (this.collection.next != null) {
                this.collection = this.collection.next;
            }
        }
    },
    _inBeginning: {
        value: function () {
            while (this.collection.prev != null) {
                this.collection = this.collection.prev;
            }
        }
    },
    pickFirst: {
        value: function () {
            if (this.collection === null) {
                return null;
            } else {
                this._inBeginning();
                var dropItem = this.collection.data;
                this.collection = this.collection.next;
                if (this.collection !== null) {
                    this.collection.prev = null;
                }
                this._update('drop', 'first');
                return dropItem;
            }
        }
    },
    pickLast: {
        value: function () {
            if (this.collection === null) {
                return null;
            } else {
                this._inEnd();
                var dropItem = this.collection.data;
                this.collection = this.collection.prev;
                if (this.collection !== null) {
                    this.collection.next = null;
                }
                this._update('drop', 'last');
                return dropItem;
            }
        }
    },
    insertFirst: {
        value: function (item) {
            var newItem = {
                data: item,
                priority: arguments[1] || null,
                next: null,
                prev: null
            };
            if (this.collection === null) {
                this.collection = newItem;
            } else {
                this._inBeginning();
                newItem.next = this.collection;
                this.collection.prev = newItem;
                this.collection = newItem;
            }
            this._update('add', 'first');
        }
    },
    insertLast: {
        value: function (item) {
            var newItem = {
                data: item,
                priority: arguments[1] || null,
                next: null,
                prev: null
            };
            if (this.collection === null) {
                this.collection = newItem;
            } else {
                this._inEnd();
                newItem.prev = this.collection;
                this.collection.next = newItem;
                this.collection = newItem;
            }
            this._update('add', 'last');
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
            if (size < 0 || isNaN(size)) {
                throw new RangeError();
            }
            this.array = [];
            this.length = size;
        }
    },
    insertAt: {
        value: function (index, item) {
            if (index < 0 || index >= this.length || item === undefined) {
                throw new RangeError();
            }
            this.array[index] = item;
        }
    },
    getAt: {
        value: function (index) {
            if (index < 0 || index >= this.length) {
                throw new RangeError();
            }
            return this.array[index] === undefined ? null : this.array[index];
        }
    }
});

var Set = function () {
    this._init();
};

Object.defineProperties(Set.prototype, {
    _init: {
        value: function () {
            this.collection = [];
            this.length = 0;
        }
    },
    _update: {
        value: function () {
            this.length = this.collection.length;
        }
    },
    has: {
        value: function (item) {
            return this.collection.indexOf(item) !== -1;
        }
    },
    insert: {
        value: function (item) {
            if (!this.has(item)) {
                this.collection.push(item);
                this._update();
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
    },
    empty: {
        value: function () {
            this._init();
        }
    }
});


var PriorityQueue = function () {
    Collection.apply(this, arguments);
};

PriorityQueue.prototype = Object.create(Collection.prototype);
PriorityQueue.prototype.constructor = PriorityQueue;

Object.defineProperties(PriorityQueue.prototype, {
    enqueue: {
        value: function (item, priority) {
            if (1 < priority && priority > 100) {
                throw new RangeError();
            }
            this.insertLast(item, priority);
        }
    },
    dequeue: {
        value: function () {
            this._inBeginning();
            var maxItem = this.collection.data;
            var maxPriority = this.collection.priority;
            while (this.collection.next != null) {
                this.collection = this.collection.next;
                if (this.collection.priority > maxPriority) {
                    maxPriority = this.collection.priority;
                    maxItem = this.collection.data;
                }
            }
            if (this.collection.priority === maxPriority &&
                this.collection.data === maxItem) {
                return this.pickLast();
            } else {
                while (this.collection.prev != null) {
                    this.collection = this.collection.prev;
                    if (this.collection.priority === maxPriority &&
                        this.collection.data === maxItem) {
                        var prev = this.collection.prev;
                        var next = this.collection.next;
                        next.prev = prev;
                        if (prev != null) {
                            prev.next = next;
                        }
                        this.collection = next;
                    }
                }
                this.length--;
                return maxItem;
            }
        }
    }
});

var Map = function () {
    this._init();
};

Object.defineProperties(Map.prototype, {
    _init: {
        value: function () {
            this.collection = {};
            this.length = 0;
            this.isEmpty = true;
        }
    },
    _update: {
        value: function () {
            this.length = Object.keys(this.collection).length;
            this.isEmpty = this.length === 0;
        }
    },
    addItem: {
        value: function (key, item) {
            if (this.getItem(key) === null) {
                this.collection[key] = item;
            }
            this._update();
        }
    },
    removeItem: {
        value: function (key) {
            var item;
            if (item = this.getItem(key)) {
                delete this.collection[key];
                this._update();
                return item;
            }
        }
    },
    getItem: {
        value: function (key) {
            return this.collection[key] ? this.collection[key] : null;
        }
    },
    empty: {
        value: function () {
            this._init();
        }
    }
});



exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
