console.log("hello world");

let testArrSorted = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
let testArrUnsorted = [22, 57, 63, 19, 3, 11, 66, 23];
let testArrUnsortedDuplicates = [22, 57, 22, 19, 3, 11, 57, 23];

const Node = (value = null, leftChild = null, rightChild = null) => {
  return {
    value,
    leftChild,
    rightChild,
  };
};

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

    // build the tree
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    const midpoint = Math.floor(arr.length / 2);
    const newNode = Node(arr[midpoint]);
    newNode.leftChild = this.buildTree(arr.slice(0, midpoint));
    newNode.rightChild = this.buildTree(arr.slice(midpoint + 1));
    return newNode;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.rightChild) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "|   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "|   "}`,
        true
      );
    }
  }
  arrayOut() {
    return this.arr;
  }

  insert(newVal, current = this.root) {
    if (newVal < current.value && current.leftChild == null) {
      current.leftChild = Node(newVal);
      return;
    } else if (newVal > current.value && current.rightChild == null) {
      current.rightChild = Node(newVal);
    } else if (newVal < current.value) {
      current = current.leftChild;
      this.insert(newVal, current);
    } else if (newVal > current.value) {
      current = current.rightChild;
      this.insert(newVal, current);
    }
  }

  delete(
    delVal,
    current = this.root,
    parent = null,
    isLeft = null,
    leftChild = null,
    rightChild = null
  ) {
    leftChild = current.leftChild;
    rightChild = current.rightChild;
    if (delVal == current.value && parent == null) {
      console.log("cannot delete the root node");
      return;
    } else if (
      delVal === current.value &&
      parent != null &&
      current.leftChild == null &&
      current.rightChild == null
    ) {
      if (isLeft == true) {
        parent.leftChild = null;
      } else {
        parent.rightChild = null;
      }
      return;
    } else if (delVal < current.value) {
      let parent = current;
      current = current.leftChild;
      this.delete(delVal, current, parent, true);
    }
  }
}

const myTree = new Tree(testArrSorted);
console.log(myTree.arrayOut());
myTree.insert(4);
myTree.insert(6);
myTree.insert(77);
myTree.prettyPrint();
myTree.delete(1);
myTree.prettyPrint();
myTree.delete(4);
myTree.prettyPrint();
