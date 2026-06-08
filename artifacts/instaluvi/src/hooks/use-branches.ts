import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
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
  { id: '1', name: 'San Salvador', address: 'Colonia Escalón, San Salvador', phone: '50360707582', hours: 'Lunes a Viernes: 8am - 5pm', mapUrl: '', createdAt: 1 },
  { id: '2', name: 'San Miguel', address: 'Avenida Roosevelt, San Miguel', phone: '50360707582', hours: 'Lunes a Viernes: 8am - 5pm', mapUrl: '', createdAt: 2 },
  { id: '3', name: 'Santa Ana (El Congo)', address: 'El Congo, Santa Ana', phone: '50360707582', hours: 'Lunes a Viernes: 8am - 5pm', mapUrl: '', createdAt: 3 },
  { id: '4', name: 'Sonsonate', address: 'Centro de Sonsonate', phone: '50360707582', hours: 'Lunes a Viernes: 8am - 5pm', mapUrl: '', createdAt: 4 },
  { id: '5', name: 'Ahuachapán', address: 'Centro de Ahuachapán', phone: '50360707582', hours: 'Lunes a Viernes: 8am - 5pm', mapUrl: '', createdAt: 5 },
  { id: '6', name: 'San Juan Opico', address: 'San Juan Opico, La Libertad', phone: '50360707582', hours: 'Lunes a Viernes: 8am - 5pm', mapUrl: '', createdAt: 6 },
];

export function useBranches() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'branches'), orderBy('createdAt', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Branch));
      
      if (data.length === 0) {
        setBranches(STATIC_BRANCHES);
      } else {
        setBranches(data);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
      setBranches(STATIC_BRANCHES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return { branches, loading, refetch: fetchBranches };
}
