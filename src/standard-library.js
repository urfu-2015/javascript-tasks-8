'use strict';

var Collection = function () {
    var collection = {};
    var setFirstAndLast = function () {
        this.first = undefined;
        this.last = undefined;
        for (var prop in collection) {
            if (collection[prop] === 0) {
                this.first = prop;
            }
            if (collection[prop] === this.length - 1) {
                this.last = prop;
            }
        }
    };
    
    this.first = undefined;
    this.last = undefined;
    this.length = 0;
    this.isEmpty = this.length === 0;
    
    this.pickFirst = function () {
        var newCollection = {};
        for (var prop in collection) {
            if (collection[prop] === 0) {
                var firstElement = prop;
                continue;
            }
            newCollection[prop] = collection[prop] - 1;
        }
        collection = newCollection;
        this.length--;
        setFirstAndLast.call(this);
        return firstElement;
    };
    
    this.pickLast = function () {
        var newCollection = {};
        for (var prop in collection) {
            if (collection[prop] === this.length - 1) {
                var lastElement = prop;
                break;
            }
            newCollection[prop] = collection[prop];
        }
        collection = newCollection;
        this.length--;
        setFirstAndLast.call(this);
        return lastElement;
    };
    
    this.insertFirst = function (element) {
        var newCollection = {};
        newCollection[element] = 0;
        for (var prop in collection) {
            newCollection[prop] = collection[prop] + 1;
        }
        collection = newCollection;
        this.length++;
        setFirstAndLast.call(this);
    };
    
    this.insertLast = function (element) {
        var newCollection = {};
        for (var prop in collection) {
            newCollection[prop] = collection[prop];
        }
        newCollection[element] = this.length;
        collection = newCollection;
        this.length++;
        setFirstAndLast.call(this);
    };
    
    this.empty = function () {
        collection = {};
    };
};

var Queue = function () {
    var collection = {};

    this.length = 0;

    this.enqueue = function (element) {
        var newCollection = {};
        newCollection[element] = 0;
        for (var prop in collection) {
            newCollection[prop] = collection[prop] + 1;
        }
        collection = newCollection;
        this.length++;
    };

    this.dequeue = function () {
        var newCollection = {};
        for (var prop in collection) {
            if (collection[prop] === 0) {
                var firstElement = prop;
                continue;
            }
            newCollection[prop] = collection[prop] - 1;
        }
        collection = newCollection;
        this.length--;
        return firstElement;
    };
    
    this.empty = function () {
        collection - {};
    };
};

var FixedArray = function (size) {
    var collection = {};
    var isActionValid = function (index) {
        if (!(index >= 0 & index < size)) {
            throw new RangeError("Out of range");
        }
    };

    this.length = 0;
    
    this.insertAt = function (index, element){
        isActionValid(index);
        var newCollection = {};
        newCollection[element] = index;
        for (var prop in collection) {
            if (collection[prop] === index) {
                newCollection[prop] = collection[prop] + 1;
                break;
            }
            if (collection[prop] > index) {
                newCollection[prop] = collection[prop] + 1;
                break;
            }
            newCollection[prop] = collection[prop];
        }
        collection = newCollection;
    };
    
    this.getAt= function (index){
        isActionValid(index);
        for (var prop in collection) {
            if (collection[prop] === index) {
                return prop;
            }
        }
    };
};

var Set = function () {
    var collection = {};

    this.length = 0;

    this.insert = function (element) {
        collection[element] = null;
    };

    this.remove = function (element) {
        delete collection[element];
    };

    this.has = function (element) {
        return element in collection;
    };

    this.intersect = function (set) {
        var commonElements = [];
        for (var prop in collection) {
            if (set.has(prop)) {
                commonElements.push(prop);
            }
        }
        return commonElements;
    };

    this.union = function (set) {
        var allElements = [];
        for (var prop in collection) {
            allElements.push(prop);
        }
        return allElements;
    };

    this.empty = function () {

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
