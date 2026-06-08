import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, query, orderBy, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  active: boolean;
  createdAt: number;
}

const STATIC_NEWS: NewsItem[] = [
  { id: 'n1', title: 'Nueva línea de ventanas europeas', description: 'Descubre nuestra nueva línea con perfiles de alta eficiencia energética diseñados para el clima centroamericano.', active: true, createdAt: 1 },
  { id: 'n2', title: 'Apertura nueva sucursal en Sonsonate', description: 'Estaremos más cerca de ti con nuestra nueva sucursal en el corazón de Sonsonate.', active: true, createdAt: 2 },
];

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as NewsItem));
      setNews(data.length === 0 ? STATIC_NEWS : data);
    } catch {
      setNews(STATIC_NEWS);
    } finally {
      setLoading(false);
    }
  };

  const addNews = async (data: Omit<NewsItem, 'id' | 'createdAt'>) => {
    const ref = await addDoc(collection(db, 'news'), { ...data, createdAt: Date.now() });
    await fetchNews();
    return ref.id;
  };

  const updateNews = async (id: string, data: Partial<Omit<NewsItem, 'id'>>) => {
    await updateDoc(doc(db, 'news', id), data as Record<string, unknown>);
    await fetchNews();
  };

  const deleteNews = async (id: string) => {
    await deleteDoc(doc(db, 'news', id));
    await fetchNews();
  };

  useEffect(() => { fetchNews(); }, []);

  return { news, loading, refetch: fetchNews, addNews, updateNews, deleteNews };
}
