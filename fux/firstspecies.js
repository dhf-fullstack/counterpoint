/* eslint-disable camelcase */
// Relative pitches: half-steps above c

const [c, cs, db, d, ds, eb,
       e, es, fb, f, fs, gb,
       g, gs, ab, a, as, bb,
       b, cb] =
      [0,  1,  1, 2, 3,  3,
       4,  5,  4, 5,  6,  6,
       7,  8,  8, 9, 10, 10,
       11, 11]

const ABCtoNote = {
  'c': c, 'cs': cs, 'c#': cs, 'db': db, 'd': d, 'ds': ds, 'd#': ds, 'eb': eb,
  'e': e, 'es': es, 'e#': es, 'fb': db, 'f': f, 'fs': fs, 'f#': fs, 'gb': gb,
  'g': g, 'gs': gs, 'g#': gs, 'ab': ab, 'a': a, 'as': as, 'a#': as, 'bb': bb,
  'b': b, 'cb': cb
}

function parseABCtoNotes(abc) {
  // "c#' d' eb' f a, a2" -> [[cs, 5], [d, 5], [eb, 5], [f, 4], [a, 3], [a, 2]]
  let notes = abc.split(' ');
  return notes.map(n => parseOneABC.to.note(n))
}

function parseABCtoVexNotes(abc) {
  // "c#' d' eb' f a, a2" -> [[cs, 5], [d, 5], [eb, 5], [f, 4], [a, 3], [a, 2]]
  let notes = abc.split(' ');
  return notes.map(n => parseOneABC.to.vexnote(n))
}

const parseOneABC = {
  to: { note: (str) => parseOneABCAux(str, (pitch, octave) => [ABCtoNote[pitch], octave] ), // ("c#", 5) => [cs, 5]
        vexnote: (str) => parseOneABCAux(str, (pitch, octave) => ABCtoVexNote(pitch, octave)) } // ("c#, 5) => "C#/5"
}

function ABCtoVexNote(pitch, octave) {
  return [[`${pitch.toUpperCase()}/${octave}`], "w"]
}

function parseOneABCAux(abc, f) {
  // todo Error checking
  abc = abc.toLowerCase();
  let pitch
  let octave
  switch (abc.length) {
    case 1:
      pitch = abc.charAt(0)
      octave = 4
      break
    case 2:
      pitch = abc.charAt(0)
      octave = abc.charAt(1)
      break
    case 3:
      pitch = abc.slice(0,2)
      octave = abc.charAt(2)
  }
  if (octave === "'") { octave = "5" }
  else if (octave === ",") { octave = "3" }
  return f(pitch, +octave)
}

// The relative pitches of the dorian mode starting on D
//
//                d  e  f  g  a  b   c'     d' e' f' g' a' b' c''
const d_dorian = [2, 4, 5, 7, 9, 11, 12]  //14 16 17 19 21 23 24

// The note names of dorian for printing results

const notes_in_dorian = ["c", "c#", "d", "d#", "e", "f",
                         "f#", "g", "g#", "a", "a#", "b", "c"]

function note_in_dorian (n) {

  /* Given a note (pitch_class, octave) display the note name
     and an octave marker. Middle C octave - C4 - no suffix, the
     third octave is C, instead of C3 and the fifth is C' instead
     of C5. Why? 'cuz that's what I'm used to:
     C0...B0 C1...B1 ... C,...B, C...B C'...B' C6...B6 etc. */

  if (n === null) { // (None, None):
    return n
  }
  let [pitch_class, octave] = n
  let s = notes_in_dorian[pitch_class]
  switch (octave) {
    case 0: s += '0';  break
    case 1: s += '1';  break
    case 2: s += "2";  break
    case 3: s += ",";  break
    // case 4 unmarked
    case 5: s += "'";  break
    case 6: s += "6";  break
    case 7: s += "7";  break
    case 8: s += "8";  break
  }
  return s
}

function maj6 (note) {
  /* Return a Note(pitch_class, octave) a major sixth above
     the given Note. Independent of mode. */
  let [pitch_class, octave] = note
  let i = pitch_class + 9  // half-steps
  let p = i % 12
  let o = Math.floor(i / 12)
  return [p, octave+o]
}

function min3 (note) {
  /* Return a Note(pitch_class, octave) a minor third above
     the given Note. Independent of mode. */
  let [pitch_class, octave] = note
  let i = pitch_class + 3  // half-steps
  let p = i % 12
  let o = Math.floor(i / 12)
  return [p, octave+o]
}

function interval (p, o, mode, n) {
  /* Returns the nth note above p,o in the mode. */
  let new_pitch = mode.indexOf(p)+(n-1)  // nth note above in mode
  let octaves = Math.floor(new_pitch / mode.length)
  let ip = mode[new_pitch % mode.length]
  let io = o+octaves
  return [ip, io]
}


function perfect_consonances (note, mode) {
  /* Returns unison and the fifth and octave above a note. */
  let [p, o] = note
  let unison = [p, o]
  let octave = [p, o+1]
  let fifth = interval(p, o, mode, 5)
  return [unison, fifth, octave]
}

function imperfect_consonances(note, mode) {
  /* Returns the third and sixth above a note. */
  let [p, o] = note
  let third = interval(p, o, mode, 3)
  let sixth = interval(p, o, mode, 6)
  return [third, sixth]
}

const PERFECT = 1
const IMPERFECT = 0

function motion (n1, n2) {
  /* Returns -1,0,1 as n2 is below, equal to, or above n1. */
  let [p1, o1] = n1
  let [p2, o2] = n2
  if (o2 - o1 > 0) {
    return 1
  }
  if (o2 - o1 < 0) {
    return -1
  }
  if (p2 - p1 > 0) {
    return 1
  }
  if (p2 - p1 < 0) {
    return -1
  }
  return 0
}

function eliminate_direct_motion_into_perfect (cf, cp, index, candidates) {
  /* The rules of counterpoint forbid moving by direct motion into a
     perfect consonance: in other words, no parallel fifths or
     octaves. Contrary (one voice ascends and the other descends) and
     oblique motion (one voice stays on the same note) are always
     allowed. */

  let mcf = motion(cf[index], cf[index+1])
  let legal = []
  candidates.forEach((c) => {
    let mcp = motion(cp[index], c)
    if (mcp != mcf) { // no direct motion into perfect consonance
      legal.push(c)
    }
  })
  return legal
}

const ABOVE = 1
const BELOW = -1

class Counterpoint {
  /* A Counterpoint consists of a cantus firmus, the mode, the voice (1
     for above, -1 for below) and the current state of the composed
     counterpoint: the notes composed so far, the index of the next
     note to compose, and the counts of perfect and imperfect
     consonances used. The next() method returns a list of all
     next Counterpoints, False if no valid counterpoints, True if
     the composition is finished. */

  constructor (cf, voice, mode) {
    this.cf = cf
    if (voice != ABOVE && voice != BELOW) {
      throw `Counterpoint voice argument must be ABOVE ${ABOVE} or BELOW ${BELOW}, got ${voice}`
    }
    this.voice = voice
    this.mode = mode
    this.length = cf.length
    this.ult = this.length - 1
    this.penult = this.length - 2
    this.cp = new Array(this.length) // [None for _ in range(this.length)]  // was (None,None)
    this.cp.fill(null)

    // the first note to compose is the penult
    // M6 if cf is the voice above, m3 if below

    this.index = 0  // was this.penult
    this.count_perfect = 0
    this.count_imperfect = 0
  }

  copy () {
    let k = new Counterpoint(this.cf, this.voice, this.mode)
    k.length = this.cf.length
    k.ult = this.ult
    k.penult = this.penult
    k.cp = this.cp.map(n => (n === null) ? null : n.slice())
    k.index = this.index
    k.count_perfect = this.count_perfect
    k.count_imperfect = this.count_imperfect
    return k
  }

  /* TODO
  def __repr__(this):
        out = "<Counterpoint\n"
        if this.voice == this.ABOVE:
            out += "cp {}\ncf {}"
            top, bot = this.cp, this.cf
        else:
            out += "cf {}\ncp {}"
            top, bot = this.cf, this.cp
        out += "\nlen {} penult {} ult {} index {} voice {} mode {}>\n"
        return out.format(top, bot, this.len, this.penult, this.ult,
                          this.index, this.voice, this.mode)
  */

  next () {
    /* Return True if done or a list of next Counterpoints */
    if (this.index === 0) {
      // first interval must be a perfect consonance.
      let choices = perfect_consonances(this.cf[this.index], this.mode)
      let results = []
      choices.forEach(choice => {
                let k = this.copy()
                k.cp[k.index] = choice
                k.count_perfect += 1
                k.index += 1
                results.push(k)
      })
      return results
    }

    if (this.index > 0 && this.index < this.penult) {
      // prefer more imperfect to perfect intervals,
      // because more interesting
      let choices
      if (this.count_perfect > this.count_imperfect) {
        choices = imperfect_consonances(this.cf[this.index], this.mode)
                    .map(c => [c, IMPERFECT])
      } else {
        choices = imperfect_consonances(this.cf[this.index], this.mode)
                    .map(c => [c, IMPERFECT])
                    .concat(
                      eliminate_direct_motion_into_perfect(
                              this.cf, this.cp, this.index-1,
                              perfect_consonances(this.cf[this.index], this.mode))
                            .map(c => [c, PERFECT])
                    )
      }
      let results = []
      choices.forEach(c => {
          let [choice, type] = c
          let k = this.copy()
          k.cp[k.index] = choice
          if (type === PERFECT) {
            k.count_perfect += 1
          } else {
            k.count_imperfect += 1
          }
          k.index += 1
          results.push(k)
      })
      return results
    }

    if (this.index === this.penult) {
      // penult is fixed: M6 for voice above, m3 for voice below
      let k = this.copy() // probably ok to modify and return 'this'
      if (k.voice === ABOVE) {
        k.cp[k.penult] = maj6(k.cf[k.penult])
      } else {
        k.cp[k.penult] = min3(k.cf[k.penult])
      }
      k.count_imperfect += 1
      k.index += 1
      return [k]
    }

    if (this.index === this.ult) {
      // last interval must be a perfect consonance.
      let choices = eliminate_direct_motion_into_perfect(
                      this.cf, this.cp, this.index-1,
                      perfect_consonances(this.cf[this.index], this.mode))
      if (choices.length === 0) {
        console.log(`ERROR: no indirect motion to perfect consonance possible at ${this.index} cf=${this.cf} cp=${this.cp}`)
        return false
      }

      let results = []
      choices.forEach(choice => {
            let k = this.copy() // copy.deepcopy(this)
            k.cp[k.index] = choice
            k.count_perfect += 1
            k.index += 1
            results.push(k)
          })
      return results
    }

    if (this.index > this.ult) {
      return true
    }

    // TODO: try to avoid large skips, and compensate for
    // skips up to a fifth by contrary skips
  }
}

// Given a cantus firmus, generate all possible two-voice
// first species counterpoints subject to Fux' rules (hard rules
// implemented; soft rules only partially: tries for more imperfect
// than perfect consonances, but does not avoid skips or try to
// keep the line balanced.

// generate_next should eventually generate all possible counterpoints.
// generated_counterpoints is a hash { counterpoint: count } where
// counterpoint is a string rep of the cp, eg "C D E C ...". If the
// count is greater than one, a bug caused a dup to be generated.

class Composer {
  constructor(cantus_firmus) {
    this.generated_counterpoints = {}
    this.agenda = new Agenda("depth-first")
    this.cf = cantus_firmus
    let cp = new Counterpoint(this.cf, ABOVE, d_dorian)
    this.agenda.put(cp)
  }

  generate_next () {
    while (!this.agenda.empty()) {
      let k = this.agenda.get()
      let result = k.next()
      if (result === false) {
        return false
      } else if (result === true) {
        let cf_in_dorian = k.cf.map(n => note_in_dorian(n))
        let cp_in_dorian = k.cp.map(n => note_in_dorian(n))
        let cp = cp_in_dorian.join(' ')
        if (this.generated_counterpoints.hasOwnProperty[cp]) {
          this.generated_counterpoints[cp] += 1
        } else {
          this.generated_counterpoints[cp] = 1
        }
        return cp
      } else {
        result.forEach(r => this.agenda.put(r))
      }
    }
    return null
  }
}

let composer;

function firstspecies_start(cantus_firmus) {
  // TODO - translate cantus firmus into note types
  composer = new Composer([d, f, e, d, g, f, a, g, f, e, d].map(n => [n, 4]))
  //composer = new Composer([d, e, d].map(n => [n, 4]))
  let cp = firstspecies_next()
  return cp
}

function firstspecies_next () {
  let cp = composer.generate_next()
  if (cp === false) {
    console.log("failed")
    return null
  } else if (cp === null) {
    console.log("no more")
    return null
  } else {
    console.log(cp)
    return cp
  }
}
