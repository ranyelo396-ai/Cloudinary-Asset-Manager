import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
  imageUrl?: string;
  createdAt: number;
}

const STATIC_BRANCHES: Branch[] = [
  { id: '1', name: 'San Salvador', address: 'Colonia Escalón, San Salvador', phone: '+503 6070-7582', hours: 'Lunes a Viernes: 8am–5pm, Sábado: 8am–12pm', mapUrl: '', createdAt: 1 },
  { id: '2', name: 'San Miguel', address: 'Avenida Roosevelt, San Miguel', phone: '+503 6070-7582', hours: 'Lunes a Viernes: 8am–5pm', mapUrl: '', createdAt: 2 },
  { id: '3', name: 'El Congo (Santa Ana)', address: 'El Congo, Santa Ana', phone: '+503 6070-7582', hours: 'Lunes a Viernes: 8am–5pm', mapUrl: '', createdAt: 3 },
  { id: '4', name: 'Sonsonate', address: 'Centro de Sonsonate', phone: '+503 6070-7582', hours: 'Lunes a Viernes: 8am–5pm', mapUrl: '', createdAt: 4 },
  { id: '5', name: 'Ahuachapán', address: 'Centro de Ahuachapán', phone: '+503 6070-7582', hours: 'Lunes a Viernes: 8am–5pm', mapUrl: '', createdAt: 5 },
  { id: '6', name: 'San Juan Opico', address: 'San Juan Opico, La Libertad', phone: '+503 6070-7582', hours: 'Lunes a Viernes: 8am–5pm', mapUrl: '', createdAt: 6 },
];

export function useBranches() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'branches'), orderBy('createdAt', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Branch));
      setBranches(data.length === 0 ? STATIC_BRANCHES : data);
    } catch {
      setBranches(STATIC_BRANCHES);
    } finally {
      setLoading(false);
    }
  };

  const addBranch = async (data: Omit<Branch, 'id' | 'createdAt'>) => {
    const ref = await addDoc(collection(db, 'branches'), { ...data, createdAt: Date.now() });
    await fetchBranches();
    return ref.id;
  };

  const updateBranch = async (id: string, data: Partial<Omit<Branch, 'id'>>) => {
    await updateDoc(doc(db, 'branches', id), data as Record<string, unknown>);
    await fetchBranches();
  };

  const deleteBranch = async (id: string) => {
    await deleteDoc(doc(db, 'branches', id));
    await fetchBranches();
  };

  useEffect(() => { fetchBranches(); }, []);

  return { branches, loading, refetch: fetchBranches, addBranch, updateBranch, deleteBranch };
}
