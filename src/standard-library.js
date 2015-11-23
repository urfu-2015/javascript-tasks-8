'use strict';

/**
 * @author Savi
 *
 * Коллекция элементов. Поддерживает операции вставки и извлечения первого и последнего элемента,
 * хранит ссылки на первый и последний элемент. (Более подробное описание в README.md) =).
 *
 * @constructor
 */
var Collection = function () {
    this._array = [];

    this.first = null;

    this.last = null;

    this.length = 0;

    this.isEmpty = true;

    this.pickFirst = function () {
        var elem = this._array.shift();
        this.first = this._array[0];
        this.length = this._array.length;
        if (this.length === 0) {
            this.isEmpty = true;
        }
        return elem;
    };

    this.pickLast = function () {
        var elem = this._array.pop();
        this.last = this._array[this._array.length - 1];
        this.length = this._array.length;
        if (this.length === 0) {
            this.isEmpty = true;
        }
        return elem;
    };

    this.insertFirst = function (elem) {
        this._array.unshift(elem);
        this.first = elem;
        this.last = this._array[this._array.length - 1];
        this.length = this._array.length;
        this.isEmpty = false;
    };

    this.insertLast = function (elem) {
        this._array.push(elem);
        this.first = this._array[0];
        this.last = elem;
        this.length = this._array.length;
        this.isEmpty = false;
    };

    this.empty = function () {
        this._array = [];
        this.first = null;
        this.last = null;
        this.length = 0;
        this.isEmpty = true;
    };
};


/**
 * @author Savi
 *
 * Список элементов, организованных по принципу "первым пришёл – первым вышел".
 * Элементы добавляются и извлекаются с одного конца списка.
 * (Более подробное описание в README.md) =).
 *
 * @constructor
 */
var Queue = function () {
    // Почему бы и нет...
    this._collection = new Collection();

    this.length = 0;

    this.enqueue = function (elem) {
        this._collection.insertLast(elem);
        this.length = this._collection.length;
    };

    this.dequeue = function (elem) {
        var elem = this._collection.pickFirst();
        this.length = this._collection.length;
        return elem;
    };

    this.empty = function () {
        this._collection.empty();
        this.length = this._collection.length;
    };

};

/**
 * @author Savi
 *
 * Массив фиксированного размера. Попытка добавить или получить элемент за пределами указанного
 * диапазона должна вызывать ошибку RangeError.
 * (Более подробное описание в README.md) =).
 *
 * @param {number} size
 * @constructor
 */
var FixedArray = function (size) {
    this._array = [];

    this.length = size;

    this.insertAt = function (ind, elem) {
        if (ind === this.length) {
            throw new RangeError();
        } else {
            this._array.splice(ind, 0, elem);
        }
    };

    this.getAt = function (ind) {
        if (ind == this.length) {
            throw new RangeError();
        } else {
            return this._array[ind];
        }
    };
};

/**
 * @author Savi
 *
 * Список, хранящий уникальные элементы. (Более подробное описание в README.md) =).
 *
 * @constructor
 */
var Set = function () {
    this._array = [];

    this.length = 0;

    this.insert = function (elem) {
        if (this._array.indexOf(elem) == -1) {
            this._array.push(elem);
            this.length = this._array.length;
        }
    };

    this.remove = function (elem) {
        var ind = this._array.indexOf(elem);
        if (ind != -1) {
            this._array.splice(ind, 1);
            this.length = this._array.length;
        }
    };

    this.has = function (elem) {
        if (this._array.indexOf(elem) != -1) {
            return true;
        } else {
            return false;
        }
    };

    this.intersect = function (set) {
        // Это легально )? Ведь я создаю экземпляр прямо внутри конструктора этого же объекта
        var temp_array = new Set();
        // Иначе forEach ломает контекст :/
        var temp_link = this._array;
        set._array.forEach(function (elem) {
            if (temp_link.indexOf(elem) != -1) {
                temp_array.insert(elem);
            }
        });
        return temp_array;
    };

    this.union = function (set) {
        // Склонировали
        var temp_array = new Set();
        // Это легально )? Ведь я создаю экземпляр прямо внутри конструктора этого же объекта
        temp_array._array = this._array.splice(0);
        temp_array.length = temp_array._array.length;
        set._array.forEach(function (elem) {
            temp_array.insert(elem);
        });
        return temp_array;
    };

    this.empty = function () {
        this._array = [];
        this.length = 0;
    };
};

// Может на неделе...

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
