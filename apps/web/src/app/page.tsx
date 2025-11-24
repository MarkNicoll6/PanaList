import Link from "next/link";
import { ArrowRight, Check, Play, Menu, X, Layout, Database, TrendingUp, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MiniDirectoryPreview } from "@/components/landing/MiniDirectoryPreview";

export default function LandingPage() {
  const features = [
    {
      id: "ingest",
      eyebrow: "Ingest",
      title: "Turn raw web data into draft listings in one run",
      body: "Point PanaList at a topic, place, or niche and auto-populate draft listings using Brave Search. De-duplication, contact extraction, and summaries are handled for you — ready for a quick human review.",
      bullets: [
        "Brave-powered ingestion for any niche or location",
        "Automatic summaries, categories, and contact details",
        "CSV import for existing lists you already own"
      ],
      badge: "Ingest → Draft in minutes",
      icon: Database
    },
    {
      id: "build",
      eyebrow: "Build",
      title: "Launch a beautiful, branded directory for every tenant",
      body: "Give each organisation its own Notion-inspired directory site with live theming, flexible layouts, and a CMS your non-technical team can actually use.",
      bullets: [
        "Block-based pages: hero, grids, maps, CTAs, FAQs",
        "Live theme editor with colours and Google Fonts",
        "Multi-tenant out of the box with custom domains"
      ],
      badge: "Directory-as-a-Service",
      icon: Layout
    },
    {
      id: "grow",
      eyebrow: "Grow",
      title: "Grow traffic and revenue while the system does the heavy lifting",
      body: "Built-in keyword research, blog generation, and social scheduling turn every directory into a growth engine. Stripe-powered plans and featured listings unlock recurring revenue.",
      bullets: [
        "Keyword research and GPT-5 blog drafts from Brave SERP data",
        "Social post scheduling to LinkedIn and X",
        "Stripe plans, listing upgrades, and ad zones"
      ],
      badge: "From build → monetise",
      icon: TrendingUp
    },
    {
      id: "ecosystem",
      eyebrow: "Ecosystem",
      title: "Scale from single directory to global discovery network",
      body: "Public APIs, webhooks, and an optional PanaList Network let you connect directories, power mobile apps, and share data safely across an ecosystem.",
      bullets: [
        "REST + GraphQL API with webhooks",
        "Optional cross-directory “PanaList Network” meta-search",
        "SOC 2-ready controls baked into the stack"
      ],
      badge: "Ready for v2 & v3 roadmap",
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="PanaList Logo" className="h-8 w-8" />
            <span className="font-semibold text-lg tracking-tight">PanaList</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748B]">
            <Link href="#how-it-works" className="hover:text-[#0F172A] transition-colors">How it works</Link>
            <Link href="#features" className="hover:text-[#0F172A] transition-colors">Features</Link>
            <Link href="#growth" className="hover:text-[#0F172A] transition-colors">Growth tools</Link>
            <Link href="#faq" className="hover:text-[#0F172A] transition-colors">FAQs</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="hidden md:block text-sm font-medium text-[#64748B] hover:text-[#0F172A]">
              Log in
            </Link>
            <Button className="rounded-full px-6">
              Book a demo
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge variant="default" className="bg-[#0F172A] hover:bg-[#0F172A]/90">New</Badge>
              <Badge variant="secondary" className="bg-white border border-[#E5E7EB] text-[#64748B]">
                Multi-tenant directory-as-a-service
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                Build beautiful directories. <br />
                <span className="text-[#64748B]">Automate everything.</span>
              </h1>
              <p className="text-xl text-[#64748B] leading-relaxed max-w-lg">
                PanaList is a multi-tenant, Notion-inspired directory builder that lets you spin up branded, data-driven listing sites in an afternoon – complete with ingestion, blog, and social automation baked in.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 h-12 text-base">
                Start a pilot directory <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-[#E5E7EB] bg-white hover:bg-slate-50">
                Watch 3-minute walkthrough
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-[#64748B]">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#22C55E]" />
                <span>Multi-tenant Go + Next.js stack</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#22C55E]" />
                <span>Built-in Brave + GPT-5 automations</span>
              </div>
            </div>
          </div>

          {/* App Preview Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] blur opacity-20"></div>
            <div className="relative bg-[#020617] rounded-[2rem] shadow-2xl border border-white/10 text-white aspect-[4/3] flex flex-col overflow-hidden">
              <MiniDirectoryPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 space-y-24">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#22C55E] font-medium tracking-wide uppercase text-sm">How PanaList works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              One system for ingesting, building, growing, and scaling every directory you run.
            </h2>
            <p className="text-lg text-[#64748B]">
              Behind the scenes, a Go API and Next.js front-end handle multi-tenancy, security, and automation — so you can stay focused on the niche, not the plumbing.
            </p>
          </div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <div key={feature.id} className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-[#0F172A]">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-[#0F172A]">{feature.eyebrow}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-[#0F172A] leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-[#64748B] leading-relaxed">
                    {feature.body}
                  </p>

                  <ul className="space-y-3">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#64748B]">
                        <Check className="h-5 w-5 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Badge variant="outline" className="rounded-full px-4 py-1 text-sm font-medium border-[#E5E7EB] text-[#64748B]">
                      {feature.badge}
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-xl p-8 aspect-square md:aspect-[4/3] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] to-white"></div>
                    {/* Abstract Visual Representation */}
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-8">
                        <div className="h-3 w-3 rounded-full bg-[#E2E8F0]"></div>
                        <div className="h-3 w-3 rounded-full bg-[#E2E8F0]"></div>
                        <div className="h-3 w-3 rounded-full bg-[#E2E8F0]"></div>
                      </div>

                      <div className="space-y-4 flex-1">
                        <div className="h-8 w-1/2 bg-[#F1F5F9] rounded-lg"></div>
                        <div className="h-4 w-3/4 bg-[#F1F5F9] rounded-lg"></div>
                        <div className="h-4 w-2/3 bg-[#F1F5F9] rounded-lg"></div>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0] shadow-sm group-hover:translate-y-[-4px] transition-transform duration-500">
                            <div className="h-20 bg-[#E2E8F0] rounded-lg mb-3"></div>
                            <div className="h-3 w-3/4 bg-[#E2E8F0] rounded"></div>
                          </div>
                          <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0] shadow-sm group-hover:translate-y-[-8px] transition-transform duration-500 delay-75">
                            <div className="h-20 bg-[#E2E8F0] rounded-lg mb-3"></div>
                            <div className="h-3 w-3/4 bg-[#E2E8F0] rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#22C55E] font-medium tracking-wide uppercase text-sm">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Simple pricing that scales with you.
            </h2>
            <p className="text-lg text-[#64748B]">
              Start for free, upgrade when you're ready to monetize.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0F172A]">Starter</CardTitle>
                <CardDescription>Perfect for testing a new niche.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0F172A]">$0</span>
                  <span className="text-[#64748B]">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-[#64748B]">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> 1 Directory
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> 100 Listings
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> Basic Theme
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> Community Support
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Growth */}
            <Card className="border-[#22C55E] shadow-lg relative bg-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#22C55E] hover:bg-[#22C55E]">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0F172A]">Growth</CardTitle>
                <CardDescription>For serious directory builders.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0F172A]">$29</span>
                  <span className="text-[#64748B]">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-[#64748B]">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> 5 Directories
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> Unlimited Listings
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> All Themes
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> Custom Domains
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> Remove Branding
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F172A] hover:bg-[#0F172A]/90">Start Free Trial</Button>
              </CardFooter>
            </Card>

            {/* Scale */}
            <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0F172A]">Scale</CardTitle>
                <CardDescription>For agencies and networks.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0F172A]">$79</span>
                  <span className="text-[#64748B]">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-[#64748B]">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> Unlimited Directories
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> Priority Support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> API Access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#22C55E]" /> White Label
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            Ready to turn “we should build a directory” into a live system?
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
            Run your first PanaList tenant as a pilot: ingest a niche, publish a theme, ship a blog, and schedule social — all from one Go + Next.js stack.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto">
              Book a build session <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto">
              Download technical overview
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-[#E5E7EB] py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="PanaList Logo" className="h-6 w-6" />
            <span className="font-semibold text-[#0F172A]">PanaList</span>
          </div>
          <div className="text-sm text-[#64748B]">
            © 2025 PanaList. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
