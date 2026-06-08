import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, query, orderBy, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  startDate: number;
  endDate: number;
  active: boolean;
  createdAt: number;
}

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'promotions'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Promotion));
      setPromotions(data);
    } catch {
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  };

  const addPromotion = async (data: Omit<Promotion, 'id' | 'createdAt'>) => {
    const ref = await addDoc(collection(db, 'promotions'), { ...data, createdAt: Date.now() });
    await fetchPromotions();
    return ref.id;
  };

  const updatePromotion = async (id: string, data: Partial<Omit<Promotion, 'id'>>) => {
    await updateDoc(doc(db, 'promotions', id), data as Record<string, unknown>);
    await fetchPromotions();
  };

  const deletePromotion = async (id: string) => {
    await deleteDoc(doc(db, 'promotions', id));
    await fetchPromotions();
  };

  useEffect(() => { fetchPromotions(); }, []);

  return { promotions, loading, refetch: fetchPromotions, addPromotion, updatePromotion, deletePromotion };
}
