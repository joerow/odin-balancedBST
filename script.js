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
      // this is for leaf nodes with no children
      // deletes the node link on the parent
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
      //this is for nodes with one child
    } else if (
      delVal === current.value &&
      parent != null &&
      (current.leftChild == null || current.rightChild == null)
    ) {
      if (current.leftChild != null && isLeft) {
        parent.leftChild = current.leftChild;
      } else if (current.leftChild != null && !isLeft) {
        parent.rightChild = current.leftChild;
      } else if (current.rightChild != null && isLeft) {
        parent.leftChild = current.rightChild;
      } else if (current.rightChild != null && !isLeft) {
        parent.rightChild = current.rightChild;
      }
      return;
    }
    // this is for nodes with 2 children. Replaces via the inorder successor
    else if (
      delVal === current.value &&
      parent != null &&
      current.leftChild != null &&
      current.rightChild != null
    ) {
      //store the current and find the successor
      let successor = Node(null);
      let successorParent = Node(null);
      let nodeToDelete = current;

      current = nodeToDelete.rightChild;
      successor = current;
      successorParent = current;
      while (current.leftChild) {
        successor = current;
        successorParent = current;
        current = current.leftChild;
      }
      successor = current;
      //delete the successor
      successorParent.leftChild = null;
      //reset position in the tree for current
      current = nodeToDelete;
      //preserve the left children of the node to delete
      successor.leftChild = nodeToDelete.leftChild;
      // replace the node to delete with the successor
      current = successor;
      //link from the parent to the replacement node
      if (isLeft) {
        parent.leftChild = successor;
      } else {
        parent.rightChild = successor;
      }
      //preserve the right children of the node to delete.
      current.rightChild = successorParent.rightChild;
      return;
    }

    //iterates through the tree to find the node to delete
    //setting it as current and storing the parent node
    else if (delVal < current.value) {
      let parent = current;
      current = current.leftChild;
      this.delete(delVal, current, parent, true);
    } else if (delVal > current.value) {
      let parent = current;
      current = current.rightChild;
      this.delete(delVal, current, parent, false);
    }
  }

  find(val, current = this.root) {
    if (val === current.value) {
      console.log(current);
      return current;
    } else {
      if (val < current.value) {
        current = current.leftChild;
        this.find(val, current);
      }
      if (val > current.value) {
        current = current.rightChild;
        this.find(val, current);
      }
    }
  }
}

const myTree = new Tree(testArrSorted);
console.log(myTree.arrayOut());
myTree.prettyPrint();
myTree.find(15);
