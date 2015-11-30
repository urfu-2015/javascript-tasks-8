'use strict';

var Collection = function () {
    Object.defineProperty(this, 'first', {
       writable: true,
       value: null,
       enumerable: false
    });
    Object.defineProperty(this, 'last', {
      writable: true,
      value: null,
      enumerable: false
    });
    Object.defineProperty(this, 'length', {
      writable: true,
      value: 0,
      enumerable: false
    });
    Object.defineProperty(this, 'isEmpty', {
        enumerable: false,
        get: function() {
            return this.length === 0; 
        }
    });
};

var setFirstAndLast = function () {
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }
        if (this[prop] === 0) {
            this.first = prop;
        }
        if (this[prop] === this.length - 1) {
            this.last = prop;
        }
    }
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
    setFirstAndLast.call(this);
    return firstElement;
};

Collection.prototype.pickLast = function () {       
    for (var prop in this) {
        if (this[prop] === this.length - 1) {
            var lastElement = prop;
            delete this[prop];
            this.length--;
            setFirstAndLast.call(this);
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
    setFirstAndLast.call(this);
};
        
Collection.prototype.insertLast = function (element) {
    this[element] = this.length++;
    setFirstAndLast.call(this);
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
        throw new RangeError("Out of range");
    }
};
    
FixedArray.prototype.insertAt = function (index, element){
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
    
FixedArray.prototype.getAt= function (index){
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

};

var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
