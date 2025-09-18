'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import './TopLoader.css';

const TopLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return loading ? <div className="top-loader"></div> : null;
};

export default TopLoader;
