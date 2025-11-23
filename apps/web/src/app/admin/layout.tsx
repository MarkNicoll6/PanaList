"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Megaphone,
    UserCheck,
    Store,
    Code2,
    Globe2,
    CreditCard,
    Shield,
    Settings,
    Bell,
    User,
    Search,
    MapPin,
    Star,
    Sparkles,
    Palette,
    Layout,
    Users,
    ChevronDown,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminHelperPanel from "@/components/admin/AdminHelperPanel";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        "Overview": true,
        "Directory": true,
        "AI Engine": true,
        "Design": true,
        "Growth": true,
        "Settings": true
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const navItems = [
        {
            section: "Overview", items: [
                { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", href: "/admin" }
            ]
        },
        {
            section: "Directory", items: [
                { id: "listings", icon: Store, label: "Listings", href: "/admin/listings" },
                { id: "categories", icon: FileText, label: "Categories", href: "/admin/categories" },
                { id: "locations", icon: MapPin, label: "Locations", href: "/admin/locations" },
                { id: "reviews", icon: Star, label: "Reviews", href: "/admin/reviews" },
            ]
        },
        {
            section: "AI Engine", items: [
                { id: "ingestion", icon: Search, label: "Data Ingestion", href: "/admin/ingestion" },
                { id: "cleaning", icon: Sparkles, label: "Data Cleaning", href: "/admin/cleaning" },
                { id: "posts", icon: FileText, label: "Auto-Blog", href: "/admin/posts" },
            ]
        },
        {
            section: "Design", items: [
                { id: "themes", icon: Palette, label: "Themes", href: "/admin/themes" },
                { id: "pages", icon: Layout, label: "Pages", href: "/admin/pages" },
            ]
        },
        {
            section: "Growth", items: [
                { id: "analytics", icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
                { id: "ads", icon: Megaphone, label: "Monetisation", href: "/admin/ads" },
                { id: "users", icon: Users, label: "Users", href: "/admin/users" },
            ]
        },
        {
            section: "Settings", items: [
                { id: "settings", icon: Settings, label: "Settings", href: "/admin/settings" },
                { id: "developers", icon: Code2, label: "Developers", href: "/admin/developers" },
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-[#F9FAFB] p-4">
            <div className="flex-1 flex overflow-hidden rounded-3xl shadow-2xl bg-white ring-1 ring-slate-900/5">
                {/* Sidebar */}
                <aside className="w-[260px] bg-slate-900 flex flex-col border-r border-slate-800 shrink-0">
                    <div className="h-14 flex items-center px-4 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-md bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">T</div>
                            <span className="font-semibold text-white">Tenant Admin</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
                        {navItems.map((section, idx) => (
                            <div key={idx}>
                                <button
                                    onClick={() => toggleSection(section.section)}
                                    className="w-full flex items-center justify-between px-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-400 mb-2 hover:text-white transition-colors"
                                >
                                    <span>{section.section}</span>
                                    {openSections[section.section] ? (
                                        <ChevronDown className="h-3 w-3" />
                                    ) : (
                                        <ChevronRight className="h-3 w-3" />
                                    )}
                                </button>

                                {openSections[section.section] && (
                                    <div className="space-y-0.5 animate-in slide-in-from-top-1 duration-200">
                                        {section.items.map((item) => {
                                            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={item.href}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                                        ? "bg-slate-800 text-white"
                                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                                        }`}
                                                >
                                                    <item.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                                                    {item.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                                <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Tenant User</p>
                                <p className="text-xs text-slate-400 truncate">user@tenant.com</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {/* Top Nav */}
                    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
                        <div className="flex items-center gap-4 w-full max-w-md">
                            <div className="relative w-full">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full pl-9 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <AdminHelperPanel />
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                <Bell className="h-4 w-4" />
                            </Button>
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
