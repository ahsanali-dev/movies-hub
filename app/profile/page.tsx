import React from 'react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="mb-12 flex flex-col items-center border-b border-white/10 pb-12 md:flex-row md:items-start md:gap-12">
        <div className="mb-6 h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-accent bg-[#1a1a1c] p-1 md:mb-0">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200" alt="Profile" className="h-full w-full rounded-full object-cover" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black">Ahsan Ali</h1>
          <p className="mt-2 text-[#a0a0a0]">ahsan.ali@example.com</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
            <button className="rounded-xl bg-accent px-6 py-2.5 text-sm font-bold transition-all hover:bg-accent/80">Edit Profile</button>
            <button className="rounded-xl bg-white/5 border border-white/10 px-6 py-2.5 text-sm font-bold transition-all hover:bg-white/10">Manage Subscription</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-8 text-2xl font-bold">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { movie: "Dune: Part Two", time: "2 hours ago", progress: 85 },
              { movie: "The Bear", time: "Yesterday", progress: 100 },
              { movie: "Oppenheimer", time: "2 days ago", progress: 40 },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-6 rounded-2xl bg-white/5 p-4 border border-white/5">
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                   <i className="ph-fill ph-play-circle text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{activity.movie}</h3>
                  <p className="text-xs text-[#a0a0a0] mt-1">{activity.time}</p>
                </div>
                <div className="text-right">
                   <p className="text-sm font-medium">{activity.progress}%</p>
                   <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full bg-accent transition-all" style={{ width: `${activity.progress}%` }} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
           <h2 className="mb-8 text-2xl font-bold">Account Settings</h2>
           <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
              <div className="flex items-center justify-between">
                 <span className="text-sm text-[#a0a0a0]">Auto-play next episode</span>
                 <div className="h-6 w-11 rounded-full bg-accent relative"><div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-all shadow-sm" /></div>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-sm text-[#a0a0a0]">High Quality (4K)</span>
                 <div className="h-6 w-11 rounded-full bg-white/10 relative"><div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white/30 transition-all" /></div>
              </div>
              <div className="pt-6 border-t border-white/5">
                 <button className="w-full rounded-xl bg-red-600/10 py-3 text-sm font-bold text-red-500 hover:bg-red-600/20 transition-all">Sign Out</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
