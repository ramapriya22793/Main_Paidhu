'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Calendar, User, Layers, TrendingUp } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  completionDate: string;
  client: string;
  stats: { label: string; value: string }[];
  link: string;
}

const projectsData: Project[] = [
  {
    id: 'proj-1',
    title: 'Paidhu Flora Agro Farms',
    category: 'Agri-Tech',
    description: 'A fully automated greenhouse infrastructure system integrated with precision soil analytics, IoT moisture routing, and organic crop tracking for premium petal cultivation.',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=1200',
    technologies: ['IoT Soil Nodes', 'Next.js Analytics Portal', 'Precision Drip Tech'],
    completionDate: 'Q2 2026',
    client: 'Paidhu Group Ventures',
    stats: [
      { label: 'Yield Increase', value: '45%' },
      { label: 'Water Saved', value: '30%' }
    ],
    link: 'https://www.paidhuethicalfoods.com'
  },
  {
    id: 'proj-2',
    title: 'Floffi Smart Logistics Platform',
    category: 'Supply Chain',
    description: 'An enterprise cold-chain monitoring system utilizing smart sensor tags, live location tracking, and real-time freshness telemetry for automated preserves distribution.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    technologies: ['Freshness Sensors', 'Automated Routing', 'Real-time Telemetry'],
    completionDate: 'Q1 2026',
    client: 'Floffi Preservation Labs',
    stats: [
      { label: 'Freshness Retention', value: '98%' },
      { label: 'Transit Delay Reduce', value: '25%' }
    ],
    link: 'https://floffi.in'
  },
  {
    id: 'proj-3',
    title: 'Viyara AI Enterprise Engine',
    category: 'Technology',
    description: 'A scalable machine learning pipeline orchestrator built to coordinate corporate visual identity curation and high-speed enterprise workflow automation.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    technologies: ['Python PyTorch', 'FastAPI Microservices', 'React UI Engine'],
    completionDate: 'Q4 2025',
    client: 'Viyara Corporate Systems',
    stats: [
      { label: 'Processing Speed', value: '10x' },
      { label: 'Automation Index', value: '92%' }
    ],
    link: 'https://viyara.co.in'
  },
  {
    id: 'proj-4',
    title: 'Kalika Sphere LMS Portal',
    category: 'EdTech',
    description: 'A custom student portal hosting live coding sandboxes, interactive syllabus pathing, and verified digital certificate distribution on the blockchain.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    technologies: ['React Web Sandbox', 'Blockchain Ledger', 'Smart Certificates'],
    completionDate: 'Q3 2025',
    client: 'Kalika Sphere Academics',
    stats: [
      { label: 'Active Students', value: '15K+' },
      { label: 'Course Completion', value: '88%' }
    ],
    link: 'https://www.kalikasphere.com'
  },
  {
    id: 'proj-5',
    title: 'Paidhu Cold-Pressed Extracts',
    category: 'Agri-Food',
    description: 'An advanced extraction chamber processing organic blossoms and saffron threads under inert nitrogen atmosphere to retain 100% natural aromatics.',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=1200',
    technologies: ['Inert Atmosphere', 'Cold Fractionation', 'Aroma Profiling'],
    completionDate: 'Q2 2025',
    client: 'Paidhu Extracts Inc.',
    stats: [
      { label: 'Nutrient Retention', value: '99%' },
      { label: 'Extract Purity', value: '100%' }
    ],
    link: 'https://www.paidhuethicalfoods.com'
  },
  {
    id: 'proj-6',
    title: 'Floffi Smart Packaging System',
    category: 'Industrial',
    description: 'Biodegradable active packaging membranes designed to release micro-nutrients when organic jams are exposed to high external humidity tags.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200',
    technologies: ['Active Bio-Membrane', 'Humidity Resistors', 'Eco Preservation'],
    completionDate: 'Q1 2025',
    client: 'Floffi Eco Solutions',
    stats: [
      { label: 'Shelf Life Extension', value: '40%' },
      { label: 'Plastic Eliminated', value: '100%' }
    ],
    link: 'https://floffi.in'
  }
];

export default function ProjectsSection({ sectionRef }: { sectionRef?: React.RefObject<HTMLDivElement | null> }) {
  const [activeId, setActiveId] = useState(projectsData[0].id);
  const activeProject = projectsData.find((p) => p.id === activeId) || projectsData[0];
  
  // Parallax mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = sectionRef || containerRef;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeRef.current) return;
    const rect = activeRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 35;
    const y = (e.clientY - rect.top - rect.height / 2) / 35;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Sticky scroll observation for desktop
  useEffect(() => {
    const handleScroll = () => {
      if (!activeRef.current || window.innerWidth < 1024) return;
      const rect = activeRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollProgress = -rect.top / (sectionHeight - window.innerHeight);

      if (scrollProgress >= 0 && scrollProgress <= 1) {
        const step = Math.min(
          Math.floor(scrollProgress * projectsData.length),
          projectsData.length - 1
        );
        setActiveId(projectsData[step].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={activeRef}
      id="projects" 
      className="py-24 md:py-32 bg-[#F8F9FC] text-[#1E293B] relative"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A66C44] font-semibold">Our Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#162436] mt-2 mb-4">Corporate Projects</h2>
            <p className="text-sm md:text-base max-w-xl opacity-75 leading-relaxed">
              Explore key milestones across advanced technology integration, sustainable agricultural architecture, and next-generation LMS platforms.
            </p>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (35%): Grid of Project Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:sticky lg:top-28">
            {projectsData.map((project) => {
              const isActive = project.id === activeId;
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveId(project.id)}
                  className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-500 shadow-sm flex flex-col justify-end p-4 lg:p-5 select-none ${
                    isActive 
                      ? 'border-[#FFB547] scale-[1.03] shadow-lg ring-4 ring-[#FFB547]/10' 
                      : 'border-transparent hover:border-gray-200 hover:scale-[1.01]'
                  }`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt="" 
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Dark Gradient Overlay */}
                  <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${
                    isActive ? 'bg-black/60' : 'bg-black/70 group-hover:bg-black/60'
                  }`} />

                  {/* Content Overlay */}
                  <div className="relative z-20 w-full flex items-center justify-between gap-2 text-white">
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase tracking-widest text-[#FFB547] block mb-1">
                        {project.category}
                      </span>
                      <h4 className="font-serif text-xs sm:text-sm font-bold truncate leading-snug">
                        {project.title}
                      </h4>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isActive ? 'translate-x-1.5 text-[#FFB547]' : 'group-hover:translate-x-1 text-white/70'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (65%): Large Featured Showcase Area */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 lg:p-10 border border-gray-200/50 shadow-md">
            
            {/* Dynamic Large Featured Image */}
            <div 
              className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 group/showcase shadow-lg"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.title}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: mousePos.x,
                    y: mousePos.y
                  }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-[#162436]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[10px] uppercase tracking-widest font-semibold">
                {activeProject.category}
              </div>
            </div>

            {/* Showcase Info */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <h3 className="text-2xl lg:text-4xl font-serif font-bold text-[#162436] tracking-tight leading-tight mb-4">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm lg:text-base text-[#1E293B] opacity-80 leading-relaxed font-sans font-light">
                    {activeProject.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Client & Date Meta */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4 text-xs font-sans">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#A66C44]" />
                  <div>
                    <span className="opacity-60 block uppercase tracking-wider text-[9px]">Client</span>
                    <span className="font-semibold text-[#162436]">{activeProject.client}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#A66C44]" />
                  <div>
                    <span className="opacity-60 block uppercase tracking-wider text-[9px]">Completion</span>
                    <span className="font-semibold text-[#162436]">{activeProject.completionDate}</span>
                  </div>
                </div>
              </div>

              {/* Technology Tags */}
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold opacity-60 block mb-3">Technologies Integrated</span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3.5 py-1.5 rounded-full bg-[#F8F9FC] border border-gray-200/40 text-[10px] tracking-wide font-medium text-[#1E293B]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Statistics Showcase */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                {activeProject.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-[#F8F9FC] border border-gray-200/30 rounded-2xl">
                    <span className="text-[9px] uppercase tracking-widest font-semibold opacity-60 block mb-1">
                      {stat.label}
                    </span>
                    <span className="text-2xl lg:text-3xl font-serif font-bold text-[#162436] tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Exploration Link Button */}
              <div className="pt-6">
                <a 
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#162436] hover:bg-[#162436]/90 text-[#FFB547] text-xs uppercase tracking-wider font-semibold rounded-full shadow-md transition-all duration-300 hover:translate-y-[-2px]"
                >
                  Explore Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
