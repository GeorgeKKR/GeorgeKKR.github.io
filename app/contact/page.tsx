'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from '@/components/ui/section'
import { PageWrapper } from '@/components/layout/page-transition'
import { contactConfig, socialLinks } from '@/lib/content'
import { scrollFadeIn, scrollFadeInLeft, scrollFadeInRight } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters')
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

// ============================================================================
// CONTACT PAGE
// ============================================================================

export default function ContactPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <ContactFormSection />
      <ContactInfoSection />
    </PageWrapper>
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  return (
    <Section spacing="lg" className="pt-8 sm:pt-12" background="gradient">
      <SectionHeader centered>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle gradient>Let's Work Together</SectionTitle>
          <SectionSubtitle className="mx-auto mt-4">
            {contactConfig.description}
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>
    </Section>
  )
}

// ============================================================================
// CONTACT FORM SECTION
// ============================================================================

function ContactFormSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: ContactFormData) => {
    setFormState('loading')
    setErrorMessage('')

    try {
      // EmailJS integration
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        contactConfig.serviceId,
        contactConfig.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject || 'New Contact Form Submission',
          message: data.message,
          to_name: 'George Kelly',
        },
        contactConfig.userId
      )

      setFormState('success')
      reset()

      // Reset success state after 5 seconds
      setTimeout(() => {
        setFormState('idle')
      }, 5000)
    } catch (error) {
      console.error('Error sending email:', error)
      setFormState('error')
      setErrorMessage(
        'Failed to send message. Please try again or contact me directly at ' +
        contactConfig.email
      )

      // Reset error state after 5 seconds
      setTimeout(() => {
        setFormState('idle')
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <Section spacing="xl">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column - Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeInLeft}
        >
          <Card variant="glass" padding="xl">
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Name <span className="text-primary-500">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/40',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                      'transition-all duration-200',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/10 hover:border-white/20'
                    )}
                  />
                  <AnimatePresence mode="wait">
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email <span className="text-primary-500">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/40',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                      'transition-all duration-200',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/10 hover:border-white/20'
                    )}
                  />
                  <AnimatePresence mode="wait">
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-white"
                  >
                    Subject <span className="text-white/40 text-xs">(Optional)</span>
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    placeholder="Project Inquiry"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/40',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                      'transition-all duration-200',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      errors.subject
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/10 hover:border-white/20'
                    )}
                  />
                  <AnimatePresence mode="wait">
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white"
                  >
                    Message <span className="text-primary-500">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    placeholder="Tell me about your project..."
                    disabled={isSubmitting}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/40',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                      'transition-all duration-200 resize-none',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/10 hover:border-white/20'
                    )}
                  />
                  <AnimatePresence mode="wait">
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                  iconAfter={
                    isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )
                  }
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {formState === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Message sent successfully!</p>
                        <p className="text-sm text-green-400/70 mt-1">
                          Thank you for reaching out. I'll get back to you as soon as
                          possible.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {formState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Failed to send message</p>
                        <p className="text-sm text-red-400/70 mt-1">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeInRight}
          className="space-y-8"
        >
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
            <p className="text-white/70 leading-relaxed">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach
              out!
            </p>

            <div className="space-y-4">
              {/* Email */}
              <Card variant="glass" padding="md" hoverable>
                <CardContent>
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/30 transition-colors">
                      <Mail className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-sm text-accent-300 group-hover:text-accent-200 transition-colors">
                        {contactConfig.email}
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              {/* Location */}
              <Card variant="glass" padding="md">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Location</h4>
                      <p className="text-sm text-white/60">London, UK</p>
                      <p className="text-sm text-white/60">Available for remote work</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Social Links */}
          {(socialLinks.instagram || socialLinks.linkedin || socialLinks.youtube) && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                Connect With Me
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.instagram && (
                  <SocialButton href={socialLinks.instagram} label="Instagram" />
                )}
                {socialLinks.linkedin && (
                  <SocialButton href={socialLinks.linkedin} label="LinkedIn" />
                )}
                {socialLinks.youtube && (
                  <SocialButton href={socialLinks.youtube} label="YouTube" />
                )}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <Card variant="glass" padding="lg">
            <CardContent className="space-y-4">
              <h4 className="font-semibold text-white">Response Time</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                I typically respond to all inquiries within 24-48 hours. If you haven't
                heard back from me after 48 hours, please feel free to send a follow-up
                message.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}

// ============================================================================
// CONTACT INFO SECTION
// ============================================================================

function ContactInfoSection() {
  return (
    <Section spacing="lg" background="accent">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollFadeIn}
        className="text-center max-w-3xl mx-auto"
      >
        <Card variant="glass" padding="xl" className="border-2 border-white/10">
          <CardContent className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Prefer a Direct Approach?
            </h3>
            <p className="text-white/70 leading-relaxed">
              You can also reach me directly via email at{' '}
              <a
                href={`mailto:${contactConfig.email}`}
                className="text-primary-500 hover:text-primary-400 transition-colors font-medium underline underline-offset-4"
              >
                {contactConfig.email}
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  )
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface SocialButtonProps {
  href: string
  label: string
}

function SocialButton({ href, label }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex items-center justify-center px-4 py-2 rounded-xl',
        'bg-white/5 border border-white/10 text-white/70 text-sm font-medium',
        'hover:bg-white/10 hover:text-white hover:border-white/20',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500'
      )}
      aria-label={label}
    >
      {label}
    </motion.a>
  )
}
