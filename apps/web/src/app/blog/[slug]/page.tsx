import { Metadata } from "next";
import { notFound } from "next/navigation";
import { apiV3 as api } from "@/lib/api"; // Note: This might not work in Server Components if it uses axios/client logic. 
// For Server Components, we usually fetch directly or use a server-friendly fetch wrapper.
// Assuming apiV3 is client-side only or we need a fetch here.
// I'll use fetch for Server Component.

async function getPost(slug: string) {
    const res = await fetch(`http://localhost:8080/api/v3/public/posts/${slug}`, {
        cache: 'no-store' // For demo purposes
    });
    if (!res.ok) return null;
    return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.meta_description || post.excerpt,
        openGraph: {
            title: post.title,
            description: post.meta_description || post.excerpt,
            images: post.og_image_url ? [post.og_image_url] : [],
            type: 'article',
        },
        other: {
            // Custom meta tags parsing would go here if needed, 
            // but Next.js metadata API is structured.
            // We can inject raw tags via head if needed, but Metadata is preferred.
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    // Parse content
    let content = "";
    try {
        if (post.content_json && post.content_json.markdown) {
            content = post.content_json.markdown;
        }
    } catch (e) {
        console.error("Error parsing content", e);
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.meta_description || post.excerpt,
        "datePublished": post.published_at,
        "dateModified": post.updated_at,
        "author": {
            "@type": "Person",
            "name": "Author Name" // Placeholder, would fetch from author_id
        },
        "image": post.og_image_url ? [post.og_image_url] : []
    };

    return (
        <article className="max-w-3xl mx-auto py-12 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <header className="mb-8 text-center">
                <div className="text-sm text-slate-500 mb-2">{post.sector}</div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
                <div className="text-slate-600">
                    {new Date(post.published_at).toLocaleDateString()}
                </div>
            </header>

            {post.og_image_url && (
                <img src={post.og_image_url} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-8" />
            )}

            <div className="prose prose-slate max-w-none">
                {/* Simple markdown rendering or just text for now */}
                <pre className="whitespace-pre-wrap font-sans">{content}</pre>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex gap-2">
                    {post.tags && post.tags.map((tag: string) => (
                        <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-sm">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
