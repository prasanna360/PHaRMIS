export interface User {
  id: string;
  fullName: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | '';
  height: string;
  city: string;
  state: string;
  contact: string;
  createdAt: string;
}

export interface DailyHealthEntry {
  id: string;
  date: string;
  mood: 'Happy' | 'Good' | 'Neutral' | 'Stressed' | 'Sad';
  symptoms: string[];
  weight: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  heartRate: number;
  sleepHours: number;
  waterIntake: number;
  physicalActivity: string;
  steps: number;
  notes: string;
}

export interface MedicalHistoryEntry {
  id: string;
  condition: string;
  date: string;
  notes: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
}

export interface Allergy {
  id: string;
  allergy: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  notes: string;
}

export interface Checkup {
  id: string;
  date: string;
  provider: string;
  notes: string;
}

export interface UploadedRecord {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  fileSize: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  provider: string;
  purpose: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface RiskAlert {
  id: string;
  type: string;
  date: string;
  severity: 'Low' | 'Moderate' | 'High';
  reason: string;
  recommendation: string;
  status: 'Active' | 'Resolved' | 'Monitoring';
}

export interface AIInsight {
  id: string;
  date: string;
  title: string;
  insight: string;
  recommendation: string;
  confidence: 'High' | 'Medium' | 'Low';
  category: 'Trend' | 'Mood' | 'Lifestyle' | 'Risk';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
}
