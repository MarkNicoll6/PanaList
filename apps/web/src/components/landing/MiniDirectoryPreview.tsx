import { Search, MapPin, Star, Coffee, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MiniDirectoryPreview() {
    return (
        <div className="relative w-full h-full bg-white text-slate-900 flex flex-col overflow-hidden font-sans">
            {/* Mini Browser Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white shrink-0">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                        <Coffee className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">LondonBrew</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[10px] font-medium text-slate-500">
                    <span>Cafes</span>
                    <span>Roasters</span>
                    <span>Stories</span>
                </div>
                <div className="h-6 w-6 rounded-full bg-slate-100"></div>
            </div>

            {/* Mini Hero */}
            <div className="relative h-32 sm:h-40 shrink-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80)' }}></div>
                <div className="absolute inset-0 bg-slate-900/60"></div>
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center">
                    <h2 className="text-lg sm:text-xl font-bold mb-2">Best Coffee in London</h2>
                    <p className="text-xs text-slate-200 mb-4 max-w-[200px] mx-auto">Curated guide to the finest beans in the city.</p>
                    <div className="relative max-w-[240px] mx-auto w-full">
                        <Search className="absolute left-2.5 top-2 h-3 w-3 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search cafes..."
                            className="w-full h-7 pl-8 pr-3 rounded-full bg-white/20 border border-white/10 text-[10px] text-white placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 backdrop-blur-sm"
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {/* Mini Listings Grid */}
            <div className="flex-1 bg-slate-50 p-4 overflow-hidden">
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { name: "Monmouth Coffee", loc: "Covent Garden", rating: 4.9, img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80" },
                        { name: "Prufrock", loc: "Farringdon", rating: 4.8, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80" },
                        { name: "Ozone", loc: "Old Street", rating: 4.7, img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=400&q=80" },
                        { name: "Workshop", loc: "Marylebone", rating: 4.8, img: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=400&q=80" },
                    ].map((shop, i) => (
                        <div key={i} className="bg-white rounded-lg p-2 shadow-sm border border-slate-100 flex flex-col gap-2 group cursor-default">
                            <div className="aspect-video rounded-md w-full relative overflow-hidden bg-slate-100">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${shop.img})` }}></div>
                            </div>
                            <div>
                                <div className="flex justify-between items-start mb-0.5">
                                    <h3 className="text-[10px] font-bold truncate pr-1 text-slate-900">{shop.name}</h3>
                                    <div className="flex items-center gap-0.5 text-[8px] font-medium text-amber-500 bg-amber-50 px-1 rounded">
                                        <Star className="h-2 w-2 fill-current" /> {shop.rating}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[9px] text-slate-400">
                                    <MapPin className="h-2 w-2" /> {shop.loc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating "Automated Blog" Badge (Preserved from original design) */}
            <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200 p-3 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
                        <span className="text-[10px] font-bold text-white">AI</span>
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-900">Auto-generated blog</div>
                        <div className="text-[9px] text-slate-500">"Top 5 Roasters 2025"</div>
                    </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-0 text-[9px] h-5 px-2">
                    Published
                </Badge>
            </div>
        </div>
    );
}
