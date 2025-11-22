interface AdZoneProps {
    placement: string;
}

export function AdZone({ placement }: AdZoneProps) {
    // In real app, fetch creative for this placement
    return (
        <div className="w-full h-32 bg-muted flex items-center justify-center border border-dashed rounded-lg my-4">
            <span className="text-muted-foreground">Ad Space ({placement})</span>
        </div>
    );
}
