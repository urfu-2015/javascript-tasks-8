'use strict';

var Collection = function () {
    this._head = null;
    this._tail = null;
};

function ItemCollection(val) {
    this.value = val;
    this.next = null;
    this.prev = null;
}

Collection.prototype = {
    _isValid: function (obj) {
        return obj.hasOwnProperty('next') && obj.hasOwnProperty('prev');
    },
    _pick: function (obj) {
        if (!this._isValid(obj)) {
            return null;
        }
        if (obj.next && obj.prev === null) {
            obj.next.prev = null;
            obj = obj.next;
        } else if (obj.prev && obj.next === null) {
            obj.prev.next = null;
            obj = obj.prev;
        } else {
            return null;
        }
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
    _insert: function (val, index) {
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
    }
};

Object.defineProperties(Collection.prototype, {
    first: {
        get: function () {
            return this._head ? this._head.value : null;
        }
    },
    last: {
        get: function () {
            return this._tail ? this._tail.value : null;
        }
    },
    isEmpty: {
        get: function () {
            return this._head === null && this._tail === null;
        }
    },
    length: {
        get: function () {
            var pointer = this._head;
            var len = 0;
            while (pointer) {
                len++;
                pointer = pointer.next;
            }
            return len;
        }
    }
});


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
    while (size--) {
        this._insert(null, null);
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
    this.list = [];
};

Set.prototype = {
    insert: function (item) {
        if (this.has(item)) {
            return;
        }
        this.list.push(item);
    },
    remove: function (item) {
        if (!this.has(item)) {
            return;
        }
        this.list = this.list.filter(value => value !== item);
    },
    has: function (item) {
        return Boolean(this.list.indexOf(item) + 1);
    },
    intersect: function (set) {
        var res = new Set();
        res.list = this.list.filter(value => Boolean(set.list.indexOf(value) + 1));
        return res;
    },
    union: function (set) {
        var res = new Set();
        res.list = this.list
            .concat(set.list)
            .filter((value, index, arr) => !Boolean(arr.indexOf(value, index + 1) + 1));
        return res;
    },
    empty: function () {
        this.list.length = 0;
    }
};

Object.defineProperty(Set.prototype, 'length', {
    get: function () {
        return this.list.length;
    }
});


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
    },
    hasItem: function (key) {
        return Boolean(this.keys.indexOf(key) + 1);
    },
    isValidKey: function (key) {
        return (typeof key === 'string' || typeof key === 'object') && !(key instanceof Array);
    },
    getKeyIndex: function (key) {
        key = JSON.stringify(key);
        return this.keys.indexOf(key);
    },
    removeItem: function (key) {
        var index = this.getKeyIndex(key);
        if (index === -1 || !this.isValidKey(key)) {
            return;
        }
        this.keys.splice(index, 1);
        this.items.splice(index, 1);
    },
    getItem: function (key) {
        var index = this.getKeyIndex(key);
        if (index === -1 || !this.isValidKey(key)) {
            return null;
        }
        return this.items[index];
    },
    empty: function () {
        this.keys.length = 0;
        this.items.length = 0;
    }
};

Object.defineProperty(Map.prototype, 'length', {
    get: function () {
        return this.keys.length;
    }
});


exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
