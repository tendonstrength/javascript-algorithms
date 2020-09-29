function depthFirstSearchResursive(graph, currentVertex, previousVertex = null, callbacks) {
  callbacks.enterVertex({ currentVertex, previousVertex });
  graph.getNeighbors(currentVertex).forEach((nextVertex) => {
    if (callbacks.allowTraversal({ currentVertex, nextVertex })) {
      depthFirstSearchResursive(graph, nextVertex, currentVertex, callbacks);
    }
  });

  callbacks.leaveVertexStub({ currentVertex, previousVertex });
}

export default function depthFirstSearch(graph, currentVertex, callbacks = {}) {
  const visited = [currentVertex.getKey()];
  const defaultAllowTraversal = ({ nextVertex }) => {
    if (visited[nextVertex.getKey()]) {
      return false;
    }
    visited[nextVertex.getKey()] = true;
    return true;
  };

  const enterVertexStub = () => {};
  const leaveVertexStub = () => {};

  const callbackParams = {
    allowTraversal: callbacks.allowTraversal || defaultAllowTraversal,
    enterVertex: callbacks.enterVertex || enterVertexStub,
    leaveVertexStub: callbacks.leaveVertex || leaveVertexStub,
  };

  depthFirstSearchResursive(graph, currentVertex, null, callbackParams);
}
