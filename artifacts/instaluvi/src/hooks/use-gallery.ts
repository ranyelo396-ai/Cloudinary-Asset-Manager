import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, query, orderBy, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: string;
  title?: string;
  createdAt: number;
}

const STATIC_GALLERY: GalleryItem[] = [
  { id: 'g1', imageUrl: '/images/ventanas-corredizas.png', category: 'Ventanas', title: 'Ventanas corredizas', createdAt: 1 },
  { id: 'g2', imageUrl: '/images/puertas-corredizas.png', category: 'Puertas', title: 'Puertas corredizas', createdAt: 2 },
  { id: 'g3', imageUrl: '/images/ventanas-abatibles.png', category: 'Proyectos', title: 'Proyecto residencial', createdAt: 3 },
  { id: 'g4', imageUrl: '/images/puertas-pvc.png', category: 'Instalaciones', title: 'Instalación comercial', createdAt: 4 },
];

export function useGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GalleryItem));
      setGallery(data.length === 0 ? STATIC_GALLERY : data);
    } catch {
      setGallery(STATIC_GALLERY);
    } finally {
      setLoading(false);
    }
  };

  const addGalleryItem = async (data: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const ref = await addDoc(collection(db, 'gallery'), { ...data, createdAt: Date.now() });
    await fetchGallery();
    return ref.id;
  };

  const updateGalleryItem = async (id: string, data: Partial<Omit<GalleryItem, 'id'>>) => {
    await updateDoc(doc(db, 'gallery', id), data as Record<string, unknown>);
    await fetchGallery();
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteDoc(doc(db, 'gallery', id));
    await fetchGallery();
  };

  useEffect(() => { fetchGallery(); }, []);

  return { gallery, loading, refetch: fetchGallery, addGalleryItem, updateGalleryItem, deleteGalleryItem };
}
