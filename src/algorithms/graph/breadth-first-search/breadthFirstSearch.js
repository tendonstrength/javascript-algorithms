import Queue from '../../../data-structures/queue/Queue';

export default function breadthFirstSearch(graph, vertexA, callbacks = {}) {
  const visited = {};
  const defaultEnterVertex = () => {};
  const defaultLeaveVertex = () => {};
  const defaultAllowTraversal = ({ nextVertex }) => {
    return !visited[nextVertex.value];
  };

  const enterVertex = callbacks.enterVertex || defaultEnterVertex;
  const leaveVertex = callbacks.leaveVertex || defaultLeaveVertex;
  const allowTraversal = callbacks.allowTraversal || defaultAllowTraversal;

  const queue = new Queue();

  queue.enqueue(vertexA);

  let previousVertex = null;
  while (!queue.isEmpty()) {
    const currentVertex = queue.dequeue();
    visited[currentVertex.value] = true;

    enterVertex({ currentVertex, previousVertex });

    graph.getNeighbors(currentVertex).forEach((nextVertex) => {
      if (allowTraversal({ currentVertex, nextVertex })) {
        queue.enqueue(nextVertex);
      }
    });

    leaveVertex({ currentVertex, previousVertex });
    previousVertex = currentVertex;
  }
}
