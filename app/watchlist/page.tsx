"use client";
import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(saved);
  }, []);

  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black md:text-5xl tracking-tighter">My Watchlist</h1>
          <p className="mt-2 text-[#a0a0a0]">You have {watchlist.length} titles saved to watch later.</p>
        </div>
        {watchlist.length > 0 && (
            <button 
                onClick={() => { localStorage.removeItem('watchlist'); setWatchlist([]); }}
                className="text-xs font-bold uppercase tracking-widest text-[#a0a0a0] hover:text-accent transition-colors"
            >
                Clear All
            </button>
        )}
      </div>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 animate-fade-in">
          {watchlist.map((movie: any) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <div className="relative mb-8 text-[#252529]">
              <i className="ph-fill ph-bookmarks text-[120px]"></i>
              <i className="ph-bold ph-plus absolute top-0 right-0 text-4xl text-accent animate-pulse"></i>
          </div>
          <h2 className="mb-4 text-2xl font-bold">Your watchlist is empty</h2>
          <p className="mb-8 max-w-xs text-[#a0a0a0]">
            Save movies and TV shows to keep track of what you want to watch.
          </p>
          <Link 
            href="/explore" 
            className="rounded-xl bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
          >
            Explore Movies
          </Link>
        </div>
      )}
    </div>
  );
}
