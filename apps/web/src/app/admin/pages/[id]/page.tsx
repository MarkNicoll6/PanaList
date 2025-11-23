"use client";

import PageEditor from "@/components/admin/PageEditor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPage() {
    const params = useParams();
    const id = params?.id as string;
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Mock fetching data based on ID
        if (id) {
            const mockData = {
                title: id === "about" ? "About Us" : id === "contact" ? "Contact" : id === "privacy" ? "Privacy Policy" : "Terms of Service",
                content: `<h1>${id === "about" ? "About Us" : id === "contact" ? "Contact Us" : "Page Content"}</h1><p>This is the content for the ${id} page.</p>`,
                slug: id,
                status: "published",
                visibility: "public",
                metaTitle: `${id.charAt(0).toUpperCase() + id.slice(1)} - My Directory`,
                metaDescription: `Learn more about our ${id} page.`,
            };
            setData(mockData);
        }
    }, [id]);

    if (!data) return <div>Loading...</div>;

    return <PageEditor initialData={data} isEditing={true} />;
}
