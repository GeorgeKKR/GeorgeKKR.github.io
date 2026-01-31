'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Play,
  Film,
  Palette,
  Award,
  Mail,
  Sparkles,
  MapPin,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Card, CardContent, CardDescription, CardImage, CardTitle } from '@/components/ui/card'
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { Testimonials } from '@/components/sections/testimonials'
import { Marquee } from '@/components/ui/marquee'
import { ReelCard } from '@/components/ui/reel-card'
import {
  introData,
  getFeaturedWork,
  aboutData,
  contactConfig,
  services,
  featuredReel,
  clients,
  processSteps,
  awards,
  testimonials as testimonialsData,
} from '@/lib/content'
import {
  staggerContainer,
  staggerItem,
  scrollFadeIn,
  scrollFadeInLeft,
  scrollFadeInRight,
} from '@/lib/animations'


export default function HomePage() {
  return (
    <>
      <ScrollProgress color="primary" height={3} position="top" />
      <HeroSection />
      <TrustedBySection />
      <StatsSection />
      <ShowreelSection />
      <FeaturedWorkSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <AboutPreviewSection />
      <AwardsSection />
      <ContactCTASection />
    </>
  )
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  const [displayedText, setDisplayedText] = useState('')
  const roles = useMemo(() => ['Film Producer', 'Creative Director', 'Storyteller'], [])
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const heroSpotlight = getFeaturedWork()[0]

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentRole.length) {
            setDisplayedText(currentRole.slice(0, displayedText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, roleIndex, roles])

  const handleWatchReel = () => {
    const target = document.getElementById('showreel')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Section
      ref={sectionRef}
      spacing="none"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
      animate={false}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-primary-500/5 blur-[120px] animate-float" />
        <div className="absolute -right-[10%] top-[20%] h-[40%] w-[40%] rounded-full bg-accent-500/5 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-[20%] h-[30%] w-[60%] rounded-full bg-white/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8 lg:space-y-10"
            >
              <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3 text-sm font-medium tracking-wide">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  Available for bold projects
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10">
                  <MapPin className="h-3.5 w-3.5 text-white/60" />
                  London · LA · Remote
                </span>
              </motion.div>

              <motion.div variants={staggerItem} className="space-y-2">
                <h1 className="font-display text-6xl font-bold leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
                  George
                  <br />
                  <span className="text-white/40">Kelly</span>
                </h1>

                <div className="flex h-12 items-center sm:h-16">
                  <div className="h-px w-12 bg-white/20 mr-6" />
                  <p className="text-xl font-light text-white/80 sm:text-2xl">
                    {displayedText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      className="ml-1 inline-block h-6 w-0.5 bg-accent-400 sm:h-8"
                    />
                  </p>
                </div>
              </motion.div>

              <motion.p
                variants={staggerItem}
                className="max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl"
              >
                {introData.description}
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <MagneticButton
                  size="xl"
                  variant="primary"
                  iconAfter={<Play className="h-5 w-5 fill-current" />}
                  onClick={handleWatchReel}
                  className="shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  Watch Showreel
                </MagneticButton>
                <Link href="/work">
                  <Button size="xl" variant="outline" className="border-white/20 hover:bg-white/5">
                    View Selected Work
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={staggerItem} className="pt-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">Trusted By</p>
                <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
                  {/* Placeholder logos - replace with actual SVGs if available */}
                  {['Netflix', 'Nike', 'Spotify', 'Vice'].map((brand) => (
                    <span key={brand} className="text-lg font-bold text-white">{brand}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/5] w-full max-w-md ml-auto">
                <div className="absolute inset-0 -rotate-6 rounded-[2rem] bg-white/5 backdrop-blur-3xl" />
                <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-white/5 backdrop-blur-3xl" />
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-dark-800 shadow-2xl">
                  <Image
                    src={introData.image}
                    alt={introData.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 32rem, 80vw"
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />

                  {heroSpotlight && (
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center justify-between border-t border-white/10 pt-6">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-accent-300">Latest Release</p>
                          <p className="mt-1 text-lg font-display font-bold text-white">{heroSpotlight.title}</p>
                        </div>
                        <Link href={`/work#${heroSpotlight.id}`} className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white hover:text-black">
                          <ArrowRight className="h-5 w-5 -rotate-45 transition-transform group-hover:rotate-0" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </motion.div>
    </Section>
  )
}

function TrustedBySection() {
  const marqueeItems = clients.map((client) => (
    <div key={client.name} className="text-left">
      <div className="text-sm font-semibold text-white">{client.name}</div>
      <div className="text-xs text-white/60">{client.sector}</div>
      <div className="text-[11px] uppercase tracking-wider text-white/40">{client.location}</div>
    </div>
  ))

  return (
    <Section spacing="md" className="border-y border-white/5 bg-dark-500/40">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          <Star className="h-4 w-4 text-primary-400" />
          Trusted by forward-thinking teams
        </div>
        <Marquee items={marqueeItems} speed={22} />
      </div>
    </Section>
  )
}

function StatsSection() {
  return (
    <Section spacing="lg" className="border-y border-white/5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="grid grid-cols-2 gap-8 lg:grid-cols-4"
      >
        {aboutData.stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group text-center"
          >
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                className="bg-gradient-to-br from-primary-500 to-primary-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl"
              >
                {stat.value}
              </motion.div>
              <motion.div
                className="absolute -inset-4 rounded-full bg-primary-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                initial={false}
              />
            </div>
            <div className="mt-2 text-sm font-medium text-white/70 sm:text-base">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function ShowreelSection() {
  return (
    <Section spacing="xl" background="accent" id="showreel">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <ReelCard
          title={featuredReel.title}
          description={featuredReel.description}
          videoUrl={featuredReel.videoUrl}
          thumbnail={featuredReel.thumbnail}
          highlights={featuredReel.highlights}
          className="shadow-glow-lg"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
          >
            <Sparkles className="h-4 w-4 text-primary-400" />
            Flagship Reel
          </motion.span>
          <motion.div variants={staggerItem} className="space-y-4">
            <Heading as="h2" size="4xl">
              A cinematic sprint through the last 18 months.
            </Heading>
            <p className="text-lg text-white/70">
              Built for brand leaders who need high-concept storytelling and data-driven production
              discipline. Shot on location across Europe and the US with lean, multi-talented crews.
            </p>
          </motion.div>

          <motion.ul variants={staggerItem} className="space-y-3">
            {[
              'Docu-series, commercials, and music videos in one cohesive language',
              'Practical lighting paired with kinetic camera movement for authentic energy',
              'Remote-friendly workflow with live review rooms for fast stakeholder feedback',
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-white/80">
                <ArrowRight className="mt-1 h-4 w-4 text-primary-400" />
                <span>{line}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={staggerItem}>
            <Link href="/contact">
              <Button size="lg" variant="primary" iconAfter={<ArrowRight className="h-5 w-5" />}>
                Book a collaboration call
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

function FeaturedWorkSection() {
  const featuredWork = getFeaturedWork().slice(0, 6)

  return (
    <Section spacing="xl" id="featured-work">
      <SectionHeader centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeIn}
        >
          <SectionTitle gradient>Featured Work</SectionTitle>
          <SectionSubtitle className="mx-auto mt-4">
            A selection of my most impactful projects across film production, creative direction,
            and cinematography.
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {featuredWork.map((item, index) => (
          <motion.div key={item.id} variants={staggerItem}>
            <Link href={`/work#${item.id}`}>
              <Card
                variant="glass"
                hoverable
                className="group relative h-full cursor-pointer overflow-hidden"
              >
                <div className="absolute right-4 top-4 z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    className="rounded-full bg-primary-500 p-2 shadow-lg"
                  >
                    <Play className="h-4 w-4 fill-white text-white" />
                  </motion.div>
                </div>
                <CardImage
                  src={item.image}
                  alt={item.title}
                  aspectRatio="video"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="relative space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-accent-500/30 bg-accent-500/20 px-2 py-1 text-xs font-medium uppercase tracking-wide text-accent-300">
                      {item.category}
                    </span>
                    <span className="text-xs text-white/50">{item.year}</span>
                  </div>
                  <CardTitle className="transition-colors group-hover:text-primary-400">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  <div className="flex items-center gap-2 pt-2 text-sm font-medium text-accent-400 transition-all group-hover:gap-3 group-hover:text-primary-400">
                    <span>Watch Video</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollFadeIn}
        className="mt-12 flex justify-center"
      >
        <Link href="/work">
          <Button size="lg" variant="outline" iconAfter={<ArrowRight className="h-5 w-5" />}>
            View All Projects
          </Button>
        </Link>
      </motion.div>
    </Section>
  )
}

function ServicesSection() {
  return (
    <Section spacing="xl" background="accent">
      <SectionHeader centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeIn}
        >
          <SectionTitle>What I Do</SectionTitle>
          <SectionSubtitle className="mx-auto mt-4">
            Comprehensive production services from concept to delivery
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {services.map((service, index) => (
          <motion.div key={index} variants={staggerItem}>
            <Card
              variant="glass"
              hoverable
              className="group relative h-full overflow-hidden text-center"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                initial={false}
              />
              <CardContent className="relative z-10 space-y-4">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg group-hover:shadow-xl group-hover:shadow-primary-500/50"
                >
                  <ServiceIcon icon={service.icon} />
                </motion.div>
                <CardTitle
                  as="h3"
                  className="text-xl transition-colors group-hover:text-primary-400"
                >
                  {service.title}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function ProcessSection() {
  return (
    <Section spacing="xl">
      <SectionHeader centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeIn}
        >
          <SectionTitle>Production Method</SectionTitle>
          <SectionSubtitle className="mx-auto mt-4 max-w-3xl">
            A streamlined end-to-end process that keeps creative ambition aligned with delivery
            milestones.
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid gap-6 lg:grid-cols-2"
      >
        {processSteps.map((step) => (
          <motion.div key={step.id} variants={staggerItem} className="h-full">
            <Card
              variant="glass"
              hoverable
              className="flex h-full flex-col border-white/10 bg-dark-500/70 backdrop-blur-lg"
            >
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {step.duration}
                  </span>
                  <span className="text-4xl font-semibold text-primary-400">{step.id}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {step.deliverables.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function TestimonialsSection() {
  return <Testimonials testimonials={testimonialsData} variant="carousel" showRatings />
}

function AboutPreviewSection() {
  return (
    <Section spacing="xl">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeInLeft}
          className="relative"
        >
          <motion.div
            className="absolute -inset-4 rounded-full bg-white/5 opacity-50 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-hard">
            <Image
              src={aboutData.image}
              alt="About George Kelly"
              fill
              sizes="(min-width: 1024px) 32rem, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-400/60 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeInRight}
          className="space-y-6"
        >
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-400">
              About Me
            </span>
            <Heading as="h2" size="4xl" className="mt-2">
              Crafting Stories That Inspire
            </Heading>
          </div>

          <p className="text-lg leading-relaxed text-white/70">{aboutData.description}</p>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="italic leading-relaxed text-white/80">
              &ldquo;{aboutData.philosophy}&rdquo;
            </p>
          </div>

          <Link href="/about">
            <Button size="lg" variant="outline" iconAfter={<ArrowRight className="h-5 w-5" />}>
              Learn More About Me
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  )
}

function AwardsSection() {
  return (
    <Section spacing="xl" background="gradient">
      <SectionHeader centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeIn}
        >
          <SectionTitle gradient>Awards & Highlights</SectionTitle>
          <SectionSubtitle className="mx-auto mt-4 max-w-3xl">
            Recognition from festivals and juries for projects that combined strategic thinking and
            cinematic polish.
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="grid gap-6 md:grid-cols-2"
      >
        {awards.map((item) => (
          <motion.div key={item.title} variants={staggerItem}>
            <Card
              variant="glass"
              className="group relative overflow-hidden border-white/10 bg-dark-500/70 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <CardContent className="relative space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white/10 p-3 text-primary-300">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      {item.festival} · {item.year}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
                <p className="text-white/70">{item.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
                    {item.result}
                  </span>
                  <span>{item.project}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function ContactCTASection() {
  return (
    <Section spacing="xl" background="gradient">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollFadeIn}
        className="relative"
      >
        <motion.div
          className="absolute -inset-8 rounded-full bg-white/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <Card
          variant="glass"
          padding="xl"
          className="relative mx-auto max-w-4xl overflow-hidden border-2 border-white/10 text-center"
        >
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <CardContent className="relative z-10 space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg"
              >
                <Sparkles className="h-8 w-8" />
              </motion.div>
              <Heading as="h2" size="4xl" gradient>
                Let&rsquo;s Create Something Amazing
              </Heading>
              <p className="mx-auto max-w-2xl text-lg text-white/70 sm:text-xl">
                {contactConfig.description}
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="xl" variant="primary" iconAfter={<ArrowRight className="h-5 w-5" />}>
                  Get In Touch
                </Button>
              </Link>
              <a href={`mailto:${contactConfig.email}`}>
                <Button size="xl" variant="outline" iconBefore={<Mail className="h-5 w-5" />}>
                  Email Me
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  )
}



function ServiceIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    Film: <Film className="h-8 w-8" />,
    Palette: <Palette className="h-8 w-8" />,
    Lightbulb: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    Video: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    Camera: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    Briefcase: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  }

  return icons[icon] || <Film className="h-8 w-8" />
}
