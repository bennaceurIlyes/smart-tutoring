'use client';

import dynamic from 'next/dynamic';

// Dynamically import icons to prevent SSR build failures
export const Mail = dynamic(() => import('lucide-react').then((mod) => mod.Mail), { ssr: false });
export const Lock = dynamic(() => import('lucide-react').then((mod) => mod.Lock), { ssr: false });
export const LogIn = dynamic(() => import('lucide-react').then((mod) => mod.LogIn), { ssr: false });
export const Github = dynamic(() => import('lucide-react').then((mod) => mod.Github), { ssr: false });
export const BookOpen = dynamic(() => import('lucide-react').then((mod) => mod.BookOpen), { ssr: false });
export const User = dynamic(() => import('lucide-react').then((mod) => mod.User), { ssr: false });
export const Menu = dynamic(() => import('lucide-react').then((mod) => mod.Menu), { ssr: false });
export const X = dynamic(() => import('lucide-react').then((mod) => mod.X), { ssr: false });
export const Star = dynamic(() => import('lucide-react').then((mod) => mod.Star), { ssr: false });
export const Shield = dynamic(() => import('lucide-react').then((mod) => mod.Shield), { ssr: false });
export const Zap = dynamic(() => import('lucide-react').then((mod) => mod.Zap), { ssr: false });
export const Users = dynamic(() => import('lucide-react').then((mod) => mod.Users), { ssr: false });
export const Calendar = dynamic(() => import('lucide-react').then((mod) => mod.Calendar), { ssr: false });
export const MessageSquare = dynamic(() => import('lucide-react').then((mod) => mod.MessageSquare), { ssr: false });
export const Settings = dynamic(() => import('lucide-react').then((mod) => mod.Settings), { ssr: false });
export const Briefcase = dynamic(() => import('lucide-react').then((mod) => mod.Briefcase), { ssr: false });
export const GraduationCap = dynamic(() => import('lucide-react').then((mod) => mod.GraduationCap), { ssr: false });
export const ArrowRight = dynamic(() => import('lucide-react').then((mod) => mod.ArrowRight), { ssr: false });
export const LogOut = dynamic(() => import('lucide-react').then((mod) => mod.LogOut), { ssr: false });
export const ChevronRight = dynamic(() => import('lucide-react').then((mod) => mod.ChevronRight), { ssr: false });
export const Heart = dynamic(() => import('lucide-react').then((mod) => mod.Heart), { ssr: false });
export const Globe = dynamic(() => import('lucide-react').then((mod) => mod.Globe), { ssr: false });
export const Award = dynamic(() => import('lucide-react').then((mod) => mod.Award), { ssr: false });
export const Search = dynamic(() => import('lucide-react').then((mod) => mod.Search), { ssr: false });
