import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: string;
  title?: string;
  createdAt: number;
}

const STATIC_GALLERY: GalleryItem[] = [
  { id: 'g1', imageUrl: '/images/ventanas-corredizas.png', category: 'Ventanas', createdAt: 1 },
  { id: 'g2', imageUrl: '/images/puertas-corredizas.png', category: 'Puertas', createdAt: 2 },
  { id: 'g3', imageUrl: '/images/ventanas-abatibles.png', category: 'Proyectos', createdAt: 3 },
  { id: 'g4', imageUrl: '/images/puertas-pvc.png', category: 'Instalaciones', createdAt: 4 },
];

export function useGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
      
      if (data.length === 0) {
        setGallery(STATIC_GALLERY);
      } else {
        setGallery(data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setGallery(STATIC_GALLERY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return { gallery, loading, refetch: fetchGallery };
}
