const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.base = null;
  }

  root() {
    return this.base;
  }

  add(data) {
    this.base = insertNode(this.base, data);

    function insertNode(node, data) {
      if (node === null) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = insertNode(node.left, data);
      } else {
        node.right = insertNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return hasNode(this.base, data);

    function hasNode(node, data) {
      if (node === null) {
        return false;
      }
      if (node.data === data) {
        return true;
      } else {
        return data > node.data
          ? hasNode(node.right, data)
          : hasNode(node.left, data);
      }
    }
  }

  find(data) {
    return findNode(this.base, data);

    function findNode(node, data) {
      if (node === null) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      return data < node.data
        ? findNode(node.left, data)
        : findNode(node.right, data);
    }
  }

  remove(data) {
    this.base = removeNode(this.base, data);
    function removeNode(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.right && !node.left) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }
  }

  min() {
    let node = this.base;
    let shift = function (node) {
      return !node.left ? node.data : shift(node.left);
    };
    return shift(node);
  }

  max() {
    let node = this.base;
    let shift = function (node) {
      return !node.right ? node.data : shift(node.right);
    };
    return shift(node);
  }
}

module.exports = {
  BinarySearchTree,
};
