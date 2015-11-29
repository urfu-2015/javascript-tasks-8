var LinkedList = function () {
    this.head = null;
    this.tail = null;
};
LinkedList.prototype.removeFirst = function () {
    var current = this.head.value;
    if (this.head.next != null) {
        this.head = this.head.next;
    } else {
        this.head = null;
        this.tail = null;
    }
    return current;
};
LinkedList.prototype.removeLast = function () {
    var current = this.tail.value;
    if (this.tail.prev != null) {
        this.tail = this.tail.prev;
    } else {
        this.head = null;
        this.tail = null;
    }
    return current;
};
LinkedList.prototype.addFirst = function (item) {
    var node = {
        value: item,
        next: null,
        prev: null
    };
    if (this.head == null) {
        this.head = node;
        this.tail = this.head;
    } else {
        var current = this.head;
        this.head = node;
        this.head.next = current;
        current.prev = this.head;
    }
};
LinkedList.prototype.addLast = function (item) {
    var node = {
        value: item,
        next: null,
        prev: null
    };
    if (this.head == null) {
        this.head = node;
        this.tail = this.head;
    } else {
        var current = this.tail;
        this.tail = node;
        this.tail.prev = current;
        current.next = this.tail;
    }
};
LinkedList.prototype.getFirst = function () {
    return this.head == null ? null : this.head.value;
};
LinkedList.prototype.getLast = function () {
    return this.tail == null ? null : this.tail.value;
};

exports.LinkedList = LinkedList;
