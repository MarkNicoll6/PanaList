import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ListingEmbedCardProps {
    id: string;
    title: string;
    category: string;
    rating: number;
    image: string;
    directoryName: string;
    directoryUrl: string;
}

export function ListingEmbedCard({
    id,
    title,
    category,
    rating,
    image,
    directoryName,
    directoryUrl,
}: ListingEmbedCardProps) {
    return (
        <Card className="w-full max-w-[350px] overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="relative h-40 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-slate-800 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {rating.toFixed(1)}
                </div>
            </div>
            <CardHeader className="p-4 pb-2">
                <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                    {category}
                </div>
                <h3 className="font-bold text-lg leading-tight text-slate-900 line-clamp-1">
                    {title}
                </h3>
            </CardHeader>
            <CardFooter className="p-4 pt-2 flex items-center justify-between bg-slate-50/50">
                <div className="text-xs text-slate-500 font-medium">
                    on {directoryName}
                </div>
                <Button asChild size="sm" variant="outline" className="h-8 gap-1 text-xs">
                    <Link href={`${directoryUrl}/listing/${id}`} target="_blank" rel="noopener noreferrer">
                        View <ExternalLink className="h-3 w-3" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
