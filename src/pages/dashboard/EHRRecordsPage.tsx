import { useState, useRef } from 'react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/contexts/ToastContext';
import {
  FileText, Upload, Plus, Trash2, Pill, AlertCircle,
  Stethoscope, Clock, X, FileCheck,
} from 'lucide-react';
import type { MedicalHistoryEntry, Medication, Allergy, Checkup, UploadedRecord } from '@/types';

type ModalType = 'medical' | 'medication' | 'allergy' | 'checkup' | null;

export function EHRRecordsPage() {
  const {
    medicalHistory, addMedicalHistory, deleteMedicalHistory,
    medications, addMedication, deleteMedication,
    allergies, addAllergy, deleteAllergy,
    checkups, addCheckup, deleteCheckup,
    uploadedRecords, addUploadedRecord, deleteUploadedRecord,
  } = useData();
  const { showToast } = useToast();
  const [modal, setModal] = useState<ModalType>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [medCondition, setMedCondition] = useState('');
  const [medDate, setMedDate] = useState('');
  const [medNotes, setMedNotes] = useState('');

  const [pillName, setPillName] = useState('');
  const [pillDosage, setPillDosage] = useState('');
  const [pillFrequency, setPillFrequency] = useState('');
  const [pillStart, setPillStart] = useState('');

  const [allergyName, setAllergyName] = useState('');
  const [allergySeverity, setAllergySeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Mild');
  const [allergyNotes, setAllergyNotes] = useState('');

  const [checkupDate, setCheckupDate] = useState('');
  const [checkupProvider, setCheckupProvider] = useState('');
  const [checkupNotes, setCheckupNotes] = useState('');

  const closeModal = () => {
    setModal(null);
    setMedCondition(''); setMedDate(''); setMedNotes('');
    setPillName(''); setPillDosage(''); setPillFrequency(''); setPillStart('');
    setAllergyName(''); setAllergySeverity('Mild'); setAllergyNotes('');
    setCheckupDate(''); setCheckupProvider(''); setCheckupNotes('');
  };

  const saveMedical = () => {
    if (!medCondition.trim()) { showToast('Please enter a condition', 'error'); return; }
    const entry: MedicalHistoryEntry = { id: crypto.randomUUID(), condition: medCondition, date: medDate || new Date().toISOString().split('T')[0], notes: medNotes };
    addMedicalHistory(entry);
    showToast('Medical history entry added', 'success');
    closeModal();
  };

  const saveMedication = () => {
    if (!pillName.trim()) { showToast('Please enter medication name', 'error'); return; }
    const m: Medication = { id: crypto.randomUUID(), name: pillName, dosage: pillDosage, frequency: pillFrequency, startDate: pillStart || new Date().toISOString().split('T')[0] };
    addMedication(m);
    showToast('Medication added', 'success');
    closeModal();
  };

  const saveAllergy = () => {
    if (!allergyName.trim()) { showToast('Please enter allergy name', 'error'); return; }
    const a: Allergy = { id: crypto.randomUUID(), allergy: allergyName, severity: allergySeverity, notes: allergyNotes };
    addAllergy(a);
    showToast('Allergy added', 'success');
    closeModal();
  };

  const saveCheckup = () => {
    if (!checkupProvider.trim()) { showToast('Please enter provider name', 'error'); return; }
    const c: Checkup = { id: crypto.randomUUID(), date: checkupDate || new Date().toISOString().split('T')[0], provider: checkupProvider, notes: checkupNotes };
    addCheckup(c);
    showToast('Checkup record added', 'success');
    closeModal();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { showToast('File too large (max 10MB)', 'error'); return; }
    const record: UploadedRecord = {
      id: crypto.randomUUID(),
      fileName: file.name,
      fileType: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: file.size < 1024 ? `${file.size} B` : file.size < 1024 * 1024 ? `${Math.round(file.size / 1024)} KB` : `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    };
    addUploadedRecord(record);
    showToast('Record uploaded successfully', 'success');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">EHR Records</h1>
          <p className="mt-1 text-sm text-ink-500">Manage your Electronic Health Records in one place</p>
        </div>
        <button onClick={() => fileInputRef.current?.click()} className="btn-primary">
          <Upload className="h-4 w-4" /> Upload Record
        </button>
        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileUpload} className="hidden" />
      </div>

      {/* Uploaded Records */}
      <div className="card-base p-5 animate-fade-in animate-delay-100">
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-rose-500" />
          <h2 className="font-display text-lg font-bold text-ink-800">Uploaded Records</h2>
        </div>
        {uploadedRecords.length === 0 ? (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-ink-200 py-10 text-center">
            <Upload className="mx-auto h-8 w-8 text-ink-300" />
            <p className="mt-2 text-sm text-ink-400">No records uploaded yet</p>
            <button onClick={() => fileInputRef.current?.click()} className="mt-3 btn-secondary text-xs">Upload Now</button>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {uploadedRecords.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-xl border border-ink-100 p-3 transition-all hover:shadow-soft">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-800">{r.fileName}</p>
                  <p className="text-xs text-ink-400">{r.fileType} · {r.fileSize} · {r.uploadDate}</p>
                </div>
                <button onClick={() => { deleteUploadedRecord(r.id); showToast('Record removed', 'info'); }} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medical History */}
      <RecordSection
        title="Medical History"
        icon={Stethoscope}
        items={medicalHistory.map((m) => ({ id: m.id, primary: m.condition, secondary: m.date, notes: m.notes }))}
        onAdd={() => setModal('medical')}
        onDelete={(id) => { deleteMedicalHistory(id); showToast('Entry removed', 'info'); }}
        emptyText="No medical history recorded"
        addLabel="Add Condition"
      />

      {/* Medications */}
      <RecordSection
        title="Medications"
        icon={Pill}
        items={medications.map((m) => ({ id: m.id, primary: m.name, secondary: `${m.dosage} · ${m.frequency} · Since ${m.startDate}`, notes: '' }))}
        onAdd={() => setModal('medication')}
        onDelete={(id) => { deleteMedication(id); showToast('Medication removed', 'info'); }}
        emptyText="No medications recorded"
        addLabel="Add Medication"
      />

      {/* Allergies */}
      <RecordSection
        title="Allergies"
        icon={AlertCircle}
        items={allergies.map((a) => ({ id: a.id, primary: a.allergy, secondary: a.severity, notes: a.notes, badge: a.severity }))}
        onAdd={() => setModal('allergy')}
        onDelete={(id) => { deleteAllergy(id); showToast('Allergy removed', 'info'); }}
        emptyText="No allergies recorded"
        addLabel="Add Allergy"
      />

      {/* Previous Checkups */}
      <RecordSection
        title="Previous Checkups"
        icon={Clock}
        items={checkups.map((c) => ({ id: c.id, primary: c.provider, secondary: c.date, notes: c.notes }))}
        onAdd={() => setModal('checkup')}
        onDelete={(id) => { deleteCheckup(id); showToast('Checkup removed', 'info'); }}
        emptyText="No checkups recorded"
        addLabel="Add Checkup"
      />

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-800/30 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-card-lg animate-fade-in-scale">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink-800">
                {modal === 'medical' && 'Add Medical Condition'}
                {modal === 'medication' && 'Add Medication'}
                {modal === 'allergy' && 'Add Allergy'}
                {modal === 'checkup' && 'Add Checkup'}
              </h3>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-50">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {modal === 'medical' && (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Condition</label>
                    <input value={medCondition} onChange={(e) => setMedCondition(e.target.value)} className="input-field" placeholder="e.g., Hypertension" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Date Diagnosed</label>
                    <input type="date" value={medDate} onChange={(e) => setMedDate(e.target.value)} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Notes</label>
                    <textarea value={medNotes} onChange={(e) => setMedNotes(e.target.value)} className="input-field min-h-[80px] resize-none" placeholder="Additional notes..." />
                  </div>
                  <button onClick={saveMedical} className="btn-primary w-full">Save Entry</button>
                </>
              )}
              {modal === 'medication' && (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Medication Name</label>
                    <input value={pillName} onChange={(e) => setPillName(e.target.value)} className="input-field" placeholder="e.g., Metformin" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Dosage</label>
                      <input value={pillDosage} onChange={(e) => setPillDosage(e.target.value)} className="input-field" placeholder="500mg" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Frequency</label>
                      <input value={pillFrequency} onChange={(e) => setPillFrequency(e.target.value)} className="input-field" placeholder="Twice daily" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Start Date</label>
                    <input type="date" value={pillStart} onChange={(e) => setPillStart(e.target.value)} className="input-field" />
                  </div>
                  <button onClick={saveMedication} className="btn-primary w-full">Save Medication</button>
                </>
              )}
              {modal === 'allergy' && (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Allergy</label>
                    <input value={allergyName} onChange={(e) => setAllergyName(e.target.value)} className="input-field" placeholder="e.g., Peanuts" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Severity</label>
                    <div className="flex gap-2">
                      {(['Mild', 'Moderate', 'Severe'] as const).map((s) => (
                        <button key={s} onClick={() => setAllergySeverity(s)} className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${allergySeverity === s ? 'border-rose-400 bg-rose-50 text-rose-600' : 'border-ink-200 text-ink-500 hover:border-ink-300'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Notes</label>
                    <textarea value={allergyNotes} onChange={(e) => setAllergyNotes(e.target.value)} className="input-field min-h-[80px] resize-none" placeholder="Reaction details..." />
                  </div>
                  <button onClick={saveAllergy} className="btn-primary w-full">Save Allergy</button>
                </>
              )}
              {modal === 'checkup' && (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Date</label>
                    <input type="date" value={checkupDate} onChange={(e) => setCheckupDate(e.target.value)} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Doctor / Provider</label>
                    <input value={checkupProvider} onChange={(e) => setCheckupProvider(e.target.value)} className="input-field" placeholder="e.g., Dr. Meera Nair — General Physician" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Notes</label>
                    <textarea value={checkupNotes} onChange={(e) => setCheckupNotes(e.target.value)} className="input-field min-h-[80px] resize-none" placeholder="Visit summary..." />
                  </div>
                  <button onClick={saveCheckup} className="btn-primary w-full">Save Checkup</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface RecordSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { id: string; primary: string; secondary: string; notes: string; badge?: string }[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  emptyText: string;
  addLabel: string;
}

function RecordSection({ title, icon: Icon, items, onAdd, onDelete, emptyText, addLabel }: RecordSectionProps) {
  const severityStyle: Record<string, string> = {
    Mild: 'bg-emerald-50 text-emerald-600',
    Moderate: 'bg-amber-50 text-amber-600',
    Severe: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="card-base p-5 animate-fade-in animate-delay-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-rose-500" />
          <h2 className="font-display text-lg font-bold text-ink-800">{title}</h2>
          <span className="rounded-lg bg-ink-50 px-2 py-0.5 text-xs font-medium text-ink-500">{items.length}</span>
        </div>
        <button onClick={onAdd} className="btn-ghost text-rose-500 hover:bg-rose-50">
          <Plus className="h-4 w-4" /> {addLabel}
        </button>
      </div>
      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border-2 border-dashed border-ink-200 py-8 text-center">
          <p className="text-sm text-ink-400">{emptyText}</p>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 rounded-xl border border-ink-100 p-3.5 transition-all hover:shadow-soft">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-brand-soft text-rose-500">
                <Icon className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-ink-800">{item.primary}</p>
                  {item.badge && (
                    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${severityStyle[item.badge] || 'bg-ink-50 text-ink-500'}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-400">{item.secondary}</p>
                {item.notes && <p className="mt-1 text-sm text-ink-500">{item.notes}</p>}
              </div>
              <button onClick={() => onDelete(item.id)} className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
