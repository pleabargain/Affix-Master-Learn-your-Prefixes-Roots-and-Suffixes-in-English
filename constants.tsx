
import { WordPart, CEFRLevel } from './types';

export const INITIAL_WORD_PARTS: WordPart[] = [
  // A1-A2 Level (Total: 8)
  {
    id: '1',
    type: 'prefix',
    value: 'un-',
    meaning: 'not, opposite of',
    origin: 'Old English, of Germanic origin.',
    trivia: 'One of the most common prefixes in English, appearing in thousands of words.',
    examples: [
      { word: 'unhappy', sentence: 'She felt unhappy when her ice cream fell.' },
      { word: 'unusual', sentence: 'It is unusual to see snow in the desert.' }
    ],
    cefr: [CEFRLevel.A1, CEFRLevel.A2]
  },
  {
    id: '2',
    type: 'suffix',
    value: '-er',
    meaning: 'a person or thing that does something',
    origin: 'Common Germanic suffix used for agents.',
    trivia: 'Often transforms verbs into nouns (e.g., teach -> teacher).',
    examples: [
      { word: 'teacher', sentence: 'The teacher explained the math problem.' },
      { word: 'player', sentence: 'He is a great basketball player.' }
    ],
    cefr: [CEFRLevel.A1, CEFRLevel.A2]
  },
  {
    id: '7',
    type: 'prefix',
    value: 're-',
    meaning: 'again or back',
    origin: 'From Latin re-, meaning "again".',
    trivia: 'Used in over 2,000 common English words.',
    examples: [
      { word: 'rewrite', sentence: 'I need to rewrite this essay.' },
      { word: 'return', sentence: 'Please return the book to the library.' }
    ],
    cefr: [CEFRLevel.A1, CEFRLevel.A2]
  },
  {
    id: '8',
    type: 'prefix',
    value: 'pre-',
    meaning: 'before',
    origin: 'From Latin prae, meaning "before".',
    trivia: 'Think of a "pre-game" show that happens before the game starts.',
    examples: [
      { word: 'prepare', sentence: 'I need to prepare for my exam tomorrow.' },
      { word: 'preview', sentence: 'Let\'s watch the movie preview.' }
    ],
    cefr: [CEFRLevel.A1, CEFRLevel.A2]
  },
  {
    id: '9',
    type: 'suffix',
    value: '-ly',
    meaning: 'in a certain way or manner',
    origin: 'Old English -līce, related to "like".',
    trivia: 'The most common way to turn an adjective into an adverb.',
    examples: [
      { word: 'quickly', sentence: 'He ran quickly to catch the bus.' },
      { word: 'slowly', sentence: 'The turtle moved slowly across the road.' }
    ],
    cefr: [CEFRLevel.A1, CEFRLevel.A2]
  },
  {
    id: '10',
    type: 'suffix',
    value: '-ful',
    meaning: 'full of',
    origin: 'Old English, from the word "full".',
    trivia: 'Words ending in -ful are almost always adjectives.',
    examples: [
      { word: 'helpful', sentence: 'Thank you for being so helpful today.' },
      { word: 'colorful', sentence: 'The garden was filled with colorful flowers.' }
    ],
    cefr: [CEFRLevel.A1, CEFRLevel.A2]
  },
  {
    id: '11',
    type: 'prefix',
    value: 'bi-',
    meaning: 'two',
    origin: 'From Latin bi-, meaning "twice" or "two".',
    trivia: 'A bicycle has two wheels, hence the name!',
    examples: [
      { word: 'bicycle', sentence: 'I ride my bicycle to school every day.' },
      { word: 'bilingual', sentence: 'She is bilingual and speaks English and Spanish.' }
    ],
    cefr: [CEFRLevel.A1, CEFRLevel.A2]
  },
  {
    id: '12',
    type: 'prefix',
    value: 'dis-',
    meaning: 'not, apart, or away',
    origin: 'From Latin dis-, indicating reversal or removal.',
    trivia: 'It is the opposite of "con-" or "as-".',
    examples: [
      { word: 'disagree', sentence: 'It\'s okay to disagree with your friends.' },
      { word: 'disappear', sentence: 'The magician made the rabbit disappear.' }
    ],
    cefr: [CEFRLevel.A2, CEFRLevel.B1]
  },

  // B1-B2 Level (Total: 8)
  {
    id: '3',
    type: 'root',
    value: '-spect-',
    meaning: 'to look or see',
    origin: 'From Latin specere, meaning "to look at".',
    trivia: 'The word "spectacles" (glasses) comes directly from this root.',
    examples: [
      { word: 'inspector', sentence: 'The inspector checked the building for safety.' },
      { word: 'perspective', sentence: 'Traveling gives you a new perspective on life.' },
      { word: 'spectator', sentence: 'The spectator watched the game from the stands.' }
    ],
    cefr: [CEFRLevel.B1, CEFRLevel.B2]
  },
  {
    id: '4',
    type: 'prefix',
    value: 'mono-',
    meaning: 'one, single',
    origin: 'From Greek monos, meaning "alone" or "single".',
    trivia: 'Used extensively in scientific and technical terminology.',
    examples: [
      { word: 'monologue', sentence: 'The actor delivered a powerful monologue.' },
      { word: 'monotone', sentence: 'His voice was flat and monotone.' }
    ],
    cefr: [CEFRLevel.B1, CEFRLevel.B2]
  },
  {
    id: '13',
    type: 'root',
    value: '-port-',
    meaning: 'to carry',
    origin: 'From Latin portare.',
    trivia: 'A "portable" device is one you can easily carry around.',
    examples: [
      { word: 'transport', sentence: 'The train is a great way to transport goods.' },
      { word: 'import', sentence: 'Many countries import oil from abroad.' },
      { word: 'export', sentence: 'We export our products to many countries.' }
    ],
    cefr: [CEFRLevel.B1, CEFRLevel.B2]
  },
  {
    id: '14',
    type: 'root',
    value: '-dict-',
    meaning: 'to say or speak',
    origin: 'From Latin dicere, past participle dictus.',
    trivia: 'A dictionary is literally a book of "said" or defined words.',
    examples: [
      { word: 'predict', sentence: 'It is hard to predict the weather accurately.' },
      { word: 'dictate', sentence: 'He will dictate the letter to his assistant.' },
      { word: 'contradict', sentence: 'Please don\'t contradict me in front of the team.' }
    ],
    cefr: [CEFRLevel.B1, CEFRLevel.B2]
  },
  {
    id: '15',
    type: 'prefix',
    value: 'auto-',
    meaning: 'self',
    origin: 'From Greek autos.',
    trivia: 'An autobiography is a biography written by the person themselves.',
    examples: [
      { word: 'automatic', sentence: 'The door has an automatic opening system.' },
      { word: 'automobile', sentence: 'The automobile changed how people travel.' }
    ],
    cefr: [CEFRLevel.B1, CEFRLevel.B2]
  },
  {
    id: '16',
    type: 'prefix',
    value: 'multi-',
    meaning: 'many',
    origin: 'From Latin multus.',
    trivia: 'A "multiverse" consists of many different universes.',
    examples: [
      { word: 'multiple', sentence: 'There are multiple ways to solve this problem.' },
      { word: 'multicultural', sentence: 'London is a very multicultural city.' }
    ],
    cefr: [CEFRLevel.B1, CEFRLevel.B2]
  },
  {
    id: '17',
    type: 'root',
    value: '-form-',
    meaning: 'shape',
    origin: 'From Latin forma.',
    trivia: 'To "transform" something is to change its shape or appearance.',
    examples: [
      { word: 'formation', sentence: 'The birds flew in a V-shaped formation.' },
      { word: 'reform', sentence: 'The government plans to reform the tax system.' }
    ],
    cefr: [CEFRLevel.B1, CEFRLevel.B2]
  },
  {
    id: '18',
    type: 'prefix',
    value: 'inter-',
    meaning: 'between or among',
    origin: 'From Latin inter.',
    trivia: 'The "internet" is a network that connects computers between different locations.',
    examples: [
      { word: 'international', sentence: 'The company has an international presence.' },
      { word: 'interact', sentence: 'It\'s important to interact with your colleagues.' }
    ],
    cefr: [CEFRLevel.B1, CEFRLevel.B2]
  },

  // C1-C2 Level (Total: 8)
  {
    id: '5',
    type: 'root',
    value: 'pneu-',
    meaning: 'air, breath, or lung',
    origin: 'From Greek pneuma, meaning "wind" or "spirit".',
    trivia: 'Pneumatic tools use compressed air to function.',
    examples: [
      { word: 'pneumonia', sentence: 'Pneumonia is an infection that inflames the air sacs in the lungs.' },
      { word: 'pneumatic', sentence: 'The mechanic used a pneumatic drill.' }
    ],
    cefr: [CEFRLevel.C1, CEFRLevel.C2]
  },
  {
    id: '6',
    type: 'prefix',
    value: 'ortho-',
    meaning: 'straight, correct, or right',
    origin: 'From Greek orthos.',
    trivia: 'Orthodontists "straighten" teeth.',
    examples: [
      { word: 'orthodox', sentence: 'The scientist used orthodox methods for the experiment.' },
      { word: 'orthography', sentence: 'English orthography can be very confusing.' }
    ],
    cefr: [CEFRLevel.C1, CEFRLevel.C2]
  },
  {
    id: '19',
    type: 'prefix',
    value: 'hyper-',
    meaning: 'over, above, or excessive',
    origin: 'From Greek hyper, meaning "over".',
    trivia: 'A "hyperbole" is a figure of speech that uses extreme exaggeration.',
    examples: [
      { word: 'hyperactive', sentence: 'The puppy was extremely hyperactive this morning.' },
      { word: 'hypercritical', sentence: 'She tends to be hypercritical of her own work.' }
    ],
    cefr: [CEFRLevel.C1, CEFRLevel.C2]
  },
  {
    id: '20',
    type: 'prefix',
    value: 'hypo-',
    meaning: 'under, below, or deficient',
    origin: 'From Greek hypo, meaning "under".',
    trivia: 'Opposite of "hyper-". "Hypothermia" means dangerously low body temperature.',
    examples: [
      { word: 'hypothesis', sentence: 'We need to test our hypothesis with an experiment.' },
      { word: 'hypodermic', sentence: 'The nurse used a hypodermic needle for the injection.' }
    ],
    cefr: [CEFRLevel.C1, CEFRLevel.C2]
  },
  {
    id: '21',
    type: 'root',
    value: '-anthrop-',
    meaning: 'human or mankind',
    origin: 'From Greek anthropos.',
    trivia: 'Anthropology is the scientific study of humans.',
    examples: [
      { word: 'philanthropy', sentence: 'His philanthropy helped build several hospitals.' },
      { word: 'anthropomorphic', sentence: 'The cartoon features anthropomorphic animals.' }
    ],
    cefr: [CEFRLevel.C1, CEFRLevel.C2]
  },
  {
    id: '22',
    type: 'prefix',
    value: 'meta-',
    meaning: 'beyond, after, or change',
    origin: 'From Greek meta.',
    trivia: 'Metamorphosis is the process of transformation from an immature form to an adult form.',
    examples: [
      { word: 'metaphor', sentence: 'The poem uses a powerful metaphor for life.' },
      { word: 'metabolism', sentence: 'She has a very fast metabolism.' }
    ],
    cefr: [CEFRLevel.C1, CEFRLevel.C2]
  },
  {
    id: '23',
    type: 'prefix',
    value: 'peri-',
    meaning: 'around or about',
    origin: 'From Greek peri.',
    trivia: 'A perimeter is the total distance around the edge of a shape.',
    examples: [
      { word: 'peripheral', sentence: 'The patient had a problem with their peripheral vision.' },
      { word: 'periscope', sentence: 'The submarine crew used a periscope to see above water.' }
    ],
    cefr: [CEFRLevel.C1, CEFRLevel.C2]
  },
  {
    id: '24',
    type: 'prefix',
    value: 'pseudo-',
    meaning: 'false or sham',
    origin: 'From Greek pseudes.',
    trivia: 'A "pseudonym" is a fake name used by an author.',
    examples: [
      { word: 'pseudoscience', sentence: 'Some people dismiss astrology as pseudoscience.' },
      { word: 'pseudonym', sentence: 'The author wrote under a pseudonym for years.' }
    ],
    cefr: [CEFRLevel.C1, CEFRLevel.C2]
  }
];

export const CEFR_DESCRIPTIONS: Record<CEFRLevel, string> = {
  [CEFRLevel.A1]: 'Very common, high-frequency affixes like un-, -er.',
  [CEFRLevel.A2]: 'Common affixes used in everyday communication.',
  [CEFRLevel.B1]: 'Mid-frequency roots for academic vocabulary like mono-, dict.',
  [CEFRLevel.B2]: 'Professional vocabulary and nuanced affixes like ambi-, inter-.',
  [CEFRLevel.C1]: 'Low-frequency, technical roots like pneu-, ortho-.',
  [CEFRLevel.C2]: 'Complex, literary, and highly specific archaic or technical forms.'
};
