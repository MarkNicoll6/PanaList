"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Star, Check, X, MoreHorizontal, MessageSquare } from "lucide-react";

export default function ReviewsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Reviews</h1>
                    <p className="text-sm text-slate-600 mt-1">Moderate and manage user feedback.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline">
                        Export
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Pending Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-slate-500 mt-1">Requires moderation</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Average Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            4.8 <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Based on 1,240 reviews</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,252</div>
                        <p className="text-xs text-slate-500 mt-1">+45 this week</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input className="pl-9 border-0 bg-slate-50" placeholder="Search reviews..." />
                </div>
            </div>

            <div className="space-y-4">
                {/* Review Item 1 */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-slate-900">John Doe</span>
                                            <span className="text-slate-500 text-sm">reviewed</span>
                                            <span className="font-medium text-indigo-600">Acme Coffee Co.</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <span className="text-xs text-slate-500 ml-2">2 hours ago</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                    "Absolutely loved the atmosphere here! The coffee was fantastic and the staff were super friendly. Highly recommend the cold brew."
                                </p>
                                <div className="flex items-center gap-2 pt-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <Check className="mr-2 h-3 w-3" /> Approve
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                        <X className="mr-2 h-3 w-3" /> Reject
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Review Item 2 */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarFallback>AS</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-slate-900">Alice Smith</span>
                                            <span className="text-slate-500 text-sm">reviewed</span>
                                            <span className="font-medium text-indigo-600">The Tech Hub</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[1, 2, 3, 4].map((i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <Star className="h-4 w-4 text-slate-300" />
                                            <span className="text-xs text-slate-500 ml-2">1 day ago</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Published</Badge>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                    "Great place to work, but the wifi can be a bit spotty in the afternoon. Otherwise, perfect location."
                                </p>
                                <div className="flex items-center gap-2 pt-2">
                                    <Button size="sm" variant="ghost">
                                        <MessageSquare className="mr-2 h-3 w-3" /> Reply
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
