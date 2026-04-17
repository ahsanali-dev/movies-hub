"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const sliderData = [
    {
        tag: "New Release",
        title: "Beyond The Stars",
        desc: "Experience the breathtaking journey of a lost voyager across the multiverse. A cinematic masterpiece that redefines visual storytelling.",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop"
    },
    {
        tag: "Trending Now",
        title: "The Silent Watcher",
        desc: "In a world where sound is a death sentence, one survivor discovers a secret that could change everything.",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop"
    },
    {
        tag: "Exclusive",
        title: "Neon Nights",
        desc: "Lost in a cyberpunk city, a rogue AI must choose between following its code or saving the city from destruction.",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000&auto=format&fit=crop"
    },
    {
        tag: "Sci-Fi Epic",
        title: "Zero Gravity",
        desc: "A rescue mission to the edge of the solar system turns into a struggle for survival against an unknown entity.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop"
    },
    {
        tag: "Mystery Thriller",
        title: "Submerged",
        desc: "An underwater research facility goes dark. What they found at the bottom of the ocean was never meant to be seen.",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop"
    },
    {
        tag: "Animated Adventure",
        title: "Skyward Bound",
        desc: "A young explorer builds a miraculous machine to reach the floating islands in the clouds.",
        image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2000&auto=format&fit=crop"
    }
];

const Hero = () => {
    return (
        <section className="relative h-hero w-full overflow-hidden group">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect="fade"
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                className="h-full w-full"
            >
                {sliderData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative flex h-full w-full flex-col justify-end p-8 md:p-16">
                            <div 
                                className="absolute inset-0 z-0 h-full w-full"
                                style={{ 
                                    backgroundImage: `linear-gradient(to bottom, transparent 0%, #0a0a0b 100%), url('${slide.image}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'brightness(0.6)'
                                }}
                            />
                            
                            <div className="relative z-10 max-w-2xl animate-fade-in mb-12">
                                <p className="mb-4 text-sm font-bold uppercase tracking-mega text-accent">{slide.tag}</p>
                                <h1 className="mb-6 text-4xl font-black leading-tight md:text-7xl">{slide.title}</h1>
                                <p className="mb-8 text-base md:text-lg leading-relaxed text-[#a0a0a0] line-clamp-2 md:line-clamp-none">
                                    {slide.desc}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 font-bold uppercase tracking-wider text-white shadow-lg shadow-accent/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/50 active:scale-95">
                                        <i className="ph-fill ph-play"></i> Watch Now
                                    </button>
                                    <button className="rounded-lg border border-white/10 bg-white/10 px-8 py-3.5 font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95">
                                        Add to List
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Arrows */}
                <button className="swiper-button-prev-custom absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:bg-accent md:flex opacity-0 group-hover:opacity-100">
                    <i className="ph-bold ph-caret-left text-2xl"></i>
                </button>
                <button className="swiper-button-next-custom absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:bg-accent md:flex opacity-0 group-hover:opacity-100">
                    <i className="ph-bold ph-caret-right text-2xl"></i>
                </button>
            </Swiper>
            
            {/* Swiper Custom Styling */}
            <style jsx global>{`
                .swiper-pagination {
                    bottom: 2.5rem !important;
                    right: 2.5rem !important;
                    width: auto !important;
                    left: auto !important;
                    display: flex !important;
                    gap: 0.6rem !important;
                    z-index: 50 !important;
                }
                
                .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.2) !important;
                    opacity: 1 !important;
                    width: 6px !important;
                    height: 6px !important;
                    margin: 0 !important;
                    transition: all 0.3s ease-in-out !important;
                    border-radius: 50% !important;
                }
                
                .swiper-pagination-bullet-active {
                    background: #e74c3c !important; /* Theme Accent Color */
                    width: 32px !important; /* Long pill shape */
                    border-radius: 12px !important;
                }

                @media (max-width: 768px) {
                    .swiper-pagination {
                        right: 50% !important;
                        transform: translateX(50%) !important;
                        bottom: 1.5rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
