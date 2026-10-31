// src/features/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { DEMO_ACCOUNTS } from '@/data/demoData';
import {
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Building2,
  Calendar,
  Layers,
  GraduationCap,
  Users,
  Compass,
  CheckCircle2,
  Lock,
  Mail,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { Button, Badge } from '@/components/common';
import { useToast } from '@/components/common/Toaster';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingRole, setLoadingRole] = useState(null);

  const handleDemoSelect = (account) => {
    setLoadingRole(account.id);
    setTimeout(() => {
      login(account.id);
      toast.success(`Logged in as ${account.name} (${account.designation})`);

      if (account.role === 'admin') navigate('/admin');
      else if (account.role === 'coordinator') navigate('/coordinator');
      else if (account.role === 'faculty') navigate('/faculty');
      else if (account.role === 'club') navigate('/club');
      else navigate('/campus');
    }, 400);
  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    // Default to admin or match email
    const match = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase()
    );
    if (match) {
      handleDemoSelect(match);
    } else {
      // Log in as admin demo by default
      handleDemoSelect(DEMO_ACCOUNTS[0]);
    }
  };

  const roleStyles = {
    admin: {
      border: 'hover:border-[#B8F36B]/70',
      badge: 'blue',
      glow: 'hover:shadow-[#B8F36B]/15',
      tag: "Master Institutional Control",
    },
    coordinator: {
      border: 'hover:border-[#10B981]/70',
      badge: 'teal',
      glow: 'hover:shadow-[#10B981]/15',
      tag: "Department Timetable & Labs",
    },
    faculty: {
      border: 'hover:border-[#B8F36B]/70',
      badge: 'blue',
      glow: 'hover:shadow-[#B8F36B]/15',
      tag: "Personal Timetable & AI Assistant",
    },
    club: {
      border: 'hover:border-amber-500/70',
      badge: 'amber',
      glow: 'hover:shadow-amber-950/50',
      tag: "Spectra & Venue Booking",
    },
  };

  return (
    <div className="min-h-screen bg-[#080A09] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-[#B8F36B] selection:text-[#101110]">
      {/* Background ambient decorative glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[520px] h-[520px] rounded-full bg-[#B8F36B]/6 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[520px] h-[520px] rounded-full bg-[#007A64]/10 blur-[140px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="w-full max-w-5xl z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121614] border border-[#1F2420] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B8F36B] animate-pulse" />
            <span className="text-[11px] font-bold text-[#B8F36B] tracking-wider uppercase font-mono">
              CITRIX • CAMPUSOS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            CITRIX <span className="text-[#B8F36B]">CampusOS</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9AA19C] font-mono tracking-widest uppercase font-semibold">
            ONE CAMPUS. ONE SYSTEM. ZERO CLASHES.
          </p>
          <p className="text-xs sm:text-sm text-[#777D78] max-w-xl mx-auto leading-relaxed">
            Intelligent 3D campus scheduling, conflict resolution, CP-SAT timetable synthesis, and natural language venue management.
          </p>
        </div>

        {/* 4 Demo Roles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-[#B8F36B]" />
              Select Role for Instant Demo Access
            </h2>
            <span className="text-xs text-[#777D78]">Click any card to sign in</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEMO_ACCOUNTS.map((account) => {
              const style = roleStyles[account.role];
              const isLoading = loadingRole === account.id;

              return (
                <div
                  key={account.id}
                  onClick={() => handleDemoSelect(account)}
                  className={`group relative bg-[#121614]/90 hover:bg-[#161B18] border border-[#1F2420] ${style.border} rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-xl ${style.glow} flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-md ${account.color}`}
                      >
                        {account.avatar}
                      </div>
                      <Badge variant={style.badge} size="sm">
                        {account.role}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-100 group-hover:text-white transition-colors text-base">
                        {account.name}
                      </h3>
                      <p className="text-xs text-[#9AA19C] mt-0.5 line-clamp-1">
                        {account.designation}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#1F2420] text-[11px] text-[#9AA19C] leading-snug">
                      <span className="text-slate-300 font-medium">Scope: </span>
                      {style.tag}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1F2420] flex items-center justify-between text-xs font-bold text-[#B8F36B] group-hover:text-[#A6E854] transition-colors">
                    <span>{isLoading ? 'Accessing...' : 'Enter Dashboard'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider / Manual login area */}
        <div className="bg-[#121614]/80 border border-[#1F2420] rounded-2xl p-6 backdrop-blur-md max-w-md mx-auto">
          <div className="text-center mb-5">
            <h3 className="text-sm font-bold text-slate-100">Or Sign In with Credentials</h3>
            <p className="text-xs text-[#9AA19C] mt-1">
              Production accounts are authenticated through backend OAuth / SSO
            </p>
          </div>

          <form onSubmit={handleManualLogin} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-[#9AA19C] font-medium">CIT Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777D78]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. dean@cit.ac.in"
                  className="w-full pl-9 pr-3 py-2 bg-[#080A09] border border-[#1F2420] rounded-xl text-xs sm:text-sm text-slate-100 placeholder-[#777D78] focus:outline-none focus:ring-2 focus:ring-[#B8F36B]/40 focus:border-[#B8F36B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#9AA19C] font-medium">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777D78]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-[#080A09] border border-[#1F2420] rounded-xl text-xs sm:text-sm text-slate-100 placeholder-[#777D78] focus:outline-none focus:ring-2 focus:ring-[#B8F36B]/40 focus:border-[#B8F36B]"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2">
              Sign In to Platform
            </Button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-[11px] text-[#777D78]">
              Demo tip: Selecting any demo card above grants immediate authenticated access.
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#777D78] pt-6 border-t border-[#1F2420] gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#9AA19C]" />
            <span>Chilika Institute of Technology Campus Operations</span>
          </div>
          <div>
            <span>Backend Integration: Mock Adapter v2.1 • CP-SAT API Contract Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
