import type {
  User,
  DailyHealthEntry,
  MedicalHistoryEntry,
  Medication,
  Allergy,
  Checkup,
  UploadedRecord,
  Appointment,
  RiskAlert,
  AIInsight,
} from '@/types';

export const demoUser: User = {
  id: 'demo-001',
  fullName: 'Aarohi Sharma',
  email: 'aarohi.sharma@pharmis.app',
  age: 24,
  gender: 'Female',
  height: "5'5\"",
  city: 'Pune',
  state: 'Maharashtra',
  contact: '+91 98765 43210',
  createdAt: '2025-09-01',
};

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

function daysAhead(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

export const demoDailyEntries: DailyHealthEntry[] = [
  { id: 'e1', date: daysAgo(6), mood: 'Happy', symptoms: [], weight: 58.2, bloodPressureSystolic: 118, bloodPressureDiastolic: 76, heartRate: 72, sleepHours: 7.5, waterIntake: 2.5, physicalActivity: 'Morning walk 30min', steps: 8420, notes: 'Felt energetic today.' },
  { id: 'e2', date: daysAgo(5), mood: 'Good', symptoms: ['Mild headache'], weight: 58.1, bloodPressureSystolic: 120, bloodPressureDiastolic: 78, heartRate: 74, sleepHours: 7, waterIntake: 2.0, physicalActivity: 'Yoga 20min', steps: 6210, notes: 'Headache in evening.' },
  { id: 'e3', date: daysAgo(4), mood: 'Neutral', symptoms: [], weight: 58.0, bloodPressureSystolic: 119, bloodPressureDiastolic: 77, heartRate: 71, sleepHours: 6.5, waterIntake: 2.2, physicalActivity: 'Cycling 25min', steps: 7180, notes: '' },
  { id: 'e4', date: daysAgo(3), mood: 'Good', symptoms: [], weight: 57.9, bloodPressureSystolic: 117, bloodPressureDiastolic: 75, heartRate: 70, sleepHours: 8, waterIntake: 2.8, physicalActivity: 'Jogging 35min', steps: 9850, notes: 'Great sleep last night.' },
  { id: 'e5', date: daysAgo(2), mood: 'Stressed', symptoms: ['Fatigue', 'Back pain'], weight: 58.0, bloodPressureSystolic: 124, bloodPressureDiastolic: 82, heartRate: 78, sleepHours: 5.5, waterIntake: 1.5, physicalActivity: 'None', steps: 3200, notes: 'Long work day, felt tired.' },
  { id: 'e6', date: daysAgo(1), mood: 'Good', symptoms: [], weight: 57.8, bloodPressureSystolic: 118, bloodPressureDiastolic: 76, heartRate: 72, sleepHours: 7.5, waterIntake: 2.5, physicalActivity: 'Walking 40min', steps: 8100, notes: 'Better day overall.' },
  { id: 'e7', date: daysAgo(0), mood: 'Happy', symptoms: [], weight: 57.7, bloodPressureSystolic: 116, bloodPressureDiastolic: 74, heartRate: 69, sleepHours: 8, waterIntake: 2.6, physicalActivity: 'Swimming 30min', steps: 9200, notes: 'Feeling great today!' },
];

export const demoMedicalHistory: MedicalHistoryEntry[] = [
  { id: 'mh1', condition: 'Iron Deficiency Anemia', date: '2024-03-15', notes: 'Diagnased during routine blood work. Prescribed iron supplements.' },
  { id: 'mh2', condition: 'Seasonal Allergic Rhinitis', date: '2023-07-02', notes: 'Occurs during monsoon. Managed with antihistamines.' },
  { id: 'mh3', condition: 'Migraine with Aura', date: '2023-01-20', notes: 'Triggered by stress and lack of sleep. Occasional episodes.' },
];

export const demoMedications: Medication[] = [
  { id: 'med1', name: 'Ferrous Sulfate', dosage: '325mg', frequency: 'Once daily', startDate: '2024-03-20' },
  { id: 'med2', name: 'Cetirizine', dosage: '10mg', frequency: 'As needed', startDate: '2023-07-05' },
  { id: 'med3', name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', startDate: '2024-01-10' },
];

export const demoAllergies: Allergy[] = [
  { id: 'al1', allergy: 'Penicillin', severity: 'Severe', notes: 'Skin rash and swelling. Avoid all penicillin-based antibiotics.' },
  { id: 'al2', allergy: 'Dust Mites', severity: 'Mild', notes: 'Causes sneezing and itchy eyes.' },
  { id: 'al3', allergy: 'Shellfish', severity: 'Moderate', notes: 'Causes mild gastrointestinal discomfort.' },
];

export const demoCheckups: Checkup[] = [
  { id: 'ck1', date: '2025-08-10', provider: 'Dr. Meera Nair — General Physician', notes: 'Annual health checkup. All vitals normal. Recommended continued iron supplementation.' },
  { id: 'ck2', date: '2025-02-15', provider: 'Dr. Rajesh Kumar — Dermatologist', notes: 'Consultation for dry skin. Prescribed moisturizer and dietary advice.' },
  { id: 'ck3', date: '2024-09-22', provider: 'Dr. Meera Nair — General Physician', notes: 'Follow-up for anemia. Hemoglobin levels improved. Continue current treatment.' },
];

export const demoUploadedRecords: UploadedRecord[] = [
  { id: 'ur1', fileName: 'Blood_Test_Report_Aug2025.pdf', fileType: 'PDF', uploadDate: '2025-08-12', fileSize: '245 KB' },
  { id: 'ur2', fileName: 'CBC_Results_2025.pdf', fileType: 'PDF', uploadDate: '2025-02-18', fileSize: '180 KB' },
  { id: 'ur3', fileName: 'Dermatology_Prescription.pdf', fileType: 'PDF', uploadDate: '2025-02-16', fileSize: '92 KB' },
];

export const demoAppointments: Appointment[] = [
  { id: 'ap1', date: daysAhead(5), time: '10:30 AM', provider: 'Dr. Meera Nair — General Physician', purpose: 'Quarterly health checkup', status: 'Upcoming' },
  { id: 'ap2', date: daysAhead(14), time: '4:00 PM', provider: 'Dr. Priya Singh — Gynecologist', purpose: 'Routine consultation', status: 'Upcoming' },
  { id: 'ap3', date: daysAgo(45), time: '11:00 AM', provider: 'Dr. Meera Nair — General Physician', purpose: 'Annual checkup', status: 'Completed' },
  { id: 'ap4', date: daysAgo(90), time: '3:30 PM', provider: 'Dr. Rajesh Kumar — Dermatologist', purpose: 'Skin consultation', status: 'Completed' },
  { id: 'ap5', date: daysAgo(15), time: '9:00 AM', provider: 'Dr. Anil Verma — ENT Specialist', purpose: 'Nasal allergy follow-up', status: 'Cancelled' },
];

export const demoRiskAlerts: RiskAlert[] = [
  { id: 'ra1', type: 'Blood Pressure', date: daysAgo(2), severity: 'Moderate', reason: 'Blood pressure reading of 124/82 mmHg is slightly above your normal range, associated with low sleep (5.5h) and high stress.', recommendation: 'Prioritize 7-8 hours of sleep, reduce caffeine intake, and practice stress management. Monitor BP again tomorrow.', status: 'Active' },
  { id: 'ra2', type: 'Sleep Pattern', date: daysAgo(2), severity: 'Low', reason: 'Sleep duration dropped to 5.5 hours, below the recommended 7-9 hours.', recommendation: 'Maintain a consistent sleep schedule and limit screen time before bed.', status: 'Resolved' },
  { id: 'ra3', type: 'Hydration', date: daysAgo(2), severity: 'Low', reason: 'Water intake was 1.5L, below the recommended 2-3L per day.', recommendation: 'Carry a water bottle and set reminders to stay hydrated throughout the day.', status: 'Resolved' },
  { id: 'ra4', type: 'Heart Rate', date: daysAgo(10), severity: 'Low', reason: 'Resting heart rate of 78 bpm was slightly elevated after a stressful day.', recommendation: 'Engage in relaxation techniques and monitor heart rate during stressful periods.', status: 'Resolved' },
  { id: 'ra5', type: 'Weight Trend', date: daysAgo(30), severity: 'Low', reason: 'Weight has been stable over the past month, which is a positive sign.', recommendation: 'Continue maintaining a balanced diet and regular physical activity.', status: 'Monitoring' },
];

export const demoAIInsights: AIInsight[] = [
  { id: 'ai1', date: daysAgo(0), title: 'Stable Health Pattern', insight: 'Your recent health entries show a stable pattern with consistent sleep, hydration, and daily activity over the past 3 days.', recommendation: 'Continue maintaining consistent sleep (7-8h), hydration (2-3L), and daily physical activity.', confidence: 'High', category: 'Trend' },
  { id: 'ai2', date: daysAgo(1), title: 'Mood Improvement', insight: 'Your mood has improved from "Stressed" to "Good" over the last 2 days, correlating with better sleep quality.', recommendation: 'Maintain your sleep schedule as it directly impacts your mood and energy levels.', confidence: 'Medium', category: 'Mood' },
  { id: 'ai3', date: daysAgo(2), title: 'Stress Detection', insight: 'On your stressful day, your blood pressure and heart rate were elevated while sleep and hydration were low.', recommendation: 'When feeling stressed, prioritize rest and hydration. Consider mindfulness or breathing exercises.', confidence: 'High', category: 'Lifestyle' },
  { id: 'ai4', date: daysAgo(4), title: 'Activity Consistency', insight: 'Your step count has been variable, ranging from 3,200 to 9,850 steps over the past week.', recommendation: 'Aim for at least 7,000 steps daily for cardiovascular health benefits.', confidence: 'Medium', category: 'Lifestyle' },
  { id: 'ai5', date: daysAgo(5), title: 'Hydration Alert', insight: 'Your water intake has been inconsistent, dropping to 1.5L on one day.', recommendation: 'Set hydration reminders and aim for at least 2L of water daily.', confidence: 'High', category: 'Lifestyle' },
];

export const moodColors: Record<string, string> = {
  Happy: '#10B981',
  Good: '#3B82F6',
  Neutral: '#A8B0C2',
  Stressed: '#F59E0B',
  Sad: '#6366F1',
};

export const severityColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Low: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  Moderate: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  High: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
};

export const confidenceColors: Record<string, string> = {
  High: 'text-emerald-600 bg-emerald-50',
  Medium: 'text-amber-600 bg-amber-50',
  Low: 'text-ink-500 bg-ink-100',
};
