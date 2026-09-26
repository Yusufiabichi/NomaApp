import { useState, useRef, useEffect } from 'react';

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ORGANIZATION_TYPES = [
  { value: 'NGO', label: 'NGO / Non‑Profit' },
  { value: 'Development Organization', label: 'Development Organization' },
  { value: 'Impact Investor', label: 'Impact Investor' },
  { value: 'Government Agency', label: 'Government Agency' },
  { value: 'Research Institution', label: 'Research Institution' },
  { value: 'Corporate', label: 'Corporate / Private Sector' },
  { value: 'Foundation', label: 'Foundation' },
  { value: 'Other', label: 'Other' },
];

const PARTNERSHIP_INTERESTS = [
  { value: 'Funding & Investment', label: 'Funding & Investment' },
  { value: 'Technical Collaboration', label: 'Technical Collaboration' },
  { value: 'Research Partnership', label: 'Research Partnership' },
  { value: 'Distribution & Outreach', label: 'Distribution & Outreach' },
  { value: 'Data Sharing', label: 'Data Sharing' },
  { value: 'Pilot Program Support', label: 'Pilot Program Support' },
  { value: 'Strategic Alliance', label: 'Strategic Alliance' },
  { value: 'Other', label: 'Other' },
];

const SDG_OPTIONS = [
  { id: 'SDG 1', label: 'No Poverty' },
  { id: 'SDG 2', label: 'Zero Hunger' },
  { id: 'SDG 8', label: 'Decent Work' },
  { id: 'SDG 9', label: 'Innovation' },
  { id: 'SDG 12', label: 'Responsible Consumption' },
  { id: 'SDG 13', label: 'Climate Action' },
  { id: 'SDG 15', label: 'Life on Land' },
  { id: 'SDG 17', label: 'Partnerships' },
];

const INITIAL_FORM = {
  organizationName: '',
  organizationType: '',
  contactPerson: '',
  email: '',
  phone: '',
  country: '',
  website: '',
  partnershipInterest: '',
  sdgAlignment: [] as string[],
  proposedContribution: '',
  message: '',
};

export default function PartnershipModal({ isOpen, onClose }: PartnershipModalProps) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Reset scroll position on open
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSdg = (sdgId: string) => {
    setFormData((prev) => ({
      ...prev,
      sdgAlignment: prev.sdgAlignment.includes(sdgId)
        ? prev.sdgAlignment.filter((s) => s !== sdgId)
        : [...prev.sdgAlignment, sdgId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, Array.isArray(value) ? value.join(', ') : value);
      });

      const response = await fetch('https://readdy.ai/api/form/d4va0uunfc78pt9tmhg0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(INITIAL_FORM);
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="partnership-title"
      onClick={onClose}
    >
      <div
        className="
          relative w-full bg-white shadow-2xl
          rounded-t-3xl sm:rounded-2xl
          max-w-3xl max-h-[95vh] sm:max-h-[90vh]
          flex flex-col overflow-hidden
          animate-fadeIn
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Sticky Header ─────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 sm:px-8 sm:pt-6 border-b border-gray-100 bg-white/95 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <i className="ri-team-line text-xl sm:text-2xl text-blue-600" />
            </div>
            <div>
              <h2
                id="partnership-title"
                className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight"
              >
                Partnership Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Collaborate with us to transform African agriculture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="
              w-10 h-10 shrink-0 flex items-center justify-center
              text-gray-400 hover:text-gray-700 hover:bg-gray-100
              rounded-full transition-colors
            "
          >
            <i className="ri-close-line text-2xl" />
          </button>
        </div>

        {/* ── Scrollable Body ──────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6"
        >
          <form id="partnership-form" onSubmit={handleSubmit} className="space-y-8">
            {/* ── Section: Organization ─────────────────── */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-l-4 border-blue-500 pl-3">
                Organization Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Organization Name"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Your organization name"
                  required
                />
                <SelectField
                  label="Organization Type"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  options={ORGANIZATION_TYPES}
                  placeholder="Select type"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g., Nigeria"
                  required
                />
                <Field
                  label="Website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
            </section>

            {/* ── Section: Contact ──────────────────────── */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-l-4 border-blue-500 pl-3">
                Contact Person
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field
                  label="Full Name"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 XXX XXX XXXX"
                  required
                />
              </div>
            </section>

            {/* ── Section: Partnership ──────────────────── */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-l-4 border-blue-500 pl-3">
                Partnership Details
              </h3>

              <SelectField
                label="Partnership Interest"
                name="partnershipInterest"
                value={formData.partnershipInterest}
                onChange={handleChange}
                options={PARTNERSHIP_INTERESTS}
                placeholder="Select your interest"
                required
              />

              {/* SDG chips */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SDG Alignment{' '}
                  <span className="text-gray-400 font-normal">
                    (select all that apply)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SDG_OPTIONS.map((sdg) => {
                    const active = formData.sdgAlignment.includes(sdg.id);
                    return (
                      <button
                        key={sdg.id}
                        type="button"
                        onClick={() => toggleSdg(sdg.id)}
                        aria-pressed={active}
                        className={`
                          px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium
                          border transition-all
                          ${
                            active
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
                          }
                        `}
                      >
                        <span className="font-semibold">{sdg.id}</span>
                        <span className="ml-1 opacity-80">{sdg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field
                label="Proposed Contribution"
                name="proposedContribution"
                value={formData.proposedContribution}
                onChange={handleChange}
                placeholder="e.g., Funding, Technology, Network access"
              />

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  rows={4}
                  className="
                    w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    resize-none transition-shadow
                  "
                  placeholder="Tell us about your organization and how you'd like to partner with NomaApp..."
                />
                <div className="flex justify-end mt-1">
                  <span
                    className={`text-xs ${
                      formData.message.length > 450
                        ? 'text-amber-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {formData.message.length}/500
                  </span>
                </div>
              </div>
            </section>

            {/* ── Inline status ─────────────────────────── */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-start gap-2 text-sm">
                <i className="ri-checkbox-circle-line text-xl shrink-0 mt-0.5" />
                <span>
                  Thank you! We'll review your partnership inquiry and get back to you
                  soon.
                </span>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-start gap-2 text-sm">
                <i className="ri-error-warning-line text-xl shrink-0 mt-0.5" />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}
          </form>
        </div>

        {/* ── Sticky Footer ────────────────────────────── */}
        <div className="border-t border-gray-100 bg-white/95 backdrop-blur px-5 sm:px-8 py-4 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onClose}
            className="
              w-full sm:flex-1 px-6 py-3 rounded-full font-semibold text-sm sm:text-base
              border-2 border-gray-300 text-gray-700
              hover:bg-gray-50 active:scale-[0.99] transition-all
            "
          >
            Cancel
          </button>
          <button
            type="submit"
            form="partnership-form"
            disabled={isSubmitting}
            className="
              w-full sm:flex-[2] flex items-center justify-center gap-2
              bg-blue-600 text-white px-6 py-3 rounded-full
              font-semibold text-sm sm:text-base
              hover:bg-blue-700 active:scale-[0.99] transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg shadow-blue-600/20
            "
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin text-lg" />
                Submitting…
              </>
            ) : (
              <>
                <i className="ri-send-plane-line text-lg" />
                Submit Partnership Inquiry
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Small reusable field components
   ────────────────────────────────────────────────────────── */

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="
          w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-shadow
        "
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-shadow cursor-pointer bg-white
        "
      >
        <option value="">{placeholder ?? 'Select…'}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}