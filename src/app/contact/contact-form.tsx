'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { AlertCircle, Loader2 } from 'lucide-react';
import { services } from '@/data/services';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  services: z.array(z.string()).min(1, 'Please choose at least one service.'),
  budget: z.string().min(1, 'Please choose a budget range.'),
  timeline: z.string().min(1, 'Please choose a timeline.'),
  message: z.string().trim().min(10, 'Please tell us a little more (at least 10 characters).'),
  fileLink: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/.+/.test(value),
      'Please enter a full link starting with http:// or https://.',
    ),
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const BUDGETS = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
  'Not sure yet',
];

const TIMELINES = ['As soon as possible', 'Within 1 month', '1–3 months', 'Just exploring'];

const inputClass =
  'w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm focus:border-royal focus:outline-2 focus:outline-royal dark:border-white/20 dark:bg-white/5';
const labelClass = 'mb-1.5 block text-sm font-semibold';
const errorClass = 'mt-1 text-sm font-medium text-red-600 dark:text-red-400';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      services: [],
      budget: '',
      timeline: '',
      message: '',
      fileLink: '',
      website: '',
    },
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<string | null>(null);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('idle');
    setToast(null);
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormValues | undefined;
        if (field) setError(field, { message: issue.message });
      }
      return;
    }
    // Honeypot: bots fill the hidden "website" field — pretend success, send nothing.
    if (result.data.website) {
      setStatus('success');
      return;
    }
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...result.data, source: 'contact-page' }),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setStatus('success');
      setToast('Message sent — we will reply within one working day.');
    } catch {
      setStatus('error');
      setToast('Something went wrong sending your message. Please try again or message us on WhatsApp.');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-3xl border border-ink/10 bg-white p-8 text-center dark:border-white/10 dark:bg-white/5"
      >
        <motion.svg
          viewBox="0 0 80 80"
          className="mx-auto h-20 w-20"
          initial="hidden"
          animate="visible"
          aria-hidden="true"
        >
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#0b4da2"
            strokeWidth="4"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1, transition: { duration: 0.6 } },
            }}
          />
          <motion.path
            d="M25 41 L36 52 L56 30"
            fill="none"
            stroke="#0b4da2"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1, transition: { duration: 0.5, delay: 0.5 } },
            }}
          />
        </motion.svg>
        <h2 className="mt-6 font-display text-2xl font-bold">Message sent</h2>
        <p className="mx-auto mt-2 max-w-md text-ink/70 dark:text-white/70">
          Thank you — we have your message and will reply within one working day,
          usually much faster.
        </p>
        {toast && (
          <p className="mt-4 rounded-full bg-mist px-4 py-2 text-sm font-semibold text-navy dark:bg-white/10 dark:text-white">
            {toast}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your name *
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            className={inputClass}
            {...register('name')}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            {...register('email')}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone / WhatsApp
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            {...register('phone')}
          />
        </div>
        <div>
          <label htmlFor="contact-company" className={labelClass}>
            Company
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            {...register('company')}
          />
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className={labelClass}>What do you need? *</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <label
              key={service.slug}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold has-checked:border-royal has-checked:bg-royal/10 has-checked:text-royal focus-within:outline-2 focus-within:outline-royal dark:border-white/20"
            >
              <input
                type="checkbox"
                value={service.title}
                className="accent-royal"
                {...register('services')}
              />
              {service.title}
            </label>
          ))}
        </div>
        {errors.services && <p className={errorClass}>{errors.services.message}</p>}
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-budget" className={labelClass}>
            Budget range *
          </label>
          <select id="contact-budget" className={inputClass} {...register('budget')}>
            <option value="">Choose a range…</option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
          {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-timeline" className={labelClass}>
            Timeline *
          </label>
          <select id="contact-timeline" className={inputClass} {...register('timeline')}>
            <option value="">Choose a timeline…</option>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
          {errors.timeline && <p className={errorClass}>{errors.timeline.message}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="contact-message" className={labelClass}>
          Tell us about your project *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className={inputClass}
          placeholder="What does your business do, and what do you need?"
          {...register('message')}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div className="mt-6">
        <label htmlFor="contact-file-link" className={labelClass}>
          Link to a file or brief (optional)
        </label>
        <input
          id="contact-file-link"
          type="url"
          placeholder="https://…"
          className={inputClass}
          {...register('fileLink')}
        />
        {errors.fileLink && <p className={errorClass}>{errors.fileLink.message}</p>}
      </div>

      {/* Honeypot — hidden from people, visible to bots. */}
      <div aria-hidden="true" className="absolute h-0 overflow-hidden opacity-0">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {status === 'error' && toast && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/50 dark:text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {toast}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white transition hover:bg-royal disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal sm:w-auto"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
      <p className="mt-3 text-xs text-ink/50 dark:text-white/50">
        By sending this form you agree to be contacted about your enquiry. See our{' '}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
