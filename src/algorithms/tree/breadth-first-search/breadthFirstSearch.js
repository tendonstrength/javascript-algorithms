import Queue from '../../../data-structures/queue/Queue';

export default function breadthFirstSearch(node, callbacks = {}) {
  const enterNode = callbacks.enterNode || (() => {});
  const leaveNode = callbacks.leaveNode || (() => {});
  const allowTraversal = callbacks.allowTraversal || (() => (true));

  const queue = new Queue();

  queue.enqueue(node);

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    enterNode(current);

    if (current.left && allowTraversal(current, current.left)) {
      queue.enqueue(current.left);
    }

    if (current.right && allowTraversal(current, current.right)) {
      queue.enqueue(current.right);
    }

    leaveNode(current);
  }
}
