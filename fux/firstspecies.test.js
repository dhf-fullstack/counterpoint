describe('ABC parser', function() {
  it('can parse a string to an array of notes', function() {
    let abc = "c#' d' eb' f a, a2"
    expect( parseABCtoNotes(abc) ).toEqual ([[cs, 5], [d, 5], [eb, 5], [f, 4], [a, 3], [a, 2]])
  })
})

describe('Queue', function() {
  it('creates an empty queue', function() {
    let d = new Deque();
    expect( d.empty() ).toEqual( true );
  });

  it('appends and pops several times', function() {
    let d = new Deque();
    d.append(1);
    d.append(2);
    d.append(3);
    expect( d.pop() ).toEqual( 3 );
    expect( d.pop() ).toEqual( 2);
    expect( d.pop() ).toEqual( 1 );
  });

  it('throws an exception if pop more than append', function() {
    let d = new Deque();
    d.append(1);
    expect( d.pop() ).toEqual( 1 );
    expect( () => { d.pop() } ).toThrow( "Pop empty queue" );
  });

  it('appendlefts and poplefts several times', function() {
    let d = new Deque();
    d.appendleft(1);
    d.appendleft(2);
    d.appendleft(3);
    expect( d.popleft() ).toEqual( 3 );
    expect( d.popleft() ).toEqual( 2);
    expect( d.popleft() ).toEqual( 1 );
  });

  it('throws an exception if popleft more than appendleft', function() {
    let d = new Deque();
    d.appendleft(1);
    expect( d.popleft() ).toEqual( 1 );
    expect( () => { d.popleft() } ).toThrow( "Popleft empty queue" );
  });
});