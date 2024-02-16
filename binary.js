class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    let sortedArray = this.sortArray(array);
    const n = sortedArray.length;
    this.root = this.buildTree(sortedArray, 0, n - 1);
    this.array = array;
  }

  sortArray(array) {
    return array
    .sort((a, b) => a - b)
    .filter((value, index) => {
      return array.indexOf(value) === index;
    });
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(data, midNode = this.root) {
    const newNode = new Node(data);
    if (newNode.data < midNode.data) {
      if (midNode.left === null) {
        this.array.push(newNode.data);
        midNode.left = newNode;
      } else {
        this.insert(data, midNode.left);
      }
    } else if (newNode.data > midNode.data) {
      if (midNode.right === null) {
        this.array.push(newNode.data);
        midNode.right = newNode;
      } else {
        this.insert(data, midNode.right);
      }
    }
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  delete(data, midNode = this.root) {
    if (midNode === null) {
      return midNode;
    }
  
    if (data < midNode.data) {
      midNode.left = this.delete(data, midNode.left);
    } else if (data > midNode.data) {
      midNode.right = this.delete(data, midNode.right);
    } else {
      if (midNode.left === null) {
        let index = this.array.indexOf(data);
        this.array.splice(index, 1);
        return midNode.right;
      } else if (midNode.right === null) {
        return midNode.left;
      }
  
      midNode.data = this.findMin(midNode.right).data;
      midNode.right = this.delete(midNode.data, midNode.right);
    }
  
    return midNode;
  }
  

  search(midNode, data, depth = 0) {
    try {
      if (midNode.data == data || midNode.data == data) {
        console.log(`The depth from root to ${midNode.data} is ${depth + 1}`);
      } else {
        if (data < midNode.data) {
          return this.search(midNode.left, data, depth + 1);
        } else if (data > midNode.data) {
          return this.search(midNode.right, data, depth + 1);
        }
      }
    } catch {
      throw new Error("Cant find inserted value");
    }
  }

  height(data, height = 0) {
    let midNode = this.search(this.root, data);
    if (midNode == null) {
      return height;
    }

    let leftheight = midNode.left
      ? this.height(midNode.left.data, height + 1)
      : height;
    let rightheight = midNode.right
      ? this.height(midNode.right.data, height + 1)
      : height;

    return Math.max(leftheight, rightheight);
  }


  depth(data) {
    let midNode = this.root;
    if (midNode.data == data || midNode.data == data) {
    } else {
      if (data < midNode.data) {
        return this.search(midNode.left, data);
      } else if (data > midNode.data) {
        return this.search(midNode.right, data);
      }
    }
  }

  rebalance() {
    this.root = null;
    let sortedArray = this.sortArray(this.array);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
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

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

console.clear();
console.log(`\x1b[31mThis is my binary tree:\x1b[0m`);

Tree_ = new Tree(array);
Tree_.insert(20);
Tree_.insert(-5);
Tree_.insert(600);
Tree_.insert(-100);
Tree_.insert(102984);
Tree_.insert(256);
console.log(Tree_.array);
prettyPrint(Tree_.root);
Tree_.rebalance();
console.log(Tree_.array);
prettyPrint(Tree_.root);
//[ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
