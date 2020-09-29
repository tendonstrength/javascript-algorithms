export default function depthFirstSearch(node, callbacks = {}) {
  const stubCallback = () => {};
  const allowTraversalDefault = () => true;

  const localCallbacks = {
    enterNode: callbacks.enterNode || stubCallback,
    leaveNode: callbacks.leaveNode || stubCallback,
    allowTraversal: callbacks.allowTraversal || allowTraversalDefault,
  };

  localCallbacks.enterNode(node);

  if (node.left && localCallbacks.allowTraversal(node, node.left)) {
    depthFirstSearch(node.left, localCallbacks);
  }
  if (node.right && localCallbacks.allowTraversal(node, node.right)) {
    depthFirstSearch(node.right, localCallbacks);
  }

  localCallbacks.leaveNode(node);
}
