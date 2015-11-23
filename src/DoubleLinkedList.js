
var LinkedList = function() {
    this.length = 0;
    this.head = null;
    this.tail = null;
}
LinkedList.prototype.removeFirst = function() {
    if (this.head.next != null) {
        this.head = this.head.next;
    } else {
        this.head = null;
    }
    this.length--;
}
LinkedList.prototype.removeLast = function() {
    if (this.tail.prev != null) {
        this.tail = this.tail.prev;
    } else {
        this.tail = null;
    }
    this.length--;
}
LinkedList.prototype.addFirst = function(item) {
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
    this.length++;
}
LinkedList.prototype.addLast = function(item) {
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
    this.length++;
}
LinkedList.prototype.getFirst = function() {
    return this.head.value;
}
LinkedList.prototype.getLast = function() {
    return this.tail.value;
}

exports.LinkedList = LinkedList;