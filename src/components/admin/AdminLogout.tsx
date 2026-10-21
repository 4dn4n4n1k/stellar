'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export const AdminLogout: React.FC = () => {
  return (
    <Link
      href="/admin/logout"
      prefetch={false}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 600,
        color: '#e2e8f0',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        textDecoration: 'none',
        lineHeight: '1.4',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
      }}
      title="Log out of Admin Panel"
    >
      <LogOut size={14} strokeWidth={2} />
      <span>Log out</span>
    </Link>
  );
};
