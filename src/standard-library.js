'use strict';

var Collection = function () {
    this.container = [];

};

Collection.prototype = {
    pickFirst: function () {
        return this.container.shift();
    },
    pickLast: function () {
        return this.container.pop();
    },
    insertFirst: function (obj) {
        this.container.unshift(obj);
    },
    insertLast: function (obj) {
        this.container.push(obj);
    },
    empty: function () {
        this.container = [];
    }
};

Object.defineProperties(Collection.prototype, {
    first: {
        get: function () {
             return this.container[0];
        }
    },
    last: {
        get: function () {
            return this.container[this.length - 1];
        }
    },
    length: {
        get: function () {
            return this.container.length
        }
    },
    isEmpty: {
        get: function () {
            return this.length === 0;
        }
    }
});


var Queue = function () {
    this.container = [];
};
Queue.prototype = Object.create(Collection.prototype);

Object.defineProperties(Queue.prototype, {
    enqueue: {
        value: function (obj) {
            this.insertLast(obj);
        }
    },
    dequeue: {
        value: function () {
            return this.pickFirst();
        }
    }
});



var FixedArray = function (size) {
    this.container = [];
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    checkIndex.call(this, index);
    this.container[index] = item;
};
FixedArray.prototype.getAt = function (index) {
    checkIndex.call(this, index);
    return this.container[index];
};

function checkIndex(index) {
    if (index >= this.length || index < 0) {
        throw new RangeError('Index ' + index + ' out of range');
    }
}


var Set = function () {
    this.container = [];
    this.length = 0;
};
Set.prototype.insert = function (item) {
    if (this.container.indexOf(item) === -1) {
        this.container.push(item);
        this.length++;
    }
};
Set.prototype.remove = function (item) {
    if (this.container.indexOf(item) !== -1) {
        this.container.splice(this.container.indexOf(item), 1);
        this.length--;
    }
};
Set.prototype.has = function (item) {
    return this.container.indexOf(item) !== -1;
};
Set.prototype.intersect = function (set) {
    var result = new Set();
    for (var i = 0; i < set.length; i++) {
        if (this.has(set.container[i])) {
            result.insert(set.container[i]);
        }
    }
    return result;
};
Set.prototype.union = function (set) {
    var result = new Set();
    for (var i = 0; i < set.length; i++) {
        result.insert(set.container[i]);
    }
    for (i = 0; i < this.length; i++) {
        if (!result.has(this.container[i])) {
            result.insert(this.container[i]);
        }
    }
    return result;
};
Set.prototype.empty = function () {
    this.container = [];
    this.length = 0;
};


exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
