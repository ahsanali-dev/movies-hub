"use client";
import React, { useState, useEffect, use } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getMovieDetails, getImageUrl } from "@/lib/tmdb";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";

export default function WatchPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use for Next.js 15 compatibility
  const params = use(paramsPromise);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [activeServer, setActiveServer] = useState("vidsrc");
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const id = params.id;
        const type = (searchParams.get('type') as "movie" | "tv") || "movie";
        
        if (!id) return;

        // Try dual-fetch strategy for maximum stability
        let data = await getMovieDetails(id, type);
        
        if (!data) {
            data = await getMovieDetails(id, type === "movie" ? "tv" : "movie");
        }

        if (data) {
            setMovie(data);
            setRecommendations(data.recommendations?.results?.slice(0, 10) || []);
            const saved = JSON.parse(localStorage.getItem('watchlist') || '[]');
            setIsInWatchlist(saved.some((m: any) => m.id === data.id));
        }
      } catch (err) {
        console.error("Watch Page Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadMovie();
  }, [params.id, searchParams]);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('watchlist') || '[]');
    let updated;
    if (isInWatchlist) {
      updated = saved.filter((m: any) => m.id !== movie?.id);
    } else {
        updated = [...saved, movie];
    }
    localStorage.setItem('watchlist', JSON.stringify(updated));
    setIsInWatchlist(!isInWatchlist);
  };

  if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0b] text-white">
            <div className="flex flex-col items-center gap-6">
                <div className="relative h-20 w-20">
                    <div className="absolute inset-0 rounded-full border-4 border-accent/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
                </div>
                <p className="text-lg font-black uppercase tracking-[0.2em] text-accent animate-pulse">Syncing Cinema</p>
            </div>
        </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 text-white bg-[#0a0a0b]">
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Title Unavailable</h1>
        <p className="text-[#a0a0a0] mb-8 max-w-md text-center">We couldn't retrieve this specific title from TMDB. It might be a person or an invalid ID.</p>
        <Link href="/" className="px-10 py-4 bg-accent rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-accent/20">Return Home</Link>
      </div>
    );
  }

  const getEmbedUrl = () => {
    const serverMap: { [key: string]: string } = {
        vidsrc: "https://vidsrc.to/embed",
        vidsrc2: "https://vidsrc.me/embed",
        vidsrc3: "https://vidsrc.pro/embed",
        vidsrc4: "https://vidsrc.cc/v2/embed"
    };
    const baseUrl = serverMap[activeServer] || serverMap.vidsrc;
    const isTV = !!movie.first_air_date;
    
    if (isTV) {
      return `${baseUrl}/tv/${movie.id}/${selectedSeason}/${selectedEpisode}`;
    }
    return `${baseUrl}/movie/${movie.id}`;
  };

  const spokenLanguages = movie.spoken_languages?.map((l: any) => l.english_name) || [];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {!isPlaying && (
        <div className="animate-fade-in">
            <button
                onClick={() => router.back()}
                className="fixed left-6 md:left-24 top-8 z-[200] flex items-center gap-2 rounded-full bg-black/60 px-5 py-2.5 text-sm font-bold backdrop-blur-md border border-white/10 shadow-2xl active:scale-95 transition-all"
            >
                <i className="ph-bold ph-arrow-left"></i> Back
            </button>

            <div className="relative min-h-[95vh] md:min-h-[85vh] w-full flex flex-col justify-end md:justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `linear-gradient(to right, #0a0a0b 0%, transparent 80%), linear-gradient(to top, #0a0a0b 0%, transparent 60%), url('${getImageUrl(movie.backdrop_path)}')` }}
                />
                <div className="relative z-10 px-6 md:px-20 max-w-4xl py-24">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="bg-accent px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider">Premium 4K</span>
                        {spokenLanguages.length > 1 && (
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider flex items-center gap-1">
                                <i className="ph-fill ph-translate"></i> Dual Audio
                            </span>
                        )}
                        <span className="text-white/60 font-bold text-sm">{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.05] drop-shadow-2xl">{movie.title || movie.name}</h1>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                        {spokenLanguages.slice(0, 5).map((lang: string) => (
                            <span key={lang} className="text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/5">{lang}</span>
                        ))}
                    </div>

                    <p className="text-base md:text-xl text-white/50 mb-12 max-w-2xl leading-relaxed">
                        {movie.overview}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 mb-16 relative z-[500]">
                        <button onClick={() => setIsPlaying(true)} className="group flex items-center justify-center gap-4 rounded-2xl bg-white px-12 py-5 text-lg font-black text-black transition-all hover:scale-110 active:scale-95 shadow-2xl">
                            <i className="ph-fill ph-play text-2xl"></i> Play Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {isPlaying && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col h-screen w-screen overflow-hidden animate-fade-in">
            <div className="absolute top-0 left-0 right-0 p-6 md:p-10 z-[1050] flex justify-between items-center bg-gradient-to-b from-black via-black/40 to-transparent">
                <div className="flex items-center gap-6">
                    <button onClick={() => setIsPlaying(false)} className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-2xl transition-all hover:bg-accent active:scale-90">
                        <i className="ph-bold ph-x text-2xl group-hover:rotate-90"></i>
                    </button>
                </div>
            </div>
            <div className="flex-1 bg-black">
                <iframe src={getEmbedUrl()} className="h-full w-full border-none shadow-2xl" allowFullScreen scrolling="no" sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-presentation"></iframe>
            </div>
        </div>
      )}

      <div className="px-6 md:px-20 py-24 bg-[#0a0a0b]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            <div className="lg:col-span-2 space-y-24">
                <section>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-12">Recommended</h2>
                    <div className="flex overflow-x-auto gap-8 pb-10 no-scrollbar scroll-smooth">
                        {recommendations.map((m: any) => (
                            <div key={m.id} className="w-44 md:w-56 shrink-0">
                                <MovieCard {...m} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
}
