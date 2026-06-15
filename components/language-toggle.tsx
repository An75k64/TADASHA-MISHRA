"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // Check if the googtrans cookie exists and is set to hindi
    const cookies = document.cookie.split("; ");
    const googtrans = cookies.find((c) => c.startsWith("googtrans="));
    if (googtrans && googtrans.includes("/hi")) {
      setLang("hi");
    }
  }, []);

  const switchLanguage = (newLang: string) => {
    if (newLang === lang) return;
    setLang(newLang);
    
    // Set cookies for Google Translate for both root and current domain to ensure it catches
    document.cookie = `googtrans=/en/${newLang}; path=/`;
    document.cookie = `googtrans=/en/${newLang}; domain=${window.location.hostname}; path=/`;
    
    // Trigger Google Translate script instantly without reloading the page
    const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (selectElement) {
      selectElement.value = newLang;
      selectElement.dispatchEvent(new Event("change"));
    } else {
      // Fallback if the widget hasn't fully loaded
      window.location.reload();
    }
  };

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
      <div className="group relative flex items-center rounded-full border border-white/40 bg-white/60 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500 hover:bg-white/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-navy/5 via-transparent to-navy/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icon removed as requested */}

        {/* Animated Segmented Control */}
        <div className="relative ml-2 flex w-[124px] items-center rounded-full bg-black/5 p-1 shadow-inner ring-1 ring-black/5">
          {/* Sliding Active Background */}
          <div 
            className={`absolute bottom-1 top-1 w-[58px] rounded-full bg-gradient-to-tr from-navy to-[#1e3a8a] shadow-[0_2px_8px_rgba(13,42,82,0.3)] transition-all duration-500 ease-out ${
              lang === "en" ? "left-1" : "left-[62px]"
            }`}
          />
          
          <button
            onClick={() => switchLanguage("en")}
            className={`relative z-10 w-1/2 py-1 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 ${
              lang === "en" ? "text-white" : "text-navy/60 hover:text-navy"
            }`}
          >
            Eng
          </button>
          
          <button
            onClick={() => switchLanguage("hi")}
            className={`relative z-10 w-1/2 py-1 text-[13px] font-black tracking-widest transition-colors duration-300 ${
              lang === "hi" ? "text-white" : "text-navy/60 hover:text-navy"
            }`}
          >
            हिन्दी
          </button>
        </div>
        
      </div>
    </div>
  );
}
