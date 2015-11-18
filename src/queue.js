var lib = require('./standard-library');
var PQ = lib.PriorityQueue;
var a = [
    ['a', 16],
    ['b', 9],
    ['c', 8],
    ['d', 6],
    ['e', 11],
    ['f', 5],
    ['g', 4],
    ['h', 10],
    ['i', 2],
    ['j', 1]
];
var expected = ['a', 'e', 'h', 'b', 'c', 'd', 'f', 'g', 'i', 'j'];
var q = new PQ(a);
//q.enqueue(...a[0]);
//q.enqueue(...a[1]);
//q.enqueue(...a[2]);
//q.enqueue(...a[3]);
//q.enqueue(...a[4]);
//q.enqueue(...a[5]);
//q.enqueue(...a[6]);
//q.enqueue(...a[7]);
//q.enqueue(...a[8]);
//q.enqueue(...a[9]);

//console.log(q.dequeue());
//console.log(q.dequeue());
//console.log(q.dequeue());
//console.log(q.dequeue());
//console.log(q.dequeue());
//console.log(q.dequeue());
//console.log(q.dequeue());
//console.log(q.dequeue());
//console.log(q.dequeue());
//console.log(q.dequeue());

var sorted = PQ.heapSort(a);
console.log(sorted);
console.log(expected);
