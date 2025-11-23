"use client";

import { ListingEmbedCard } from "@/components/listing/ListingEmbedCard";
import { useParams } from "next/navigation";

export default function ListingEmbedPage() {
    const params = useParams();
    const id = params?.id as string;

    // In a real app, we would fetch the listing data based on id
    // For now, we'll use mock data
    const mockListing = {
        id: id || "1",
        title: "Techno Solutions Inc.",
        category: "Software Development",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        directoryName: "PanaList",
        directoryUrl: "http://localhost:3000", // Should be env var
    };

    if (!id) return null;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
            <ListingEmbedCard {...mockListing} />
        </div>
    );
}
