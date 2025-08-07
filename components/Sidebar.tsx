
import React from 'react';
import { Section } from '../types';
import { motion } from 'framer-motion';
import HomeIcon from './icons/HomeIcon';
import HistoryIcon from './icons/HistoryIcon';
import GraduationCapIcon from './icons/GraduationCapIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import UsersIcon from './icons/UsersIcon';
import MessageSquareIcon from './icons/MessageSquareIcon';
import BotIcon from './icons/BotIcon';
import LogoIcon from './icons/LogoIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import InstagramIcon from './icons/InstagramIcon';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const navItems = [
  { section: Section.INTRODUCTION, icon: HomeIcon, label: 'Introduction' },
  { section: Section.HISTORY, icon: HistoryIcon, label: 'History' },
  { section: Section.BASICS, icon: GraduationCapIcon, label: 'The Basics' },
  { section: Section.VOCABULARY, icon: BookOpenIcon, label: 'Vocabulary' },
  { section: Section.GRAMMAR, icon: UsersIcon, label: 'Grammar' },
  { section: Section.CONVERSATIONS, icon: MessageSquareIcon, label: 'Conversations' },
  { section: Section.PRACTICE, icon: BotIcon, label: 'AI Practice' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-zinc-900 border-r border-border p-4 text-foreground">
      <div className="flex items-center gap-3 mb-8">
        <img src="/logo.png" alt="Kréyòl Gwiyanè Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold font-serif text-zinc-100">Kréyòl Gwiyanè</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <button
            key={item.section}
            onClick={() => setActiveSection(item.section)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors relative ${
              activeSection === item.section
                ? 'text-primary-foreground'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
            }`}
          >
            {activeSection === item.section && (
              <motion.div
                layoutId="active-nav-item"
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-md shadow-lg"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <item.icon className="h-5 w-5 mr-3 z-10" />
            <span className="z-10">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto text-center text-zinc-500 text-sm space-y-3 pt-4">
        <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/maurice-holda/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                <LinkedInIcon className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/naga_apparel/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                <InstagramIcon className="w-5 h-5" />
            </a>
        </div>
        <p className="font-medium text-zinc-400">Powered by Naga Apparel</p>
        <p>&copy; 2024 Learn Creole. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
