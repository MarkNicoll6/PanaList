"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, FileClock, ShieldCheck, Radar, Archive, Settings2, Bell, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        {
            section: "Overview", items: [
                { id: "dashboard", icon: LayoutDashboard, label: "Compliance overview", href: "/super-admin/compliance" }
            ]
        },
        {
            section: "Tenants", items: [
                { id: "tenants", icon: Building2, label: "Tenant list", href: "/super-admin/compliance/tenants" }
            ]
        },
        {
            section: "Controls", items: [
                { id: "audit", icon: FileClock, label: "Audit logs", href: "/super-admin/compliance/audit" },
                { id: "rbac", icon: ShieldCheck, label: "Roles & access", href: "/super-admin/compliance/rbac" },
                { id: "config", icon: Radar, label: "Config scanner", href: "/super-admin/compliance/config" },
                { id: "evidence", icon: Archive, label: "Evidence exports", href: "/super-admin/compliance/evidence" }
            ]
        },
        {
            section: "System", items: [
                { id: "settings", icon: Settings2, label: "System settings", href: "/super-admin/settings" }
            ]
        }
    ];

    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            {/* Sidebar */}
            <aside className="w-[260px] border-r border-slate-200 bg-white flex flex-col fixed h-full z-10">
                <div className="h-14 flex items-center px-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">PL</div>
                        <span className="font-semibold text-slate-900">PanaList</span>
                        <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Super Admin</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                    {navItems.map((section, idx) => (
                        <div key={idx}>
                            <h3 className="px-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 mb-2">
                                {section.section}
                            </h3>
                            <div className="space-y-0.5">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                                    ? "bg-slate-100 text-slate-900"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                }`}
                                        >
                                            <item.icon className={`h-4 w-4 ${isActive ? "text-slate-900" : "text-slate-400"}`} />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                            <User className="h-4 w-4 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">Super Admin</p>
                            <p className="text-xs text-slate-500 truncate">admin@panalist.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-[260px] flex flex-col min-h-screen">
                {/* Top Nav */}
                <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Super Admin</span>
                        <span>/</span>
                        <span className="font-medium text-slate-900">Compliance</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                            <HelpCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                            <Bell className="h-4 w-4" />
                        </Button>
                    </div>
                </header>

                <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
