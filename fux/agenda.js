class Agenda {
  /* An agenda can be used for depth-first, breadth-first or
     other state-space searches. An agenda has the following
     properties:

     Methods:
       constructore(policy="breadth-first" or "depth-first")
       put(state): add state to the agenda.
       get(): remove and return the next state. Throws exception if empty.
       empty(): true if empty, false if at least one state available.
  */

  constructor (policy = "breadth-first") {
    /* Return an Agenda of policy 'bf' for breadth first and
       'df' for depth first. Raises ValueError for invalid policy */

    this.BREADTH_FIRST = 1
    this.DEPTH_FIRST = 2

    if (policy === "breadth-first") {
      this.policy = this.BREADTH_FIRST
    } else if (policy === "depth-first") {
       this.policy = this.DEPTH_FIRST
    } else {
      throw `Agenda invalid policy argument ${policy}: can be 'breadth-first' or 'depth-first'`
    }
    this.q = new Deque()
  }

  /* TODO
    def __repr__(this):
      return "<Agenda: {} {}>\n".format(len(this.q), this.q)
  */

  put (state) {
    /* Add state to agenda. */
    this.q.appendleft(state)
  }

  get () {
    /* Remove and return the next state according to policy.
       Throw `Get from empty agenda` if agenda is empty */
    if (this.empty()) {
      throw `Get from an empty Agenda`
    }
    if (this.policy === this.BREADTH_FIRST) {
      return this.q.pop()
    } else {
      return this.q.popleft()
    }
  }

  empty () {
    return this.q.empty()
  }
}
