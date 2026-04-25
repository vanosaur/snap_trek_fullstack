"use client";

import { useState, useEffect } from "react";
import api from "@/utils/api";
import DesktopSidebar from "@/components/DesktopSidebar";
import BottomNav from "@/components/BottomNav";
import { Search, MapPin, DollarSign, Filter, Compass, Sparkles, Wand2 } from "lucide-react";

export default function ExplorePage() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [magicQuery, setMagicQuery] = useState("");
  const [isMagicLoading, setIsMagicLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState("");
  
  const [params, setParams] = useState({
    place: "",
    maxPrice: "",
  });

  const fetchReels = async () => {
    setLoading(true);
    setAiReasoning(""); // Reset AI reasoning when doing manual search
    try {
      const queryParams = new URLSearchParams();
      if (params.place) queryParams.append("place", params.place);
      if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);

      const res = await api.get(`/reels?${queryParams.toString()}`);
      
      if (res.data && res.data.reels) {
        setReels(res.data.reels);
      } else {
        setReels(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch search results", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicQuery.trim()) return;

    setIsMagicLoading(true);
    setLoading(true);
    try {
      const res = await api.post("/ai/search", { query: magicQuery });
      setReels(res.data.reels);
      setAiReasoning(res.data.filters.reasoning);
      
      // Update the regular filters to match what AI found
      setParams({
        place: res.data.filters.place || "",
        maxPrice: res.data.filters.maxPrice || "",
      });
    } catch (error) {
      console.error("AI Search failed", error);
    } finally {
      setIsMagicLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReels();
  };

  return (
    <div className="flex h-screen bg-black text-white selection:bg-teal-500/30">
      {/* Desktop Sidebar */}
      <div className="w-[80px] md:w-[300px] shrink-0 border-r border-white/10 hidden md:block">
        <DesktopSidebar active="explore" onCreateClick={() => {}} />
      </div>

      <div className="flex-1 overflow-y-auto pb-24 md:pb-0 relative">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-tr from-teal-500/20 to-blue-500/20 rounded-2xl border border-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.15)]">
               <Compass className="w-8 h-8 text-teal-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_2px_10px_rgba(20,184,166,0.2)]">
              Explore Destinations
            </h1>
          </div>

          {/* AI Magic Search Section */}
          <div className="mb-10 group">
             <div className="flex items-center gap-2 mb-3 px-2">
                <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">AI Magic Search</span>
             </div>
             
             <form onSubmit={handleMagicSearch} className="relative">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                   <Wand2 className={`w-5 h-5 transition-colors ${isMagicLoading ? "text-teal-400 animate-spin" : "text-zinc-500 group-focus-within:text-teal-400"}`} />
                </div>
                <input 
                  type="text" 
                  placeholder="Ask AI: 'I want to go to a cold place under 50k'..." 
                  value={magicQuery}
                  onChange={(e) => setMagicQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-32 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 backdrop-blur-xl hover:bg-white/10 transition-all placeholder:text-zinc-600 shadow-2xl"
                />
                <button 
                  type="submit"
                  disabled={isMagicLoading}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl text-white font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                >
                  {isMagicLoading ? "Thinking..." : "Find Magic"}
                </button>
             </form>
             
             {aiReasoning && (
                <div className="mt-3 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-xl text-[11px] text-teal-300 animate-in fade-in slide-in-from-top-1 duration-500">
                   ✨ AI Analysis: {aiReasoning}
                </div>
             )}
          </div>

          <div className="flex items-center gap-3 mb-6 px-2 opacity-50">
             <div className="h-[1px] flex-1 bg-white/10" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Or use filters</span>
             <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSearch} className="glass-panel bg-white/5 border border-white/10 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] shadow-2xl mb-10 space-y-4 md:space-y-0 md:flex md:gap-4 lg:w-3/4 relative z-10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:rounded-[2rem] before:pointer-events-none hover:border-white/20 transition-all duration-300">
            <div className="flex-1 relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400/60 group-focus-within:text-teal-400 transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder="Where to?" 
                value={params.place}
                onChange={(e) => setParams({ ...params, place: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 hover:bg-black/70 transition-all placeholder:text-zinc-500"
              />
            </div>
            
            <div className="flex-1 relative group">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/60 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
              <input 
                type="number" 
                placeholder="Max Price (₹)" 
                value={params.maxPrice}
                onChange={(e) => setParams({ ...params, maxPrice: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:bg-black/70 transition-all placeholder:text-zinc-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 font-bold rounded-2xl text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </form>

          {/* Results Grid */}
          <div className="relative">
             {/* Background glow for grid */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {loading ? (
                <div className="text-center py-32 text-zinc-400 flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
                  <p className="animate-pulse font-medium tracking-wide">Searching the globe...</p>
                </div>
            ) : reels.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reels.map((reel: any, index: number) => (
                  <div 
                    key={reel.id} 
                    className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <img 
                      src={reel.image_url} 
                      alt={reel.place} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end pointer-events-none">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{reel.place || "Unknown"}</h3>
                          <div className="flex gap-2 text-xs font-semibold">
                             <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full border border-teal-500/30">
                               ₹ {reel.price || "Free"}
                             </span>
                             {reel.duration && (
                                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                                  {reel.duration}
                                </span>
                             )}
                          </div>
                        </div>
                      </div>
                      
                      <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl py-3 px-4 shadow-xl font-bold text-sm tracking-wide opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out pointer-events-auto hover:bg-white/20 hover:border-teal-400/50">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-sm text-zinc-400 flex flex-col items-center shadow-xl">
                <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 border border-white/5">
                   <Filter className="w-10 h-10 text-zinc-500" />
                </div>
                <p className="text-xl font-medium text-white mb-2">No destinations found</p>
                <p className="text-sm">Try adjusting your filters to find something amazing.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}
