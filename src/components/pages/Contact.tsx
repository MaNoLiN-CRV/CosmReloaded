import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto pb-20">
      <div className="relative mb-16 fade-in">
        <div className="glass-card text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
            // Get In Touch
          </h2>

          <p className="text-lg text-[var(--mist)] mb-8 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something amazing.
          </p>

          <a href="mailto:felixcaba@proton.me" className="inline-block px-8 py-4 rounded-full glass-button text-[var(--ac-primary)] hover:text-[var(--accent-blush)]">
            felixcaba@proton.me
          </a>

          {/* Social links */}
          <div className="mt-12 flex justify-center space-x-6">
            <a href="https://x.com/cosmites" className="p-3 bg-[rgba(230,107,117,0.15)] rounded-full text-[var(--accent-ember)] hover:bg-[rgba(230,107,117,0.25)] transition-all">
              {/* Twitter/X icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/cosmit.es/"
              className="p-3 bg-[rgba(245,215,110,0.15)] rounded-full text-[var(--accent-honey)] hover:bg-[rgba(245,215,110,0.25)] transition-all"
              aria-label="Instagram"
            >
              {/* Instagram */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

