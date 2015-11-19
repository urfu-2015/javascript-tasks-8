'use strict';

/**
 * Создает экземпляр Collection.
 * @constructor
 * @this {Collection}
 */
var Collection = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.elements = [];
};

/**
 * извлекает первый элемент из коллекции и возвращает его
 * @returns {object} первый элемент из коллекции
 */
Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return null;
    }
    var firstElem = this.elements.shift();
    if (this.length === 1) {
        this.empty();
    } else {
        this.first = this.elements[0];
        this.length -= 1;
    }
    return firstElem;
};

/**
 * извлекает последний элемент из коллекции и возвращает его
 * @returns {object} первый элемент из коллекции
 */
Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return null;
    }
    var lastElem = this.elements.pop();
    if (this.length === 1) {
        this.empty();
    } else {
        this.length -= 1;
        this.first = this.elements[this.length - 1];
    }
    return lastElem;
};

/**
 * вставляет элемент в начало колекции
 * @param {object} item элемент
 */
Collection.prototype.insertFirst = function (item) {
    if (this.isEmpty) {
        this.isEmpty = false;
    }
    this.length += 1;
    this.elements.unshift(item);
    this.first = this.elements[0];
    if (this.length === 1) {
        this.last = this.first;
    }
};

/**
 * вставляет элемент в конец колекции
 * @param {object} item элемент
 */
Collection.prototype.insertLast = function (item) {
    if (this.isEmpty) {
        this.isEmpty = false;
    }
    this.length += 1;
    this.elements.push(item);
    this.last = this.elements[this.length - 1];
    if (this.length === 1) {
        this.first = this.last;
    }
};

/**
 * очищает колекцию
 */
Collection.prototype.empty = function () {
    if (this.isEmpty) {
        return;
    }
    this.first = null;
    this.last = null;
    this.isEmpty = true;
    this.length = 0;
    this.elements = [];
};

/**
 * Создает экземпляр Queue.
 * @constructor
 * @this {Queue}
 */
var Queue = function () {
    Collection.bind(this)();
};

Queue.prototype = Object.create(Collection.prototype);

/**
 * добавляет элемент в очередь
 * @param {object} item элемент
 */
Queue.prototype.enqueue = function (item) {
    this.insertLast(item);
};

/**
 * извлекает элемент из очереди
 * @returns {object} элемент
 */
Queue.prototype.dequeue = function () {
    return this.pickFirst();
};

/**
 * Создает экземплярFixedArray.
 * @constructor
 * @param {Number} size размер массива
 * @this {FixedArray}
 */
var FixedArray = function (size) {
    this.elements = [];
    this.length = size;
};

/**
 * записывает элемент item в массив по заданному индексу index
 * @param {Number} index индекс
 * @param {object} item элемент
 */
FixedArray.prototype.insertAt = function (index, item) {
    if (index >= this.length) {
        throw new RangeError('Элемент за пределами массива');
    }
    this.elements.splice(index, 0, item);
};

/**
 * возвращает элемент по указанному индексу index
 * @param {Number} index индекс
 * @returns {object} item элемент
 */
FixedArray.prototype.getAt = function (index) {
    if (!this.elements[index]) {
        throw new RangeError('Элемент за пределами массива');
    }
    return this.elements[index];
};

/**
 * Создает экземпляр Set.
 * @constructor
 * @this {Set}
 */
var Set = function () {
    FixedArray.bind(this, 0)();
};

/**
 * добавляет элемент в множество
 * @param {object} item элемент
 */
Set.prototype.insert = function (item) {
    if (this.has(item)) {
        return;
    }
    this.elements.push(item);
    this.length += 1;
};

/**
 * удаляет элемент из множества
 */
Set.prototype.remove = function (item) {
    if (!this.has(item)) {
        return;
    }
    this.elements.splice(this.elements.indexOf(item), 1);
    this.length -= 1;
};

/**
 * проверяет, входит ли элемент item в множество
 * @param {Object} item элемент
 * @returns {bool} true, если входит, иначе - false
 */
Set.prototype.has = function (item) {
    if (this.elements.indexOf(item) !== -1) {
        return true;
    }
    return false;
};

/**
 *возвращает множество элементов входящих в исходное множество
 и в переданное множество set
 * @param {Set} item элемент
 * @returns {Set} множество элементов, удовлетворяющих условию
 */
Set.prototype.intersect = function (set) {
    var intersect = this.elements.filter(function (item) {
        return set.elements.indexOf(item) !== -1;
    });
    var newSet = new Set();
    newSet.elements = intersect;
    newSet.length = intersect.length;
    return newSet;
};

/**
 *возвращает множество элементов входящих в исходное множество
или в переданное множество set
 * @param {Set} item элемент
 * @returns {Set} множество элементов, удовлетворяющих условию
 */
Set.prototype.union = function (set) {
    var newSet = new Set();
    newSet.elements = this.elements.slice();
    newSet.length = newSet.elements.length;
    for (var i = 0; i < set.length; i++) {
        this.insert.bind(newSet, set.elements[i])();
    };
    return newSet;
};

/**
 * очищает множество
 */
Set.prototype.empty = function () {
    this.length = 0;
    this.elements = [];
};

/**
 * Создает экземпляр PriorityQueue.
 * @constructor
 * @this {PriorityQueue}
 */
var PriorityQueue = function () {
    Collection.bind(this)();
    this.priorities = [];
};

PriorityQueue.prototype = Object.create(Collection.prototype);

/**
 * кдобавляет в очередь элемент с приоритетом priority
 * @param {Number} priority (целое число в интервале от 1 до 100)
 */
PriorityQueue.prototype.enqueue = function (item, priority) {
    this.insertLast(item);
    this.priorities.push(priority);
};


/**
 * извлекает элемент с наивысшим приоритетом из очереди.
 Если есть несколько элементов с одинаковым приоритетом,
 извлекается элемент, который был помещён в очередь первым (из элементов с наивысшим приоритетом).
 * @returns {Object} элемент
 */
PriorityQueue.prototype.dequeue = function () {
    if (this.isEmpty) {
        return null;
    }
    var indexOfmaxPriority = this.priorities.indexOf(Math.max.apply(null, this.priorities));
    this.priorities.splice(indexOfmaxPriority, 1);
    if (this.length === 1) {
        this.isEmpty = true;
    }
    this.length -= 1;
    return this.elements.splice(indexOfmaxPriority, 1)[0];
};

/**
 * Создает экземпляр Map.
 * @constructor
 * @this {Map}
 */
var Map = function () {
    this.elements = {};
    this.length = 0;
    this.isEmpty = true;
};

/**
 * добавляет элемент в словарь по указанному ключу key
 * @param {object} key ключ
 * @param {object} item элемент
 */
Map.prototype.addItem = function (key, item) {
    this.elements[key.toString()] = item;
    if (this.isEmpty) {
        this.isEmpty = false;
    }
    this.length += 1;
};

/**
 * извлекает элемент из словаря по указанному ключу key
 * @param {object} key ключ
 * @preturns {object} элемент
 */
Map.prototype.removeItem = function (key) {
    if (!this.elements[key.toString()]) {
        return null;
    }
    if (this.length === 1) {
        this.isEmpty = true;
    }
    this.length -= 1;
    var item = this.elements[key.toString()];
    delete this.elements[key.toString()];
    return item;
};

/**
 * возвращает элемент по указанному ключу
 * @param {object} key ключ
 * @preturns {object} элемент
 */
Map.prototype.getItem = function (key) {
    if (!this.elements[key.toString()]) {
        return null;
    }
    return this.elements[key.toString()];
};

/**
 * очищает словарь
 * @param {object} key ключ
 * @preturns {object} элемент
 */
Map.prototype.empty = function () {
    this.elements = {};
    this.length = 0;
    this.isEmpty = true;
};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
