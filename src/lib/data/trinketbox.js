/**
 * The Trinketbox: favourite things, grouped into drawers.
 * `bg` / `fg` are the drawer colours (palette tokens from app.css).
 *
 * @typedef {{ title: string, url: string, note: string, tag: string }} Trinket
 * @typedef {{ id: string, name: string, subtitle: string, bg: string, fg: string, items: Trinket[] }} Drawer
 */

/** @type {Drawer[]} */
export const drawers = [
  {
    id: "websites",
    name: "Websites",
    subtitle: "corners of the internet i love",
    bg: "var(--cobalt)",
    fg: "var(--paper)",
    items: [
      {
        title: "Wikipedia",
        url: "https://wikipedia.org",
        note: "the greatest collaborative achievement of humanity",
        tag: "knowledge"
      },
      {
        title: "Internet Archive",
        url: "https://archive.org",
        note: "the digital library for everything",
        tag: "archive"
      },
      {
        title: "Neocities",
        url: "https://neocities.org",
        note: "home of the indie web revival",
        tag: "community"
      }
    ]
  },
  {
    id: "books",
    name: "Books",
    subtitle: "words that rewired my brain",
    bg: "var(--olive)",
    fg: "var(--paper)",
    items: [
      {
        title: "The Hunger Games",
        url: "https://www.goodreads.com/book/show/2767052-the-hunger-games",
        note: "cautionary tale about today huh?",
        tag: "dystopian"
      },
      {
        title: "One Piece",
        url: "https://www.goodreads.com/book/show/1237398.One_Piece_Vol_1",
        note: "original pirate obsession",
        tag: "manga"
      },
      {
        title: "A Darker Shade of Magic",
        url: "https://www.goodreads.com/book/show/22055262-a-darker-shade-of-magic",
        note: "four versions of London, one Kell",
        tag: "fantasy"
      },
      {
        title: "The Raven Boys",
        url: "https://www.goodreads.com/book/show/17675462-the-raven-boys",
        note: "searching for a sleeping king",
        tag: "fantasy"
      },
      {
        title: "Six of Crows",
        url: "https://www.goodreads.com/book/show/23437156-six-of-crows",
        note: "no mourners, no funerals",
        tag: "fantasy"
      },
      {
        title: "Raven's Gate",
        url: "https://www.goodreads.com/book/show/107664.Raven_s_Gate",
        note: "the power of five",
        tag: "thriller"
      },
      {
        title: "His Dark Materials",
        url: "https://www.goodreads.com/book/show/41637836-the-subtle-knife",
        note: "the window between worlds",
        tag: "fantasy"
      },
      {
        title: "W.I.T.C.H.",
        url: "https://www.goodreads.com/book/show/34850247-w-i-t-c-h-part-i-the-twelve-portals-vol-1",
        note: "guardians of the veil",
        tag: "graphic novel"
      }
    ]
  },
  {
    id: "movies",
    name: "Movies",
    subtitle: "films that live in my heart",
    bg: "var(--ochre-light)",
    fg: "var(--ink)",
    items: [
      {
        title: "Bridge to Terabithia",
        url: "https://letterboxd.com/film/bridge-to-terabithia/",
        note: "(2007) destroyed me as a child and still does",
        tag: "fantasy"
      },
      {
        title: "10 Things I Hate About You",
        url: "https://letterboxd.com/film/10-things-i-hate-about-you/",
        note: "(1999) i hate the way i don’t hate you, not even close, not even a little bit",
        tag: "romance"
      },
      {
        title: "Fast & Furious",
        url: "https://letterboxd.com/film/the-fast-and-the-furious/",
        note: "(2001) i live my life a quarter mile at a time",
        tag: "action"
      }
    ]
  },
  {
    id: "music",
    name: "Music",
    subtitle: "artists on permanent rotation",
    bg: "var(--ink)",
    fg: "var(--paper)",
    items: [
      {
        title: "Bring Me The Horizon",
        url: "https://open.spotify.com/artist/1Ffb692uZx6OY09KWz36XG",
        note: "from deathcore to experimental rock kings",
        tag: "rock"
      },
      {
        title: "Halsey",
        url: "https://open.spotify.com/artist/26VFT3mzuDfsHpqR0qznMG",
        note: "cinematic pop with a dark edge",
        tag: "pop"
      },
      {
        title: "Cage The Elephant",
        url: "https://open.spotify.com/artist/26T3t9AwdSTnn9H9Zayp95",
        note: "unmatched energy and indie grit",
        tag: "indie"
      },
      {
        title: "Twenty One Pilots",
        url: "https://open.spotify.com/artist/3YQBOt78p19UnvBq6S6S9Y",
        note: "genre-bending lore and emotional depth",
        tag: "alternative"
      },
      {
        title: "Florence + The Machine",
        url: "https://open.spotify.com/artist/1moxjboGR7pKoYn7An936M",
        note: "ethereal vocals and baroque pop magic",
        tag: "indie"
      },
      {
        title: "Linkin Park",
        url: "https://open.spotify.com/artist/6XyY88sdvR9jXmI8EXH79I",
        note: "the definitive sound of a generation",
        tag: "rock"
      },
      {
        title: "Paramore",
        url: "https://open.spotify.com/artist/74XF2S16mUjUaXmS9S9S9S",
        note: "pop-punk legends",
        tag: "rock"
      },
      {
        title: "Aly & AJ",
        url: "https://open.spotify.com/artist/5wugb0kaq0J6nyQ5Xgd17i",
        note: "sister duo with a dreamy 80s synth sound",
        tag: "pop"
      },
      {
        title: "Nothing But Thieves",
        url: "https://open.spotify.com/artist/1is9S79v96S4S6S9S9S9S9",
        note: "massive riffs and incredible vocal range",
        tag: "rock"
      },
      {
        title: "Hozier",
        url: "https://open.spotify.com/artist/2W8Dc3mbuRxy9WhN17S6S9",
        note: "folky, soulful, and poetically devastating",
        tag: "folk"
      }
    ]
  },
  {
    id: "tv",
    name: "TV Shows",
    subtitle: "shows i recommend to everyone",
    bg: "var(--terracotta)",
    fg: "var(--paper)",
    items: [
      {
        title: "Sense8",
        url: "https://www.imdb.com/title/tt2431438/",
        note: "a beautiful, global connection of souls",
        tag: "sci-fi"
      },
      {
        title: "The 100",
        url: "https://www.imdb.com/title/tt2661044/",
        note: "may we meet again",
        tag: "dystopian"
      },
      {
        title: "Good Girls",
        url: "https://www.imdb.com/title/tt6451050/",
        note: "suburban moms turned criminal masterminds",
        tag: "comedy"
      },
      {
        title: "Off Campus",
        url: "https://www.imdb.com/title/tt31608674/",
        note: "green flag university hockey drama at its best",
        tag: "romance"
      },
      {
        title: "Severance",
        url: "https://www.imdb.com/title/tt11280740/",
        note: "work-life balance as a psychological thriller",
        tag: "sci-fi"
      },
      {
        title: "Buffy the Vampire Slayer",
        url: "https://www.imdb.com/title/tt0118276/",
        note: "the chosen one, the slayer, the icon",
        tag: "supernatural"
      },
      {
        title: "Teen Wolf",
        url: "https://www.imdb.com/title/tt1567432/",
        note: "protect those who cannot protect themselves",
        tag: "supernatural"
      }
    ]
  },
  {
    id: "youtube",
    name: "YouTube",
    subtitle: "channels i actually finish watching",
    bg: "var(--coral)",
    fg: "var(--ink)",
    items: [
      {
        title: "struthless",
        url: "https://youtube.com/@struthless",
        note: "big weird stories, hopefully good ones",
        tag: "storytelling"
      },
      {
        title: "leena norms",
        url: "https://youtube.com/@leenanorms",
        note: "gumption, sustainability, and life advice",
        tag: "lifestyle"
      }
    ]
  }
];
