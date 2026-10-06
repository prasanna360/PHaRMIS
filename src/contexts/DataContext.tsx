import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
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
import {
  demoDailyEntries,
  demoMedicalHistory,
  demoMedications,
  demoAllergies,
  demoCheckups,
  demoUploadedRecords,
  demoAppointments,
  demoRiskAlerts,
  demoAIInsights,
} from '@/data/demoData';

interface DataContextValue {
  dailyEntries: DailyHealthEntry[];
  addDailyEntry: (entry: DailyHealthEntry) => void;
  medicalHistory: MedicalHistoryEntry[];
  addMedicalHistory: (entry: MedicalHistoryEntry) => void;
  deleteMedicalHistory: (id: string) => void;
  medications: Medication[];
  addMedication: (m: Medication) => void;
  deleteMedication: (id: string) => void;
  allergies: Allergy[];
  addAllergy: (a: Allergy) => void;
  deleteAllergy: (id: string) => void;
  checkups: Checkup[];
  addCheckup: (c: Checkup) => void;
  deleteCheckup: (id: string) => void;
  uploadedRecords: UploadedRecord[];
  addUploadedRecord: (r: UploadedRecord) => void;
  deleteUploadedRecord: (id: string) => void;
  appointments: Appointment[];
  addAppointment: (a: Appointment) => void;
  cancelAppointment: (id: string) => void;
  riskAlerts: RiskAlert[];
  resolveAlert: (id: string) => void;
  aiInsights: AIInsight[];
}

const DataContext = createContext<DataContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [dailyEntries, setDailyEntries] = useState<DailyHealthEntry[]>(() =>
    loadFromStorage('pharmis_daily', demoDailyEntries)
  );
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryEntry[]>(() =>
    loadFromStorage('pharmis_medical', demoMedicalHistory)
  );
  const [medications, setMedications] = useState<Medication[]>(() =>
    loadFromStorage('pharmis_medications', demoMedications)
  );
  const [allergies, setAllergies] = useState<Allergy[]>(() =>
    loadFromStorage('pharmis_allergies', demoAllergies)
  );
  const [checkups, setCheckups] = useState<Checkup[]>(() =>
    loadFromStorage('pharmis_checkups', demoCheckups)
  );
  const [uploadedRecords, setUploadedRecords] = useState<UploadedRecord[]>(() =>
    loadFromStorage('pharmis_uploads', demoUploadedRecords)
  );
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    loadFromStorage('pharmis_appointments', demoAppointments)
  );
  const [riskAlerts, setRiskAlerts] = useState<RiskAlert[]>(() =>
    loadFromStorage('pharmis_alerts', demoRiskAlerts)
  );
  const [aiInsights] = useState<AIInsight[]>(() =>
    loadFromStorage('pharmis_insights', demoAIInsights)
  );

  const addDailyEntry = useCallback((entry: DailyHealthEntry) => {
    setDailyEntries((prev) => {
      const filtered = prev.filter((e) => e.date !== entry.date);
      const updated = [...filtered, entry].sort((a, b) => a.date.localeCompare(b.date));
      saveToStorage('pharmis_daily', updated);
      return updated;
    });
  }, []);

  const addMedicalHistory = useCallback((entry: MedicalHistoryEntry) => {
    setMedicalHistory((prev) => {
      const updated = [...prev, entry];
      saveToStorage('pharmis_medical', updated);
      return updated;
    });
  }, []);
  const deleteMedicalHistory = useCallback((id: string) => {
    setMedicalHistory((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveToStorage('pharmis_medical', updated);
      return updated;
    });
  }, []);

  const addMedication = useCallback((m: Medication) => {
    setMedications((prev) => {
      const updated = [...prev, m];
      saveToStorage('pharmis_medications', updated);
      return updated;
    });
  }, []);
  const deleteMedication = useCallback((id: string) => {
    setMedications((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveToStorage('pharmis_medications', updated);
      return updated;
    });
  }, []);

  const addAllergy = useCallback((a: Allergy) => {
    setAllergies((prev) => {
      const updated = [...prev, a];
      saveToStorage('pharmis_allergies', updated);
      return updated;
    });
  }, []);
  const deleteAllergy = useCallback((id: string) => {
    setAllergies((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveToStorage('pharmis_allergies', updated);
      return updated;
    });
  }, []);

  const addCheckup = useCallback((c: Checkup) => {
    setCheckups((prev) => {
      const updated = [...prev, c];
      saveToStorage('pharmis_checkups', updated);
      return updated;
    });
  }, []);
  const deleteCheckup = useCallback((id: string) => {
    setCheckups((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveToStorage('pharmis_checkups', updated);
      return updated;
    });
  }, []);

  const addUploadedRecord = useCallback((r: UploadedRecord) => {
    setUploadedRecords((prev) => {
      const updated = [r, ...prev];
      saveToStorage('pharmis_uploads', updated);
      return updated;
    });
  }, []);
  const deleteUploadedRecord = useCallback((id: string) => {
    setUploadedRecords((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveToStorage('pharmis_uploads', updated);
      return updated;
    });
  }, []);

  const addAppointment = useCallback((a: Appointment) => {
    setAppointments((prev) => {
      const updated = [...prev, a];
      saveToStorage('pharmis_appointments', updated);
      return updated;
    });
  }, []);
  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' as const } : a));
      saveToStorage('pharmis_appointments', updated);
      return updated;
    });
  }, []);

  const resolveAlert = useCallback((id: string) => {
    setRiskAlerts((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status: 'Resolved' as const } : a));
      saveToStorage('pharmis_alerts', updated);
      return updated;
    });
  }, []);

  return (
    <DataContext.Provider value={{
      dailyEntries, addDailyEntry,
      medicalHistory, addMedicalHistory, deleteMedicalHistory,
      medications, addMedication, deleteMedication,
      allergies, addAllergy, deleteAllergy,
      checkups, addCheckup, deleteCheckup,
      uploadedRecords, addUploadedRecord, deleteUploadedRecord,
      appointments, addAppointment, cancelAppointment,
      riskAlerts, resolveAlert,
      aiInsights,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
