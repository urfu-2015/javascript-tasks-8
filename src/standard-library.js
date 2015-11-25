'use strict';

var Collection = function () {
    this._init();
};

Collection.prototype._init = function () {
    this.length = 0;
    this.first = null;
    this.last = null;
    this.isEmpty = true;
    this.collection = [];
};

Collection.prototype._refresh = function () {
    this.first = this.collection[0] || null;
    this.last = this.collection[this.collection.length - 1] || null;
    this.length = this.collection.length;
    this.isEmpty = this.length === 0;
};

// извлекает первый элемент из коллекции и возвращает его
Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return null;
    }
    var first = this.collection.shift();
    this._refresh();
    return first;
};

// извлекает последний элемент из коллекции и возвращает его
Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return null;
    }
    var last = this.collection.pop();
    this._refresh();
    return last;
};

// вставляет элемент в начало колекции
Collection.prototype.insertFirst = function (item) {
    if (item === undefined) {
        throw new RangeError('Missing expected parameter');
    }
    this.collection.unshift(item);
    this._refresh();
};

// вставляет элемент в конец коллекции
Collection.prototype.insertLast = function (item) {
    if (item === undefined) {
        throw new RangeError('Missing expected parameter');
    }
    this.collection.push(item);
    this._refresh();
};

// очищает коллекцию
Collection.prototype.empty = function () {
    this._init();
};

var Queue = function () {
    Collection.apply(this, arguments);
};

Queue.prototype = Object.create(Collection.prototype);
Queue.prototype.constructor = Queue;

// добавляет элемент в очередь
Queue.prototype.enqueue = function (item) {
    this.insertLast(item);
};

// извлекает элемент из очереди
Queue.prototype.dequeue = function () {
    return this.pickFirst();
};

var FixedArray = function (size) {
    if (size < 0 || (isNaN(parseFloat(size)) && !isFinite(size)) || size === undefined) {
        throw new RangeError('Parameter must be an integer greater than 0');
    }
    this.length = size;
    this.collection = [];
};

// записывает элемент в массив по заданному индексу
FixedArray.prototype.insertAt = function (index, item) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Parameter must be between ' + 0 + ' and ' + this.length);
    }
    if (item === undefined) {
        throw new RangeError('Missing expected parameter');
    }
    this.collection[index] = item;
};

// возвращает элемент по указанному индексу
FixedArray.prototype.getAt = function (index) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Parameter must be between ' + 0 + ' and ' + this.length);
    }
    return this.collection[index] !== undefined ? this.collection[index] : null;
};

var Set = function () {
    Collection.apply(this, arguments);
};

Set.prototype = Object.create(Collection.prototype);
Set.prototype.constructor = Set;

// добавляет элемент в множество
Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        this.insertLast(item);
    }
};

// удаляет элемент из множества
Set.prototype.remove = function (item) {
    if (this.has(item)) {
        this.collection.splice(this.collection.indexOf(item), 1);
        this._refresh();
    }
};

// проверяет, входит ли элемент в множество
Set.prototype.has = function (item) {
    if (item === undefined) {
        throw new RangeError('Missing expected parameter');
    }
    return this.collection.indexOf(item) !== -1;
};

// возвращает множество элементов входящих в исходное множество и в переданное множество
Set.prototype.intersect = function (set) {
    var res = new Set();
    if (set === undefined) {
        throw new RangeError('Missing expected parameter');
    }
    this.collection.forEach(function (item) {
        if (set.has(item)) {
            res.insert(item);
        }
    });
    return res;
};

// возвращает множество элементов входящих в исходное множество или в переданное множество
Set.prototype.union = function (set) {
    if (set === undefined) {
        throw new RangeError('Missing expected parameter');
    }
    var res = new Set();
    this.collection.forEach(function (item) {
        res.insert(item);
    });
    set.collection.forEach(function (item) {
        res.insert(item);
    });
    return res;
};

var PriorityQueue = function () {
    Collection.apply(this, arguments);
};

PriorityQueue.prototype = Object.create(Queue.prototype);
PriorityQueue.prototype.constructor = PriorityQueue;

// кладёт элемент с priority (целое число в интервале от 1 до 100)
PriorityQueue.prototype.enqueue = function (item, priority) {
    if (item === undefined) {
        throw new RangeError('Missing expected parameter');
    }
    if (priority < 1 || priority > 100) {
        throw new RangeError('Parameter must be between 1 and 100');
    }
    priority = priority || 1;
    Queue.prototype.enqueue.call(this, {item: item, priority: priority});
};

// извлекает элемент с наивысшим приоритетом из очереди
PriorityQueue.prototype.dequeue = function () {
    if (this.isEmpty) {
        return null;
    }
    var maxPriority = 0;
    var res;
    var resIndex;
    for (var i = 0; i < this.length; i++) {
        if (this.collection[i].priority > maxPriority) {
            maxPriority = this.collection[i].priority;
            res = this.collection[i].item;
            resIndex = i;
        }
    }
    this.collection.splice(resIndex, 1);
    this._refresh();
    return res;
};

var Map = function () {
    this._init();
};

Map.prototype._init = function () {
    this.length = 0;
    this.isEmpty = true;
    this.elements = {};
};

Map.prototype._refresh = function () {
    this.length = Object.keys(this.elements).length;
    this.isEmpty = this.length === 0;
};

Map.prototype._keyToString = function (key) {
    return typeof key === 'function' ? key.toString() : JSON.stringify(key);
};

// добавляет элемент в словарь по указанному ключу
Map.prototype.addItem = function (key, item) {
    if (item === undefined) {
        throw new RangeError('Missing expected parameter');
    }
    this.elements[this._keyToString(key)] = item;
    this._refresh();
};

// извлекает элемент из словаря по указанному ключу
Map.prototype.removeItem = function (key) {
    var item;
    if (item = this.getItem(key)) {
        delete this.elements[this._keyToString(key)];
        this._refresh();
        return item;
    }
};

// возвращает элемент по указанному ключу
Map.prototype.getItem = function (key) {
    if (key === undefined) {
        throw new RangeError('Missing expected parameter');
    }
    key = this._keyToString(key);
    return this.elements[key] ? this.elements[key] : null;
};

// очищает словарь
Map.prototype.empty = function () {
    this._init();
};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
