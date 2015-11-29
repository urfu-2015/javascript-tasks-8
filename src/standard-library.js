'use strict';

var Collection = function () {
    this.first = null;
    this.last = null;
    this.isEmpty = true;
    this.length = 0;
    this._head = null;
    this._tail = null;
};

function ItemCollection(val) {
    this.value = val;
    this.next = null;
    this.prev = null;
}

ItemCollection.prototype = Collection.prototype;
ItemCollection.prototype.constructor = ItemCollection;

Collection.prototype = {
    _updateValues: function () {
        this.length++;
        this.first = this._head.value;
        this.last = this._tail.value;
        this.isEmpty = !(this._head !== null || this._tail !== null);
    },
    _isValid: function (obj) {
        return obj.hasOwnProperty('next') && obj.hasOwnProperty('prev');
    },
    _pick: function (obj) {
        if (!this._isValid(obj)) {
            return undefined;
        }
        if (obj.next && obj.prev === null) {
            obj.next.prev = null;
            obj = obj.next;
        } else if (obj.prev && obj.next === null) {
            obj.prev.next = null;
            obj = obj.prev;
        } else {
            obj.value = null;
            this.isEmpty = true;
        }
        this.length--;
        this.isEmpty = !(this._head !== null || this._tail !== null);
        return obj;
    },
    pickFirst: function () {
        if (this._head === null) {
            return null;
        }
        var val = this._head.value;
        this._head = this._pick(this._head);
        return val;
    },
    pickLast: function () {
        if (this._tail === null) {
            return null;
        }
        var val = this._tail.value;
        this._tail = this._pick(this._tail);
        return val;
    },
    _insert: function (val, index, isFixed) {
        isFixed = isFixed || null;
        var temp = new ItemCollection(val);
        if (this._head === null) {
            this._head = temp;
            this._tail = temp;
        } else if (index === null) {
            temp.next = this._head;
            this._head.prev = temp;
            this._head = temp;
        } else if (index === Infinity) {
            temp.prev = this._tail;
            this._tail.next = temp;
            this._tail = temp;
        }
        if (!isFixed) {
            this._updateValues();
        }
    },
    insertFirst: function (val) {
        this._insert(val, null);
    },
    insertLast: function (val) {
        this._insert(val, Infinity);
    },
    empty: function () {
        while (this._head !== null) {
            this._head.prev = null;
            this._head.value = null;
            var temp = this._head.next;
            this._head.next = null;
            this._head = temp;
        }
        this._tail = null;
        this.first = null;
        this.last = null;
        this.length = 0;
        this.isEmpty = !(this._head !== null || this._tail !== null);
    }
};


var Queue = function () {
    Collection.call(this);
};
Queue.prototype = Object.create(Collection.prototype);
Queue.prototype.constructor = Queue;

Queue.prototype.enqueue = function (item) {
    this.insertLast(item);
};

Queue.prototype.dequeue = function () {
    return this.pickFirst();
};


var FixedArray = function (size) {
    if (size < 0) {
        throw new RangeError('Size must be more than 0 or equal 0');
    }
    size = Math.min(100, size);
    Collection.call(this);
    this.length = size;
    while (size--) {
        this._insert(null, null, true);
    }
};
FixedArray.prototype = Object.create(Collection.prototype);
FixedArray.prototype.constructor = FixedArray;

FixedArray.prototype.isRangeError = function (index) {
    if (Number(index) >= this.length || Number(index) < 0) {
        throw new RangeError('Index must be between 0 and ' + this.length);
    }
};

FixedArray.prototype.getObjectAt = function (index) {
    var pointer = this._head;
    for (var num = 0; num !== Number(index); num++) {
        if (pointer.next === null) {
            break;
        }
        pointer = pointer.next;
    }
    return pointer;
};

FixedArray.prototype.insertAt = function (index, item) {
    this.isRangeError(index);
    var obj = this.getObjectAt(index);
    obj.value = item;
};

FixedArray.prototype.getAt = function (index) {
    this.isRangeError(index);
    var obj = this.getObjectAt(index);
    return obj.value;
};

var Set = function () {
    this.length = 0;
    this.list = [];
};
Set.prototype = {
    insert: function (item) {
        if (this.has(item)) {
            return;
        }
        this.list.push(item);
        this.length++;
    },
    remove: function (item) {
        if (!this.has(item)) {
            return;
        }
        this.list = this.list.filter(value => value !== item);
        this.length--;
    },
    has: function (item) {
        return Boolean(this.list.indexOf(item) + 1);
    },
    intersect: function (set) {
        var res = new Set();
        res.list = this.list.filter(value => Boolean(set.list.indexOf(value) + 1));
        res.length = res.list.length;
        return res;
    },
    union: function (set) {
        var res = new Set();
        res.list = this.list
            .concat(set.list)
            .filter((value, index, arr) => !Boolean(arr.indexOf(value, index + 1) + 1));
        res.length = res.list.length;
        return res;
    },
    empty: function () {
        this.list.length = 0;
        this.length = 0;
    }
};

var PriorityQueue = function () {
    this.list = [];
};
PriorityQueue.prototype = {
    enqueue: function (item, priority) {
        priority = Math.min(Math.max(1, priority), 100);
        var obj = { value: item, priority: priority };
        this.list.push(obj);
    },
    dequeue: function () {
        if (!this.list.length) {
            return null;
        }
        var maxIndex = 0;
        this.list.forEach((item, index, arr) => {
            if (item.priority > arr[maxIndex].priority) {
                maxIndex = index;
            }
        });
        return this.list.splice(maxIndex, 1).shift().value;
    }
};

var Map = function () {
    this.length = 0;
    this.keys = [];
    this.items = [];
};

Map.prototype = {
    addItem: function (key, item) {
        var strKey = JSON.stringify(key);
        if (this.hasItem(strKey) || !this.isValidKey(key)) {
            return;
        }
        this.keys.push(strKey);
        this.items.push(item);
        this.length++;
    },
    hasItem: function (key) {
        return Boolean(this.keys.indexOf(key) + 1);
    },
    isValidKey: function (key) {
        return (typeof key === 'string' || typeof key === 'object') && !(key instanceof Array);
    },
    removeItem: function (key) {
        var strKey = JSON.stringify(key);
        if (!this.hasItem(strKey) || !this.isValidKey(key)) {
            return;
        }
        var index = this.keys.indexOf(strKey);
        this.keys.splice(index, 1);
        this.items.splice(index, 1);
        this.length--;
    },
    getItem: function (key) {
        var strKey = JSON.stringify(key);
        if (!this.hasItem(strKey) || !this.isValidKey(key)) {
            return null;
        }
        var index = this.keys.indexOf(strKey);
        return this.items[index];
    },
    empty: function () {
        this.keys.length = 0;
        this.items.length = 0;
        this.length = 0;
    }
};


exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
