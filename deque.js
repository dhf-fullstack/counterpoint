class Deque {
  constructor() {
    this.q = []
  }

  empty() {
    return this.q.length === 0
  }

  append (v) {
    this.q.push(v)
  }

  pop (v) {
    if (this.q.length === 0) {
      throw "Pop empty queue"
    }
    return this.q.pop()
  }

  appendleft(v) {
    this.q.unshift(v);
  }

  popleft(v) {
    if (this.q.length === 0) {
      throw "Popleft empty queue"
    }
    return this.q.shift();
  }
}
