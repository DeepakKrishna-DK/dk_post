"use client";
import { useState } from "react";
import { Share2, Copy, Check, X } from "lucide-react";

export default function ShareModal({ title, url }: { title: string, url: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `Check out my latest research paper: "${title}"\n\nRead the full article here: ${url}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 rounded-full text-xs font-bold hover:bg-[#00E5FF]/20 transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" /> Share
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#02060D] border border-white/10 rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-[#7A93B2] hover:text-[#00E5FF] transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-xl font-bold text-white mb-6">Share this Research</h3>
        
        <div className="mb-6">
          <label className="block text-xs font-semibold text-[#00E5FF] mb-2 uppercase tracking-wider">1. Copy Message</label>
          <div className="relative">
            <textarea 
              readOnly 
              value={shareText}
              className="w-full h-28 bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-[#94A3B8] focus:outline-none focus:border-[#00E5FF]/50 resize-none selection:bg-[#00E5FF]/30"
            />
            <button 
              onClick={handleCopy}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00E5FF] text-black font-bold text-xs rounded-md hover:bg-[#00E5FF]/80 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Text"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#00E5FF] mb-2 uppercase tracking-wider">2. Paste & Post</label>
          <div className="grid grid-cols-2 gap-3">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-[#0A66C2]/10 text-[#0A66C2] border border-[#0A66C2]/30 rounded-lg hover:bg-[#0A66C2]/20 transition-colors text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
              LinkedIn
            </a>
            {/* Twitter / X */}
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 3.974H5.078z"/></svg>
              X (Twitter)
            </a>
            {/* Facebook */}
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30 rounded-lg hover:bg-[#1877F2]/20 transition-colors text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
              Facebook
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-[#E1306C]/10 text-[#E1306C] border border-[#E1306C]/30 rounded-lg hover:bg-[#E1306C]/20 transition-colors text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.555.556.899 1.113 1.153 1.772.248.639.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.217 1.79-.465 2.428-.254.66-.598 1.216-1.153 1.772-.556.555-1.113.899-1.772 1.153-.639.248-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.217-2.428-.465-.66-.254-1.216-.598-1.772-1.153-.555-.556-.899-1.113-1.153-1.772-.248-.639-.415-1.363-.465-2.428-.047-1.066-.06-1.405-.06-4.122 0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428.254-.66.598-1.216 1.153-1.772.556-.555 1.113-.899 1.772-1.153.639-.248 1.363-.415 2.428-.465 1.066-.047 1.405-.06 4.122-.06C14.944 2.01 14.605 2 12 2zm0 2.16c-2.673 0-3.007.01-4.06.058-.975.045-1.505.207-1.858.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.883-.344 1.858-.048 1.053-.058 1.387-.058 4.06 0 2.673.01 3.007.058 4.06.045.975.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.883.3 1.858.344 1.053.048 1.387.058 4.06.058 2.673 0 3.007-.01 4.06-.058.975-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.883.344-1.858.048-1.053.058-1.387.058-4.06 0-2.673-.01-3.007-.058-4.06-.045-.975-.207-1.505-.344-1.858-.182-.467-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.883-.3-1.858-.344-1.053-.048-1.387-.058-4.06-.058zM12 6.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.11a2.975 2.975 0 1 1 0-5.95 2.975 2.975 0 0 1 0 5.95zm3.846-6.425a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88z" clipRule="evenodd"/></svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
