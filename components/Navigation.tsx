'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { History, Gamepad2, Home, BookOpen, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { href: '/', label: 'Checker', icon: Gamepad2 },
    { href: '/history', label: 'History', icon: History },
  ];

  const isActive = (href: string) => pathname === href;

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex items-center justify-around py-2 z-50">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}>
            <Button
              variant={isActive(href) ? 'default' : 'ghost'}
              size="sm"
              className="flex flex-col py-6 items-center gap-1 cursor-pointer"
              title={label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </Button>
          </Link>
        ))}
      </nav>
    );
  }

  // Desktop Top Navigation
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">Anagram Checker</div>
        <div className="flex items-center gap-2">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href}>
              <Button
                variant={isActive(href) ? 'default' : 'ghost'}
                className="font-medium cursor-pointer"
              >
                {label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
