import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: number;
}

const STATIC_NEWS: NewsItem[] = [
  { id: 'n1', title: 'Nueva línea de ventanas europeas', description: 'Descubre nuestra nueva línea con perfiles de alta eficiencia energética.', createdAt: 1 },
  { id: 'n2', title: 'Apertura nueva sucursal', description: 'Estaremos más cerca de ti en nuestra nueva sucursal de Santa Ana.', createdAt: 2 },
];

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      
      if (data.length === 0) {
        setNews(STATIC_NEWS);
      } else {
        setNews(data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews(STATIC_NEWS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { news, loading, refetch: fetchNews };
}
