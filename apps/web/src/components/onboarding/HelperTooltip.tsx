"use client";

import { helperRegistry } from "@/helpers/helperRegistry";
import { HelpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface HelperTooltipProps {
    helperId: string;
    placement?: "top" | "right" | "bottom" | "left";
    children?: React.ReactNode;
}

export default function HelperTooltip({ helperId, placement = "top", children }: HelperTooltipProps) {
    const data = helperRegistry.tooltips[helperId];

    if (!data) return <>{children}</>;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children || (
                        <span className="inline-flex ml-1 cursor-help text-slate-400 hover:text-slate-600 transition-colors">
                            <HelpCircle className="h-4 w-4" />
                        </span>
                    )}
                </TooltipTrigger>
                <TooltipContent side={placement} className="max-w-xs bg-slate-900 text-white border-slate-800">
                    <div className="font-semibold text-xs mb-1">{data.title}</div>
                    <div className="text-xs leading-relaxed text-slate-300">{data.body}</div>
                    {data.link && (
                        <a href={data.link} className="block mt-2 text-[10px] text-blue-400 hover:underline">
                            Learn more →
                        </a>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
