import type { IFeature } from "../types";

export const featuresData: IFeature[] = [
    {
        icon: (
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Client Focused — person/target icon */}
                <circle cx="17" cy="10" r="5.5" stroke="url(#cf-a)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 31c0-7.18 5.82-13 13-13s13 5.82 13 13" stroke="url(#cf-b)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id="cf-a" x1="17" y1="4.5" x2="17" y2="15.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E60076" /><stop offset="1" stopColor="#FB64B6" />
                    </linearGradient>
                    <linearGradient id="cf-b" x1="17" y1="18" x2="17" y2="31" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E60076" /><stop offset="1" stopColor="#FB64B6" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        title: "Client Focused",
        description: "Designs tailored to your needs and lifestyle.",
    },
    {
        icon: (
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bespoke Solutions — diamond/gem icon */}
                <path d="M17 3L3 13.5l14 17.5 14-17.5L17 3z" stroke="url(#bs-a)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 13.5h28" stroke="url(#bs-b)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 3l4 10.5M24 3l-4 10.5" stroke="url(#bs-c)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                    <linearGradient id="bs-a" x1="17" y1="3" x2="17" y2="31" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E60076" /><stop offset="1" stopColor="#FB64B6" />
                    </linearGradient>
                    <linearGradient id="bs-b" x1="3" y1="13.5" x2="31" y2="13.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E60076" /><stop offset="1" stopColor="#FB64B6" />
                    </linearGradient>
                    <linearGradient id="bs-c" x1="17" y1="3" x2="17" y2="13.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E60076" /><stop offset="1" stopColor="#FB64B6" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        title: "Bespoke Solutions",
        description: "Unique, functional and aesthetic spaces.",
    },
    {
        icon: (
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Fast & Efficient — clock icon */}
                <circle cx="17" cy="17" r="13.5" stroke="url(#fe-a)" strokeWidth="1.5" />
                <path d="M17 9v8l5 3" stroke="url(#fe-b)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id="fe-a" x1="17" y1="3.5" x2="17" y2="30.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E60076" /><stop offset="1" stopColor="#FB64B6" />
                    </linearGradient>
                    <linearGradient id="fe-b" x1="17" y1="9" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E60076" /><stop offset="1" stopColor="#FB64B6" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        title: "Fast & Efficient",
        description: "On-time delivery without compromising quality.",
    },
    {
        icon: (
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Premium Quality — award/medal icon */}
                <circle cx="17" cy="13" r="9.5" stroke="url(#pq-a)" strokeWidth="1.5" />
                <path d="M11.5 21l-3 10 8.5-4 8.5 4-3-10" stroke="url(#pq-b)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id="pq-a" x1="17" y1="3.5" x2="17" y2="22.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E60076" /><stop offset="1" stopColor="#FB64B6" />
                    </linearGradient>
                    <linearGradient id="pq-b" x1="17" y1="21" x2="17" y2="31" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E60076" /><stop offset="1" stopColor="#FB64B6" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        title: "Premium Quality",
        description: "Every detail crafted with excellence and care.",
    },
];