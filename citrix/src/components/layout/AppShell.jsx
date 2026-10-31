// src/components/layout/AppShell.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { DEMO_ACCOUNTS } from '@/data/demoData';
import {
  LayoutDashboard,
  Boxes,
  CalendarDays,
  CalendarCheck2,
  FileCheck2,
  Sparkles,
  BarChart3,
  History,
  Database,
  CalendarRange,
  Search,
  Bell,
  LogOut,
  ChevronDown,
  UserCheck,
  Building,
  AlertTriangle,
  GitCompare,
  MessageSquare,
  Menu,
  X,
  ShieldCheck,
  User,
  Layers,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Badge, DemoBanner } from '@/components/common';

export default function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, login } = useAuthStore();
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Grouped navigation per role
  const getNavLinks = () => {
    const role = user?.role || 'admin';

    if (role === 'admin') {
      return [
        {
          group: 'CORE OVERVIEW',
          items: [
            { label: 'Command Center', icon: LayoutDashboard, path: '/admin' },
            { label: '3D Campus Explorer', icon: Boxes, path: '/campus', highlight: true },
            { label: 'Campus Analytics', icon: BarChart3, path: '/admin/analytics' },
          ],
        },
        {
          group: 'TIMETABLE & SOLVER',
          items: [
            { label: 'Generate Timetable', icon: Sparkles, path: '/admin/timetable/generate' },
            { label: 'Weekly Timetable', icon: CalendarDays, path: '/timetable/weekly' },
            { label: 'Midsem Exams', icon: CalendarRange, path: '/admin/midsem' },
            { label: 'Disruptions & Repair', icon: AlertTriangle, path: '/admin/disruptions' },
            { label: 'Schedule Diff / Compare', icon: GitCompare, path: '/admin/timetable/compare' },
          ],
        },
        {
          group: 'MANAGEMENT & OPERATIONS',
          items: [
            { label: 'Spectra Week Events', icon: CalendarCheck2, path: '/admin/spectra' },
            { label: 'Approvals Queue', icon: FileCheck2, path: '/approvals' },
            { label: 'Room Directory & Status', icon: Building, path: '/rooms' },
            { label: 'Booking Registry', icon: Layers, path: '/bookings' },
            { label: 'Audit Trail', icon: History, path: '/admin/audit' },
            { label: 'Dataset Import/Export', icon: Database, path: '/admin/data' },
          ],
        },
      ];
    }

    if (role === 'coordinator') {
      return [
        {
          group: 'DEPARTMENT HUB',
          items: [
            { label: 'Dept Dashboard', icon: LayoutDashboard, path: '/coordinator' },
            { label: '3D Campus Explorer', icon: Boxes, path: '/campus', highlight: true },
            { label: 'Dept Timetable', icon: CalendarDays, path: '/timetable/weekly' },
            { label: 'Room Availability', icon: Building, path: '/rooms' },
          ],
        },
        {
          group: 'OPERATIONS',
          items: [
            { label: 'Approvals & Lab Access', icon: FileCheck2, path: '/approvals' },
            { label: 'Department Bookings', icon: Layers, path: '/bookings' },
            { label: 'New Venue Request', icon: CalendarCheck2, path: '/bookings/new' },
            { label: 'AI Campus Assistant', icon: MessageSquare, path: '/assistant' },
            { label: 'Notifications', icon: Bell, path: '/notifications' },
          ],
        },
      ];
    }

    if (role === 'faculty') {
      return [
        {
          group: 'FACULTY WORKSPACE',
          items: [
            { label: 'Faculty Dashboard', icon: LayoutDashboard, path: '/faculty' },
            { label: '3D Campus Navigator', icon: Boxes, path: '/campus', highlight: true },
            { label: 'My Teaching Timetable', icon: CalendarDays, path: '/timetable/weekly' },
            { label: 'Classroom Directory', icon: Building, path: '/rooms' },
          ],
        },
        {
          group: 'REQUESTS & BOOKINGS',
          items: [
            { label: 'AI Booking Assistant', icon: Sparkles, path: '/assistant', highlight: true },
            { label: 'Book Extra Room', icon: CalendarCheck2, path: '/bookings/new' },
            { label: 'My Bookings & History', icon: Layers, path: '/bookings' },
            { label: 'Report Unavailability', icon: AlertTriangle, path: '/faculty/unavailability' },
            { label: 'Notifications', icon: Bell, path: '/notifications' },
          ],
        },
      ];
    }

    // Club Representative
    return [
      {
        group: 'STUDENT CLUB WORKSPACE',
        items: [
          { label: 'Club Hub', icon: LayoutDashboard, path: '/club' },
          { label: '3D Campus Explorer', icon: Boxes, path: '/campus', highlight: true },
          { label: 'Explore Venues', icon: Building, path: '/rooms' },
        ],
      },
      {
        group: 'VENUE BOOKING',
        items: [
          { label: 'Smart AI Booking (NL)', icon: Sparkles, path: '/bookings/new/nl', highlight: true },
          { label: 'Manual Booking Form', icon: CalendarCheck2, path: '/bookings/new' },
          { label: 'Booking Status & History', icon: Layers, path: '/bookings' },
          { label: 'AI Assistant', icon: MessageSquare, path: '/assistant' },
          { label: 'Notifications', icon: Bell, path: '/notifications' },
        ],
      },
    ];
  };

  const navGroups = getNavLinks();

  const handleRoleSwitch = (accId) => {
    login(accId);
    setRoleMenuOpen(false);
    const target = DEMO_ACCOUNTS.find((a) => a.id === accId);
    if (target?.role === 'admin') navigate('/admin');
    else if (target?.role === 'coordinator') navigate('/coordinator');
    else if (target?.role === 'faculty') navigate('/faculty');
    else if (target?.role === 'club') navigate('/club');
  };

  const roleBadgeVariants = {
    admin: 'blue',
    coordinator: 'teal',
    faculty: 'purple',
    club: 'amber',
  };

  const roleLabelMap = {
    admin: "Admin (Dean's Office)",
    coordinator: 'Dept Coordinator (CSE)',
    faculty: 'Faculty (Prof. Kumar)',
    club: 'Club Representative',
  };

  return (
    <div className="min-h-screen bg-[#080A09] text-white flex flex-col antialiased font-sans selection:bg-[#B8F36B] selection:text-[#101110]">
      {/* Top Header */}
      <header className="h-16 border-b border-[#1F2420] bg-[#080A09]/95 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#161B18] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#080A09] border border-[#1F2420] flex items-center justify-center shadow-lg font-black text-[#B8F36B] text-base">
              C
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-lg text-white">
                CIT<span className="text-[#B8F36B]">RIX</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] tracking-wider text-[#9AA19C] font-mono font-medium uppercase border-l border-[#1F2420] pl-2">
                CampusOS Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Demo banner indicator */}
        <div className="hidden md:flex items-center">
          <DemoBanner text="CampusOS Simulation Active • Zero Clashes" />
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121614] border border-[#1F2420] hover:border-[#B8F36B]/50 text-xs font-semibold text-slate-200 transition-all shadow-sm"
              title="Switch demo persona"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8F36B]" />
              <span className="hidden sm:inline">{roleLabelMap[user?.role] || 'Select Role'}</span>
              <ChevronDown className="w-3 h-3 text-[#9AA19C]" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#080A09] border border-[#1F2420] rounded-2xl shadow-2xl p-2 z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#777D78] uppercase tracking-wider border-b border-[#1F2420]">
                  Switch Persona (Demo)
                </div>
                <div className="space-y-1 mt-1">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => handleRoleSwitch(acc.id)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs transition-colors',
                        user?.id === acc.id
                          ? 'bg-[#B8F36B]/15 text-[#B8F36B] border border-[#B8F36B]/30 font-semibold'
                          : 'hover:bg-[#161B18] text-slate-300'
                      )}
                    >
                      <div
                        className={cn(
                          'w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs',
                          acc.color
                        )}
                      >
                        {acc.avatar}
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-slate-100">{acc.name}</div>
                        <div className="text-[10px] text-[#9AA19C] truncate">{acc.designation}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications bell */}
          <Link
            to="/notifications"
            className="relative p-2 text-slate-400 hover:text-white hover:bg-[#161B18] rounded-xl transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B8F36B] text-[#101110] text-[10px] font-black flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-[#161B18] rounded-xl transition-colors"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for Desktop */}
        <aside
          className={cn(
            'fixed inset-y-16 left-0 z-30 w-64 bg-[#080A09]/95 border-r border-[#1F2420] flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 backdrop-blur-xl',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* User profile capsule in sidebar */}
          <div className="p-4 border-b border-[#1F2420]">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#121614] border border-[#1F2420]">
              <div
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-md',
                  user?.color || 'bg-[#161B18] border border-[#1F2420]'
                )}
              >
                {user?.avatar || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-100 truncate">{user?.name}</div>
                <div className="text-[11px] text-[#9AA19C] truncate">{user?.designation}</div>
                <div className="mt-1">
                  <Badge variant={roleBadgeVariants[user?.role] || 'blue'} size="sm">
                    {user?.role?.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Items Scrollable */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {navGroups.map((group, idx) => (
              <div key={idx}>
                <div className="px-3 text-[10px] font-bold tracking-wider text-[#777D78] uppercase mb-2">
                  {group.group}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all group',
                          active
                            ? 'bg-[#B8F36B] text-[#101110] font-black shadow-md shadow-[#B8F36B]/15 border border-[#B8F36B]'
                            : 'text-[#9AA19C] hover:text-white hover:bg-[#121614]',
                          item.highlight && !active && 'text-[#B8F36B] hover:text-[#A6E854]'
                        )}
                      >
                        <Icon
                          className={cn(
                            'w-4 h-4 transition-transform group-hover:scale-110',
                            active ? 'text-[#101110]' : item.highlight ? 'text-[#B8F36B]' : 'text-[#777D78] group-hover:text-white'
                          )}
                        />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.highlight && (
                          <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', active ? 'bg-[#101110]' : 'bg-[#B8F36B]')} />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick footer */}
          <div className="p-3 border-t border-[#1F2420] text-[11px] text-[#777D78] flex items-center justify-between font-mono">
            <span>CITRIX v2.4</span>
            <span className="text-[#B8F36B] font-semibold">CampusOS Active</span>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
