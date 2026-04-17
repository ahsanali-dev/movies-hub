"use client";
import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { searchMovies, GENRE_IDS, getByGenre } from '@/lib/tmdb';
import SkeletonCard from '@/components/SkeletonCard';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('Trending');

  const genres = ["Trending", "Action", "Comedy", "Horror", "Animation", "SciFi", "Thriller"];

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (searchQuery.trim() === '') {
        // Show by genre if no search
        const genreId = GENRE_IDS[selectedGenre as keyof typeof GENRE_IDS];
        const data = genreId ? await getByGenre(genreId) : await searchMovies("popular");
        setResults(data || []);
      } else {
        const data = await searchMovies(searchQuery);
        // Filter out people and unknown media types
        const filtered = data?.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv' || !item.media_type) || [];
        setResults(filtered);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(fetchResults, 500); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedGenre]);

  return (
    <div className="min-h-screen p-8 md:p-16 bg-[#0a0a0b] animate-fade-in">
      <div className="mb-16 max-w-3xl">
        <h1 className="mb-8 text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">Explore</h1>
        <div className="relative group">
          <i className="ph-bold ph-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-white/20 transition-colors group-focus-within:text-accent"></i>
          <input 
            type="text" 
            placeholder="Search by title, actor, or genre..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-[32px] border border-white/10 bg-white/5 py-6 pl-16 pr-8 text-lg text-white outline-none focus:border-accent/40 focus:bg-white/10 transition-all shadow-2xl backdrop-blur-xl"
          />
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
            <div className="h-6 w-1.5 bg-accent rounded-full"></div>
            <h2 className="text-xl font-black uppercase tracking-widest text-white/40">Moods & Genres</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {genres.map((cat) => (
            <button 
              key={cat} 
              onClick={() => { setSelectedGenre(cat); setSearchQuery(''); }}
              className={`rounded-2xl border px-8 py-3.5 text-xs font-black uppercase tracking-widest transition-all ${
                selectedGenre === cat && !searchQuery
                ? 'bg-accent border-accent text-white shadow-xl shadow-accent/20 scale-105' 
                : 'border-white/10 bg-white/5 text-white/40 hover:bg-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                {searchQuery ? `Search Results` : `${selectedGenre} Collection`}
            </h2>
            {!loading && <span className="text-xs font-bold text-white/30 uppercase tracking-widest">{results.length} Titles Found</span>}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
              {[1,2,3,4,5,6,7].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {results.map((movie: any) => (
              <div key={movie.id} className="animate-fade-in">
                <MovieCard {...movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center">
             <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                <i className="ph-bold ph-magnifying-glass text-4xl text-white/20"></i>
             </div>
             <p className="text-2xl font-black text-white/40 uppercase tracking-widest">No match discovered</p>
             <p className="text-sm text-white/20 mt-4 max-w-xs font-medium">We couldn't find anything for "{searchQuery}". Try exploring our top categories instead.</p>
          </div>
        )}
      </div>
    </div>
  );
}
