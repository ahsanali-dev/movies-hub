"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { getTrendingMovies, getImageUrl } from "@/lib/tmdb";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Hero() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      setLoading(true);
      const data = await getTrendingMovies();
      setMovies(data.slice(0, 5) || []);
      setLoading(false);
    };
    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <div className="relative h-[80vh] w-full bg-[#0a0a0b] flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        loop={true}
        className="h-full w-full hero-swiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full w-full">
              {/* Cinematic Background with Gradient Overlays */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[5s] scale-110 group-hover:scale-100"
                style={{ 
                    backgroundImage: `linear-gradient(to right, #0a0a0b 0%, rgba(0,0,0,0) 60%), linear-gradient(to top, #0a0a0b 0%, transparent 40%), url('${getImageUrl(movie.backdrop_path)}')` 
                }}
              />
              
              {/* Content Overlay */}
              <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-20 max-w-4xl py-20 translate-y-10 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-accent px-3 py-1 rounded text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg shadow-accent/20 italic">Featured</span>
                    <span className="text-white/60 font-bold text-sm">{movie.release_date?.split('-')[0]}</span>
                    <span className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm"><i className="ph-fill ph-star"></i> {movie.vote_average?.toFixed(1)}</span>
                </div>
                
                <h1 className="text-4xl md:text-7xl font-black text-white italic mb-6 leading-[1.1] drop-shadow-2xl uppercase tracking-tighter">
                  {movie.title}
                </h1>
                
                <p className="mb-10 max-w-2xl text-base md:text-xl text-[#a0a0a0] leading-relaxed line-clamp-3 md:line-clamp-none font-medium">
                  {movie.overview}
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/watch/${movie.id}?type=movie`}
                    className="flex items-center gap-3 rounded-xl bg-white px-10 py-4 text-sm md:text-base font-black text-black transition-all hover:scale-105 active:scale-95 shadow-2xl"
                  >
                    <i className="ph-fill ph-play text-xl md:text-2xl"></i> WATCH NOW
                  </Link>
                  <button className="flex items-center gap-2 rounded-xl bg-white/10 px-8 py-4 text-sm md:text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 border border-white/10">
                    <i className="ph-bold ph-plus text-xl"></i> WISHLIST
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper .swiper-pagination-bullet {
            background: white !important;
            opacity: 0.3;
        }
        .hero-swiper .swiper-pagination-bullet-active {
            background: #e74c3c !important;
            opacity: 1;
            width: 24px;
            border-radius: 4px;
        }
        .hero-swiper .swiper-button-next, .hero-swiper .swiper-button-prev {
            color: white !important;
            transform: scale(0.6);
            padding: 40px;
            opacity: 0;
            transition: all 0.3s;
        }
        .hero-swiper:hover .swiper-button-next, .hero-swiper:hover .swiper-button-prev {
            opacity: 0.5;
        }
      `}</style>
    </section>
  );
}
