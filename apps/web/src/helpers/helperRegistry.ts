export type HelperTooltipData = {
    title: string;
    body: string;
    link?: string;
    roles?: string[];
};

export type TourStep = {
    helperId: string;
    title: string;
    body: string;
};

export type TourData = {
    id: string;
    name: string;
    page: string;
    steps: TourStep[];
    roles?: string[];
};

export const helperRegistry: {
    tooltips: Record<string, HelperTooltipData>;
    tours: Record<string, TourData>;
} = {
    tooltips: {
        "dashboard.metrics.tenants": {
            title: "Tenants Monitored",
            body: "Total number of tenants currently being tracked for compliance.",
        },
        "dashboard.metrics.controls": {
            title: "Passing Controls",
            body: "Percentage of SOC 2 controls that are currently passing across all tenants.",
        },
        "dashboard.table.tenant_row": {
            title: "Tenant Status",
            body: "Click to view detailed compliance report for this tenant.",
        },
        "config.header.run_scan": {
            title: "Run Full Scan",
            body: "Trigger a new configuration scan for all tenants. This may take a few minutes.",
        },
        "evidence.templates.list": {
            title: "Evidence Templates",
            body: "Select a template to generate a compliance evidence bundle.",
        },
    },
    tours: {
        "super_admin_dashboard": {
            id: "super_admin_dashboard",
            name: "Dashboard Tour",
            page: "/super-admin/compliance",
            steps: [
                {
                    helperId: "dashboard.metrics.tenants",
                    title: "Track Tenants",
                    body: "See how many tenants you are monitoring at a glance.",
                },
                {
                    helperId: "dashboard.metrics.controls",
                    title: "Compliance Health",
                    body: "Monitor the overall passing rate of your compliance controls.",
                },
                {
                    helperId: "dashboard.table.tenant_row",
                    title: "Tenant Details",
                    body: "Drill down into specific tenants to see their issues and audit logs.",
                },
            ],
        },
    },
};
