'use strict';
function getCollectionClass() {
    var _next = Symbol();
    var _prev = Symbol();
    var _first = Symbol();
    var _last = Symbol();
    var _value = Symbol();
    var _length = Symbol();

    class CollectionNode {
        constructor(value) {
            this[_value] = value;
            this[_prev] = null;
            this[_next] = null;
        }

        get value() {
            return this[_value];
        }

        get next() {
            return this[_next];
        }

        set next(node) {
            if (node instanceof CollectionNode || node == null) {
                this[_next] = node;
            }
        }

        get prev() {
            return this[_prev];
        }

        set prev(node) {
            if (node instanceof CollectionNode || node == null) {
                this[_prev] = node;
            }
        }
    }
    class Collection {
        constructor(array) {
            if (array != null && !(array instanceof Array)) {
                throw new Error('Constructor argument must be an array');
            }
            this[_first] = null;
            this[_last] = null;
            this[_length] = 0;
            if (array != null) {
                array.forEach(item => this.insertLast(item));
            }
        }

        get first() {
            if (this[_length] === 0) {
                throw new Error('Collection is empty');
            }
            return this[_first].value;
        }

        get last() {
            if (this[_length] === 0) {
                throw new Error('Collection is empty');
            }
            return this[_last].value;
        }

        get length() {
            return this[_length];
        }

        get isEmpty() {
            return this[_length] === 0;
        }

        insertLast(item) {
            var newNode = new CollectionNode(item);
            if (this.isEmpty) {
                this[_first] = newNode;
            } else {
                this[_last].next = newNode;
                newNode.prev = this[_last];
            }
            this[_last] = newNode;
            this[_length]++;
        }

        insertFirst(item) {
            var newNode = new CollectionNode(item);
            if (!this.isEmpty) {
                newNode.next = this[_first];
                this[_first].prev = newNode;
            } else {
                this[_last] = newNode;
            }
            this[_first] = newNode;
            this[_length]++;
        }

        pickFirst() {
            if (this.isEmpty) {
                throw new Error('Collection is empty');
            }
            if (this[_length] > 1) {
                this[_first].next.prev = null;
            } else {
                this[_last] = null;
            }
            var res = this[_first].value;
            this[_first] = this[_first].next;
            this[_length]--;
            return res;
        }

        pickLast() {
            if (this.isEmpty) {
                throw new Error('Collection is empty');
            }
            if (this[_length] > 1) {
                this[_last].prev.next = null;
            } else {
                this[_first] = null;
            }
            var res = this[_last].value;
            this[_last] = this[_last].prev;
            this[_length]--;
            return res;
        }

        empty() {
            this[_length] = 0;
            this[_first] = null;
            this[_last] = null;
        }
    }
    return Collection;
}
function getQueueClass() {
    var _collection = Symbol();
    class Queue {
        constructor(array) {
            this[_collection] = new (getCollectionClass())(array);
        }

        enqueue(item) {
            this[_collection].insertLast(item);
        }

        dequeue() {
            return this[_collection].pickFirst();
        }

        get length() {
            return this[_collection].length;
        }

        empty() {
            this[_collection].empty();
        }
    }
    return Queue;
}

function getFixedArrayClass() {
    var _internalArray = Symbol();
    var _internalInRange = Symbol();

    function inRange(index) {
        return index != null && 0 <= index && index < this[_internalArray].length;
    }

    class FixedArray {
        constructor(size) {
            this[_internalArray] = new Array(size);
            this[_internalInRange] = inRange.bind(this);
        }

        insertAt(index, item) {
            if (!this[_internalInRange](index)) {
                throw new RangeError();
            }
            this[_internalArray][index] = item;
        }

        getAt(index) {
            if (!this[_internalInRange](index)) {
                throw new RangeError();
            }
            return this[_internalArray][index];
        }

        get length() {
            return this[_internalArray].length;
        }
    }
    return FixedArray;
}

function getSetClass() {
    var _internalGetHashCode = Symbol();
    var _internalValues = Symbol();
    var _internalCount = Symbol();

    function getHashCode(string) {
        var ret = 0;
        for (let i = 0, len = string.length; i < len; i++) {
            ret = (31 * ret + string.charCodeAt(i)) << 0;
        }
        return ret;
    }

    class Set {
        constructor(array) {
            if (array != null && !(array instanceof Array)) {
                throw new Error('Constructor argument must be an array');
            }
            this[_internalValues] = {};
            this[_internalGetHashCode] = getHashCode;
            this[_internalCount] = 0;
            if (array != null) {
                array.forEach(item => this.insert(item));
            }
        }

        insert(item) {
            var stringifyed = JSON.stringify(item);
            var hashCode = this[_internalGetHashCode](stringifyed);
            if (!this.has(item)) {
                this[_internalValues][hashCode] = item;
                this[_internalCount]++;
            }
        }

        has(item) {
            var stringifyed = JSON.stringify(item);
            var hashCode = this[_internalGetHashCode](stringifyed);
            return typeof this[_internalValues][hashCode] !== 'undefined';
        }

        remove(item) {
            var stringifyed = JSON.stringify(item);
            var hashCode = this[_internalGetHashCode](stringifyed);
            if (this.has(item)) {
                delete this[_internalValues][hashCode];
                this[_internalCount]--;
            }
        }

        get length() {
            return this[_internalCount];
        }

        get values() {
            return Object
                .keys(this[_internalValues])
                .map(key => this[_internalValues][key]);
        }

        intersect(set) {
            return new Set(
                Object
                    .keys(this[_internalValues])
                    .map(key => this[_internalValues][key])
                    .filter(item => set.has(item))
            );
        }

        union(set) {
            return new Set(
                Object.keys(this[_internalValues])
                    .map(key => this[_internalValues][key])
                    .concat(set.values)
            );
        }

        empty() {
            this[_internalCount] = 0;
            this[_internalValues] = {};
        }
    }
    return Set;
}

function getPriorityQueueClass() {
    function heapify(i) {
        var leftChild;
        var rightChild;
        var largestChild;
        this[_internalSize] = this[_internalVector].length;
        while (true) {
            leftChild = 2 * i + 1;
            rightChild = 2 * i + 2;
            largestChild = i;

            if (leftChild < this[_internalSize] &&
                this[_internalVector][leftChild][0] > this[_internalVector][largestChild][0]) {
                largestChild = leftChild;
            }
            if (rightChild < this[_internalSize] &&
                this[_internalVector][rightChild][0] > this[_internalVector][largestChild][0]) {
                largestChild = rightChild;
            }
            if (largestChild == i) {
                break;
            }

            var temp = this[_internalVector][i];
            this[_internalVector][i] = this[_internalVector][largestChild];
            this[_internalVector][largestChild] = temp;
            i = largestChild;
        }
    }

    var _internalHeapify = Symbol();
    var _internalVector = Symbol();
    var _internalSize = Symbol();
    class PriorityQueue {
        constructor(array) {
            if (array != null && !(array instanceof Array)) {
                throw new Error('Constructor argument must be an array');
            }
            this[_internalHeapify] = heapify.bind(this);
            this[_internalVector] = [];
            this[_internalSize] = this[_internalVector].length;
            if (array != null) {
                array.forEach(pair => this.enqueue(pair[0], pair[1]));
            }
        }

        enqueue(item, priority) {
            this[_internalVector].push([priority, item]);
            this[_internalSize] = this[_internalVector].length;
            var i = this[_internalSize] - 1;
            var parent = Math.floor((i - 1) / 2);
            while (i > 0 && this[_internalVector][parent][0] < this[_internalVector][i][0]) {
                var temp = this[_internalVector][i];
                this[_internalVector][i] = this[_internalVector][parent];
                this[_internalVector][parent] = temp;
                i = parent;
                parent = Math.floor((i - 1) / 2);
            }
            this[_internalSize] = this[_internalVector].length;
        }

        dequeue() {
            var result = this[_internalVector][0][1];
            this[_internalVector][0] = this[_internalVector][this[_internalVector].length - 1];
            this[_internalVector].pop();
            this[_internalSize] = this[_internalVector].length;
            this[_internalHeapify](0);
            return result;
        }

        get length() {
            return this[_internalSize];
        }

        get isEmpty() {
            return this[_internalSize] === 0;
        }

        static heapSort(array) {
            if (array != null && array instanceof Array) {
                var queue = new PriorityQueue(array);
                var sortedArray = [];
                while (!queue.isEmpty) {
                    sortedArray.push(queue.dequeue());
                }
                return sortedArray;
            } else {
                throw new Error('Argument must be an array');
            }
        }
    }
    return PriorityQueue;
}

exports.Collection = getCollectionClass();
exports.Queue = getQueueClass();
exports.FixedArray = getFixedArrayClass();
exports.Set = getSetClass();
exports.PriorityQueue = getPriorityQueueClass();
