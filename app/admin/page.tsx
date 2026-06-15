"use client";

import React, { useState } from "react";
import { Container } from "@/components/container";
import { Upload, Plus, Edit2, Trash2, LogOut, Image as ImageIcon, FileText, Settings, LayoutDashboard, Briefcase, Mail, Home, User } from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Home Settings State
  const [homeSettings, setHomeSettings] = useState({
    headline: "Tadasha Mishra",
    designation: "DIRECTOR GENERAL OF POLICE, JHARKHAND",
    description: "First woman to lead Jharkhand Police, focused on strengthening accountability, public trust, and effective policing systems.",
  });

  // About Settings State
  const [aboutSettings, setAboutSettings] = useState({
    introText1: "Tadasha Mishra is a 1994 batch Indian Police Service officer serving as the Director General of Police, Jharkhand, and the first woman to lead the state police.",
    introText2: "Her professional identity blends operational leadership, investigative discipline, and institutional reform across more than three decades of service.",
    biographyHeading: "A 1994 batch Indian Police Service officer, Tadasha Mishra has built a distinguished career spanning field operations, district leadership, and senior command roles across Bihar and Jharkhand.",
    biographyText: "She has held key positions including Additional Director General of Police and Special Director General of Police, CID.",
    biographyMore1: "With deep experience in investigations, intelligence coordination, and operational command.",
    biographyMore2: "As Director General of Police, Jharkhand, she focuses on investigation quality, accountability, and strong coordination across units.",
    biographyMore3: "Her leadership reflects a belief in combining operational discipline with institutional collaboration.",
    approach: "Focus on investigative integrity, procedural discipline, and inter-agency coordination with evidence-based policing.",
    vision: "Build a policing system defined by accountability, investigative excellence, and public trust.",
  });
  const [isEditingAbout, setIsEditingAbout] = useState<'intro' | 'biography' | 'approach' | null>(null);

  // Work Settings State
  const [workSettings, setWorkSettings] = useState({
    keyAreas: [
      { title: "Investigation Quality & Accountability", description: "Strengthening procedural discipline and improving investigation standards across departments." },
      { title: "Cyber Security & Digital Policing", description: "Expanding cybercrime units and digital forensics capabilities to address emerging threats." },
      { title: "Organized Crime & Intelligence Coordination", description: "Enhancing intelligence sharing and inter-agency collaboration for proactive crime prevention." },
      { title: "Community Policing & Public Trust", description: "Reinforcing citizen engagement, transparency, and confidence in law enforcement." },
    ],
    highlights: [
      { title: "Case Solving Initiatives", description: "Successful high-profile investigations and case closures." },
      { title: "Cyber Crime Units", description: "Advanced cyber labs and anti-hacking operations." },
      { title: "Major Crime Busts", description: "Crackdowns on organized crime syndicates." },
      { title: "Community Outreach Programs", description: "Awareness campaigns and citizen engagement drives." },
    ],
  });
  const [isEditingWork, setIsEditingWork] = useState<{ section: 'keyAreas' | 'highlights'; index: number } | null>(null);
  const [newWorkItem, setNewWorkItem] = useState({ title: '', description: '' });

  // Contact Settings State
  const [contactSettings, setContactSettings] = useState({
    email: "tadashamishraofficial@gmail.com",
    address: "Police Headquarters, Ranchi, Jharkhand",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  // Load settings on mount
  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        const [home, about, contact] = await Promise.all([
          fetch('/api/admin/settings?key=home').then(r => r.json()),
          fetch('/api/admin/settings?key=about').then(r => r.json()),
          fetch('/api/admin/settings?key=contact').then(r => r.json()),
        ]);
        if (home) setHomeSettings(home);
        if (about) setAboutSettings(prev => ({ ...prev, ...about }));
        if (contact) setContactSettings(contact);
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    loadSettings();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "digital.team" && password === "TadaSha@2026") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setActiveTab("home");
    setEditingImage(null);
    setIsUploadingImage(false);
  };

  const handleSaveHomeSettings = async () => {
    try {
      console.log('Saving home settings:', homeSettings);
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'home', value: homeSettings })
      });
      
      const data = await res.json();
      console.log('Response:', { status: res.status, data });
      
      if (res.ok) {
        alert('Home settings saved successfully!');
        // Reload the settings to confirm they were saved
        const reloadRes = await fetch('/api/admin/settings?key=home');
        const reloadData = await reloadRes.json();
        console.log('Reloaded settings:', reloadData);
        if (reloadData) setHomeSettings(reloadData);
      } else {
        alert(`Error saving home settings: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error saving home settings:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleSaveAboutSettings = async () => {
    try {
      console.log('Saving about settings:', aboutSettings);
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'about', value: aboutSettings })
      });
      
      const data = await res.json();
      console.log('Response:', { status: res.status, data });
      
      if (res.ok) {
        alert('About settings saved successfully!');
        const reloadRes = await fetch('/api/admin/settings?key=about');
        const reloadData = await reloadRes.json();
        console.log('Reloaded settings:', reloadData);
        if (reloadData) setAboutSettings(reloadData);
      } else {
        alert(`Error saving about settings: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error saving about settings:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleSaveContactSettings = async () => {
    try {
      console.log('Saving contact settings:', contactSettings);
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'contact', value: contactSettings })
      });
      
      const data = await res.json();
      console.log('Response:', { status: res.status, data });
      
      if (res.ok) {
        alert('Contact settings saved successfully!');
        const reloadRes = await fetch('/api/admin/settings?key=contact');
        const reloadData = await reloadRes.json();
        console.log('Reloaded settings:', reloadData);
        if (reloadData) setContactSettings(reloadData);
      } else {
        alert(`Error saving contact settings: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error saving contact settings:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Timeline Data
  const [timeline, setTimeline] = useState<{id: number; year: string; title: string; description: string; focus: string; details: string[]}[]>([]);
  const [isAddingTimeline, setIsAddingTimeline] = useState(false);
  const [editingTimelineId, setEditingTimelineId] = useState<number | null>(null);
  const [newTimeline, setNewTimeline] = useState({ year: "", title: "", description: "", focus: "", detailsText: "" });


  // Articles from DB
  const [articles, setArticles] = useState<{id: number; slug: string; title: string; date: string; excerpt: string; category: string; content: string[]; externalLinks: {label: string; href: string}[]}[]>([]);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [newArticle, setNewArticle] = useState({
    title: "", date: "", excerpt: "", category: "Public Service",
    contentText: "", linkLabel: "", linkHref: ""
  });

  // Messages from DB
  const [messages, setMessages] = useState<{id: number; name: string; email: string; subject: string; message: string; date: string; read: boolean}[]>([]);

  // Fetch articles on mount
  React.useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setArticles(data); })
      .catch(err => console.error('Failed to load articles:', err));
  }, []);

  // Fetch timeline on mount
  React.useEffect(() => {
    fetch('/api/timeline')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setTimeline(data); })
      .catch(err => console.error('Failed to load timeline:', err));
  }, []);

  // Fetch messages on mount
  React.useEffect(() => {
    fetch('/api/contact/messages')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setMessages(data); })
      .catch(() => {});
  }, []);

  const handleAddOrUpdateArticle = async () => {
    if (!newArticle.title || !newArticle.date || !newArticle.excerpt) {
      alert("Please fill in title, date, and excerpt.");
      return;
    }
    try {
      const content = newArticle.contentText.split('\n\n').filter(p => p.trim());
      const externalLinks = newArticle.linkLabel && newArticle.linkHref
        ? [{ label: newArticle.linkLabel, href: newArticle.linkHref }]
        : [];
        
      const method = editingArticleId ? 'PUT' : 'POST';
      const body = {
        ...(editingArticleId ? { id: editingArticleId } : {}),
        title: newArticle.title,
        date: newArticle.date,
        excerpt: newArticle.excerpt,
        category: newArticle.category,
        content,
        externalLinks,
      };

      const res = await fetch('/api/articles', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        const saved = await res.json();
        if (editingArticleId) {
          setArticles(prev => prev.map(a => a.id === editingArticleId ? saved : a));
          alert('Article updated successfully!');
        } else {
          setArticles(prev => [...prev, saved]);
          alert('Article added successfully!');
        }
        setNewArticle({ title: '', date: '', excerpt: '', category: 'Public Service', contentText: '', linkLabel: '', linkHref: '' });
        setIsAddingArticle(false);
        setEditingArticleId(null);
      } else {
        const err = await res.json();
        alert(`Error: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving article');
    }
  };

  const handleEditArticle = (article: any) => {
    setNewArticle({
      title: article.title,
      date: article.date,
      excerpt: article.excerpt,
      category: article.category,
      contentText: article.content.join('\n\n'),
      linkLabel: article.externalLinks[0]?.label || "",
      linkHref: article.externalLinks[0]?.href || ""
    });
    setEditingArticleId(article.id);
    setIsAddingArticle(true);
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/articles?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id));
        alert('Article deleted successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting article');
    }
  };

  const handleAddOrUpdateTimeline = async () => {
    if (!newTimeline.year || !newTimeline.title) {
      alert("Please fill in year and title.");
      return;
    }
    try {
      const details = newTimeline.detailsText.split('\n').filter(p => p.trim());
      const method = editingTimelineId ? 'PUT' : 'POST';
      const body = {
        ...(editingTimelineId ? { id: editingTimelineId } : {}),
        year: newTimeline.year,
        title: newTimeline.title,
        description: newTimeline.description,
        focus: newTimeline.focus,
        details,
      };

      const res = await fetch('/api/timeline', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        const saved = await res.json();
        if (editingTimelineId) {
          setTimeline(prev => prev.map(t => t.id === editingTimelineId ? saved : t));
          alert('Timeline entry updated successfully!');
        } else {
          setTimeline(prev => [...prev, saved]);
          alert('Timeline entry added successfully!');
        }
        setNewTimeline({ year: "", title: "", description: "", focus: "", detailsText: "" });
        setIsAddingTimeline(false);
        setEditingTimelineId(null);
      } else {
        const err = await res.json();
        alert(`Error: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving timeline entry');
    }
  };

  const handleEditTimeline = (item: any) => {
    setNewTimeline({
      year: item.year,
      title: item.title,
      description: item.description || "",
      focus: item.focus || "",
      detailsText: item.details.join('\n')
    });
    setEditingTimelineId(item.id);
    setIsAddingTimeline(true);
  };

  const handleDeleteTimeline = async (id: number) => {
    if (!confirm('Are you sure you want to delete this timeline entry?')) return;
    try {
      const res = await fetch(`/api/timeline?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTimeline(prev => prev.filter(t => t.id !== id));
        alert('Timeline entry deleted successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting timeline entry');
    }
  };

  const [gallery, setGallery] = useState<{ id: number, src: string, description?: string, link?: string }[]>([]);

  // Fetch gallery images on mount
  React.useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setGallery(data);
        }
      })
      .catch(err => console.error("Failed to load gallery:", err));
  }, []);

  const [editingImage, setEditingImage] = useState<{ id: number, src: string, description?: string, link?: string } | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadLink, setUploadLink] = useState("");
  const [uploadTags, setUploadTags] = useState<string[]>(["Featured"]);
  const [uploadAlt, setUploadAlt] = useState("");

  const GALLERY_CATEGORIES = ["Featured", "Office", "Meetings", "Ceremony", "Portraits", "Media"];

  const toggleUploadTag = (tag: string) => {
    setUploadTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleUploadGalleryImage = async () => {
    if (!uploadFile) {
      alert("Please select a file first");
      return;
    }
    
    // 1. Upload the file
    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      
      if (!uploadRes.ok || !uploadData.url) {
        throw new Error(uploadData.error || "Failed to upload image");
      }

      // 2. Save the DB record
      const dbRes = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          src: uploadData.url,
          alt: uploadAlt || "Gallery Image",
          description: uploadDesc,
          link: uploadLink,
          tags: uploadTags,
        })
      });

      if (!dbRes.ok) {
        let errText = await dbRes.text();
        throw new Error(`Database save failed: ${errText}`);
      }

      const newImage = await dbRes.json();
      setGallery(prev => [...prev, newImage]);
      setIsUploadingImage(false);
      setUploadFile(null);
      setUploadAlt("");
      setUploadDesc("");
      setUploadLink("");
      setUploadTags(["Featured"]);
      alert("Image uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      alert(`Error uploading image: ${err.message || "Unknown error"}`);
    }
  };

  const handleUpdateGalleryImage = async () => {
    if (!editingImage) return;

    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingImage.id,
          description: editingImage.description,
          link: editingImage.link,
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setGallery(prev => prev.map(img => img.id === updated.id ? updated : img));
        setEditingImage(null);
        alert("Image updated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating image");
    }
  };

  const handleDeleteGalleryImage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setGallery(prev => prev.filter(img => img.id !== id));
        if (editingImage?.id === id) setEditingImage(null);
        alert("Image deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting image");
    }
  };

  if (!isLoggedIn) {
    return (
      <Container className="min-h-[70vh] flex items-center justify-center py-20">
        <style dangerouslySetInnerHTML={{ __html: `header, footer { display: none !important; }` }} />
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-black/5">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>Admin Portal</h1>
            <p className="text-sm text-black/60 mt-2">Sign in to manage website content.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-black/80 mb-1">Username</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] focus:ring-1 focus:ring-[#e8850a] outline-none transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/80 mb-1">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] focus:ring-1 focus:ring-[#e8850a] outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-[#0d2a52] text-white rounded-lg font-semibold tracking-wider uppercase text-sm hover:bg-[#1f3953] transition shadow-md mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
      </Container>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-[#0d2a52] mb-6" style={{ fontFamily: "var(--font-serif)" }}>Home Page Settings</h2>
            <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-black/80 mb-2">Main Headline</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                  value={homeSettings.headline}
                  onChange={(e) => setHomeSettings({...homeSettings, headline: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/80 mb-2">Sub Headline (Designation)</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                  value={homeSettings.designation}
                  onChange={(e) => setHomeSettings({...homeSettings, designation: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/80 mb-2">Hero Description</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                  rows={3} 
                  value={homeSettings.description}
                  onChange={(e) => setHomeSettings({...homeSettings, description: e.target.value})}
                />
              </div>
              <button 
                onClick={handleSaveHomeSettings}
                className="px-6 py-3 bg-[#e8850a] text-white rounded-lg font-semibold tracking-wider uppercase text-xs hover:bg-[#d67809]">
                Save Changes
              </button>
            </div>
          </div>
        );
      
      case "about":
        if (isEditingAbout) {
          return (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>
                  {isEditingAbout === 'intro' ? 'Edit About Section' : isEditingAbout === 'biography' ? 'Edit Biography Section' : 'Edit Approach & Vision'}
                </h2>
                <button onClick={() => setIsEditingAbout(null)} className="px-4 py-2 border border-black/20 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 space-y-6">
                
                {isEditingAbout === 'intro' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-black/80 mb-2">Intro Paragraph 1</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                        rows={3} 
                        value={aboutSettings.introText1}
                        onChange={(e) => setAboutSettings({...aboutSettings, introText1: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black/80 mb-2">Intro Paragraph 2</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                        rows={3} 
                        value={aboutSettings.introText2}
                        onChange={(e) => setAboutSettings({...aboutSettings, introText2: e.target.value})}
                      />
                    </div>
                  </>
                )}

                {isEditingAbout === 'biography' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-black/80 mb-2">Biography Heading (large quote)</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                        rows={3} 
                        value={aboutSettings.biographyHeading}
                        onChange={(e) => setAboutSettings({...aboutSettings, biographyHeading: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black/80 mb-2">Biography Paragraph</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                        rows={2} 
                        value={aboutSettings.biographyText}
                        onChange={(e) => setAboutSettings({...aboutSettings, biographyText: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black/80 mb-2">View More - Paragraph 1</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                        rows={2} 
                        value={aboutSettings.biographyMore1}
                        onChange={(e) => setAboutSettings({...aboutSettings, biographyMore1: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black/80 mb-2">View More - Paragraph 2</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                        rows={2} 
                        value={aboutSettings.biographyMore2}
                        onChange={(e) => setAboutSettings({...aboutSettings, biographyMore2: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black/80 mb-2">View More - Paragraph 3</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                        rows={2} 
                        value={aboutSettings.biographyMore3}
                        onChange={(e) => setAboutSettings({...aboutSettings, biographyMore3: e.target.value})}
                      />
                    </div>
                  </>
                )}

                {isEditingAbout === 'approach' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-black/80 mb-2">Approach Text</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                        rows={2} 
                        value={aboutSettings.approach}
                        onChange={(e) => setAboutSettings({...aboutSettings, approach: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black/80 mb-2">Vision Text</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                        rows={2} 
                        value={aboutSettings.vision}
                        onChange={(e) => setAboutSettings({...aboutSettings, vision: e.target.value})}
                      />
                    </div>
                  </>
                )}

                <button 
                  onClick={async () => {
                    await handleSaveAboutSettings();
                    setIsEditingAbout(null);
                  }}
                  className="px-6 py-3 bg-[#e8850a] text-white rounded-lg font-semibold tracking-wider uppercase text-xs hover:bg-[#d67809]">
                  Save Changes
                </button>
              </div>
            </div>
          );
        }

        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>About Page Settings</h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
              <div className="p-4 border-b border-black/5 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <span className="font-medium block text-[#0d2a52]">About Section</span>
                  <span className="text-xs text-gray-500 mt-1 block max-w-2xl truncate">{aboutSettings.introText1 || 'No content yet'}</span>
                </div>
                <button onClick={() => setIsEditingAbout('intro')} className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium border border-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg"><Edit2 size={14} /> Edit</button>
              </div>
              <div className="p-4 border-b border-black/5 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <span className="font-medium block text-[#0d2a52]">Biography Section</span>
                  <span className="text-xs text-gray-500 mt-1 block max-w-2xl truncate">{aboutSettings.biographyHeading || 'No content yet'}</span>
                </div>
                <button onClick={() => setIsEditingAbout('biography')} className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium border border-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg"><Edit2 size={14} /> Edit</button>
              </div>
              <div className="p-4 border-b border-black/5 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <span className="font-medium block text-[#0d2a52]">Approach and Vision</span>
                  <span className="text-xs text-gray-500 mt-1 block max-w-2xl truncate">{(aboutSettings.approach && aboutSettings.vision) ? 'Configured' : 'No content yet'}</span>
                </div>
                <button onClick={() => setIsEditingAbout('approach')} className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium border border-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg"><Edit2 size={14} /> Edit</button>
              </div>
            </div>
          </div>
        );

      case "career":
        if (isAddingTimeline) {
          return (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>
                  {editingTimelineId ? 'Edit Timeline Entry' : 'Add Timeline Entry'}
                </h2>
                <button onClick={() => { setIsAddingTimeline(false); setEditingTimelineId(null); setNewTimeline({ year: "", title: "", description: "", focus: "", detailsText: "" }); }} className="px-4 py-2 border border-black/20 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Year / Period *</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" placeholder="e.g. 2020 - Present" value={newTimeline.year} onChange={e => setNewTimeline({...newTimeline, year: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Title *</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" placeholder="e.g. Special DGP, CID" value={newTimeline.title} onChange={e => setNewTimeline({...newTimeline, title: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Short Description</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" placeholder="e.g. Ranchi, Jharkhand" value={newTimeline.description} onChange={e => setNewTimeline({...newTimeline, description: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Focus Area</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" placeholder="e.g. CID Leadership" value={newTimeline.focus} onChange={e => setNewTimeline({...newTimeline, focus: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-2">Bullet Points <span className="text-black/40 font-normal">(separate points with new lines)</span></label>
                  <textarea className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" rows={5} placeholder="Write one bullet point per line..." value={newTimeline.detailsText} onChange={e => setNewTimeline({...newTimeline, detailsText: e.target.value})} />
                </div>
                <button onClick={handleAddOrUpdateTimeline} className="px-6 py-3 bg-[#e8850a] text-white rounded-lg font-semibold tracking-wider uppercase text-xs hover:bg-[#d67809]">Save Timeline Entry</button>
              </div>
            </div>
          );
        }

        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>Career Timeline</h2>
              <button onClick={() => setIsAddingTimeline(true)} className="flex items-center gap-2 px-4 py-2 bg-[#0d2a52] text-white rounded-lg text-sm hover:bg-[#1f3953]">
                <Plus size={16} /> Add Timeline Entry
              </button>
            </div>
            {timeline.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-12 text-center">
                <Briefcase size={40} className="mx-auto text-black/20 mb-3" />
                <p className="text-black/50">No timeline entries yet. Click Add Timeline Entry to create one.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
                {timeline.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border-b border-black/5 last:border-0 hover:bg-gray-50">
                    <div>
                      <span className="font-medium block">{item.title}</span>
                      <span className="text-xs text-[#e8850a] font-semibold">{item.year}</span>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleEditTimeline(item)} className="text-blue-600 hover:text-blue-800"><Edit2 size={18} /></button>
                      <button onClick={() => handleDeleteTimeline(item.id)} className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "work":
        if (isAddingArticle) {
          return (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>
                  {editingArticleId ? 'Edit Article' : 'Add New Article'}
                </h2>
                <button onClick={() => { setIsAddingArticle(false); setEditingArticleId(null); setNewArticle({ title: "", date: "", excerpt: "", category: "Public Service", contentText: "", linkLabel: "", linkHref: "" }); }} className="px-4 py-2 border border-black/20 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Article Title *</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" placeholder="e.g. Discipline as the Foundation of Public Duty" value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Date *</label>
                    <input type="date" className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" value={newArticle.date} onChange={e => setNewArticle({...newArticle, date: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Category</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none bg-white" value={newArticle.category} onChange={e => setNewArticle({...newArticle, category: e.target.value})}>
                      <option>Public Service</option>
                      <option>Leadership</option>
                      <option>Philosophy</option>
                      <option>Editorial</option>
                      <option>Policy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Excerpt / Summary *</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" placeholder="Brief summary of the article..." value={newArticle.excerpt} onChange={e => setNewArticle({...newArticle, excerpt: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-2">Full Content <span className="text-black/40 font-normal">(separate paragraphs with blank lines)</span></label>
                  <textarea className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" rows={8} placeholder="Write the full article content here..." value={newArticle.contentText} onChange={e => setNewArticle({...newArticle, contentText: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">External Link Label (Optional)</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" placeholder="e.g. Read on Hindustan Times" value={newArticle.linkLabel} onChange={e => setNewArticle({...newArticle, linkLabel: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">External Link URL (Optional)</label>
                    <input type="url" className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" placeholder="https://..." value={newArticle.linkHref} onChange={e => setNewArticle({...newArticle, linkHref: e.target.value})} />
                  </div>
                </div>
                <button onClick={handleAddOrUpdateArticle} className="px-6 py-3 bg-[#e8850a] text-white rounded-lg font-semibold tracking-wider uppercase text-xs hover:bg-[#d67809]">Save Article</button>
              </div>
            </div>
          );
        }

        if (isEditingWork) {
          const section = isEditingWork.section;
          const idx = isEditingWork.index;
          const isNew = idx === -1;
          const item = isNew ? newWorkItem : workSettings[section][idx];
          const sectionLabel = section === 'keyAreas' ? 'Key Area' : 'Highlight';
          return (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>{isNew ? `Add New ${sectionLabel}` : `Edit ${sectionLabel}`}</h2>
                <button onClick={() => setIsEditingWork(null)} className="px-4 py-2 border border-black/20 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-2">Title</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none"
                    value={item.title}
                    placeholder="Enter title..."
                    onChange={e => {
                      if (isNew) {
                        setNewWorkItem(prev => ({ ...prev, title: e.target.value }));
                      } else {
                        const updated = [...workSettings[section]];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setWorkSettings({ ...workSettings, [section]: updated });
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-2">Description</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none"
                    rows={3}
                    value={item.description}
                    placeholder="Enter description..."
                    onChange={e => {
                      if (isNew) {
                        setNewWorkItem(prev => ({ ...prev, description: e.target.value }));
                      } else {
                        const updated = [...workSettings[section]];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setWorkSettings({ ...workSettings, [section]: updated });
                      }
                    }}
                  />
                </div>
                <button
                  onClick={async () => {
                    let updatedSettings = workSettings;
                    if (isNew) {
                      const updatedSection = [...workSettings[section], { title: newWorkItem.title, description: newWorkItem.description }];
                      updatedSettings = { ...workSettings, [section]: updatedSection };
                      setWorkSettings(updatedSettings);
                    }
                    await fetch('/api/admin/settings', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ key: 'work', value: updatedSettings })
                    });
                    setIsEditingWork(null);
                    setNewWorkItem({ title: '', description: '' });
                    alert('Saved successfully!');
                  }}
                  className="px-6 py-3 bg-[#e8850a] text-white rounded-lg font-semibold tracking-wider uppercase text-xs hover:bg-[#d67809]"
                >
                  {isNew ? 'Add' : 'Save Changes'}
                </button>
              </div>
            </div>
          );
        }

        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>Work</h2>
            </div>

            {/* Key Areas */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8850a]">Key Areas</h3>
              <button onClick={() => setIsEditingWork({ section: 'keyAreas', index: -1 })} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d2a52] text-white rounded-lg text-xs hover:bg-[#1f3953]"><Plus size={13} /> Add</button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden mb-6">
              {workSettings.keyAreas.map((area, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-black/5 last:border-0 hover:bg-gray-50">
                  <div>
                    <span className="font-medium block text-[#0d2a52]">{area.title}</span>
                    <span className="text-xs text-gray-500 mt-1 block max-w-2xl truncate">{area.description}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditingWork({ section: 'keyAreas', index: i })} className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium border border-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg shrink-0"><Edit2 size={14} /> Edit</button>
                    <button 
                      onClick={async () => {
                        if(confirm('Are you sure you want to delete this key area?')) {
                          const updated = workSettings.keyAreas.filter((_, idx) => idx !== i);
                          const newSettings = { ...workSettings, keyAreas: updated };
                          setWorkSettings(newSettings);
                          await fetch('/api/admin/settings', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ key: 'work', value: newSettings })
                          });
                        }
                      }}
                      className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm font-medium border border-red-100 bg-red-50 px-3 py-1.5 rounded-lg shrink-0"
                    ><Trash2 size={14} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8850a]">Highlights</h3>
              <button onClick={() => setIsEditingWork({ section: 'highlights', index: -1 })} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d2a52] text-white rounded-lg text-xs hover:bg-[#1f3953]"><Plus size={13} /> Add</button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden mb-6">
              {workSettings.highlights.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-black/5 last:border-0 hover:bg-gray-50">
                  <div>
                    <span className="font-medium block text-[#0d2a52]">{item.title}</span>
                    <span className="text-xs text-gray-500 mt-1 block max-w-2xl truncate">{item.description}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditingWork({ section: 'highlights', index: i })} className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium border border-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg shrink-0"><Edit2 size={14} /> Edit</button>
                    <button 
                      onClick={async () => {
                        if(confirm('Are you sure you want to delete this highlight?')) {
                          const updated = workSettings.highlights.filter((_, idx) => idx !== i);
                          const newSettings = { ...workSettings, highlights: updated };
                          setWorkSettings(newSettings);
                          await fetch('/api/admin/settings', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ key: 'work', value: newSettings })
                          });
                        }
                      }}
                      className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm font-medium border border-red-100 bg-red-50 px-3 py-1.5 rounded-lg shrink-0"
                    ><Trash2 size={14} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Articles */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8850a]">Articles</h3>
              <button onClick={() => {
                setEditingArticleId(null);
                setNewArticle({ title: "", date: "", excerpt: "", category: "Public Service", contentText: "", linkLabel: "", linkHref: "" });
                setIsAddingArticle(true);
              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d2a52] text-white rounded-lg text-xs hover:bg-[#1f3953]"><Plus size={13} /> Add</button>
            </div>
            {articles.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-8 text-center">
                <FileText size={36} className="mx-auto text-black/20 mb-3" />
                <p className="text-black/50 text-sm">No articles yet. Click Add New to create one.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
                {articles.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border-b border-black/5 last:border-0 hover:bg-gray-50">
                    <div>
                      <span className="font-medium block">{item.title}</span>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-[#e8850a] font-semibold">{item.category}</span>
                        <span className="text-xs text-black/40">{item.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleEditArticle(item)} className="text-blue-600 hover:text-blue-800"><Edit2 size={18} /></button>
                      <button onClick={() => handleDeleteArticle(item.id)} className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );


      case "gallery":
        if (editingImage) {
          return (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>Edit Image Details</h2>
                <button onClick={() => setEditingImage(null)} className="px-4 py-2 border border-black/20 rounded-lg text-sm hover:bg-gray-50">
                  Back to Gallery
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editingImage.src} alt="Preview" className="w-full aspect-square object-cover rounded-xl border border-black/10" />
                  <button className="w-full mt-4 py-2 border border-black/20 rounded-lg text-sm hover:bg-gray-50 flex items-center justify-center gap-2">
                    <Upload size={16} /> Replace Image
                  </button>
                </div>
                <div className="w-full md:w-2/3 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Image Description / Alt Text</label>
                    <textarea 
                      className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                      rows={3} 
                      value={editingImage.description || ""} 
                      onChange={e => setEditingImage({...editingImage, description: e.target.value})}
                      placeholder="Describe the image..." 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Redirect Link (Optional)</label>
                    <input 
                      type="url" 
                      className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                      value={editingImage.link || ""} 
                      onChange={e => setEditingImage({...editingImage, link: e.target.value})}
                      placeholder="https://..." 
                    />
                    <p className="text-xs text-black/50 mt-1">If provided, users clicking this image on the live site will be redirected to this link.</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={handleUpdateGalleryImage} className="px-6 py-3 bg-[#e8850a] text-white rounded-lg font-semibold tracking-wider uppercase text-xs hover:bg-[#d67809]">
                      Save Updates
                    </button>
                    <button onClick={() => handleDeleteGalleryImage(editingImage.id)} className="px-6 py-3 border border-red-200 text-red-600 rounded-lg font-semibold tracking-wider uppercase text-xs hover:bg-red-50 flex items-center gap-2">
                      <Trash2 size={16} /> Delete Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (isUploadingImage) {
          return (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>Upload New Image</h2>
                <button onClick={() => setIsUploadingImage(false)} className="px-4 py-2 border border-black/20 rounded-lg text-sm hover:bg-gray-50">
                  Cancel
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-gray-400 transition cursor-pointer relative overflow-hidden">
                  {uploadFile ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={URL.createObjectURL(uploadFile)} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload size={32} className="mb-2" />
                      <span className="text-sm">Click to select file</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadFile(e.target.files[0]);
                    }
                  }} />
                </div>
                <div className="w-full md:w-2/3 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Image Title / Alt Text</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none"
                      placeholder="e.g. DGP at National Conference"
                      value={uploadAlt}
                      onChange={e => setUploadAlt(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Category <span className="text-black/40 font-normal">(select at least one)</span></label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {GALLERY_CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleUploadTag(cat)}
                          className={[
                            "px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wide transition",
                            uploadTags.includes(cat)
                              ? "bg-[#0d2a52] text-white border-[#0d2a52]"
                              : "bg-white text-[#0d2a52] border-[#0d2a52]/30 hover:border-[#0d2a52]/60"
                          ].join(" ")}
                        >
                          {uploadTags.includes(cat) ? "✓ " : ""}{cat}
                        </button>
                      ))}
                    </div>
                    {uploadTags.length === 0 && (
                      <p className="text-xs text-red-500 mt-1">Please select at least one category.</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Image Description / Story (Optional)</label>
                    <textarea 
                      className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                      rows={4} 
                      placeholder="Write a short description or full story here..." 
                      value={uploadDesc}
                      onChange={e => setUploadDesc(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-2">Full Article Link (Optional)</label>
                    <input 
                      type="url" 
                      className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                      placeholder="https://..." 
                      value={uploadLink}
                      onChange={e => setUploadLink(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleUploadGalleryImage}
                    disabled={uploadTags.length === 0}
                    className="px-6 py-3 bg-[#e8850a] text-white rounded-lg font-semibold tracking-wider uppercase text-xs hover:bg-[#d67809] disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Upload & Save
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#0d2a52]" style={{ fontFamily: "var(--font-serif)" }}>Gallery Management</h2>
              <button onClick={() => setIsUploadingImage(true)} className="flex items-center gap-2 px-4 py-2 bg-[#e8850a] text-white rounded-lg text-sm hover:bg-[#d67809]">
                <Upload size={16} /> Upload Image
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((img) => (
                <div 
                  key={img.id} 
                  className="group relative rounded-xl overflow-hidden bg-gray-100 aspect-square border border-black/10 cursor-pointer"
                  onClick={() => setEditingImage(img)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt="Gallery" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white font-medium flex items-center gap-2"><Edit2 size={16} /> Edit</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-[#0d2a52] mb-6" style={{ fontFamily: "var(--font-serif)" }}>Contact Settings</h2>
            <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-black/80 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                  value={contactSettings.email}
                  onChange={(e) => setContactSettings({...contactSettings, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/80 mb-2">Office Address</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                  value={contactSettings.address}
                  onChange={(e) => setContactSettings({...contactSettings, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-black/5">
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-2">Twitter / X URL</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                    placeholder="https://twitter.com/..." 
                    value={contactSettings.twitter}
                    onChange={(e) => setContactSettings({...contactSettings, twitter: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-2">LinkedIn URL</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                    placeholder="https://linkedin.com/in/..." 
                    value={contactSettings.linkedin}
                    onChange={(e) => setContactSettings({...contactSettings, linkedin: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-2">Instagram URL</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-black/10 focus:border-[#e8850a] outline-none" 
                    placeholder="https://instagram.com/..." 
                    value={contactSettings.instagram}
                    onChange={(e) => setContactSettings({...contactSettings, instagram: e.target.value})}
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveContactSettings}
                className="px-6 py-3 bg-[#e8850a] text-white rounded-lg font-semibold tracking-wider uppercase text-xs hover:bg-[#d67809]">
                Save Changes
              </button>
            </div>

            {/* Received Messages */}
            <h2 className="text-2xl font-semibold text-[#0d2a52] mb-4" style={{ fontFamily: "var(--font-serif)" }}>Received Messages</h2>
            {messages.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-12 text-center">
                <Mail size={40} className="mx-auto text-black/20 mb-3" />
                <p className="text-black/50">No messages received yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-4 border-b border-black/5 last:border-0 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-medium text-[#0d2a52] block">{msg.subject}</span>
                        <div className="flex gap-3 mt-1">
                          <span className="text-xs font-semibold text-[#e8850a]">{msg.name}</span>
                          <span className="text-xs text-black/40">{msg.email}</span>
                          <span className="text-xs text-black/30">{msg.date}</span>
                        </div>
                      </div>
                      {!msg.read && <span className="px-2 py-0.5 bg-[#e8850a] text-white text-[10px] font-bold rounded-full uppercase">New</span>}
                    </div>
                    <p className="mt-2 text-sm text-black/60 leading-relaxed">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "career", label: "Career", icon: <Briefcase size={18} /> },
    { id: "work", label: "Work", icon: <FileText size={18} /> },
    { id: "gallery", label: "Gallery", icon: <ImageIcon size={18} /> },
    { id: "contact", label: "Contact Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f7f2ea] flex">
      <style dangerouslySetInnerHTML={{ __html: `header, footer { display: none !important; }` }} />
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d2a52] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                activeTab === item.id 
                  ? "bg-[#e8850a] text-white" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}
