import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OnboardingData } from "../OnboardingWizard";
import { ArrowRight } from "lucide-react";

interface DirectoryDetailsStepProps {
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function DirectoryDetailsStep({ data, updateData, onNext, onBack }: DirectoryDetailsStepProps) {
    const isComplete = data.directoryName && data.niche && data.location;

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900">Directory Details</h2>
                    <p className="text-slate-600">Tell us a bit about what you're building.</p>
                </div>

                <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                        <Label htmlFor="name">Directory Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Best Coffee London"
                            value={data.directoryName}
                            onChange={(e) => updateData({ directoryName: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="niche">Niche / Category</Label>
                        <Select value={data.niche} onValueChange={(val) => updateData({ niche: val })}>
                            <SelectTrigger id="niche">
                                <SelectValue placeholder="Select a niche" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="food">Food & Drink</SelectItem>
                                <SelectItem value="services">Professional Services</SelectItem>
                                <SelectItem value="tech">Technology & SaaS</SelectItem>
                                <SelectItem value="travel">Travel & Tourism</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            placeholder="e.g. London, UK (or Global)"
                            value={data.location}
                            onChange={(e) => updateData({ location: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-slate-100 mt-8">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button onClick={onNext} disabled={!isComplete}>
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
