class Graph {
  constructor(){
    this.vertices = []
    this.edges    = []
    this.numberOfEdges = 0    
  }
  addVertex(vertex) {
    this.vertices.push(vertex)

    this.edges[vertex] = []    
  }
  removeVertex(vertex) {
    const idx = this.vertices.indexOf(vertex)
    if(idx >= 0) {
      this.vertices.splice(idx, 1)  
    }
    // if there is a length there r edges for vertex
    // so: while there are edges for the given vertex..
    while (this.edges[vertex].length) {  
      const adjacentVertex = this.edges[vertex].pop() // deletes and returns
      
      this.removeEdge(adjacentVertex, vertex)
    }
  }
  addEdge(vertex1, vertex2) {
    this.edges[vertex1].push(vertex2)
    this.edges[vertex2].push(vertex1)
    this.numberOfEdges++
  }
  removeEdge(vertex1, vertex2) {
    const index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1
    const index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1
    
    if(index1 >= 0) {
      this.edges[vertex1].splice(index1, 1)
      this.numberOfEdges--   
    }
    if(index2 >= 0) {
      this.edges[vertex2].splice(index2, 1)      
    }
  }
  size() {
    return this.vertices.length
  }

  relations() {
    return this.numberOfEdges
  }

  print() {
    console.log(this.vertices.map(vertex => {
      return `${vertex} => ${this.edges[vertex].join(', ').trim()}`
    }, this).join(' | '))
  }
}

(function test(){
  let graph = new Graph()

  // first: add some Vertices
  graph.addVertex('Node1')
  graph.addVertex('Node2')
  graph.addVertex('Node3')
  graph.addVertex('Node4')

  graph.print()  // Node1 =>  | Node2 =>  | Node3 =>  | Node4 =>

  graph.addEdge('Node1', 'Node2') 
  graph.print()  
  // Node1 => Node2 | Node2 => Node1 | Node3 =>  | Node4 =>

  // add another edge to node1
  graph.addEdge('Node1', 'Node3')
  graph.print()
  // means: Node1 is now connected to node1 and node 3 
  // Node1 => Node2, Node3 | Node2 => Node1 | Node3 => Node1 | Node4 =>

  
  // test deleting a vertex
  graph.removeVertex('Node4')
  graph.print()
  // Node1 => Node2, Node3 | Node2 => Node1 | Node3 => Node1
  // Node4 is now deleted

  graph.removeEdge('Node1', 'Node2')
  graph.print()
  // Node1 => Node3 | Node2 =>  | Node3 => Node1
  // after removing edge betw N1 and N2, Node2 is pointing to nothing

})()