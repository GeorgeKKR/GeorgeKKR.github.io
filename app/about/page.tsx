'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, GraduationCap, Briefcase, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { PageWrapper } from '@/components/layout/page-transition'
import { aboutData, workTimeline, skills, education, getSkillsByCategory } from '@/lib/content'
import { staggerContainer, staggerItem, scrollFadeIn, scrollFadeInLeft } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ============================================================================
// ABOUT PAGE
// ============================================================================

export default function AboutPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <PhilosophySection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <StatsSection />
    </PageWrapper>
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  return (
    <Section spacing="xl" className="pt-8 sm:pt-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scrollFadeInLeft}
        >
          <div className="relative">
            {/* Image container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-hard border border-white/10">
              <Image
                src={aboutData.image}
                alt="George Kelly"
                fill
                priority
                sizes="(min-width: 1024px) 32rem, 80vw"
                className="object-cover"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-6 -right-6 bg-primary-500 text-white px-6 py-4 rounded-2xl shadow-glow font-semibold text-lg"
            >
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                <span>5+ Years</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div variants={staggerItem}>
            <span className="text-sm font-semibold text-accent-400 uppercase tracking-wider">
              About Me
            </span>
            <Heading as="h1" size="5xl" gradient className="mt-2">
              {aboutData.title}
            </Heading>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="text-lg text-white/70 leading-relaxed"
          >
            {aboutData.description}
          </motion.p>

          <motion.div variants={staggerItem}>
            <Card variant="glass" padding="lg">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white">Currently Available</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Open to new projects and collaborations in film production,
                      creative direction, and cinematography.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

// ============================================================================
// PHILOSOPHY SECTION
// ============================================================================

function PhilosophySection() {
  return (
    <Section spacing="lg" background="accent">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollFadeIn}
        className="max-w-4xl mx-auto"
      >
        <Card variant="glass" padding="xl" className="text-center border-2 border-white/10">
          <CardContent className="space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg">
              <Quote className="w-8 h-8" />
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium text-white leading-relaxed italic">
              "{aboutData.philosophy}"
            </blockquote>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  )
}

// ============================================================================
// EXPERIENCE SECTION
// ============================================================================

function ExperienceSection() {
  return (
    <Section spacing="xl">
      <SectionHeader centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeIn}
        >
          <SectionTitle>Experience</SectionTitle>
          <SectionSubtitle className="mx-auto mt-4">
            My journey through the film and creative industry
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="relative max-w-4xl mx-auto"
      >
        {/* Timeline line */}
        <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-accent-500 via-accent-500/50 to-transparent hidden sm:block" />

        <div className="space-y-8">
          {workTimeline.map((job, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Card variant="glass" hoverable className="group">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-glow group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 text-accent-300 font-medium mt-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {job.period}
                          </span>
                        </div>
                      </div>

                      <p className="text-white/70 leading-relaxed">
                        {job.description}
                      </p>

                      {job.highlights && job.highlights.length > 0 && (
                        <ul className="space-y-2 pt-2">
                          {job.highlights.map((highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className="flex items-start gap-2 text-sm text-white/60"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

// ============================================================================
// SKILLS SECTION
// ============================================================================

function SkillsSection() {
  const technicalSkills = getSkillsByCategory('technical')
  const creativeSkills = getSkillsByCategory('creative')
  const softSkills = getSkillsByCategory('soft')

  return (
    <Section spacing="xl" background="accent">
      <SectionHeader centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeIn}
        >
          <SectionTitle>Skills & Expertise</SectionTitle>
          <SectionSubtitle className="mx-auto mt-4">
            Technical proficiency and creative capabilities
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>

      <div className="grid lg:grid-cols-3 gap-8">
        <SkillCategory title="Technical" skills={technicalSkills} color="primary" />
        <SkillCategory title="Creative" skills={creativeSkills} color="accent" />
        <SkillCategory title="Soft Skills" skills={softSkills} color="secondary" />
      </div>
    </Section>
  )
}

interface SkillCategoryProps {
  title: string
  skills: typeof skills
  color: 'primary' | 'accent' | 'secondary'
}

function SkillCategory({ title, skills, color }: SkillCategoryProps) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
    secondary: 'from-accent-400 to-accent-500',
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scrollFadeIn}
    >
      <Card variant="glass" padding="lg" className="h-full">
        <CardContent className="space-y-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="space-y-5">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-white/60">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                    className={cn(
                      'h-full rounded-full bg-gradient-to-r',
                      colorClasses[color]
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ============================================================================
// EDUCATION SECTION
// ============================================================================

function EducationSection() {
  return (
    <Section spacing="xl">
      <SectionHeader centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeIn}
        >
          <SectionTitle>Education</SectionTitle>
          <SectionSubtitle className="mx-auto mt-4">
            Academic foundation in film studies and production
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
      >
        {education.map((edu, index) => (
          <motion.div key={index} variants={staggerItem}>
            <Card variant="glass" hoverable className="h-full group">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-accent-300 font-medium">{edu.institution}</p>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </span>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed text-sm">
                  {edu.description}
                </p>

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start gap-2 text-sm text-white/60"
                        >
                          <Award className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}



// ============================================================================
// STATS SECTION
// ============================================================================

function StatsSection() {
  return (
    <Section spacing="lg" background="gradient">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
      >
        {aboutData.stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <Card variant="glass" padding="lg">
              <CardContent className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-white/70 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
