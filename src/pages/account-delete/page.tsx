import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Smartphone,
  Mail,
  Loader2,
  Shield,
  Clock,
  LifeBuoy,
  ChevronRight,
  Send,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
 * API configuration
 * ─────────────────────────────────────────────────────────────── */
const API_BASE_URL = 'http://localhost:3000';
// const API_BASE_URL = 'https://api.nomaapp.com.ng';
const DELETE_REQUEST_ENDPOINT = `${API_BASE_URL}/api/account/delete-request`;

/* ────────────────────────────────────────────────────────────────
 * Types & validation
 * ─────────────────────────────────────────────────────────────── */
type Status = 'idle' | 'submitting' | 'success' | 'error';

type FieldErrors = {
  email?: string;
  confirmed?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Nigerian phone: optional +234 or 0 prefix, then 10 digits
const PHONE_REGEX = /^(\+?234|0)\d{10}$/;

const REASON_MAX = 500;

const isValidIdentifier = (value: string): boolean => {
  const trimmed = value.trim();
  return EMAIL_REGEX.test(trimmed) || PHONE_REGEX.test(trimmed.replace(/\s+/g, ''));
};

const validateEmail = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter the email or phone number linked to your account.';
  if (!isValidIdentifier(trimmed)) {
    return 'Enter a valid email address or Nigerian phone number (e.g. 080XXXXXXXX).';
  }
  return undefined;
};

/* ────────────────────────────────────────────────────────────────
 * Component
 * ─────────────────────────────────────────────────────────────── */
export default function AccountDeleteRequest() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState({ email: false, confirmed: false });

  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll success into view when it appears
  useEffect(() => {
    if (status === 'success') {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  const reasonLength = reason.length;
  const reasonRemaining = REASON_MAX - reasonLength;

  const canSubmit = useMemo(
    () => email.trim().length > 0 && confirmed && status !== 'submitting',
    [email, confirmed, status]
  );

  /* ─────────── handlers ─────────── */
  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setFieldErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      setFieldErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleConfirmToggle = () => {
    const next = !confirmed;
    setConfirmed(next);
    setTouched((prev) => ({ ...prev, confirmed: true }));
    setFieldErrors((prev) => ({
      ...prev,
      confirmed: next ? undefined : 'You must confirm to proceed.',
    }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const errors: FieldErrors = {
      email: validateEmail(email),
      confirmed: !confirmed ? 'You must confirm to proceed.' : undefined,
    };
    setFieldErrors(errors);
    setTouched({ email: true, confirmed: true });

    if (errors.email) {
      emailRef.current?.focus();
      return;
    }
    if (errors.confirmed) return;

    // Ask for final confirmation before firing the destructive request
    setShowConfirm(true);
  };

  const submitRequest = async () => {
    setShowConfirm(false);
    setStatus('submitting');
    setErrorMessage('');
    setReferenceId(null);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch(DELETE_REQUEST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          reason: reason.trim(),
        }),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || (data && data.success === false)) {
        const message =
          data?.error?.message ||
          data?.message ||
          'We could not process your request right now. Please try again.';
        throw new Error(message);
      }

      // Success — capture a reference ID if the backend provides one
      const ref =
        data?.reference ||
        data?.requestId ||
        data?.ticketId ||
        data?.data?.reference ||
        null;

      setReferenceId(ref);
      setStatus('success');
      setEmail('');
      setReason('');
      setConfirmed(false);
      setTouched({ email: false, confirmed: false });
      setFieldErrors({});
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setErrorMessage(
          'The request timed out. Check your connection and please try again.'
        );
      } else if (error instanceof TypeError) {
        setErrorMessage(
          'Could not reach our servers. Check your internet connection and try again.'
        );
      } else {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'
        );
      }
      setStatus('error');
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  /* ─────────── render ─────────── */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Header ─── */}
      <div className="bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 mb-6 text-white/80 hover:text-white transition-colors text-sm font-medium cursor-pointer"
          >
            <ChevronLeft size={18} aria-hidden="true" />
            Back to Home
          </button>

          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-green-300" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wider uppercase text-green-300">
              Account & Privacy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Delete Your NomaApp Account
          </h1>
          <p className="text-green-100 mt-3 text-base sm:text-lg max-w-2xl leading-relaxed">
            We're sorry to see you go. This page explains how to permanently delete
            your NomaApp account and all associated data.
          </p>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Intro */}
        <p className="text-gray-700 text-base sm:text-lg mb-10 leading-relaxed">
          There are two ways to delete your account — pick whichever fits your
          situation. Both result in the same permanent deletion.
        </p>

        {/* ─── Option 1: In-app ─── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-600 p-6 sm:p-8 mb-10">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-green-50 flex items-center justify-center">
              <Smartphone className="text-green-700" size={22} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Option 1 — Delete instantly in the app
                </h2>
                <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                  Fastest
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you can still log in to NomaApp, this is the quickest way to
                permanently delete your account.
              </p>
              <ol className="space-y-3 text-gray-700">
                {[
                  <>Open NomaApp and go to your <strong>Profile</strong> tab</>,
                  <>Tap <strong>Account Settings</strong></>,
                  <>Tap <strong>Delete Account</strong> and confirm</>,
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-gray-500 mt-4 flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                Deletion is processed immediately when done from inside the app.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Option 2: Web form ─── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-amber-50 flex items-center justify-center">
              <Mail className="text-amber-600" size={22} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Option 2 — Request deletion by email
                </h2>
                <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full">
                  If you can't log in
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Lost access to your account? Submit a request below and our support
                team will verify your identity and delete your account and data on
                your behalf.
              </p>
            </div>
          </div>

          {/* Success state */}
          {status === 'success' ? (
            <div
              ref={successRef}
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 p-6"
            >
              <div className="flex gap-4">
                <CheckCircle2
                  className="text-green-600 flex-shrink-0 mt-0.5"
                  size={26}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-green-900 text-lg mb-1">
                    Request received
                  </h3>
                  <p className="text-green-800 text-sm leading-relaxed mb-3">
                    We've received your deletion request. Our team will verify your
                    identity and process it within{' '}
                    <strong>7 business days</strong>. You'll get a confirmation
                    email once it's complete.
                  </p>
                  {referenceId && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-green-200 rounded-lg text-xs">
                      <span className="text-gray-500">Reference:</span>
                      <code className="font-mono font-semibold text-green-900">
                        {referenceId}
                      </code>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-green-200 flex flex-wrap gap-3">
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm font-semibold text-green-800 hover:text-green-900 underline cursor-pointer"
                >
                  Submit another request
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="text-sm font-semibold text-green-800 hover:text-green-900 underline cursor-pointer"
                >
                  Return to home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
              {/* Error banner */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <AlertCircle
                    className="text-red-600 flex-shrink-0 mt-0.5"
                    size={20}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-red-900 text-sm mb-0.5">
                      We couldn't submit your request
                    </h3>
                    <p className="text-red-800 text-sm leading-relaxed">{errorMessage}</p>
                    <button
                      type="button"
                      onClick={submitRequest}
                      className="mt-2 text-sm font-semibold text-red-900 underline cursor-pointer"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}

              {/* Email / phone */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email or phone number linked to your account{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  ref={emailRef}
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  placeholder="you@example.com or 080XXXXXXXX"
                  disabled={status === 'submitting'}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'email-error' : 'email-hint'}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-colors outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500 ${
                    fieldErrors.email
                      ? 'border-red-300 focus:ring-red-400 focus:border-transparent'
                      : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                  }`}
                />
                {fieldErrors.email ? (
                  <p
                    id="email-error"
                    className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle size={13} aria-hidden="true" />
                    {fieldErrors.email}
                  </p>
                ) : (
                  <p id="email-hint" className="mt-1.5 text-xs text-gray-500">
                    We use this to locate your account. It will not be shared.
                  </p>
                )}
              </div>

              {/* Reason */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Reason for leaving{' '}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <span
                    className={`text-xs tabular-nums ${
                      reasonRemaining < 50 ? 'text-amber-600' : 'text-gray-400'
                    }`}
                    aria-live="polite"
                  >
                    {reasonLength}/{REASON_MAX}
                  </span>
                </div>
                <textarea
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value.slice(0, REASON_MAX))}
                  placeholder="Help us improve NomaApp — what could we have done better?"
                  rows={4}
                  maxLength={REASON_MAX}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* Confirmation checkbox */}
              <div
                className={`flex gap-3 p-4 rounded-lg border transition-colors ${
                  fieldErrors.confirmed && touched.confirmed
                    ? 'bg-red-50 border-red-300'
                    : 'bg-red-50/60 border-red-200'
                }`}
              >
                <input
                  type="checkbox"
                  id="confirmed"
                  checked={confirmed}
                  onChange={handleConfirmToggle}
                  disabled={status === 'submitting'}
                  aria-invalid={Boolean(fieldErrors.confirmed)}
                  className="w-5 h-5 mt-0.5 cursor-pointer accent-red-600 flex-shrink-0 disabled:cursor-not-allowed"
                />
                <label
                  htmlFor="confirmed"
                  className="text-sm text-gray-700 cursor-pointer leading-relaxed select-none"
                >
                  I understand this will <strong>permanently delete</strong> my
                  NomaApp account, including my scan history, diagnosis records, and
                  subscription information. This action{' '}
                  <strong>cannot be undone</strong>.
                </label>
              </div>

              {/* Submit row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  aria-busy={status === 'submitting'}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                      Submitting request...
                    </>
                  ) : (
                    <>
                      <Send size={17} aria-hidden="true" />
                      Submit deletion request
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  disabled={status === 'submitting'}
                  className="sm:flex-initial sm:px-6 flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center sm:text-left">
                By submitting, you agree to our{' '}
                <a href="/privacy" className="text-green-700 hover:underline font-medium">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms" className="text-green-700 hover:underline font-medium">
                  Terms of Service
                </a>
                .
              </p>
            </form>
          )}
        </div>

        {/* ─── What happens next ─── */}
        <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
            What happens next
          </h2>
          <ol className="space-y-5">
            {[
              {
                title: 'We verify your identity',
                body: 'Our team checks that the request came from the account owner. We may email you for verification.',
              },
              {
                title: 'Your account is scheduled for deletion',
                body: 'Once verified, your account enters our deletion queue. You will not be able to log in during this window.',
              },
              {
                title: 'Confirmation email sent',
                body: 'You will receive a final confirmation once deletion is complete — usually within 7 business days.',
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  {i < 2 && (
                    <span
                      className="flex-1 w-px bg-green-100 my-1"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="pb-1">
                  <h3 className="font-semibold text-gray-900 mb-0.5">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ─── What gets deleted ─── */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            What gets deleted
          </h2>
          <ul className="space-y-2.5 text-gray-700">
            {[
              'Your profile — name, phone number, email, and account credentials',
              'Crop scan history and AI diagnosis results',
              'Expert consultation cases and messages',
              'Subscription and billing records linked to your account',
              'Push notification preferences and device tokens',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start text-sm sm:text-base">
                <CheckCircle2
                  className="text-green-600 flex-shrink-0 mt-0.5"
                  size={17}
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900 leading-relaxed">
              <strong>Note:</strong> Some information may be retained for a limited
              period where required by law — for example, payment records needed
              for tax or fraud-prevention purposes. This data is not used for any
              other purpose and is deleted once the legal retention period ends.
            </p>
          </div>
        </div>

        {/* ─── Warning ─── */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-900 leading-relaxed">
            <strong>⚠️ This action is permanent.</strong> Once your account is
            deleted, your scan history and case records cannot be recovered.
          </p>
        </div>

        {/* ─── Support fallback ─── */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-2">
            <LifeBuoy size={16} aria-hidden="true" />
            <span>Having trouble? Our team can help.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            <a
              href="mailto:support@nomaapp.com.ng"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Mail size={16} aria-hidden="true" />
              support@nomaapp.com.ng
            </a>
            <a
              href="https://nomaapp.com.ng/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <ChevronRight size={16} aria-hidden="true" />
              Contact page
            </a>
          </div>
        </div>
      </div>

      {/* ─── Confirmation dialog ─── */}
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConfirm(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
              <AlertCircle
                className="text-red-600"
                size={26}
                aria-hidden="true"
              />
            </div>
            <h3
              id="confirm-delete-title"
              className="text-xl font-bold text-gray-900 text-center mb-2"
            >
              Confirm deletion request
            </h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
              This will submit a permanent deletion request for the account linked
              to:
            </p>
            <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
              <code className="text-sm font-mono text-gray-900 break-all">
                {email}
              </code>
            </div>
            <p className="text-xs text-gray-500 text-center mb-6">
              This action cannot be undone.
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-5 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Go back
              </button>
              <button
                type="button"
                onClick={submitRequest}
                className="flex-1 px-5 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                Yes, delete my account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}