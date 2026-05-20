// Curriculum: the path from "I picked up a cube" to "sub-20 CFOP solver".
// Lessons are organized by stage. Each lesson has structured content:
// markdown-ish blocks, an optional algorithm group, and goals (used by progress tracking).

export const stages = [
  {
    id: 'foundations',
    title: 'Foundations',
    color: 'rgba(163, 230, 53, 0.7)',
    summary: 'Learn the language of the cube before any algorithms.',
    lessons: [
      {
        id: 'notation',
        title: 'Notation: the alphabet',
        eyebrow: 'Lesson 1',
        estimate: '8 min',
        goal: 'Read and perform any move sequence.',
        blocks: [
          { kind: 'p', text: "Every algorithm you'll learn is just letters: <code>R U R' U'</code>. Master the alphabet and the whole CFOP method opens up." },
          { kind: 'h3', text: 'Six faces, six letters' },
          { kind: 'p', text: 'Hold the cube with one color on top. The six faces are: <em>R</em>ight, <em>L</em>eft, <em>U</em>p, <em>D</em>own, <em>F</em>ront, <em>B</em>ack. A bare letter means a clockwise quarter-turn of that face — clockwise as if you were staring straight at it.' },
          { kind: 'h3', text: 'Modifiers' },
          { kind: 'ul', items: [
            "<code>R</code> = right face clockwise (90°)",
            "<code>R'</code> (\"R prime\") = right face counter-clockwise",
            "<code>R2</code> = right face half-turn (180°). Direction doesn't matter.",
          ]},
          { kind: 'h3', text: 'Rotations and slices' },
          { kind: 'ul', items: [
            "<code>x y z</code> rotate the whole cube around the R, U, F axes",
            "<code>r l u d f b</code> (lowercase) are <em>wide</em> turns — two layers at once",
            "<code>M</code> is the middle slice between R and L (turns with L direction)",
          ]},
          { kind: 'tip', text: "Drill: pick up your cube and perform <code>R U R' U'</code> six times. You should land back on the start position. This sequence is called the <em>sexy move</em> and you'll do it more than anything else." },
        ],
        practiceAlgs: null,
      },
      {
        id: 'anatomy',
        title: 'Cube anatomy & color scheme',
        eyebrow: 'Lesson 2',
        estimate: '5 min',
        goal: 'Understand pieces vs stickers and the fixed color scheme.',
        blocks: [
          { kind: 'p', text: 'A 3×3 has <em>three piece types</em>: 6 centers (1 sticker each), 12 edges (2 stickers each), and 8 corners (3 stickers each). Centers never move relative to each other — they define the color scheme.' },
          { kind: 'h3', text: 'The standard color scheme' },
          { kind: 'p', text: 'Yellow opposite white, blue opposite green, red opposite orange. With white on top, the order around the side faces is <em>red &rarr; green &rarr; orange &rarr; blue</em> (clockwise looking down).' },
          { kind: 'h3', text: "Why this matters" },
          { kind: 'p', text: "When you solve a single edge, you can't just match one sticker — both stickers have to align with their two centers. That principle is the heart of every algorithm." },
          { kind: 'tip', text: 'Drill: hold the cube with white on top, then say out loud each side color as you turn the cube y, y, y. Build the spatial memory.' },
        ],
        practiceAlgs: null,
      },
    ],
  },
  {
    id: 'cross',
    title: 'Cross',
    color: 'rgba(59, 130, 246, 0.75)',
    summary: 'Solve the four edges of one face — efficiently.',
    lessons: [
      {
        id: 'cross-intuitive',
        title: 'Cross on bottom — intuitive',
        eyebrow: 'Lesson 3',
        estimate: '15 min',
        goal: 'Solve the white cross on the bottom of the cube without algorithms.',
        blocks: [
          { kind: 'p', text: "Beginners learn the cross on <em>top</em>. CFOP solvers do it on the <em>bottom</em> from day one. You see all your F2L slots immediately and there's no awkward flip step." },
          { kind: 'h3', text: 'The method' },
          { kind: 'ul', items: [
            'Hold the cube with white on the bottom (yellow on top).',
            'Find each white edge in turn (white-red, white-green, etc.).',
            'Bring it to the top layer if it isn’t already, line up the non-white sticker with its side center, then turn that face 180° to drop it into place.',
            'Repeat for the remaining three edges.',
          ]},
          { kind: 'h3', text: 'Make it fast' },
          { kind: 'p', text: "Don't solve edges one at a time on the bottom — set them all up on the top layer first, then drop them in. Eventually you'll plan all four edges during inspection." },
          { kind: 'tip', text: "Target: cross in 8 moves or fewer. Average for sub-20 solvers is ~7 moves with 2-3 seconds of execution." },
        ],
        practiceAlgs: null,
      },
      {
        id: 'cross-planning',
        title: 'Cross planning during inspection',
        eyebrow: 'Lesson 4',
        estimate: '20 min',
        goal: 'Plan the entire cross before starting your timer.',
        blocks: [
          { kind: 'p', text: "In WCA competitions you get 15 seconds of inspection. Top solvers use it to plan their cross (and increasingly, the first F2L pair too). Doing this halves your TPS pressure during execution." },
          { kind: 'h3', text: 'How to practice' },
          { kind: 'ul', items: [
            'Scramble. Set a 15s timer. Stare at the cube without touching it.',
            'Trace each white edge: where is it, where does it need to go, what move gets it there?',
            'When the timer hits zero, look away and try to execute from memory.',
            'Open your eyes: did you do what you planned?',
          ]},
          { kind: 'tip', text: "Don't move on to F2L until you can plan crosses comfortably — it pays compound interest." },
        ],
        practiceAlgs: null,
      },
    ],
  },
  {
    id: 'f2l',
    title: 'F2L',
    color: 'rgba(34, 197, 94, 0.75)',
    summary: 'First Two Layers — pair and slot, 4 times.',
    lessons: [
      {
        id: 'f2l-concept',
        title: 'F2L: the pair-and-slot model',
        eyebrow: 'Lesson 5',
        estimate: '15 min',
        goal: 'Understand what a “pair” is and why F2L replaces beginner second-layer methods.',
        blocks: [
          { kind: 'p', text: "Beginner methods solve corners first, then edges. F2L solves <em>both at once</em>, one corner-edge pair per slot. There are 4 slots, so 4 pairs." },
          { kind: 'h3', text: 'Anatomy of a pair' },
          { kind: 'p', text: "A pair = one corner piece + the edge that goes next to it in the same slot. Example: the white-red-blue corner pairs with the red-blue edge. Together they fill the front-right slot." },
          { kind: 'h3', text: 'The two-step model' },
          { kind: 'ul', items: [
            "Step 1: Get both pieces to the top layer (this is the part where you think).",
            "Step 2: Pair them up and insert them into the empty slot in one motion.",
          ]},
          { kind: 'p', text: "Intuitive F2L means you understand the goal of each insertion, not that you memorise 41 separate algorithms. That memorisation comes later — and only for the tricky cases." },
        ],
        practiceAlgs: null,
      },
      {
        id: 'f2l-basic',
        title: 'F2L: the 4 foundation insertions',
        eyebrow: 'Lesson 6',
        estimate: '25 min',
        goal: 'Internalise the 4 base insertion patterns. Every other case reduces to one of these.',
        blocks: [
          { kind: 'p', text: "These four insertions appear constantly. Learn them so deeply you don't think about them." },
          { kind: 'h3', text: 'How to drill' },
          { kind: 'ul', items: [
            'Solve the cross.',
            'Pick any white corner on top. Find its matching edge.',
            'Move them so they form the foundation case you want.',
            'Insert.',
            'Repeat 4 times per solve.',
          ]},
        ],
        practiceAlgs: 'f2l-basic',
      },
      {
        id: 'f2l-lookahead',
        title: 'Look-ahead: solve one pair, see the next',
        eyebrow: 'Lesson 7',
        estimate: '20 min',
        goal: 'Slow down execution while your eyes find the next pair.',
        blocks: [
          { kind: 'p', text: "The single biggest sub-20 unlock isn't faster fingers — it's <em>not pausing between pairs</em>. Pauses cost more than slow turning." },
          { kind: 'h3', text: 'The drill' },
          { kind: 'ul', items: [
            "Solve at 70% of your normal turning speed.",
            "While inserting one pair, force your eyes off the slot — find the next pair's corner and edge.",
            "When you finish the insertion, you should already know your next move.",
          ]},
          { kind: 'tip', text: "Most people plateau at ~20s because they execute fast but pause between pairs. Slow down to speed up." },
        ],
        practiceAlgs: null,
      },
    ],
  },
  {
    id: 'oll',
    title: 'OLL',
    color: 'rgba(250, 204, 21, 0.85)',
    summary: 'Orient the Last Layer — make the top face yellow.',
    lessons: [
      {
        id: 'oll-2look',
        title: '2-Look OLL: 10 algorithms',
        eyebrow: 'Lesson 8',
        estimate: '40 min',
        goal: 'Yellow-face every solve using two short look-ups.',
        blocks: [
          { kind: 'p', text: "Full OLL is 57 algorithms. 2-Look OLL is 10. You handle edges first (3 cases) then corners (7 cases). It adds ~2s vs full OLL but you can learn it in an afternoon." },
          { kind: 'h3', text: 'Step 1: orient edges (3 cases)' },
          { kind: 'p', text: 'You always end up in one of three states after F2L: <em>dot</em> (no yellow edges), <em>line</em>, or <em>L</em>. Learn one algorithm for each.' },
          { kind: 'h3', text: 'Step 2: orient corners (7 cases)' },
          { kind: 'p', text: 'With the cross done, you have 7 possible corner orientations. The two you should master first are <em>Sune</em> and <em>Anti-Sune</em> — they appear most often.' },
        ],
        practiceAlgs: '2look-oll-edges',
        practiceAlgs2: '2look-oll-corners',
      },
      {
        id: 'oll-full',
        title: 'Full OLL: 57 algorithms',
        eyebrow: 'Lesson 9 — long term',
        estimate: 'Weeks',
        goal: 'Recognise and execute any OLL case in under 1.5s.',
        blocks: [
          { kind: 'p', text: "Don't try to swallow OLL whole. Learn 5-10 algs/week, drill them daily, and integrate them into solves before moving on. The Awkward and W-shapes are commonly skipped at first — that's fine." },
          { kind: 'h3', text: 'Recommended order' },
          { kind: 'ul', items: [
            'Sune-family (4 algs: Sune, Anti-Sune, Headlights, Pi)',
            'Cross-shapes (T, L, U, H)',
            'Square cases (5, 6)',
            'P-shapes (31, 32, 43, 44)',
            'Fish (35, 37)',
            'The rest in any order',
          ]},
          { kind: 'tip', text: "Use the trainer below. Mark a case <em>mastered</em> only once you can recognise it in &lt; 0.5s." },
        ],
        practiceAlgs: 'oll-full',
      },
    ],
  },
  {
    id: 'pll',
    title: 'PLL',
    color: 'rgba(239, 68, 68, 0.8)',
    summary: 'Permute the Last Layer — finish the solve.',
    lessons: [
      {
        id: 'pll-2look',
        title: '2-Look PLL: 6 algorithms',
        eyebrow: 'Lesson 10',
        estimate: '30 min',
        goal: 'Finish any solve in two look-ups: corners then edges.',
        blocks: [
          { kind: 'p', text: "Like 2-look OLL, this is a workhorse: 6 algorithms covering all 21 PLL cases. Permute corners first (2 algs), then edges (4 algs)." },
          { kind: 'h3', text: 'Corner permutation' },
          { kind: 'p', text: "Look at the top layer corners. If two adjacent corners share their non-yellow sticker color (\"headlights\"), you have an A-perm. Otherwise it's an E-perm (rare)." },
          { kind: 'h3', text: 'Edge permutation' },
          { kind: 'p', text: "Once corners are solved, you have 4 possible edge states: U-perm (clockwise), U-perm (counter), H-perm (opposite swap), or Z-perm (adjacent swap)." },
        ],
        practiceAlgs: '2look-pll-corners',
        practiceAlgs2: '2look-pll-edges',
      },
      {
        id: 'pll-full',
        title: 'Full PLL: 21 algorithms',
        eyebrow: 'Lesson 11 — weeks',
        estimate: '2-3 weeks',
        goal: 'One-look the last layer permutation.',
        blocks: [
          { kind: 'p', text: "Full PLL is the highest ROI memorization in CFOP — only 21 cases and a huge time save. Learn the most common first." },
          { kind: 'h3', text: 'Recommended order' },
          { kind: 'ul', items: [
            'T-perm and Y-perm (the workhorses)',
            'J-perms (Ja, Jb)',
            'A-perms (Aa, Ab)',
            'U-perms (Ua, Ub)',
            'H-perm and Z-perm',
            'F-perm, R-perms, G-perms, V, E, N-perms',
          ]},
          { kind: 'tip', text: "Recognition is half the speed. Practice recognising each PLL from a single sticker pattern — most can be ID'd from one face." },
        ],
        practiceAlgs: 'pll-full',
      },
    ],
  },
  {
    id: 'optimization',
    title: 'Optimization',
    color: 'rgba(244, 114, 182, 0.7)',
    summary: 'Go back, fix the cheap mistakes, unlock sub-20.',
    lessons: [
      {
        id: 'cross-revisit',
        title: 'Revisit: cross on every color',
        eyebrow: 'Lesson 12',
        estimate: 'Ongoing',
        goal: 'Become at least dual-color-neutral (white + yellow).',
        blocks: [
          { kind: 'p', text: 'A single-color cross averages ~7 moves. A color-neutral cross averages ~5.5 moves — and you skip rotations entirely. The penalty for becoming CN later is steep, so start now even if it slows you down for two weeks.' },
          { kind: 'h3', text: 'Stepping stones' },
          { kind: 'ul', items: [
            'Start with white + yellow (dual color neutral). Easy because they’re the same axis.',
            'Add red + orange next.',
            'Full CN (all 6) is a multi-month project. Many sub-15 solvers are not full CN — pick your battle.',
          ]},
        ],
        practiceAlgs: null,
      },
      {
        id: 'fingertricks',
        title: 'Fingertricks: turn faster without trying',
        eyebrow: 'Lesson 13',
        estimate: 'Ongoing',
        goal: 'Replace wrist twists with finger-pushed moves.',
        blocks: [
          { kind: 'p', text: "Speed comes from fingertips, not wrists. The two highest-impact fingertricks: index-finger U and U' (snap with the side of your finger), and middle-finger M slices." },
          { kind: 'h3', text: 'Mechanics' },
          { kind: 'ul', items: [
            "<code>U</code>: flick with your left index finger from below the top layer.",
            "<code>U'</code>: flick with your right index finger.",
            "<code>R</code> / <code>R'</code>: push with right index/middle finger — never wrist-rotate.",
            "<code>F</code>: pinch and roll, don't rotate the whole hand.",
          ]},
          { kind: 'tip', text: "Drill: alternate <code>R U R' U'</code> at increasing speed with a metronome. Eventually you'll hit 8+ TPS." },
        ],
        practiceAlgs: null,
      },
      {
        id: 'advanced-f2l',
        title: 'Advanced F2L: empty slot tricks',
        eyebrow: 'Lesson 14',
        estimate: 'Weeks',
        goal: 'Use the back slots as workspace.',
        blocks: [
          { kind: 'p', text: "Once your first three F2L pairs are reliable, start using <em>empty slots</em> as workspace. Set up a pair with the FR slot empty — sometimes a pair you'd insert in BL inserts faster after a setup that uses FR as a holding spot." },
          { kind: 'h3', text: 'Other techniques' },
          { kind: 'ul', items: [
            '<strong>Multi-slotting</strong>: shape the next pair while inserting the current one (so-called free pairs).',
            '<strong>Pseudo-slotting</strong>: insert a pair into the “wrong” slot but pre-set up the cube so a later <code>U</code> turn fixes it.',
            '<strong>X-cross</strong>: solve the cross and one F2L pair simultaneously during inspection.',
          ]},
        ],
        practiceAlgs: null,
      },
    ],
  },
];

// Convenience: flatten to a list of lessons with stage info attached.
export function flatLessons() {
  return stages.flatMap((stage) =>
    stage.lessons.map((lesson, i) => ({
      ...lesson,
      stageId: stage.id,
      stageTitle: stage.title,
      stageColor: stage.color,
      indexInStage: i,
    }))
  );
}

export function findLesson(lessonId) {
  for (const stage of stages) {
    const lesson = stage.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, stage };
  }
  return null;
}
