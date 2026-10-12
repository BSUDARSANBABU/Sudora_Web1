import React, { useState } from 'react';
import { JobItem, PageView } from '../types';
import { ApplyJobModal } from '../components/Modals';
import { useApp } from '../context/AppContext';

interface CareersViewProps {
  onNavigate: (view: PageView) => void;
}

export const CareersView: React.FC<CareersViewProps> = ({ onNavigate }) => {
  const { jobs } = useApp();
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleApplyClick = (job: JobItem) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  const handleApplySuccess = (jobTitle: string) => {
    setSuccessToast(`Application for ${jobTitle} submitted successfully! Our recruiting team will follow up within 24 hours.`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 5000);
  };

  return (
    <main className="w-full">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <span className="text-body-md font-medium">{successToast}</span>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-on-primary/80 hover:text-on-primary ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-gutter py-20 md:py-32 overflow-hidden bg-gradient-to-b from-surface-container-low via-background to-background">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-space-xs bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-label-sm text-primary mb-space-md font-semibold">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            We are hiring elite talent
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-background max-w-3xl mb-space-md tracking-tight">
            Build Your Career With Us
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-xl">
            Join our elite engineering and product teams building the future of digital platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-space-md">
            <a
              href="#positions"
              className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-lg text-body-md font-body-md font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-space-sm cursor-pointer"
            >
              View Open Positions
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="px-gutter py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-space-sm">
            Why Work With Us
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We provide an environment where brilliant minds can thrive, innovate, and create impactful software solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {/* Benefit Card 1 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">public</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-space-xs font-semibold">
              Remote Friendly
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Work from anywhere in the world with flexible schedules designed to support deep work and life balance.
            </p>
          </div>

          {/* Benefit Card 2 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-space-xs font-semibold">
              Learning &amp; Growth
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Annual education stipends, conference budgets, and mentorship programs to accelerate your professional trajectory.
            </p>
          </div>

          {/* Benefit Card 3 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">groups</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-space-xs font-semibold">
              Great Team
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Collaborate with world-class engineers, designers, and strategists who are passionate about building quality software.
            </p>
          </div>

          {/* Benefit Card 4 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-space-xs font-semibold">
              Flexible Work
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Output-driven culture where you manage your hours to deliver your best work without micro-management.
            </p>
          </div>

          {/* Benefit Card 5 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all group md:col-span-2 lg:col-span-2">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">devices</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-space-xs font-semibold">
              Modern Technology
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Build with cutting-edge stacks, cloud-native infrastructure, and fully automated CI/CD pipelines without legacy baggage.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="px-gutter py-20 bg-surface-container-low/50" id="positions">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-label-sm font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                  Talent Recruiting
                </span>
                <button
                  onClick={() => onNavigate('admin-jobs')}
                  className="text-label-xs text-primary hover:underline flex items-center gap-0.5 font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">edit</span> Manage Careers in Admin CMS
                </button>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-space-sm">
                Open Positions
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Find your next role and join our expanding global squads.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-label-md font-label-md bg-surface-container-high text-on-surface font-semibold">
                {jobs.length} Open Roles
              </span>
              <button
                onClick={() => onNavigate('admin-jobs')}
                className="text-label-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                <span>Post Job in CMS</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-space-md">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-lg"
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-sm flex-wrap">
                    <span className="bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm px-2.5 py-0.5 rounded font-semibold">
                      {job.type}
                    </span>
                    <span className="text-on-surface-variant text-body-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {job.location}
                    </span>
                    <span className="text-on-surface-variant text-body-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">work_history</span>
                      {job.experience}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-background mt-1">
                    {job.title}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant max-w-2xl mt-1">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-surface-container text-on-surface-variant text-label-sm font-label-sm px-2.5 py-1 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="inline-flex items-center justify-center bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary px-5 py-2.5 rounded-lg text-label-md font-label-md font-medium transition-all w-full md:w-auto cursor-pointer"
                  >
                    View Job &amp; Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-gutter py-24 bg-primary text-on-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-container to-primary opacity-80" />
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="font-headline-lg text-headline-lg mb-space-sm text-white">
            Don't See Your Role? Send Your Resume
          </h2>
          <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl mb-space-xl">
            We are always looking for exceptional talent to join our squads.
          </p>
          <button
            onClick={() => {
              setSelectedJob({
                id: 'general-app',
                title: 'General Engineering Application',
                type: 'Full-Time / Contract',
                location: 'Remote',
                experience: 'Open',
                skills: ['Software Engineering', 'Full-Stack', 'Cloud'],
                department: 'General'
              });
              setApplyModalOpen(true);
            }}
            className="bg-surface text-on-surface hover:bg-surface-bright px-8 py-3.5 rounded-lg text-body-md font-body-md font-semibold transition-all shadow-lg cursor-pointer"
          >
            Submit Resume
          </button>
        </div>
      </section>

      {/* Application Modal */}
      <ApplyJobModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        job={selectedJob}
        onApplySuccess={handleApplySuccess}
      />
    </main>
  );
};
