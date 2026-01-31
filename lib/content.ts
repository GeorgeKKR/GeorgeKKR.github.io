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

export interface IntroData {
  title: string
  subtitle: string
  description: string
  cta: {
    primary: string
    secondary: string
  }
  image: string
}

export interface AboutData {
  title: string
  description: string
  philosophy: string
  image: string
  stats: {
    label: string
    value: string
  }[]
}

export interface WorkTimelineItem {
  title: string
  company: string
  location: string
  period: string
  description: string
  highlights?: string[]
}

export interface Skill {
  name: string
  level: number
  category: 'technical' | 'creative' | 'soft'
}

export interface Service {
  title: string
  description: string
  icon: string
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: 'directed' | 'produced' | 'dop' | 'commercial'
  featured: boolean
  image: string
  videoUrl?: string
  tags: string[]
  year: string
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  description: string
  achievements?: string[]
}

export interface ContactConfig {
  email: string
  description: string
  serviceId: string
  templateId: string
  userId: string
}

export interface SocialLinks {
  instagram?: string
  linkedin?: string
  twitter?: string
  youtube?: string
  github?: string
  vimeo?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating?: number
  image?: string
  projectType?: string
}

export interface ClientLogo {
  name: string
  sector: string
  location?: string
  url?: string
}

export interface Award {
  title: string
  festival: string
  year: string
  result: string
  project: string
  description: string
}

export interface ProcessStep {
  id: string
  title: string
  description: string
  duration: string
  deliverables: string[]
}

export interface Showreel {
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  highlights: {
    label: string
    value: string
  }[]
}

// ============================================================================
// CONTENT DATA
// ============================================================================

export const meta: Meta = {
  title: 'George Kelly | Film Producer & Creative Director',
  description:
    'Award-winning film producer and creative director specializing in feature films, documentaries, and commercials. Based in London with experience across LA and Europe.',
  author: 'George Kelly',
  keywords: [
    'film producer',
    'creative director',
    'filmmaker',
    'video production',
    'documentary',
    'commercial director',
    'cinematography',
    'storytelling',
  ],
  siteUrl: 'https://georgekkr.github.io',
  image: '/img/profile_headshot.webp',
}

export const logoText = 'GEORGE'

export const introData: IntroData = {
  title: 'George Kelly',
  subtitle: 'Film Producer & Creative Director',
  description:
    'I craft compelling visual stories that captivate and inspire. With expertise in production management, creative direction, and cinematography, I bring cinematic visions to life across feature films, documentaries, and commercials.',
  cta: {
    primary: 'View My Work',
    secondary: 'Get In Touch',
  },
  image: '/img/profile_headshot.webp',
}

export const aboutData: AboutData = {
  title: 'About Me',
  description:
    'Aspiring film industry professional with a robust academic background in Film Studies from Queen Mary University of London. Skilled in video editing, production management, and storytelling, seeking to leverage my passion for technology and film to gain hands-on experience and contribute to creative projects.',
  philosophy:
    'I believe in the power of visual storytelling to connect, inspire, and transform. Every frame is an opportunity to capture authentic moments that resonate with audiences and create lasting impact.',
  image: '/img/profile_headshot.webp',
  stats: [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Creative Awards', value: '8' },
    { label: 'Happy Clients', value: '30+' },
  ],
}

export const workTimeline: WorkTimelineItem[] = [
  {
    title: 'Production Manager',
    company: 'Spectrum Labs',
    location: 'Los Angeles, US',
    period: '2022-2023',
    description:
      'Orchestrated filming and editing schedules, ensuring efficient workflow and timely completion of projects. Managed equipment checks and contributor attendance, enhancing production quality and team coordination.',
    highlights: [
      'Managed production schedules for 20+ commercial projects',
      'Coordinated teams of 15+ crew members',
      'Reduced production costs by 15% through efficient resource management',
    ],
  },
  {
    title: 'Creative Director',
    company: 'Nimblebabies',
    location: 'London, UK',
    period: '2021-2022',
    description:
      'Spearheaded the production of high-engagement content, overseeing the creative process from inception to execution. Masterminded the development of content briefs and detailed storyboards.',
    highlights: [
      'Directed 30+ commercial campaigns',
      'Increased client engagement by 40%',
      'Led creative team of 8 professionals',
    ],
  },
  {
    title: 'Assistant Director / Story Producer',
    company: 'Pictures in Motion',
    location: 'London, UK',
    period: '2020-2021',
    description:
      'Assisted in camera setup, rigging processes, and conducted master interviews, contributing to the smooth operation of production sets.',
    highlights: [
      'Supported production of 2 feature documentaries',
      'Conducted 50+ interviews',
      'Managed on-set logistics for crews of 10+',
    ],
  },
  {
    title: 'Film Internship',
    company: 'Chocolate Films',
    location: 'London, UK',
    period: '2019-2020',
    description:
      'Supported filming operations and social media content creation, demonstrating versatility and a keen eye for detail.',
    highlights: [
      'Assisted on 15+ short film productions',
      'Created social media content with 100K+ reach',
      'Learned industry-standard equipment and workflows',
    ],
  },
  {
    title: 'Work Experience Participant',
    company: 'Channel 4',
    location: 'London, UK',
    period: '2019',
    description:
      'Enhanced research abilities, creative writing, presentation skills, and understanding of TV production and commissioning processes.',
    highlights: [
      'Shadowed commissioning executives',
      'Researched content for primetime shows',
      'Attended production meetings and pitch sessions',
    ],
  },
]

export const skills: Skill[] = [
  { name: 'Adobe Premiere Pro', level: 95, category: 'technical' },
  { name: 'Adobe After Effects', level: 90, category: 'technical' },
  { name: 'Final Cut Pro', level: 85, category: 'technical' },
  { name: 'DaVinci Resolve', level: 80, category: 'technical' },
  { name: 'Camera Operation', level: 90, category: 'technical' },
  { name: 'Lighting Design', level: 85, category: 'technical' },
  { name: 'Creative Direction', level: 95, category: 'creative' },
  { name: 'Storytelling', level: 95, category: 'creative' },
  { name: 'Storyboarding', level: 90, category: 'creative' },
  { name: 'Visual Design', level: 85, category: 'creative' },
  { name: 'Project Management', level: 95, category: 'soft' },
  { name: 'Team Leadership', level: 90, category: 'soft' },
  { name: 'Client Relations', level: 90, category: 'soft' },
  { name: 'Time Management', level: 95, category: 'soft' },
  { name: 'Spanish (Native)', level: 100, category: 'soft' },
]

export const services: Service[] = [
  {
    title: 'Film Production',
    description:
      'Full-service film production including pre-production planning, on-set management, and post-production coordination for feature films, documentaries, and commercials.',
    icon: 'Film',
  },
  {
    title: 'Creative Direction',
    description:
      'Comprehensive creative leadership from concept development to final execution, including storyboarding, visual design, and production oversight.',
    icon: 'Palette',
  },
  {
    title: 'Content Development',
    description:
      'Strategic content creation focused on storytelling that resonates with target audiences, combining artistic vision with commercial viability.',
    icon: 'Lightbulb',
  },
  {
    title: 'Video Editing',
    description:
      'Professional post-production services including editing, color grading, sound design, and visual effects to bring your vision to life.',
    icon: 'Video',
  },
  {
    title: 'Cinematography',
    description:
      'Expert cinematography services with a keen eye for composition, lighting, and camera movement to create stunning visual narratives.',
    icon: 'Camera',
  },
  {
    title: 'Production Management',
    description:
      'Efficient production management ensuring projects stay on schedule and budget while maintaining the highest quality standards.',
    icon: 'Briefcase',
  },
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'ready-set-startup',
    title: 'Ready Set StartUP UK - Season 1 Trailer',
    description:
      'Official trailer for Season 1 of Ready Set StartUP UK where I served as assistant director, showcasing the entrepreneurial journey of UK startups.',
    category: 'directed',
    featured: true,
    image: 'https://i.ytimg.com/vi/FI2K2rkOWQM/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=FI2K2rkOWQM',
    tags: ['Documentary', 'TV Series', 'Assistant Director'],
    year: '2021',
  },
  {
    id: 'nimble-commercial',
    title: 'Nimble - Cleaning Made Simple',
    description:
      'Commercial video for Nimble showcasing their innovative products designed to make cleaning easier for busy parents and families.',
    category: 'commercial',
    featured: true,
    image: 'https://i.ytimg.com/vi/Ny5jE-MvLlI/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=Ny5jE-MvLlI',
    tags: ['Commercial', 'Product Video', 'Creative Direction'],
    year: '2022',
  },
  {
    id: 'zigzag',
    title: 'Maximilli3n - ZIGZAG',
    description:
      "Music video for Maximilli3n's track ZIGZAG featuring dynamic visuals, creative direction, and bold cinematography.",
    category: 'directed',
    featured: true,
    image: 'https://i.ytimg.com/vi/SsoEa68Y9qo/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=SsoEa68Y9qo',
    tags: ['Music Video', 'Director', 'Cinematography'],
    year: '2022',
  },
  {
    id: 'bisous',
    title: 'Maximilli3n - BISOUS',
    description:
      "Music video for Maximilli3n's BISOUS with artistic cinematography and emotional storytelling that captures the essence of the track.",
    category: 'directed',
    featured: true,
    image: 'https://i.ytimg.com/vi/y4JQ1uZkVs8/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=y4JQ1uZkVs8',
    tags: ['Music Video', 'Director', 'Visual Storytelling'],
    year: '2022',
  },
  {
    id: 'ted-talk',
    title: 'How To Deliver a TED Talk | Mission Makers',
    description:
      'Mission Makers Podcast episode providing expert insights on TED Talk preparation and delivery, produced with professional quality.',
    category: 'produced',
    featured: true,
    image: 'https://i.ytimg.com/vi/1RxrMKiKdpU/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=1RxrMKiKdpU',
    tags: ['Podcast', 'Producer', 'Educational'],
    year: '2021',
  },
  {
    id: 'purpose',
    title: 'The Power of Purpose | Mission Makers',
    description:
      'Production and direction for Mission Makers Podcast exploring purpose-driven leadership and meaningful work.',
    category: 'produced',
    featured: true,
    image: 'https://i.ytimg.com/vi/0eNVeoN7RJ4/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=0eNVeoN7RJ4',
    tags: ['Podcast', 'Producer', 'Leadership'],
    year: '2021',
  },
  {
    id: 'produce-podcast',
    title: 'How to Produce A Podcast | Mission Makers',
    description:
      'Educational content for Mission Makers Podcast on podcast production techniques, equipment, and best practices.',
    category: 'produced',
    featured: false,
    image: 'https://i.ytimg.com/vi/JMUrpccemKE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=JMUrpccemKE',
    tags: ['Podcast', 'Producer', 'Tutorial'],
    year: '2021',
  },
  {
    id: 'necklace',
    title: 'The Necklace (Short Film)',
    description:
      'A cinematic short film exploring themes of value and perception through a seemingly simple piece of jewelry, showcasing advanced cinematography.',
    category: 'dop',
    featured: true,
    image: 'https://i.ytimg.com/vi/7VuJi3JSBjo/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=7VuJi3JSBjo',
    tags: ['Short Film', 'Director of Photography', 'Narrative'],
    year: '2020',
  },
]

export const portfolioCategories = [
  { name: 'All', value: 'all' },
  { name: 'Directed', value: 'directed' },
  { name: 'Produced', value: 'produced' },
  { name: 'Cinematography', value: 'dop' },
  { name: 'Commercial', value: 'commercial' },
]

export const education: Education[] = [
  {
    degree: 'B.A. Film Studies',
    institution: 'Queen Mary University London',
    location: 'London, UK',
    period: '2020-2023',
    description:
      'Comprehensive study of film theory, history, and production techniques with focus on contemporary cinema and documentary filmmaking.',
    achievements: [
      'First Class Honours',
      'Thesis on Visual Storytelling in Modern Cinema',
      'President of Film Society',
    ],
  },
  {
    degree: 'Digital Filmmaking & Documentary',
    institution: 'Council on International Education Exchange (CIEE)',
    location: 'Sevilla, Spain',
    period: '2018',
    description:
      'Specialized intensive program focusing on documentary filmmaking, digital production techniques, and Spanish cinema.',
    achievements: [
      'Produced award-winning short documentary',
      'Studied under acclaimed Spanish filmmakers',
      'Gained fluency in Spanish film industry practices',
    ],
  },
]

export const contactConfig: ContactConfig = {
  email: 'Georgekelly00@icloud.com',
  description:
    "Interested in collaborating on a project or have questions about my work? I'd love to hear from you. Whether you're looking for a creative director, producer, or cinematographer, let's create something amazing together.",
  serviceId: 'service_wnxzyoi',
  templateId: 'template_paft5r8',
  userId: 'SYxCBvOHFeAdfu_L_',
}

export const socialLinks: SocialLinks = {
  instagram: 'https://instagram.com/georgekelly',
  linkedin: 'https://linkedin.com/in/georgekelly',
  youtube: 'https://youtube.com/@georgekelly',
  vimeo: 'https://vimeo.com/georgekelly',
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc',
    content:
      'Working with George was an absolute pleasure. His creative vision and technical expertise brought our brand story to life in ways we never imagined. The final product exceeded all our expectations.',
    rating: 5,
    projectType: 'Commercial Production',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Marketing Director',
    company: 'Global Media',
    content:
      'George delivered exceptional results on our documentary project. His attention to detail and storytelling ability exceeded all expectations. Highly professional and incredibly talented.',
    rating: 5,
    projectType: 'Documentary',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Creative Producer',
    company: 'Studio Seven',
    content:
      'Professional, creative, and incredibly talented. George transformed our concept into a stunning visual narrative that resonated with our audience. Would absolutely work with him again.',
    rating: 5,
    projectType: 'Music Video',
  },
  {
    id: '4',
    name: 'David Martinez',
    role: 'Founder',
    company: 'Innovation Labs',
    content:
      'George brought our vision to life with precision and creativity. His ability to understand our brand and translate it into compelling visuals was impressive. A true professional.',
    rating: 5,
    projectType: 'Brand Film',
  },
  {
    id: '5',
    name: 'Jennifer Lee',
    role: 'Content Manager',
    company: 'Digital Arts Co',
    content:
      "Outstanding work from start to finish. George's expertise in both creative direction and technical execution made the entire process smooth and enjoyable. The results speak for themselves.",
    rating: 5,
    projectType: 'Commercial',
  },
  {
    id: '6',
    name: 'Alex Thompson',
    role: 'Executive Producer',
    company: 'Apex Films',
    content:
      "George is a rare talent in the industry. His ability to manage complex productions while maintaining artistic integrity is remarkable. We couldn't be happier with the outcome.",
    rating: 5,
    projectType: 'Feature Documentary',
  },
]

export const featuredReel: Showreel = {
  title: '2024 Cinematic Showreel',
  description:
    'A rapid-fire look at my latest commercial, documentary, and narrative collaborations. Shot across London, Los Angeles, and Sevilla with a focus on kinetic camera movement, practical lighting, and emotion-led storytelling.',
  videoUrl: 'https://www.youtube.com/watch?v=FI2K2rkOWQM',
  thumbnail: 'https://i.ytimg.com/vi/FI2K2rkOWQM/maxresdefault.jpg',
  highlights: [
    { label: 'Campaigns', value: '40+' },
    { label: 'Shoot Days', value: '120+' },
    { label: 'Cities', value: '12' },
  ],
}

export const clients: ClientLogo[] = [
  { name: 'Channel 4', sector: 'Broadcast', location: 'London, UK', url: 'https://www.channel4.com' },
  { name: 'Mission Makers', sector: 'Media', location: 'London, UK', url: 'https://www.mission-makers.com' },
  { name: 'Ready Set StartUP', sector: 'Television', location: 'London, UK' },
  { name: 'Spectrum Labs', sector: 'Technology', location: 'Los Angeles, US' },
  { name: 'Nimble Babies', sector: 'Consumer Goods', location: 'London, UK', url: 'https://nimblebabies.com' },
  { name: 'Apex Films', sector: 'Production', location: 'Madrid, Spain' },
  { name: 'Innovation Labs', sector: 'Startups', location: 'Berlin, Germany' },
  { name: 'Studio Seven', sector: 'Creative Agency', location: 'Barcelona, Spain' },
]

export const awards: Award[] = [
  {
    title: 'Emerging Creative Voice',
    festival: 'BFI Future Film Festival',
    year: '2023',
    result: 'Winner',
    project: 'Ready Set StartUP',
    description: 'Recognized for leading the production of a docu-series that blended entrepreneurial tension with cinematic polish.',
  },
  {
    title: 'Best Branded Story',
    festival: 'Cannes Corporate Media & TV Awards',
    year: '2022',
    result: 'Shortlisted',
    project: 'Nimble - Cleaning Made Simple',
    description: 'Highlighted for crafting an emotionally-resonant commercial narrative for a consumer brand launch.',
  },
  {
    title: 'Audience Favorite',
    festival: 'Raindance Film Festival',
    year: '2021',
    result: 'Official Selection',
    project: 'Mission Makers Podcast Series',
    description: 'Praised for innovative remote production workflow and cohesive visual language across episodic content.',
  },
  {
    title: 'Young Producer to Watch',
    festival: 'Royal Television Society',
    year: '2020',
    result: 'Nominee',
    project: 'The Necklace (Short Film)',
    description: 'Celebrated for elevating an indie short with meticulous production planning and art direction.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: '01',
    title: 'Discovery & Narrative Blueprint',
    description:
      'Intensive workshops to uncover the brand truth, emotional hook, and distribution goals. I translate the findings into a cinematic blueprint that keeps strategy and story aligned.',
    duration: '1-2 weeks',
    deliverables: ['Treatment deck', 'Mood films & references', 'Production roadmap'],
  },
  {
    id: '02',
    title: 'Pre-Production Lab',
    description:
      'From casting to location tech scouts, every detail is battle-tested. I build rip-proof schedules and design shot architecture so shoot days stay focused on performance.',
    duration: '2-4 weeks',
    deliverables: ['Shotlists & storyboards', 'Crew & talent management', 'Technical pipeline'],
  },
  {
    id: '03',
    title: 'On-Set Direction',
    description:
      'Lean, decisive sets with an emphasis on collaboration. I combine practical lighting with organic camera movement to capture authentic energy on the day.',
    duration: 'Shoot days',
    deliverables: ['Live look LUTs', 'Daily selects & continuity', 'Client-ready stills'],
  },
  {
    id: '04',
    title: 'Post & Launch',
    description:
      'Editing, grade, sound, and finishing managed in parallel sprints. Every review is structured, with data-backed recommendations for campaign placements.',
    duration: '2-5 weeks',
    deliverables: ['Edits & localized versions', 'Color & audio masters', 'Launch toolkit'],
  },
]

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get featured portfolio items
 */
export function getFeaturedWork(): PortfolioItem[] {
  return portfolioItems.filter((item) => item.featured)
}

/**
 * Get portfolio items by category
 */
export function getWorkByCategory(category: string): PortfolioItem[] {
  if (category === 'all') return portfolioItems
  return portfolioItems.filter((item) => item.category === category)
}

/**
 * Get portfolio item by ID
 */
export function getWorkById(id: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.id === id)
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: Skill['category']): Skill[] {
  return skills.filter((skill) => skill.category === category)
}

/**
 * Get recent work (last 4 items)
 */
export function getRecentWork(): PortfolioItem[] {
  return portfolioItems.slice(0, 4)
}
