import React, { useState } from 'react';
import { JobItem } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GetStartedModalProps extends ModalProps {
  onSubmitted: (details: any) => void;
  defaultMode?: 'hire' | 'start';
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onSubmitted,
  defaultMode = 'start'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Web Development',
    budget: '$10k - $25k',
    timeline: '1-3 months',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitted(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full text-primary text-label-sm font-semibold mb-3">
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
            Enterprise Project Intake
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            {defaultMode === 'hire' ? 'Hire Elite Engineering Talent' : 'Start Your Next Project'}
          </h3>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Tell us about your technical goals. We match you with vetted squads within 48 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Acme Tech Inc."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                Required Capability
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
              >
                <option>Web Development</option>
                <option>Mobile App Development</option>
                <option>UI/UX Design</option>
                <option>Python & Data Backend</option>
                <option>React Frontend</option>
                <option>AI Solutions & LLMs</option>
                <option>Cloud Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                Estimated Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
              >
                <option>$5k - $10k (MVP)</option>
                <option>$10k - $25k (Standard App)</option>
                <option>$25k - $50k (Enterprise Module)</option>
                <option>$50k+ (Dedicated Squad)</option>
              </select>
            </div>
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                Target Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
              >
                <option>Immediate (1-2 weeks)</option>
                <option>1-3 months</option>
                <option>3-6 months</option>
                <option>Flexible / Ongoing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-label-md font-semibold text-on-surface mb-1">
              Brief Project Scope & Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Tell us what you're building, target tech stack, and milestone priorities..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md text-on-surface focus:outline-none focus:border-primary resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-container hover:bg-primary text-on-primary py-3.5 rounded-lg font-medium text-body-md shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Submit Project Scope</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
};

interface ApplyJobModalProps extends ModalProps {
  job: JobItem | null;
  onApplySuccess: (jobTitle: string) => void;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ isOpen, onClose, job, onApplySuccess }) => {
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    github: '',
    portfolio: '',
    yearsExp: '4',
    cover: ''
  });

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplySuccess(job.title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-label-sm font-semibold mb-3">
            {job.type} • {job.location}
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Apply: {job.title}
          </h3>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Join our elite squad. We review applications within 24 business hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Alex Carter"
                value={candidate.name}
                onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={candidate.email}
                onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                GitHub / LinkedIn URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={candidate.github}
                onChange={(e) => setCandidate({ ...candidate, github: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                min="1"
                max="25"
                value={candidate.yearsExp}
                onChange={(e) => setCandidate({ ...candidate, yearsExp: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-label-md font-semibold text-on-surface mb-1">
              Key Technical Achievements or Cover Note
            </label>
            <textarea
              rows={3}
              placeholder="Highlight relevant projects or code repositories..."
              value={candidate.cover}
              onChange={(e) => setCandidate({ ...candidate, cover: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md text-on-surface focus:outline-none focus:border-primary resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 rounded-lg font-medium text-body-md shadow-md transition-all cursor-pointer"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};
