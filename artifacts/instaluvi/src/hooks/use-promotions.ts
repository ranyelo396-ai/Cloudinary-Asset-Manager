import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  startDate: number;
  endDate: number;
  active: boolean;
}

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'promotions'), where('active', '==', true));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promotion));
      setPromotions(data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return { promotions, loading, refetch: fetchPromotions };
}
