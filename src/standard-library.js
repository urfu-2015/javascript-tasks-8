'use strict';

function CollectionItem(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
}

//  Collection
class Collection {
    constructor(value) {
        this._first = null;
        this._last = null;
        this.length = 0;
    }

    get first() {
        if (this._first === null) {
            return null;
        }
        return this._first.value;
    }

    get last() {
        if (this._last === null) {
            return null;
        }
        return this._last.value;
    }

    get isEmpty() {
        return this.length === 0;
    }

    pickFirst() {
        if (this._first === null) {
            return null;
        }
        var element = this._first.value;
        this._first = this._first.next;
        if (this._first === null) {
            this._last = null;
        }
        this.length -= 1;
        return element;
    }

    pickLast() {
        if (this._last === null) {
            return null;
        }
        var element = this._last.value;
        this._last = this._last.prev;
        if (this._last === null) {
            this._first = null;
        }
        this.length -= 1;
        return element;
    }

    insertFirst(item) {
        var element = new CollectionItem(item, this._first, null);
        this.length += 1;
        if (this._first === null) {
            this._first = element;
            this._last = element;
            return;
        }
        this._first._last = element;
        this._first = element;
    }

    insertLast(item) {
        var element = new CollectionItem(item, null, this._last);
        this.length += 1;
        if (this._last === null) {
            this._first = element;
            this._last = element;
            return;
        }
        this._last.next = element;
        this._last = element;
    }

    empty() {
        this.length = 0;
        this._first = null;
        this._last = null;
    }
}


//  Queue
class Queue {
    constructor() {
        this.elements = new Collection();
    }

    get length() {
        return this.elements.length;
    }

    enqueue(item) {
        this.elements.insertLast(item);
    }

    dequeue() {
        return this.elements.pickFirst();
    }

    empty() {
        this.elements.empty();
    }
}


//  FixedArray
class FixedArray {
    constructor(size) {
        this.elements = [];
        this._length = size;
    }

    get length() {
        return this._length;
    }

    insertAt(index, item) {
        if (index < 0 || index >= this._length) {
            throw new RangeError('Элемент за пределами массива');
        }
        this.elements[index] = item;
    }

    getAt(index) {
        if (index < 0 || index >= this._length) {
            throw new RangeError('Элемент за пределами массива');
        }
        return this.elements[index];
    }
}


//  Set
class Set {
    constructor() {
        this.elements = [];
    }

    get length() {
        return this.elements.length;
    }

    insert(item) {
        if (this.has(item)) {
            return;
        }
        this.elements.push(item);
    }

    remove(item) {
        var index = this.elements.indexOf(item);
        if (index === -1) {
            return;
        }
        this.elements.splice(index, 1);
    }

    has(item) {
        var index = this.elements.indexOf(item);
        if (index === -1) {
            return false;
        }
        return true;
    }

    intersect(set) {
        var out = new Set();
        this.elements.filter(e => set.has(e)).forEach(e => out.insert(e));
        return out;
    }

    union(set) {
        var out = new Set();
        this.elements.forEach(e => out.insert(e));
        set.elements.forEach(e => out.insert(e));
        return out;
    }

    empty() {
        this.elements = [];
    }
}


//  PriorityQueue
class PriorityQueue {
    constructor() {
        this.elements = {};
    }

    enqueue(item, priority) {
        if (this.elements[priority] === null) {
            this.elements[priority] = new Queue();
        }
        this.elements[priority].enqueue(item);
    }

    dequeue() {
        var max_priority = Math.max.apply(this, Object.keys(this.elements));
        if (max_priority === -Infinity) {
            return null;
        }
        var element = this.elements[max_priority].dequeue();
        if (this.elements[max_priority].length === 0) {
            delete this.elements[max_priority];
        }
        return element;
    }
}


//  Map
class Map {
    constructor() {
        this._keys = [];
        this._values = [];
    }

    get length() {
        return this._keys.length;
    }

    addItem(key, item) {
        key = JSON.stringify(key);
        this._keys.push(key);
        this._values.push(item);
    }

    indexKey(key) {
        key = JSON.stringify(key);
        return this._keys.indexOf(key);
    }

    removeItem(key) {
        var index = indexKey(key);
        if (index !== -1) {
            this._keys.splice(index, 1);
            return this._values.splice(index, 1);
        }
        return null;
    }

    getItem(key) {
        var index = indexKey(key);
        if (index !== -1) {
            return this._values[index];
        }
        return null;
    }

    empty() {
        this._keys = [];
        this._values = [];
    }
}


exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
