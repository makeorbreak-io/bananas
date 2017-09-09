import {WeekDate, Event, EventOption, EventOptionInstance} from './supp_classes'


// Returns dictionaries with the solutions
function search(domain)
{
  // Return null if there is no solution
  if (Array.from(domain.values()).some(v => v.length == 0)) {
    return null
  }

  // Return solution if one was found
  if (Array.from(domain.values()).every(v => v.length == 1)) {
    return [domain]
  }

  // Orders keys in order of increasing length of domain
  const keys = Array.from(domain.keys()).concat().sort(e => domain.get(e).length)

  const key = keys.filter( k => domain.get(k).length > 1)[0]
  // Missing picking value by most constraints created
  let solutions = []

  for (const value of domain.get(key)) {
    // Copy map
    const newDomain = new Map(domain)

    // Pick a value
    newDomain.set(key, [value])
    // Other variables values are the ones that are not constrained by picked value
    for (const key2 of keys.filter(k => k != key)) {
      const tmp = []
      for (const c of newDomain.get(key2)) {
          if (!overlapConstraint(value, c) || !overlapConstraint(c, value)) {
            tmp.push(c)
          }
      }
      newDomain.set(key2, tmp)
    }

    const s = search(newDomain)

    if (s != null) {
      solutions = solutions.concat(s)
    }
  }
  return solutions
}

function overlapConstraint(c1, c2)
{
  for (const e1 of c1.instances) {
    for (const e2 of c2.instances) {
      if ((Date.compare(e1.start, e2.end) < 0)) {
        return true
      }
    }
  }

  return false
}


  populate(){
    const ARAT = new Event('ARA-T');
    const ARAP = new Event('ARA-P');
    const ACAT = new Event('ACA-T');
    const ACAP = new Event('ACA-P');
    const EDCT = new Event('EDC-T');
    const EDCP = new Event('EDC-P');
    const SEGT = new Event('SEG-T');
    const SEGP = new Event('SEG-P');
    const CVT = new Event('CV-T');
    const CVP = new Event('CV-P');

    const ARAT1 = new EventOption(ARAT, 1,[ new EventOptionInstance( new WeekDate(3,13,0) , new WeekDate(3,15,0)), ]);
    const ARAP1 = new EventOption(ARAP, 1,[ new EventOptionInstance( new WeekDate(2,15,0) , new WeekDate(2,17,0)), ]);
    const ARAP2 = new EventOption(ARAP, 2,[ new EventOptionInstance( new WeekDate(5,11,0) , new WeekDate(5,13,0)), ]);
    const ARAP3 = new EventOption(ARAP, 3,[ new EventOptionInstance( new WeekDate(2,17,0) , new WeekDate(2,19,0)), ]);
    const ARAP4 = new EventOption(ARAP, 4,[ new EventOptionInstance( new WeekDate(5, 9,0) , new WeekDate(5,11,0)), ]);

    const ACAP1 = new EventOption(ACAP, 1,[ new EventOptionInstance( new WeekDate(2,11,0) , new WeekDate(2,13,0)), ]);
    const ACAP2 = new EventOption(ACAP, 2,[ new EventOptionInstance( new WeekDate(6,14,0) , new WeekDate(6,16,0)), ]);
    const ACAP3 = new EventOption(ACAP, 3,[ new EventOptionInstance( new WeekDate(2, 9,0) , new WeekDate(2,11,0)), ]);
    const ACAP4 = new EventOption(ACAP, 4,[ new EventOptionInstance( new WeekDate(2,14,0) , new WeekDate(2,16,0)), ]);
    const ACAT1 = new EventOption(ACAT, 1,[ new EventOptionInstance( new WeekDate(4,10,0) , new WeekDate(4,12,0)), ]);

    const CVP1 = new EventOption(CVP, 1,[ new EventOptionInstance( new WeekDate(2,15,0), new WeekDate(2,17,0)), ]);
    const CVP2 = new EventOption(CVP, 2,[ new EventOptionInstance( new WeekDate(2,13,0), new WeekDate(2,15,0)), ]);
    const CVP3 = new EventOption(CVP, 3,[ new EventOptionInstance( new WeekDate(5,11,0), new WeekDate(5,13,0)), ]);
    const CVT1 = new EventOption(CVT, 1,[ new EventOptionInstance( new WeekDate(3,15,0), new WeekDate(3,17,0)), ]);

    const EDCP1 = new EventOption(EDCP , 1,[ new EventOptionInstance( new WeekDate(6, 9, 0), new WeekDate(6,11, 0)), ]);
    const EDCP2 = new EventOption(EDCP , 2,[ new EventOptionInstance( new WeekDate(5,16,30), new WeekDate(5,18,30)), ]);
    const EDCP3 = new EventOption(EDCP , 3,[ new EventOptionInstance( new WeekDate(6,11, 0), new WeekDate(6,13, 0)), ]);
    const EDCT1 = new EventOption(EDCT , 1,[ new EventOptionInstance( new WeekDate(5,14,30), new WeekDate(5,16,30)), ]);

    const SEGP1 = new EventOption(SEGP , 1,[ new EventOptionInstance( new WeekDate(5, 9,0), new WeekDate(5,11,0)), ]);
    const SEGP2 = new EventOption(SEGP , 2,[ new EventOptionInstance( new WeekDate(6,11,0), new WeekDate(6,13,0)), ]);
    const SEGP3 = new EventOption(SEGP , 3,[ new EventOptionInstance( new WeekDate(6, 9,0), new WeekDate(6,11,0)), ]);
    const SEGP4 = new EventOption(SEGP , 4,[ new EventOptionInstance( new WeekDate(6,14,0), new WeekDate(6,16,0)), ]);
    const SEGT1 = new EventOption(SEGT , 1,[ new EventOptionInstance( new WeekDate(4,13,0), new WeekDate(4,15,0)), ]);

    let cl = [
              ARAT1, ARAP1, ARAP2, ARAP3, ARAP4,
              ACAT1, ACAP1, ACAP2, ACAP3, ACAP4,
              CVT1, CVP1, CVP2, CVP3,
              EDCT1, EDCP1, EDCP2, EDCP3,
              SEGT1, SEGP1, SEGP2, SEGP3, SEGP4
              ]

    let domain = createDomain(cl)

    let sol = search(domain)
    console.log("BLAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(sol)
  }



}

// Returns domain of eventOptions
function makeDomain(eventOptions, domain)
{
  if ( typeof domain == 'undefined' )
    domain = new Map();

  let value = NaN;

  console.log(eventOptions)
  for ( var c in eventOptions ){
    if ( !domain.has(eventOptions[c].event.name)) {
      domain.set(eventOptions[c].event.name, [eventOptions[c],]);
    }
    else {
      value = domain.get(eventOptions[c].event.name);
      value.push(eventOptions[c]);
      domain.set(eventOptions[c].event.name, value);
    }
  }
  console.log(domain)
  return domain
}