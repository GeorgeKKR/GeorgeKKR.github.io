// ============================================================================
// TYPES
// ============================================================================

export interface Meta {
  title: string
  description: string
  author: string
  keywords: string[]
  siteUrl: string
  image: string
}

export interface Film {
  id: string
  title: string
  /** Secondary title line, e.g. the artist or series */
  subtitle?: string
  role: string
  year: string
  description: string
  /** Name used in the credits block when it differs from the title */
  creditName?: string
  image: string
  /** YouTube link to the finished film */
  videoUrl?: string
  /** Footage from set, played instead when the film has no public link yet */
  clip?: { src: string; srcSmall: string }
}

export interface Job {
  role: string
  company: string
  location?: string
  period: string
  description: string
}

export interface Education {
  degree: string
  institution: string
  /** Shorter name for the credits block */
  creditName?: string
  location: string
  period: string
  description: string
}

export interface OnSetPhoto {
  src: string
  alt: string
  caption: string
}

export interface ContactConfig {
  email: string
  serviceId: string
  templateId: string
  userId: string
}

export interface SocialLinks {
  instagram?: string
  linkedin?: string
  youtube?: string
  vimeo?: string
}

// ============================================================================
// CONTENT DATA
// ============================================================================

export const meta: Meta = {
  title: 'George Kelly | Production Assistant & Filmmaker, New York',
  description:
    'George Kelly is a production assistant and filmmaker in New York, working in the AD department, camera and edit, in English and Spanish.',
  author: 'George Kelly',
  keywords: [
    'production assistant',
    'assistant director',
    'AD department',
    'bilingual',
    'Spanish',
    'camera',
    'editor',
    'filmmaker',
    'New York',
  ],
  siteUrl: 'https://georgekkr.github.io',
  image: '/img/profile_headshot.webp',
}

export const intro =
  'Production assistant and filmmaker in New York. AD department, camera and edit, in English and Spanish.'

export const bio = [
  'I studied Film Studies at Queen Mary University of London and have worked on both sides of the camera since. I have run shoot and edit schedules in Los Angeles, led creative for a consumer brand in London, and directed, produced and shot music videos, podcasts and short films. Most recently, I was 3rd AD on Su Mano, a 2025 feature film.',
  'I grew up speaking Spanish and did a documentary program in Sevilla, so I am comfortable working with crews and contributors in either language.',
]

export const philosophy =
  'I believe in the power of visual storytelling to connect, inspire, and transform. Every frame is an opportunity to capture authentic moments that resonate with audiences.'

export const portrait = {
  src: '/img/profile_headshot.webp',
  alt: 'Portrait of George Kelly',
}

export const onSetPhotos: OnSetPhoto[] = [
  {
    src: '/img/camera_work1.webp',
    alt: 'George Kelly operating a Canon cinema camera with a boom-mounted microphone on a tripod',
    caption: 'Setting up a Canon rig for an interview shoot',
  },
  {
    src: '/img/camera_work2.webp',
    alt: 'George Kelly adjusting a Sony cinema camera with a follow-focus and matte box',
    caption: 'Pulling focus on a Sony FS-series camera',
  },
]

/**
 * Behind-the-scenes clip that opens the home page's "Behind the camera"
 * section: three setups from scene 12 of Su Mano, cut into one loop. It opens
 * on 12/5 (the clap) and loops on to 12/3 and 12/4, so it always plays in
 * scene order.
 */
export const setClip = {
  src: '/video/su-mano-scene-12.mp4',
  // Lighter cut for screens narrower than 1024px
  srcSmall: '/video/su-mano-scene-12-720.mp4',
  poster: '/video/su-mano-scene-12.webp',
  production: 'Su Mano',
  label:
    'Behind the scenes on Su Mano: scenes 12/5, 12/3 and 12/4 are slated on location in sunlit plazas',
  /**
   * Each setup ends `until` seconds into the clip. `focus` is the horizontal
   * framing on phones, where the band is cropped to 4:3. Details are read
   * off the slate in each shot.
   */
  setups: [
    { until: 8.2, detail: 'scene 12/5, take 1', focus: '62%' },
    { until: 14.7, detail: 'scene 12/3, take 1', focus: '0%' },
    { until: Infinity, detail: 'scene 12/4, take 2', focus: '0%' },
  ],
}

/** Unit stills from set, shown as a strip under the clip. Width ÷ height sets each frame's shape. */
export const setStills: (OnSetPhoto & { ratio: number })[] = [
  {
    src: '/img/set/monitor-take.webp',
    ratio: 3 / 2,
    alt: 'A crew member in a black cap and earpiece watches a take of a guitarist on a SmallHD monitor',
    caption: 'Watching the take on the monitor',
  },
  {
    src: '/img/set/dolly-crew.webp',
    ratio: 3 / 4,
    alt: 'Crew gathered around a cinema camera with a matte box, mounted on a dolly in a tiled courtyard',
    caption: 'Camera on the dolly between setups',
  },
  {
    src: '/img/set/exterior-village.webp',
    ratio: 3 / 4,
    alt: 'Crew in hi-vis vests by a roadside monitor and director’s chairs under a bright blue sky',
    caption: 'Video village on an exterior day',
  },
  {
    src: '/img/set/monitor-seated.webp',
    ratio: 2 / 3,
    alt: 'A crew member in a black cap sits in a red director’s chair beside a monitor, watching the set',
    caption: 'Waiting on the next setup',
  },
]

/** Most recent first. The first film is the hero's default background. */
export const films: Film[] = [
  {
    id: 'su-mano',
    title: 'Su Mano',
    subtitle: 'Feature film',
    role: '3rd Assistant Director',
    year: '2025',
    // Director's name is read off the slate in the set footage
    description: 'A feature film directed by Angela Medina.',
    // A frame from set, the same one the clip opens on
    image: setClip.poster,
    clip: { src: setClip.src, srcSmall: setClip.srcSmall },
  },
  {
    id: 'zigzag',
    title: 'ZIGZAG',
    subtitle: 'Maximilli3n',
    role: 'Director',
    year: '2022',
    description: "Music video for Maximilli3n's track ZIGZAG.",
    image: 'https://i.ytimg.com/vi/SsoEa68Y9qo/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=SsoEa68Y9qo',
  },
  {
    id: 'bisous',
    title: 'BISOUS',
    subtitle: 'Maximilli3n',
    role: 'Director',
    year: '2022',
    description: "Music video for Maximilli3n's track BISOUS.",
    image: 'https://i.ytimg.com/vi/y4JQ1uZkVs8/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=y4JQ1uZkVs8',
  },
  {
    id: 'nimble-commercial',
    title: 'Cleaning Made Simple',
    subtitle: 'Nimble',
    role: 'Producer',
    year: '2022',
    description:
      'Commercial for Nimble showing products designed to make cleaning easier for parents.',
    image: 'https://i.ytimg.com/vi/Ny5jE-MvLlI/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=Ny5jE-MvLlI',
  },
  {
    id: 'ready-set-startup',
    title: 'Ready Set StartUP UK',
    subtitle: 'Season 1 trailer',
    role: 'Assistant Director',
    year: '2021',
    description: 'Official trailer for the first season of Ready Set StartUP UK.',
    image: 'https://i.ytimg.com/vi/FI2K2rkOWQM/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=FI2K2rkOWQM',
  },
  {
    id: 'ted-talk',
    title: 'How to Deliver a TED Talk',
    subtitle: 'Mission Makers',
    creditName: 'Mission Makers',
    role: 'Producer & Editor',
    year: '2021',
    description: 'Mission Makers podcast episode on preparing and delivering a TED talk.',
    image: 'https://i.ytimg.com/vi/1RxrMKiKdpU/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=1RxrMKiKdpU',
  },
  {
    id: 'purpose',
    title: 'The Power of Purpose',
    subtitle: 'Mission Makers',
    creditName: 'Mission Makers',
    role: 'Producer & Editor',
    year: '2021',
    description: 'Mission Makers podcast episode on purpose-driven leadership.',
    image: 'https://i.ytimg.com/vi/0eNVeoN7RJ4/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=0eNVeoN7RJ4',
  },
  {
    id: 'produce-podcast',
    title: 'How to Produce a Podcast',
    subtitle: 'Mission Makers',
    creditName: 'Mission Makers',
    role: 'Producer & Editor',
    year: '2021',
    description: 'Mission Makers episode on podcast production techniques.',
    image: 'https://i.ytimg.com/vi/JMUrpccemKE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=JMUrpccemKE',
  },
  {
    id: 'necklace',
    title: 'The Necklace',
    subtitle: 'Short film',
    role: 'Director of Photography',
    year: '2020',
    description:
      'A short film about value and perception, told through a seemingly simple piece of jewelry.',
    image: 'https://i.ytimg.com/vi/7VuJi3JSBjo/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=7VuJi3JSBjo',
  },
]

/** Films shown in the home page index */
export const indexFilmIds = [
  'su-mano',
  'zigzag',
  'nimble-commercial',
  'ready-set-startup',
  'purpose',
  'necklace',
]

export const jobs: Job[] = [
  {
    role: '3rd Assistant Director',
    company: 'Su Mano',
    period: '2025',
    description: 'Feature film directed by Angela Medina. Worked on set with the 1st and 2nd ADs.',
  },
  {
    role: 'Production Manager',
    company: 'Spectrum Labs',
    location: 'Los Angeles, US',
    period: '2022–2023',
    description:
      'Ran filming and editing schedules so projects finished on time. Managed equipment checks and contributor attendance.',
  },
  {
    role: 'Intern, then Creative Director',
    company: 'Nimblebabies',
    location: 'London, UK',
    period: '2021–2022',
    description:
      'Led content production from brief to delivery, including writing content briefs and drawing storyboards.',
  },
  {
    role: 'Assistant Director / Story Producer',
    company: 'Pictures in Motion',
    location: 'London, UK',
    period: '2020–2021',
    description: 'Helped with camera setup and rigging, and conducted master interviews on set.',
  },
  {
    role: 'Film Intern',
    company: 'Chocolate Films',
    location: 'London, UK',
    period: '2019–2020',
    description: 'Supported filming and made social media content.',
  },
  {
    role: 'Training',
    company: 'Channel 4',
    location: 'London, UK',
    period: '2019',
    description:
      'Research, writing and pitching, with an introduction to TV production and commissioning.',
  },
]

export const education: Education[] = [
  {
    degree: 'BA Film Studies',
    institution: 'Queen Mary University of London',
    location: 'London, UK',
    period: '2020–2023',
    description: 'Film theory, history and production techniques.',
  },
  {
    degree: 'Digital Filmmaking & Documentary',
    institution: 'Council on International Education Exchange (CIEE)',
    creditName: 'CIEE Sevilla',
    location: 'Sevilla, Spain',
    period: '2018',
    description: 'Documentary filmmaking and digital production.',
  },
]

export const skills = [
  'Adobe Creative Suite',
  'Video production and editing',
  'Production management',
  'Storyboarding',
  'Spanish (native)',
]

export const contactConfig: ContactConfig = {
  email: 'George1415352@gmail.com',
  serviceId: 'service_wnxzyoi',
  templateId: 'template_paft5r8',
  userId: 'SYxCBvOHFeAdfu_L_',
}

/** Add real profile URLs here; links only render when set. */
export const socialLinks: SocialLinks = {}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getFilm(id: string): Film | undefined {
  return films.find((film) => film.id === id)
}

export function getIndexFilms(): Film[] {
  return indexFilmIds.map(getFilm).filter((film): film is Film => Boolean(film))
}

/** What selecting a film offers: the film itself, or footage from set when it has no public link */
export function getWatchCue(film: Film): { cue: string; action: string } {
  const name = film.subtitle ? `${film.title}, ${film.subtitle}` : film.title
  return film.videoUrl
    ? { cue: 'Play', action: `Play ${name}` }
    : { cue: 'On set', action: `Watch footage from the set of ${film.title}` }
}

/** Unique roles in the order they first appear */
export function getFilmRoles(): string[] {
  return Array.from(new Set(films.map((film) => film.role)))
}

/** Every credit, films first, then jobs, then study */
export function getCredits(): { role: string; names: string[] }[] {
  const filmCredits = getFilmRoles().map((role) => ({
    role,
    names: Array.from(
      new Set(films.filter((f) => f.role === role).map((f) => f.creditName ?? f.title))
    ),
  }))
  const filmCredited = new Set(
    filmCredits.flatMap((credit) => credit.names.map((name) => `${credit.role}|${name}`))
  )
  const jobCredits = jobs
    .filter((job) => !filmCredited.has(`${job.role}|${job.company}`))
    .map((job) => ({ role: job.role, names: [job.company] }))
  const studyCredits = education.map((ed) => ({
    role: ed.degree,
    names: [ed.creditName ?? ed.institution],
  }))
  return [...filmCredits, ...jobCredits, ...studyCredits]
}
