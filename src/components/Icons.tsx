'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Type for Lucide icons
interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

const createIcon = (importFn: () => Promise<any>) => 
  dynamic(() => importFn().then((mod) => {
    // Some versions of lucide-react might have different export patterns
    return mod.default || mod;
  }), { ssr: false }) as React.FC<IconProps>;

// Dynamically import icons to prevent SSR build failures
// Using direct string imports for better reliability with Turbopack
export const Mail = dynamic(() => import('lucide-react').then(m => m.Mail), { ssr: false }) as any;
export const Lock = dynamic(() => import('lucide-react').then(m => m.Lock), { ssr: false }) as any;
export const LogIn = dynamic(() => import('lucide-react').then(m => m.LogIn), { ssr: false }) as any;
export const Github = dynamic(() => import('lucide-react').then(m => m.Github || (m as any).GitHub), { ssr: false }) as any;
export const BookOpen = dynamic(() => import('lucide-react').then(m => m.BookOpen), { ssr: false }) as any;
export const User = dynamic(() => import('lucide-react').then(m => m.User), { ssr: false }) as any;
export const Menu = dynamic(() => import('lucide-react').then(m => m.Menu), { ssr: false }) as any;
export const X = dynamic(() => import('lucide-react').then(m => m.X), { ssr: false }) as any;
export const Star = dynamic(() => import('lucide-react').then(m => m.Star), { ssr: false }) as any;
export const Shield = dynamic(() => import('lucide-react').then(m => m.Shield), { ssr: false }) as any;
export const Zap = dynamic(() => import('lucide-react').then(m => m.Zap), { ssr: false }) as any;
export const Users = dynamic(() => import('lucide-react').then(m => m.Users), { ssr: false }) as any;
export const Calendar = dynamic(() => import('lucide-react').then(m => m.Calendar), { ssr: false }) as any;
export const MessageSquare = dynamic(() => import('lucide-react').then(m => m.MessageSquare), { ssr: false }) as any;
export const Settings = dynamic(() => import('lucide-react').then(m => m.Settings), { ssr: false }) as any;
export const Briefcase = dynamic(() => import('lucide-react').then(m => m.Briefcase), { ssr: false }) as any;
export const GraduationCap = dynamic(() => import('lucide-react').then(m => m.GraduationCap), { ssr: false }) as any;
export const ArrowRight = dynamic(() => import('lucide-react').then(m => m.ArrowRight), { ssr: false }) as any;
export const LogOut = dynamic(() => import('lucide-react').then(m => m.LogOut), { ssr: false }) as any;
export const ChevronRight = dynamic(() => import('lucide-react').then(m => m.ChevronRight), { ssr: false }) as any;
export const Heart = dynamic(() => import('lucide-react').then(m => m.Heart), { ssr: false }) as any;
export const Globe = dynamic(() => import('lucide-react').then(m => m.Globe), { ssr: false }) as any;
export const Award = dynamic(() => import('lucide-react').then(m => m.Award), { ssr: false }) as any;
export const Search = dynamic(() => import('lucide-react').then(m => m.Search), { ssr: false }) as any;
export const SlidersHorizontal = dynamic(() => import('lucide-react').then(m => m.SlidersHorizontal), { ssr: false }) as any;
