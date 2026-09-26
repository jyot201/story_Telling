import { Story, ReviewItem } from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'clockmaker-whispering-pines',
    title: 'The Clockmaker of Whispering Pines',
    author: 'Elena Vance',
    category: 'Moral Growth',
    ageGroup: 'Ages 8–12',
    readTime: '7 min read',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx6o8NxxYJop6uMDtFiMlA_3E3wdwM1WjAjZHuYKbl9yJFs1B6U5LH3PXc_QxLJ9vryzUm5h3Wc4Y1-eL52u-CRbuI1cDj6qy2zhAAtxxCB-oupjyQMP18ej4lCoNButfgW2dSCqEzyFAYC9Q8y7nb-Rgg8VMBOGS7mtMHsMWKGRBX6hXA0esdyeEkcum9p_qylxe_RLkRuBUoQMS3CBK4wtwkuxJtxkGuR4jpdehetKAP-FTDARA',
    sceneBadge: 'Workshop of Master Tobias & Clara',
    actBadge: 'Act I Scene',
    summary: 'A quiet master horologist teaches a hurried apprentice why true patience breathes life into brass gears, and why broken seconds become the fertile ground for mercy.',
    featured: true,
    codex: {
      moralThesis: 'A parable addressing grief, impatience, and surrender. Tobias’s quiet fixation with rewinding brass chronometers personifies the universal childhood ache to undo moments of clumsiness or regret. The narrative teaches that true craftsmanship lies not in freezing the sun, but in breathing through the ticking second.',
      authorNote: '“Crafted intentionally for middle-graders tethered by early perfectionism. Observe during this passage that master Tobias never polishes the hidden rear covers of his clocks—only the face that meets the daylight.”',
      discussionSparks: [
        {
          id: 'spark-1',
          question: 'Can a mistake ever turn into a compass, or must we always hurry to hide it?',
          context: 'Consider how Tobias handled the delicate escapement when Clara asked about the escaping tick.'
        },
        {
          id: 'spark-2',
          question: "Why does Clara perceive the pine grove outside as ticking faster than Tobias's pendulum?",
          context: 'Notice the contrast between the urgent cold needles outside and the steady cedar box.'
        },
        {
          id: 'spark-3',
          question: 'What does it mean for an hour to "remember every tremble"? How does our hurried mood affect those around us?',
          context: 'Reflect on Tobias’s guidance on holding one’s breath.'
        }
      ]
    },
    chapters: [
      {
        id: 1,
        numberRoman: 'Chapter I',
        title: 'The Gear of Dawn',
        paragraphs: [
          'Before the frost had cleared from the high dormers, the workshop was already alive with the subtle chatter of seventy-two clocks. Not one chimed at the same instant; Master Tobias insisted that time was not an army marching in lockstep, but an orchestra of cautious soloists.',
          'Clara had swept the shavings of boxwood into neat heaps by the hearth. She carried the heavy iron kettle, careful not to let the steam cloud the newly polished lenses on the eastern bench. In the mountain village of Whispering Pines, everyone said Master Tobias could mend anything that had ever run down—except perhaps his own silence.',
          '“Hand me the fourth pinion from the velvet tray, Clara,” he said without turning from his magnifying lens. His fingers were long and knotted like cedar roots, but when they touched brass, they moved with the grace of water over smooth stones.'
        ],
        pullQuote: {
          id: 'quote-ch1',
          quote: 'Time is not an army marching in lockstep, but an orchestra of cautious soloists.',
          attribution: 'Master Tobias · Workshop Reflections',
          verse: 'Verse 4'
        }
      },
      {
        id: 2,
        numberRoman: 'Chapter II',
        title: 'The Pendulum of Lost Moments',
        paragraphs: [
          'The workshop smelled of whale-oil varnish, cold pine pitch, and decades of shaved brass. Outside the frosted dormer window, the Whispering Pines swayed in long, ocean-like breaths, their needles clicking against the zinc eaves like hundreds of impatient thimbles. Inside, however, time did not drift—it was measured, calibrated, and held gently beneath the silver tweezers of Master Tobias.',
          'Young Clara perched her chin against the edge of the workbench, watching as the tallow candle threw her shadow huge and trembling against the shelf of glass-belled chronometers. In the yellow cone of light, billions of brass dust motes danced lazily, turning into flakes of suspended amber each time Tobias exhaled through his gray beard.',
          'He was working upon the celestial escapement—a wheel no larger than the claw of a fledgling sparrow, carved with fourteen teeth that gripped the heartbeat of an entire mechanical sky. He dipped his goat-hair brush into cedar essence, grazing the balance cock with reverence.',
          '“You hold your breath when you touch the escapement, Master,” Clara whispered, wary of shattering the hush. “Is it because you are afraid the tick will escape?”',
          'Tobias laid the tweezers down upon the oilcloth with an almost soundless click. He turned his jeweler’s loupe away from his eye, looking down at Clara’s ink-smudged fingertips. “I hold my breath, little sparrow, because the wheel remembers every tremble. If you strike it with haste, you condemn tomorrow’s hour to drag its feet. But if you give it quiet patience...” He nudged the tiny counterweight, and the miniature chime rang like an ice bell across a moonlit valley.',
          'Clara pressed her ear against the cedar box. Inside, the twin brass bells resonated not with the sharp urgency of the capital’s steam clocks, but with the steady, reassuring rustle of the trees outside. It sounded less like metal, and more like forgiveness waiting quietly behind the door.'
        ],
        pullQuote: {
          id: 'quote-ch2',
          quote: '“A second lost is not empty space—it is soil where forgiveness grows.”',
          attribution: 'Tobias to Clara',
          verse: 'Verse 18'
        }
      },
      {
        id: 3,
        numberRoman: 'Chapter III',
        title: 'The Frost Upon the Mainspring',
        paragraphs: [
          'Midnight arrived in a sweep of blue shadow over the valley. The wind down from the ridge rattled the pine shingles, and for three minutes, every timepiece in the sanctuary fell into harmonious resonance, their pendulum bobs swaying together like tall reeds in a slow current.',
          'Clara picked up the broken watch brought in that afternoon by the apothecary. Its ruby pivot had shattered when the young apprentice dropped it on cobblestones. “Can it ever keep true minutes again?” she asked, tracing the hairline fracture along the arbor.',
          'Tobias adjusted the wick of the tallow lamp. “A mended jewel runs with a different timbre, Clara. It will never pretend the fall never occurred. But a repaired pivot often carries oil longer than one that has never felt the shock. Strength is not ignorance of breaking; it is the seam where the silver solder took hold.”'
        ],
        pullQuote: {
          id: 'quote-ch3',
          quote: '“Strength is not ignorance of breaking; it is the seam where the silver solder took hold.”',
          attribution: 'Tobias · Chapter III',
          verse: 'Verse 27'
        }
      },
      {
        id: 4,
        numberRoman: 'Chapter IV',
        title: 'The Whispering Spring',
        paragraphs: [
          'At dawn, the villagers gathered outside the workshop. Word had travelled that the great tower bell of Whispering Pines, silent for seven harsh winters, had stirred with the first sunbeam.',
          'Clara stood beside Master Tobias upon the wooden platform. He handed her the winding key—carved from ancient pig-iron, polished bright by generations of patient hands. “Turn it not with the strength of your shoulders, Clara, but with the rhythm of your breath.”',
          'As the great bronze cog engaged, a low, golden chord rolled down across the cedar forest, scattering the crows from the eaves and bringing tears to the eyes of the elders who had forgotten the chime of their youth.'
        ],
        pullQuote: {
          id: 'quote-ch4',
          quote: '“Turn it not with the strength of your shoulders, but with the rhythm of your breath.”',
          attribution: 'Tobias to Clara',
          verse: 'Verse 34'
        }
      },
      {
        id: 5,
        numberRoman: 'Chapter V',
        title: 'The Golden Hourglass',
        paragraphs: [
          'Years later, when Clara kept the workshop herself, travelers would climb the mountain pass simply to hear the quiet cadence of her clocks. They remarked that unlike the city timepieces that hurried men toward graves and ledgers, the clocks of Whispering Pines seemed to give minutes back.',
          'Beneath the glass dome on her main bench rested Master Tobias’s original escapement, still ticking with its fourteen sparrow-teeth, humming the ancient truth that every child learns when they cease hurrying: the present moment is the only home eternity ever built.'
        ],
        pullQuote: {
          id: 'quote-ch5',
          quote: '“The present moment is the only home eternity ever built.”',
          attribution: 'Clara of Whispering Pines',
          verse: 'Epilogue'
        }
      }
    ]
  },
  {
    id: 'cartographer-silent-oceans',
    title: 'The Cartographer of Silent Oceans',
    author: 'Kaelen Thorne',
    category: 'Humility & Wonder',
    ageGroup: 'Ages 10–14',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    sceneBadge: 'The Observatory of Cape Solitude',
    actBadge: 'Act II Scene',
    summary: 'A mapmaker whose charts leave empty spaces for uncharted wonders learns that knowing everything is far less noble than knowing how to listen.',
    featured: false,
    codex: {
      moralThesis: 'Knowledge without awe hardens into arrogance. In drawing maps of the untamed archipelago, the protagonist discovers that the most vital waters are those we cannot conquer with ink.',
      authorNote: '“Written for young minds learning to trade certainty for discovery.”',
      discussionSparks: [
        {
          id: 'spark-c1',
          question: 'Why did ancient mapmakers draw sea monsters where their knowledge stopped, and what do we put in our own blind spots?',
          context: 'Chapter I explores the parchment borders of the Southern Reach.'
        }
      ]
    },
    chapters: [
      {
        id: 1,
        numberRoman: 'Chapter I',
        title: 'The Unruled Horizon',
        paragraphs: [
          'Orion did not use iron calipers to measure the tide. He lowered a copper bell into the breakers and counted the seconds until the hollow boom answered from the reef.',
          '“A map that leaves no room for fog is a prison disguised as paper,” his grandmother had taught him. Every captain in the guild mocked his blank perimeters, yet when storm winds blinded the compass, it was Orion’s incomplete charts they clutched to their chests.'
        ],
        pullQuote: {
          id: 'quote-c1',
          quote: '“A map that leaves no room for fog is a prison disguised as paper.”',
          attribution: 'The Mapmaker’s Credo',
          verse: 'Verse 9'
        }
      }
    ]
  },
  {
    id: 'weaver-winter-bells',
    title: 'The Weaver of Winter Bells',
    author: 'Sylvia R. Croft',
    category: 'Empathy & Courage',
    ageGroup: 'Ages 8–12',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    sceneBadge: 'The Snow Loom of High Tor',
    actBadge: 'Prologue Scene',
    summary: 'In a mountain pass where frost silences all sound, a young weaver braids silver thread into coats that carry the song of summer wheat to shivering elders.',
    featured: false,
    codex: {
      moralThesis: 'Warmth is not merely temperature—it is the deliberate act of remembering joy on behalf of those who are currently freezing.',
      authorNote: '“Designed for quiet evenings and discussion about caring for isolated members of our communities.”',
      discussionSparks: [
        {
          id: 'spark-w1',
          question: 'How can small, unseen gestures of care change the temperature of an entire room?',
          context: 'The silver thread woven through coarse wool.'
        }
      ]
    },
    chapters: [
      {
        id: 1,
        numberRoman: 'Chapter I',
        title: 'The Silver Shuttle',
        paragraphs: [
          'When the snow fell so thick that even the church bells muffled their brass tongues, Mara sat before the loom of ash-wood. She had gathered thistledown during the August heat, storing it in sealed clay jars so it would retain the memory of the sun.',
          '“Wool keeps out the wind, child,” the village warden warned, “but you cannot warm a cold heart with daydreams.” Mara said nothing; she simply threaded the shuttle and began to weave.'
        ]
      }
    ]
  },
  {
    id: 'botanist-catalogued-regret',
    title: 'The Botanist Who Catalogued Regret',
    author: 'M. J. Sterling',
    category: 'Acceptance & Grace',
    ageGroup: 'Young Adult',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    sceneBadge: 'The Glass Conservatory at Twilight',
    actBadge: 'Act I Scene',
    summary: 'A botanist searching for a flower that unblooms discovers that our past missteps are the exact compost required for the hardiest blooms of wisdom.',
    featured: false,
    codex: {
      moralThesis: 'Regret is a natural seed, but when watered by rumination, it strangles fresh shoots. True redemption is composting what was broken into nourishment for tomorrow.',
      authorNote: '“Explores the emotional transition from self-recrimination to quiet self-compassion.”',
      discussionSparks: [
        {
          id: 'spark-b1',
          question: 'Can you recall a failure that later nourished a skill or perspective you rely upon today?',
          context: 'The concept of composted experience in Master Sterling’s herbarium.'
        }
      ]
    },
    chapters: [
      {
        id: 1,
        numberRoman: 'Chapter I',
        title: 'Seeds in the Winter Soil',
        paragraphs: [
          'In the high glasshouse above the frost line, Master Sterling kept seven rows of terra-cotta pots marked with dates rather than species names.',
          '“Each one,” he told the visiting scholar, “represents an hour I wished I could undo. But notice: the plants in those pots bear the deepest roots and the sweetest honey in all the realm.”'
        ]
      }
    ]
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Dr. Arthur Penhaligon',
    role: 'Educator',
    storyTitle: 'The Clockmaker of Whispering Pines',
    rating: 5,
    content: 'We read Chapter II aloud with our 5th-grade literature circle. The line “A second lost is not empty space—it is soil where forgiveness grows” prompted a 45-minute spontaneous circle discussion about making peace with clumsy mistakes in test prep and sports.',
    sparkPrompt: 'Can a mistake ever turn into a compass, or must we always hurry to hide it?',
    date: '2 days ago',
    likes: 34
  },
  {
    id: 'rev-2',
    authorName: 'Miriam Vance-Holt',
    role: 'Parent',
    storyTitle: 'The Clockmaker of Whispering Pines',
    rating: 5,
    content: 'My 9-year-old daughter struggles with perfectionism—tearing up homework sheets if her lettering wobbles. Reading Tobias’s lesson about the wheel remembering the tremble genuinely shifted her relationship with patience. Essential reading for sensitive children.',
    date: '4 days ago',
    likes: 28
  },
  {
    id: 'rev-3',
    authorName: 'Julian Croft',
    role: 'Seeker',
    storyTitle: 'The Cartographer of Silent Oceans',
    rating: 5,
    content: 'The prose in Mythos & Quill possesses a tactile, nocturnal dignity so rarely encountered in modern children’s literature. The audio narration feature with ambient pine wind was transcendent.',
    date: '1 week ago',
    likes: 19
  },
  {
    id: 'rev-4',
    authorName: 'Sister Teresa Maria',
    role: 'Educator',
    storyTitle: 'The Clockmaker of Whispering Pines',
    rating: 5,
    content: 'The moral codex provided beneath the chapter is an educator’s dream. The pedagogical scaffolding allows mentors to transition effortlessly from prose enjoyment to existential inquiry.',
    sparkPrompt: 'Why does Clara perceive the pine grove outside as ticking faster than Tobias’s pendulum?',
    date: '2 weeks ago',
    likes: 41
  }
];

export const INITIAL_SAVED_QUOTES = [
  {
    id: 'quote-ch2',
    storyId: 'clockmaker-whispering-pines',
    storyTitle: 'The Clockmaker of Whispering Pines',
    quote: '“A second lost is not empty space—it is soil where forgiveness grows.”',
    attribution: 'Tobias to Clara',
    verse: 'Verse 18',
    savedAt: 'Today'
  }
];
