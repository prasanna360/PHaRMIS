import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import {
  ArrowRight, FileText, Brain, Activity, ShieldAlert,
  Upload, BarChart3, Sparkles, Stethoscope, HeartPulse,
  CheckCircle2, Lock, Smartphone, Bell,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    { icon: FileText, title: 'EHR Management', desc: 'Centralize your medical history, allergies, medications, chronic conditions, and uploaded records in one secure place.', color: 'rose' },
    { icon: Activity, title: 'Daily Health Tracker', desc: 'Log your mood, symptoms, vitals, sleep, water intake, and physical activity with beautiful visual charts.', color: 'lavender' },
    { icon: Brain, title: 'AI-Powered Insights', desc: 'Receive personalized health trend analysis, pattern detection, and lifestyle recommendations from your data.', color: 'rose' },
    { icon: ShieldAlert, title: 'Smart Risk Alerts', desc: 'Get timely notifications about potential health concerns with clear severity levels and actionable recommendations.', color: 'lavender' },
  ];

  const steps = [
    { num: '01', title: 'Add Your Records', desc: 'Upload or manually enter your medical history, allergies, medications, and previous checkups.', icon: Upload },
    { num: '02', title: 'Track Your Health', desc: 'Record daily health information including mood, vitals, sleep, and lifestyle factors.', icon: BarChart3 },
    { num: '03', title: 'Analyze', desc: 'PHaRMiS analyzes your health data to identify trends, patterns, and potential concerns.', icon: Brain },
    { num: '04', title: 'Get Insights', desc: 'Receive personalized insights, recommendations, and risk alerts based on your data.', icon: Sparkles },
  ];

  const highlights = [
    { icon: Lock, title: 'Secure Health Records', desc: 'Your data stays private and protected' },
    { icon: Brain, title: 'AI-Powered Insights', desc: 'Smart analysis of your health trends' },
    { icon: Activity, title: 'Daily Monitoring', desc: 'Track vitals and lifestyle effortlessly' },
    { icon: Bell, title: 'Smart Risk Alerts', desc: 'Timely notifications for health concerns' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar onNavigate={onNavigate} />

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-gradient-hero pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-rose-100/40 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-lavender-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-600">
              <HeartPulse className="h-3.5 w-3.5" />
              Personal Health Monitoring Intelligence
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-800 sm:text-5xl lg:text-6xl">
              Your Health.<br />
              Your Records.<br />
              <span className="text-gradient-brand">Your Intelligence.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg">
              PHaRMiS brings your health records, daily monitoring, personalized insights, and risk alerts together in one intelligent platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('signup')} className="btn-primary text-base">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary text-base">
                Explore Features
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {['No medical jargon', 'Track daily health', 'Get AI insights'].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-ink-500">
                  <CheckCircle2 className="h-4 w-4 text-rose-400" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard illustration */}
          <div className="relative animate-fade-in-scale animate-delay-200">
            <div className="relative mx-auto max-w-md">
              {/* Main dashboard card */}
              <div className="card-base p-5 shadow-card-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-ink-400">Good Morning</p>
                    <p className="text-lg font-bold text-ink-800">Aarohi Sharma</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-rose">
                    <HeartPulse className="h-5 w-5 text-rose-500" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-gradient-rose p-3.5">
                    <p className="text-xs text-ink-500">Heart Rate</p>
                    <p className="text-xl font-bold text-ink-800">72 <span className="text-xs font-normal text-ink-400">bpm</span></p>
                  </div>
                  <div className="rounded-2xl bg-gradient-lavender p-3.5">
                    <p className="text-xs text-ink-500">Blood Pressure</p>
                    <p className="text-xl font-bold text-ink-800">118/76</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-rose p-3.5">
                    <p className="text-xs text-ink-500">Sleep</p>
                    <p className="text-xl font-bold text-ink-800">8.0 <span className="text-xs font-normal text-ink-400">hrs</span></p>
                  </div>
                  <div className="rounded-2xl bg-gradient-lavender p-3.5">
                    <p className="text-xs text-ink-500">Steps</p>
                    <p className="text-xl font-bold text-ink-800">9,200</p>
                  </div>
                </div>
                {/* Mini chart */}
                <div className="mt-4 rounded-2xl border border-ink-100 p-3">
                  <p className="text-xs font-medium text-ink-600">Health Trend (7 days)</p>
                  <svg viewBox="0 0 300 80" className="mt-2 w-full">
                    <defs>
                      <linearGradient id="hero-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F43F6E" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#F43F6E" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M 10 60 L 50 50 L 90 55 L 130 35 L 170 40 L 210 25 L 250 20 L 290 15 L 290 80 L 10 80 Z" fill="url(#hero-grad)" />
                    <path d="M 10 60 L 50 50 L 90 55 L 130 35 L 170 40 L 210 25 L 250 20 L 290 15" fill="none" stroke="#F43F6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Floating AI insight card */}
              <div className="absolute -bottom-6 -left-4 card-base p-3.5 shadow-card-lg animate-float w-52 hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lavender-100">
                    <Sparkles className="h-4 w-4 text-lavender-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-800">AI Insight</p>
                    <p className="text-[10px] text-ink-400">Stable pattern detected</p>
                  </div>
                </div>
              </div>

              {/* Floating alert card */}
              <div className="absolute -top-4 -right-2 card-base p-3.5 shadow-card-lg animate-float w-44 hidden sm:block" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-800">Low Risk</p>
                    <p className="text-[10px] text-ink-400">All vitals stable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Feature Highlights */}
      <section className="border-y border-ink-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className="flex items-start gap-3 rounded-2xl border border-ink-100 p-4 transition-all hover:border-rose-200 hover:shadow-soft animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-rose-500">
                  <h.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink-800">{h.title}</p>
                  <p className="mt-0.5 text-xs text-ink-500">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-rose-500">Features</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink-800 sm:text-4xl">
              Everything you need to manage your health
            </h2>
            <p className="mt-4 text-base text-ink-500">
              Four powerful modules designed to give you complete control over your personal health journey.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card-base card-hover p-7 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${f.color === 'rose' ? 'bg-gradient-rose text-rose-500' : 'bg-gradient-lavender text-lavender-600'}`}>
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink-800">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{f.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.title === 'EHR Management' && ['Medical History', 'Allergies', 'Medications', 'Checkups', 'Upload Records'].map(t => (
                    <span key={t} className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">{t}</span>
                  ))}
                  {f.title === 'Daily Health Tracker' && ['Mood', 'Symptoms', 'Vitals', 'Sleep', 'Lifestyle'].map(t => (
                    <span key={t} className="rounded-lg bg-lavender-50 px-2.5 py-1 text-xs font-medium text-lavender-600">{t}</span>
                  ))}
                  {f.title === 'AI-Powered Insights' && ['Trend Analysis', 'Pattern Detection', 'Recommendations', 'Demo Insights'].map(t => (
                    <span key={t} className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">{t}</span>
                  ))}
                  {f.title === 'Smart Risk Alerts' && ['Low Risk', 'Moderate Risk', 'High Risk', 'Recommendations'].map(t => (
                    <span key={t} className="rounded-lg bg-lavender-50 px-2.5 py-1 text-xs font-medium text-lavender-600">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Risk alert demo */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { level: 'Low Risk', desc: 'Everything appears stable', color: 'emerald', icon: CheckCircle2 },
              { level: 'Moderate Risk', desc: 'Some indicators need attention', color: 'amber', icon: ShieldAlert },
              { level: 'High Risk', desc: 'Consider contacting a professional', color: 'rose', icon: ShieldAlert },
            ].map((r) => (
              <div key={r.level} className={`rounded-2xl border p-5 ${
                r.color === 'emerald' ? 'border-emerald-200 bg-emerald-50' :
                r.color === 'amber' ? 'border-amber-200 bg-amber-50' :
                'border-rose-200 bg-rose-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    r.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    r.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                    'bg-rose-100 text-rose-600'
                  }`}>
                    <r.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-ink-800">{r.level}</p>
                    <p className="text-xs text-ink-500">{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gradient-brand-soft py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-lavender-600">How It Works</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink-800 sm:text-4xl">
              Your health journey in four simple steps
            </h2>
          </div>

          {/* Horizontal timeline (desktop) */}
          <div className="mt-16 hidden lg:block">
            <div className="relative">
              <div className="absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-200 via-lavender-200 to-rose-200" />
              <div className="grid grid-cols-4 gap-6">
                {steps.map((s, i) => (
                  <div key={s.num} className="relative flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card border-2 border-rose-200">
                      <s.icon className="h-6 w-6 text-rose-500" />
                    </div>
                    <span className="mt-4 text-sm font-bold text-gradient-rose">{s.num}</span>
                    <h3 className="mt-1 text-lg font-bold text-ink-800">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical timeline (mobile) */}
          <div className="mt-12 lg:hidden">
            <div className="relative space-y-8">
              <div className="absolute left-7 top-2 bottom-2 w-0.5 bg-gradient-to-b from-rose-200 via-lavender-200 to-rose-200" />
              {steps.map((s, i) => (
                <div key={s.num} className="relative flex gap-5 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-card border-2 border-rose-200">
                    <s.icon className="h-6 w-6 text-rose-500" />
                  </div>
                  <div className="pt-1">
                    <span className="text-sm font-bold text-gradient-rose">{s.num}</span>
                    <h3 className="text-lg font-bold text-ink-800">{s.title}</h3>
                    <p className="mt-1 text-sm text-ink-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <p className="text-sm font-semibold uppercase tracking-wider text-rose-500">About PHaRMiS</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink-800 sm:text-4xl">
                Personal Health and Record Monitoring Intelligence System
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                PHaRMiS is a personal healthcare management and monitoring system designed to empower individuals to take charge of their own health. It combines electronic health record management, daily health tracking, AI-driven insights, and risk alerts into a single, user-friendly platform.
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink-500">
                The system is built on a structured database design with proper normalization, reflecting a real healthcare record system rather than a simple data dump. It separates user profiles, medical history, daily entries, medications, and appointments into appropriate entities.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Major Functions', value: '4' },
                  { label: 'Health Modules', value: '8+' },
                  { label: 'Data Entities', value: '10+' },
                  { label: 'Normalization', value: 'Up to 5NF' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-ink-100 p-4">
                    <p className="text-2xl font-extrabold text-gradient-rose">{stat.value}</p>
                    <p className="text-sm text-ink-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-in-scale animate-delay-200">
              <div className="card-base p-6 shadow-card-lg">
                <div className="flex items-center gap-3 border-b border-ink-100 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-rose">
                    <Stethoscope className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-bold text-ink-800">Project Architecture</p>
                    <p className="text-xs text-ink-400">Structured healthcare record system</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'User & Profile Management', icon: '👤' },
                    { label: 'Electronic Health Records (EHR)', icon: '📋' },
                    { label: 'Daily Health Monitoring', icon: '📊' },
                    { label: 'AI Insights & Analytics', icon: '🧠' },
                    { label: 'Risk Alert System', icon: '⚠️' },
                    { label: 'Appointment Scheduling', icon: '📅' },
                    { label: 'Health Chatbot Assistant', icon: '💬' },
                    { label: 'Document Upload & Storage', icon: '📎' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl bg-ink-50 px-4 py-2.5">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium text-ink-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 rounded-3xl border border-lavender-200 bg-lavender-50 p-6 text-center">
            <p className="text-sm text-lavender-800">
              <strong>Disclaimer:</strong> PHaRMiS is an academic health-monitoring project that provides informational insights based on entered health data. It is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-5xl bg-gradient-to-br from-rose-500 to-rose-600 px-6 py-14 text-center shadow-card-lg sm:px-12">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            Start managing your health intelligently
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-100">
            Join PHaRMiS today and take control of your personal health records, daily monitoring, and AI-driven insights.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('signup')} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-rose-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => onNavigate('login')} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20">
              Login to Dashboard
            </button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['Secure & Private', 'Easy to Use', 'Academic Project'].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-sm text-rose-100">
                <CheckCircle2 className="h-4 w-4" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
