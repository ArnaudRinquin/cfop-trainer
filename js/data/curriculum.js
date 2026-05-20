// CFOP curriculum: the path from "I picked up a cube" to "sub-20 CFOP solver".
// Translatable text is wrapped in tr(en, fr); the localize() helper resolves
// these at access time based on the current locale.
import { tr, localize } from '../i18n.js';

const STAGES = [
  {
    id: 'foundations',
    color: 'rgba(163, 230, 53, 0.7)',
    title: tr('Foundations', 'Bases'),
    summary: tr(
      'Learn the language of the cube before any algorithms.',
      'Apprenez le langage du cube avant tout algorithme.'
    ),
    lessons: [
      {
        id: 'notation',
        title: tr('Notation: the alphabet', 'Notation : l’alphabet'),
        eyebrow: tr('Lesson 1', 'Leçon 1'),
        estimate: tr('8 min', '8 min'),
        goal: tr('Read and perform any move sequence.', 'Lire et exécuter n’importe quelle séquence de mouvements.'),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "Every algorithm you'll learn is just letters: <code>R U R' U'</code>. Master the alphabet and the whole CFOP method opens up.",
              "Tout algorithme se résume à des lettres : <code>R U R' U'</code>. Maîtrisez l’alphabet et la méthode CFOP s’ouvre à vous."
            ),
          },
          { kind: 'h3', text: tr('Six faces, six letters', 'Six faces, six lettres') },
          {
            kind: 'p',
            text: tr(
              'Hold the cube with one color on top. The six faces are: <em>R</em>ight, <em>L</em>eft, <em>U</em>p, <em>D</em>own, <em>F</em>ront, <em>B</em>ack. A bare letter means a clockwise quarter-turn of that face — clockwise as if you were staring straight at it.',
              'Tenez le cube avec une couleur sur le dessus. Les six faces sont : <em>R</em>ight (droite), <em>L</em>eft (gauche), <em>U</em>p (haut), <em>D</em>own (bas), <em>F</em>ront (devant), <em>B</em>ack (derrière). Une lettre seule signifie un quart de tour de la face, dans le sens horaire vu de face.'
            ),
          },
          { kind: 'h3', text: tr('Modifiers', 'Modificateurs') },
          {
            kind: 'ul',
            items: [
              tr(
                "<code>R</code> = right face clockwise (90°)",
                "<code>R</code> = face droite, sens horaire (90°)"
              ),
              tr(
                "<code>R'</code> (\"R prime\") = right face counter-clockwise",
                "<code>R'</code> (« R prime ») = face droite, sens anti-horaire"
              ),
              tr(
                "<code>R2</code> = right face half-turn (180°). Direction doesn't matter.",
                "<code>R2</code> = demi-tour de la face droite (180°). Le sens n’a pas d’importance."
              ),
            ],
          },
          { kind: 'h3', text: tr('Rotations and slices', 'Rotations et tranches') },
          {
            kind: 'ul',
            items: [
              tr(
                "<code>x y z</code> rotate the whole cube around the R, U, F axes",
                "<code>x y z</code> font pivoter le cube entier autour des axes R, U, F"
              ),
              tr(
                "<code>r l u d f b</code> (lowercase) are <em>wide</em> turns — two layers at once",
                "<code>r l u d f b</code> (minuscules) sont des tours <em>larges</em> — deux couches d’un coup"
              ),
              tr(
                "<code>M</code> is the middle slice between R and L (turns with L direction)",
                "<code>M</code> est la tranche du milieu entre R et L (suit le sens de L)"
              ),
            ],
          },
          {
            kind: 'tip',
            text: tr(
              "Drill: pick up your cube and perform <code>R U R' U'</code> six times. You should land back on the start position. This sequence is called the <em>sexy move</em> and you'll do it more than anything else.",
              "Drill : prenez votre cube et exécutez <code>R U R' U'</code> six fois. Vous devez revenir à la position de départ. Cette séquence s’appelle le <em>sexy move</em> et vous l’exécuterez plus que toute autre."
            ),
          },
        ],
        practiceAlgs: null,
      },
      {
        id: 'anatomy',
        title: tr('Cube anatomy & color scheme', 'Anatomie du cube et schéma de couleurs'),
        eyebrow: tr('Lesson 2', 'Leçon 2'),
        estimate: tr('5 min', '5 min'),
        goal: tr(
          'Understand pieces vs stickers and the fixed color scheme.',
          'Comprendre la différence entre pièces et stickers, et le schéma de couleurs fixe.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              'A 3×3 has <em>three piece types</em>: 6 centers (1 sticker each), 12 edges (2 stickers each), and 8 corners (3 stickers each). Centers never move relative to each other — they define the color scheme.',
              'Un 3×3 compte <em>trois types de pièces</em> : 6 centres (1 sticker), 12 arêtes (2 stickers) et 8 coins (3 stickers). Les centres ne bougent jamais les uns par rapport aux autres — ils définissent le schéma de couleurs.'
            ),
          },
          { kind: 'h3', text: tr('The standard color scheme', 'Le schéma de couleurs standard') },
          {
            kind: 'p',
            text: tr(
              'Yellow opposite white, blue opposite green, red opposite orange. With white on top, the order around the side faces is <em>red &rarr; green &rarr; orange &rarr; blue</em> (clockwise looking down).',
              'Jaune opposé au blanc, bleu opposé au vert, rouge opposé au orange. Avec le blanc dessus, l’ordre des faces latérales est <em>rouge &rarr; vert &rarr; orange &rarr; bleu</em> (sens horaire vu du dessus).'
            ),
          },
          { kind: 'h3', text: tr('Why this matters', 'Pourquoi c’est important') },
          {
            kind: 'p',
            text: tr(
              "When you solve a single edge, you can't just match one sticker — both stickers have to align with their two centers. That principle is the heart of every algorithm.",
              "Pour résoudre une arête, il ne suffit pas d’aligner un sticker — les deux stickers doivent s’aligner avec leurs deux centres. C’est le cœur de chaque algorithme."
            ),
          },
          {
            kind: 'tip',
            text: tr(
              'Drill: hold the cube with white on top, then say out loud each side color as you turn the cube y, y, y. Build the spatial memory.',
              'Drill : blanc sur le dessus, puis énoncez à voix haute la couleur de chaque face en faisant y, y, y. Construisez la mémoire spatiale.'
            ),
          },
        ],
        practiceAlgs: null,
      },
    ],
  },
  {
    id: 'cross',
    color: 'rgba(59, 130, 246, 0.75)',
    title: tr('Cross', 'Croix'),
    summary: tr(
      'Solve the four edges of one face — efficiently.',
      'Résoudre les quatre arêtes d’une face — efficacement.'
    ),
    lessons: [
      {
        id: 'cross-intuitive',
        title: tr('Cross on bottom — intuitive', 'Croix en bas — intuitive'),
        eyebrow: tr('Lesson 3', 'Leçon 3'),
        estimate: tr('15 min', '15 min'),
        goal: tr(
          'Solve the white cross on the bottom of the cube without algorithms.',
          'Résoudre la croix blanche en bas du cube sans algorithme.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "Beginners learn the cross on <em>top</em>. CFOP solvers do it on the <em>bottom</em> from day one. You see all your F2L slots immediately and there's no awkward flip step.",
              "Les débutants font la croix <em>en haut</em>. Les cubeurs CFOP la font <em>en bas</em> dès le début. On voit immédiatement tous les slots F2L et on évite l’étape de retournement."
            ),
          },
          { kind: 'h3', text: tr('The method', 'La méthode') },
          {
            kind: 'ul',
            items: [
              tr(
                'Hold the cube with white on the bottom (yellow on top).',
                'Tenez le cube avec le blanc en bas (jaune dessus).'
              ),
              tr(
                'Find each white edge in turn (white-red, white-green, etc.).',
                'Repérez chaque arête blanche une par une (blanche-rouge, blanche-verte, etc.).'
              ),
              tr(
                'Bring it to the top layer if it isn’t already, line up the non-white sticker with its side center, then turn that face 180° to drop it into place.',
                'Amenez-la en haut si nécessaire, alignez le sticker non-blanc avec son centre latéral, puis tournez cette face à 180° pour la placer.'
              ),
              tr(
                'Repeat for the remaining three edges.',
                'Répétez pour les trois arêtes restantes.'
              ),
            ],
          },
          { kind: 'h3', text: tr('Make it fast', 'Le rendre rapide') },
          {
            kind: 'p',
            text: tr(
              "Don't solve edges one at a time on the bottom — set them all up on the top layer first, then drop them in. Eventually you'll plan all four edges during inspection.",
              "Ne placez pas les arêtes une par une en bas — préparez-les toutes en haut, puis insérez-les. Avec l’habitude, vous planifierez les quatre arêtes pendant l’inspection."
            ),
          },
          {
            kind: 'tip',
            text: tr(
              "Target: cross in 8 moves or fewer. Average for sub-20 solvers is ~7 moves with 2-3 seconds of execution.",
              "Objectif : croix en 8 mouvements ou moins. Les sub-20 tournent autour de 7 mouvements en 2-3 secondes."
            ),
          },
        ],
        practiceAlgs: null,
      },
      {
        id: 'cross-planning',
        title: tr('Cross planning during inspection', 'Planifier la croix pendant l’inspection'),
        eyebrow: tr('Lesson 4', 'Leçon 4'),
        estimate: tr('20 min', '20 min'),
        goal: tr(
          'Plan the entire cross before starting your timer.',
          'Planifier la croix complète avant de lancer le chrono.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "In WCA competitions you get 15 seconds of inspection. Top solvers use it to plan their cross (and increasingly, the first F2L pair too). Doing this halves your TPS pressure during execution.",
              "En compétition WCA, vous avez 15 secondes d’inspection. Les meilleurs s’en servent pour planifier la croix (et de plus en plus, la première paire F2L). Cela divise par deux la pression sur le TPS pendant l’exécution."
            ),
          },
          { kind: 'h3', text: tr('How to practice', 'Comment s’entraîner') },
          {
            kind: 'ul',
            items: [
              tr(
                'Scramble. Set a 15s timer. Stare at the cube without touching it.',
                'Mélangez. Lancez un chrono de 15s. Fixez le cube sans y toucher.'
              ),
              tr(
                'Trace each white edge: where is it, where does it need to go, what move gets it there?',
                'Suivez chaque arête blanche : où est-elle, où doit-elle aller, quel mouvement la place ?'
              ),
              tr(
                'When the timer hits zero, look away and try to execute from memory.',
                'À la fin des 15s, détournez le regard et exécutez de mémoire.'
              ),
              tr(
                'Open your eyes: did you do what you planned?',
                'Rouvrez les yeux : avez-vous fait ce que vous aviez planifié ?'
              ),
            ],
          },
          {
            kind: 'tip',
            text: tr(
              "Don't move on to F2L until you can plan crosses comfortably — it pays compound interest.",
              "Ne passez pas au F2L tant que vous ne planifiez pas les croix sereinement — l’investissement est rentable à long terme."
            ),
          },
        ],
        practiceAlgs: null,
      },
    ],
  },
  {
    id: 'f2l',
    color: 'rgba(34, 197, 94, 0.75)',
    title: tr('F2L', 'F2L'),
    summary: tr(
      'First Two Layers — pair and slot, 4 times.',
      'First Two Layers — apparier et insérer, 4 fois.'
    ),
    lessons: [
      {
        id: 'f2l-concept',
        title: tr('F2L: the pair-and-slot model', 'F2L : le modèle paire-et-slot'),
        eyebrow: tr('Lesson 5', 'Leçon 5'),
        estimate: tr('15 min', '15 min'),
        goal: tr(
          'Understand what a “pair” is and why F2L replaces beginner second-layer methods.',
          'Comprendre ce qu’est une « paire » et pourquoi le F2L remplace la méthode débutant pour la deuxième couche.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "Beginner methods solve corners first, then edges. F2L solves <em>both at once</em>, one corner-edge pair per slot. There are 4 slots, so 4 pairs.",
              "La méthode débutant résout d’abord les coins, puis les arêtes. Le F2L résout <em>les deux en même temps</em>, une paire coin-arête par slot. Il y a 4 slots, donc 4 paires."
            ),
          },
          { kind: 'h3', text: tr('Anatomy of a pair', 'Anatomie d’une paire') },
          {
            kind: 'p',
            text: tr(
              "A pair = one corner piece + the edge that goes next to it in the same slot. Example: the white-red-blue corner pairs with the red-blue edge. Together they fill the front-right slot.",
              "Une paire = un coin + l’arête qui va à côté de lui dans le même slot. Exemple : le coin blanc-rouge-bleu va avec l’arête rouge-bleue. Ensemble, ils remplissent le slot avant-droit."
            ),
          },
          { kind: 'h3', text: tr('The two-step model', 'Le modèle en deux étapes') },
          {
            kind: 'ul',
            items: [
              tr(
                'Step 1: Get both pieces to the top layer (this is the part where you think).',
                'Étape 1 : amenez les deux pièces sur le dessus (c’est là qu’il faut réfléchir).'
              ),
              tr(
                'Step 2: Pair them up and insert them into the empty slot in one motion.',
                'Étape 2 : assemblez-les et insérez-les dans le slot vide en un seul mouvement.'
              ),
            ],
          },
          {
            kind: 'p',
            text: tr(
              "Intuitive F2L means you understand the goal of each insertion, not that you memorise 41 separate algorithms. That memorisation comes later — and only for the tricky cases.",
              "Le F2L intuitif consiste à comprendre l’objectif de chaque insertion, pas à mémoriser 41 algorithmes. La mémorisation viendra plus tard — et seulement pour les cas délicats."
            ),
          },
        ],
        practiceAlgs: null,
      },
      {
        id: 'f2l-basic',
        title: tr('F2L: the 4 foundation insertions', 'F2L : les 4 insertions fondamentales'),
        eyebrow: tr('Lesson 6', 'Leçon 6'),
        estimate: tr('25 min', '25 min'),
        goal: tr(
          'Internalise the 4 base insertion patterns. Every other case reduces to one of these.',
          'Intérioriser les 4 schémas d’insertion de base. Tous les autres cas s’y ramènent.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "These four insertions appear constantly. Learn them so deeply you don't think about them.",
              "Ces quatre insertions reviennent tout le temps. Apprenez-les jusqu’à les exécuter sans y penser."
            ),
          },
          { kind: 'h3', text: tr('How to drill', 'Comment drill') },
          {
            kind: 'ul',
            items: [
              tr('Solve the cross.', 'Faites la croix.'),
              tr(
                'Pick any white corner on top. Find its matching edge.',
                'Choisissez un coin blanc en haut. Trouvez son arête correspondante.'
              ),
              tr(
                'Move them so they form the foundation case you want.',
                'Déplacez-les pour former le cas fondamental voulu.'
              ),
              tr('Insert.', 'Insérez.'),
              tr('Repeat 4 times per solve.', 'Répétez 4 fois par résolution.'),
            ],
          },
        ],
        practiceAlgs: 'f2l-basic',
      },
      {
        id: 'f2l-lookahead',
        title: tr('Look-ahead: solve one pair, see the next', 'Look-ahead : insérer une paire, voir la suivante'),
        eyebrow: tr('Lesson 7', 'Leçon 7'),
        estimate: tr('20 min', '20 min'),
        goal: tr(
          'Slow down execution while your eyes find the next pair.',
          'Ralentir l’exécution pendant que les yeux cherchent la paire suivante.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "The single biggest sub-20 unlock isn't faster fingers — it's <em>not pausing between pairs</em>. Pauses cost more than slow turning.",
              "Le plus gros levier sub-20 ce ne sont pas des doigts plus rapides — c’est <em>ne pas marquer de pause entre les paires</em>. Les pauses coûtent plus cher qu’un tour lent."
            ),
          },
          { kind: 'h3', text: tr('The drill', 'Le drill') },
          {
            kind: 'ul',
            items: [
              tr(
                'Solve at 70% of your normal turning speed.',
                'Résolvez à 70 % de votre vitesse habituelle.'
              ),
              tr(
                "While inserting one pair, force your eyes off the slot — find the next pair's corner and edge.",
                "Pendant l’insertion, détournez les yeux du slot — trouvez le coin et l’arête de la paire suivante."
              ),
              tr(
                'When you finish the insertion, you should already know your next move.',
                'À la fin de l’insertion, vous devez déjà connaître votre prochain mouvement.'
              ),
            ],
          },
          {
            kind: 'tip',
            text: tr(
              "Most people plateau at ~20s because they execute fast but pause between pairs. Slow down to speed up.",
              "La plupart des gens stagnent à ~20s car ils exécutent vite mais s’arrêtent entre les paires. Ralentissez pour accélérer."
            ),
          },
        ],
        practiceAlgs: null,
      },
    ],
  },
  {
    id: 'oll',
    color: 'rgba(250, 204, 21, 0.85)',
    title: tr('OLL', 'OLL'),
    summary: tr(
      'Orient the Last Layer — make the top face yellow.',
      'Orienter la dernière couche — rendre la face du dessus jaune.'
    ),
    lessons: [
      {
        id: 'oll-2look',
        title: tr('2-Look OLL: 10 algorithms', 'OLL en 2-look : 10 algorithmes'),
        eyebrow: tr('Lesson 8', 'Leçon 8'),
        estimate: tr('40 min', '40 min'),
        goal: tr(
          'Yellow-face every solve using two short look-ups.',
          'Obtenir la face jaune en deux étapes courtes à chaque résolution.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "Full OLL is 57 algorithms. 2-Look OLL is 10. You handle edges first (3 cases) then corners (7 cases). It adds ~2s vs full OLL but you can learn it in an afternoon.",
              "L’OLL complet : 57 algorithmes. L’OLL 2-look : 10. On gère d’abord les arêtes (3 cas) puis les coins (7 cas). Cela ajoute ~2s par rapport à l’OLL complet, mais s’apprend en une après-midi."
            ),
          },
          { kind: 'h3', text: tr('Step 1: orient edges (3 cases)', 'Étape 1 : orienter les arêtes (3 cas)') },
          {
            kind: 'p',
            text: tr(
              'You always end up in one of three states after F2L: <em>dot</em> (no yellow edges), <em>line</em>, or <em>L</em>. Learn one algorithm for each.',
              'Après le F2L, vous tombez sur l’un de trois cas : <em>point</em> (aucune arête jaune), <em>ligne</em>, ou <em>L</em>. Un algorithme par cas.'
            ),
          },
          { kind: 'h3', text: tr('Step 2: orient corners (7 cases)', 'Étape 2 : orienter les coins (7 cas)') },
          {
            kind: 'p',
            text: tr(
              'With the cross done, you have 7 possible corner orientations. The two you should master first are <em>Sune</em> and <em>Anti-Sune</em> — they appear most often.',
              'Une fois la croix faite, il reste 7 orientations de coins possibles. À maîtriser en priorité : <em>Sune</em> et <em>Anti-Sune</em> — les plus fréquents.'
            ),
          },
        ],
        practiceAlgs: '2look-oll-edges',
        practiceAlgs2: '2look-oll-corners',
      },
      {
        id: 'oll-full',
        title: tr('Full OLL: 57 algorithms', 'OLL complet : 57 algorithmes'),
        eyebrow: tr('Lesson 9 — long term', 'Leçon 9 — long terme'),
        estimate: tr('Weeks', 'Semaines'),
        goal: tr(
          'Recognise and execute any OLL case in under 1.5s.',
          'Reconnaître et exécuter n’importe quel OLL en moins de 1,5s.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "Don't try to swallow OLL whole. Learn 5-10 algs/week, drill them daily, and integrate them into solves before moving on. The Awkward and W-shapes are commonly skipped at first — that's fine.",
              "N’essayez pas d’avaler l’OLL d’un coup. 5-10 algos par semaine, drill quotidien, intégration dans les résolutions avant de passer à la suite. Les Awkward et W-shapes sont souvent reportés au début — c’est normal."
            ),
          },
          { kind: 'h3', text: tr('Recommended order', 'Ordre recommandé') },
          {
            kind: 'ul',
            items: [
              tr(
                'Sune-family (4 algs: Sune, Anti-Sune, Headlights, Pi)',
                'Famille Sune (4 algos : Sune, Anti-Sune, Headlights, Pi)'
              ),
              tr('Cross-shapes (T, L, U, H)', 'Cross-shapes (T, L, U, H)'),
              tr('Square cases (5, 6)', 'Cas Carré (5, 6)'),
              tr('P-shapes (31, 32, 43, 44)', 'P-shapes (31, 32, 43, 44)'),
              tr('Fish (35, 37)', 'Fish (35, 37)'),
              tr('The rest in any order', 'Le reste dans n’importe quel ordre'),
            ],
          },
          {
            kind: 'tip',
            text: tr(
              "Use the trainer below. Mark a case <em>mastered</em> only once you can recognise it in &lt; 0.5s.",
              "Utilisez l’entraîneur ci-dessous. Ne marquez un cas comme <em>maîtrisé</em> que si vous le reconnaissez en &lt; 0,5s."
            ),
          },
        ],
        practiceAlgs: 'oll-full',
      },
    ],
  },
  {
    id: 'pll',
    color: 'rgba(239, 68, 68, 0.8)',
    title: tr('PLL', 'PLL'),
    summary: tr(
      'Permute the Last Layer — finish the solve.',
      'Permuter la dernière couche — finir la résolution.'
    ),
    lessons: [
      {
        id: 'pll-2look',
        title: tr('2-Look PLL: 6 algorithms', 'PLL en 2-look : 6 algorithmes'),
        eyebrow: tr('Lesson 10', 'Leçon 10'),
        estimate: tr('30 min', '30 min'),
        goal: tr(
          'Finish any solve in two look-ups: corners then edges.',
          'Terminer chaque résolution en deux étapes : coins puis arêtes.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "Like 2-look OLL, this is a workhorse: 6 algorithms covering all 21 PLL cases. Permute corners first (2 algs), then edges (4 algs).",
              "Comme l’OLL 2-look, un cheval de bataille : 6 algorithmes couvrent les 21 cas PLL. Permutez d’abord les coins (2 algos), puis les arêtes (4 algos)."
            ),
          },
          { kind: 'h3', text: tr('Corner permutation', 'Permutation des coins') },
          {
            kind: 'p',
            text: tr(
              "Look at the top layer corners. If two adjacent corners share their non-yellow sticker color (\"headlights\"), you have an A-perm. Otherwise it's an E-perm (rare).",
              "Regardez les coins du dessus. Si deux coins adjacents partagent leur sticker non-jaune (« headlights »), c’est un A-perm. Sinon, c’est un E-perm (rare)."
            ),
          },
          { kind: 'h3', text: tr('Edge permutation', 'Permutation des arêtes') },
          {
            kind: 'p',
            text: tr(
              "Once corners are solved, you have 4 possible edge states: U-perm (clockwise), U-perm (counter), H-perm (opposite swap), or Z-perm (adjacent swap).",
              "Une fois les coins placés, il reste 4 cas pour les arêtes : U-perm (horaire), U-perm (anti-horaire), H-perm (échange opposé), Z-perm (échange adjacent)."
            ),
          },
        ],
        practiceAlgs: '2look-pll-corners',
        practiceAlgs2: '2look-pll-edges',
      },
      {
        id: 'pll-full',
        title: tr('Full PLL: 21 algorithms', 'PLL complet : 21 algorithmes'),
        eyebrow: tr('Lesson 11 — weeks', 'Leçon 11 — semaines'),
        estimate: tr('2-3 weeks', '2-3 semaines'),
        goal: tr(
          'One-look the last layer permutation.',
          'Permuter la dernière couche en un seul look.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "Full PLL is the highest ROI memorization in CFOP — only 21 cases and a huge time save. Learn the most common first.",
              "Le PLL complet est la mémorisation au meilleur rapport en CFOP : seulement 21 cas pour un gain de temps énorme. Apprenez les plus fréquents en premier."
            ),
          },
          { kind: 'h3', text: tr('Recommended order', 'Ordre recommandé') },
          {
            kind: 'ul',
            items: [
              tr(
                'T-perm and Y-perm (the workhorses)',
                'T-perm et Y-perm (les piliers)'
              ),
              tr('J-perms (Ja, Jb)', 'J-perms (Ja, Jb)'),
              tr('A-perms (Aa, Ab)', 'A-perms (Aa, Ab)'),
              tr('U-perms (Ua, Ub)', 'U-perms (Ua, Ub)'),
              tr('H-perm and Z-perm', 'H-perm et Z-perm'),
              tr(
                'F-perm, R-perms, G-perms, V, E, N-perms',
                'F-perm, R-perms, G-perms, V, E, N-perms'
              ),
            ],
          },
          {
            kind: 'tip',
            text: tr(
              "Recognition is half the speed. Practice recognising each PLL from a single sticker pattern — most can be ID'd from one face.",
              "La reconnaissance, c’est la moitié de la vitesse. Entraînez-vous à reconnaître chaque PLL à partir d’une seule face — la plupart se déduisent ainsi."
            ),
          },
        ],
        practiceAlgs: 'pll-full',
      },
    ],
  },
  {
    id: 'optimization',
    color: 'rgba(244, 114, 182, 0.7)',
    title: tr('Optimization', 'Optimisation'),
    summary: tr(
      'Go back, fix the cheap mistakes, unlock sub-20.',
      'Revenir en arrière, corriger les erreurs faciles, débloquer le sub-20.'
    ),
    lessons: [
      {
        id: 'cross-revisit',
        title: tr('Revisit: cross on every color', 'Reprendre : croix sur toutes les couleurs'),
        eyebrow: tr('Lesson 12', 'Leçon 12'),
        estimate: tr('Ongoing', 'Continu'),
        goal: tr(
          'Become at least dual-color-neutral (white + yellow).',
          'Devenir au moins bi-couleur neutre (blanc + jaune).'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              'A single-color cross averages ~7 moves. A color-neutral cross averages ~5.5 moves — and you skip rotations entirely. The penalty for becoming CN later is steep, so start now even if it slows you down for two weeks.',
              'Une croix sur une seule couleur fait en moyenne ~7 mouvements. Une croix color-neutral, ~5,5 — et vous évitez toutes les rotations. Le coût de devenir CN plus tard est élevé, alors commencez maintenant, même si vous perdez deux semaines.'
            ),
          },
          { kind: 'h3', text: tr('Stepping stones', 'Étapes intermédiaires') },
          {
            kind: 'ul',
            items: [
              tr(
                'Start with white + yellow (dual color neutral). Easy because they’re the same axis.',
                'Commencez par blanc + jaune (bi-couleur neutre). Facile, car ils sont sur le même axe.'
              ),
              tr('Add red + orange next.', 'Ajoutez ensuite rouge + orange.'),
              tr(
                'Full CN (all 6) is a multi-month project. Many sub-15 solvers are not full CN — pick your battle.',
                'Le full CN (les 6 couleurs) prend des mois. Beaucoup de sub-15 ne sont pas full CN — choisissez vos batailles.'
              ),
            ],
          },
        ],
        practiceAlgs: null,
      },
      {
        id: 'fingertricks',
        title: tr('Fingertricks: turn faster without trying', 'Fingertricks : tourner plus vite sans effort'),
        eyebrow: tr('Lesson 13', 'Leçon 13'),
        estimate: tr('Ongoing', 'Continu'),
        goal: tr(
          'Replace wrist twists with finger-pushed moves.',
          'Remplacer les rotations de poignet par des mouvements de doigts.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "Speed comes from fingertips, not wrists. The two highest-impact fingertricks: index-finger U and U' (snap with the side of your finger), and middle-finger M slices.",
              "La vitesse vient des doigts, pas des poignets. Les deux fingertricks à plus fort impact : U et U' à l’index (clac avec le côté du doigt), et les tranches M au majeur."
            ),
          },
          { kind: 'h3', text: tr('Mechanics', 'Mécanique') },
          {
            kind: 'ul',
            items: [
              tr(
                "<code>U</code>: flick with your left index finger from below the top layer.",
                "<code>U</code> : clac avec l’index gauche sous la couche du dessus."
              ),
              tr(
                "<code>U'</code>: flick with your right index finger.",
                "<code>U'</code> : clac avec l’index droit."
              ),
              tr(
                "<code>R</code> / <code>R'</code>: push with right index/middle finger — never wrist-rotate.",
                "<code>R</code> / <code>R'</code> : poussez avec index/majeur droits — jamais avec le poignet."
              ),
              tr(
                "<code>F</code>: pinch and roll, don't rotate the whole hand.",
                "<code>F</code> : pincez et faites rouler, ne tournez pas la main entière."
              ),
            ],
          },
          {
            kind: 'tip',
            text: tr(
              "Drill: alternate <code>R U R' U'</code> at increasing speed with a metronome. Eventually you'll hit 8+ TPS.",
              "Drill : alternez <code>R U R' U'</code> à vitesse croissante avec un métronome. Vous atteindrez 8+ TPS."
            ),
          },
        ],
        practiceAlgs: null,
      },
      {
        id: 'advanced-f2l',
        title: tr('Advanced F2L: empty slot tricks', 'F2L avancé : astuces avec slots vides'),
        eyebrow: tr('Lesson 14', 'Leçon 14'),
        estimate: tr('Weeks', 'Semaines'),
        goal: tr(
          'Use the back slots as workspace.',
          'Utiliser les slots arrière comme espace de travail.'
        ),
        blocks: [
          {
            kind: 'p',
            text: tr(
              "Once your first three F2L pairs are reliable, start using <em>empty slots</em> as workspace. Set up a pair with the FR slot empty — sometimes a pair you'd insert in BL inserts faster after a setup that uses FR as a holding spot.",
              "Une fois vos trois premières paires F2L fiables, utilisez les <em>slots vides</em> comme espace de travail. Préparez une paire avec le slot FR vide — parfois une paire destinée à BL s’insère plus vite après un set-up qui utilise FR comme zone de stockage."
            ),
          },
          { kind: 'h3', text: tr('Other techniques', 'Autres techniques') },
          {
            kind: 'ul',
            items: [
              tr(
                '<strong>Multi-slotting</strong>: shape the next pair while inserting the current one (so-called free pairs).',
                '<strong>Multi-slotting</strong> : formez la paire suivante pendant l’insertion (free pairs).'
              ),
              tr(
                '<strong>Pseudo-slotting</strong>: insert a pair into the “wrong” slot but pre-set up the cube so a later <code>U</code> turn fixes it.',
                '<strong>Pseudo-slotting</strong> : insérez une paire dans le « mauvais » slot, après un set-up qui sera corrigé par un <code>U</code> ultérieur.'
              ),
              tr(
                '<strong>X-cross</strong>: solve the cross and one F2L pair simultaneously during inspection.',
                '<strong>X-cross</strong> : résolvez la croix et une paire F2L en même temps pendant l’inspection.'
              ),
            ],
          },
        ],
        practiceAlgs: null,
      },
    ],
  },
];

// Locale-aware access. Resolve at access time so views always get the current
// locale's strings; the cost is small (14 lessons).
export function getStages() {
  return localize(STAGES);
}

export function flatLessons() {
  return getStages().flatMap((stage) =>
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
  for (const stage of getStages()) {
    const lesson = stage.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, stage };
  }
  return null;
}
