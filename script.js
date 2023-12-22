console.log("hello world");

let testArrSorted = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
let testArrUnsorted = [22, 57, 63, 19, 3, 11, 66, 23];
let testArrUnsortedDuplicates = [22, 57, 22, 19, 3, 11, 57, 23];

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right - null;
  }
}
function buildTree(arr) {
  return;
}

class Tree {
  constructor(arr) {
    //this sorts the input array into ascending order and then removes any duplicates
    this.arr = arr.sort(function (a, b) {
      return a - b;
    });
    function removeDuplicates(arr) {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    }
    this.arr = removeDuplicates(arr);
    this.root = buildTree(arr);
    this.size = 0;
  }
  out() {
    return this.arr;
  }
  buildTree(arr) {
    return;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let myTree = new Tree(testArrSorted);
console.log(myTree.out());
