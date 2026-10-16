'use client'

import { useState } from 'react'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { contactConfig } from '@/lib/content'
import { cn } from '@/lib/utils'

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter your name')
    .max(100, 'Name must be under 100 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address')
    .email('Enter an email address like name@example.com')
    .max(100, 'Email must be under 100 characters'),
  message: z
    .string()
    .trim()
    .min(10, 'Tell me a little more (at least 10 characters)')
    .max(2000, 'Message must be under 2000 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

// ============================================================================
// CONTACT PAGE
// ============================================================================

export default function ContactPage() {
  return (
    <div className="frame pb-24 pt-28 sm:pb-32 sm:pt-36">
      <h1 className="title-card text-[clamp(4.5rem,14vw,12rem)]">Contact</h1>

      <div className="mt-12 grid gap-16 border-t border-line pt-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="max-w-measure text-2xl font-medium leading-snug">
            Tell me about your project: what it is, when it shoots and what you need from me.
          </p>
          <p className="mt-10 text-mute">Email me directly</p>
          <a
            href={`mailto:${contactConfig.email}`}
            className="title-card mt-2 block text-4xl normal-case [overflow-wrap:anywhere] hover:opacity-70 sm:text-5xl"
          >
            {contactConfig.email}
          </a>
          <p className="mt-10 text-mute">Based in London, UK</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'failed'>('idle')

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
    setStatus('idle')
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        contactConfig.serviceId,
        contactConfig.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: 'New message from georgekkr.github.io',
          message: data.message,
          to_name: 'George Kelly',
        },
        contactConfig.userId
      )
      setStatus('sent')
      reset()
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus('failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <Field id="name" label="Name" error={errors.name?.message}>
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...fieldProps(register('name'), errors.name?.message)}
        />
      </Field>

      <Field id="email" label="Email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...fieldProps(register('email'), errors.email?.message)}
        />
      </Field>

      <Field id="message" label="Message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={6}
          {...fieldProps(register('message'), errors.message?.message)}
          className={cn(fieldClass(errors.message?.message), 'resize-y')}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <button type="submit" disabled={isSubmitting} className="button button-solid disabled:opacity-60">
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
        <p role="status" aria-live="polite" className="text-screen/85">
          {status === 'sent' && 'Message sent. I’ll reply by email.'}
          {status === 'failed' && (
            <>
              The message didn’t send. Email me at{' '}
              <a href={`mailto:${contactConfig.email}`} className="text-link">
                {contactConfig.email}
              </a>{' '}
              instead.
            </>
          )}
        </p>
      </div>
    </form>
  )
}

function fieldClass(error?: string) {
  return cn(
    'w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-screen outline-none transition-colors',
    'focus:border-screen focus-visible:outline-none',
    error ? 'border-[#FF8A80]' : 'border-line hover:border-mute'
  )
}

function fieldProps(registration: UseFormRegisterReturn, error?: string) {
  return {
    ...registration,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${registration.name}-error` : undefined,
    className: fieldClass(error),
  }
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-mute">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#FF8A80]">
          {error}
        </p>
      )}
    </div>
  )
}
