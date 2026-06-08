import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, orderBy, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  gallery: string[];
  featured: boolean;
  active: boolean;
  createdAt: number;
}

const STATIC_PRODUCTS: Product[] = [
  { id: 'static-1', title: 'Ventanas Corredizas', description: 'Sistema ideal para maximizar espacios con deslizamiento suave y hermético.', category: 'Ventanas', imageUrl: '/images/ventanas-corredizas.png', gallery: [], featured: true, active: true, createdAt: 1 },
  { id: 'static-2', title: 'Ventanas Abatibles', description: 'Apertura tradicional que ofrece excelente ventilación y aislamiento acústico.', category: 'Ventanas', imageUrl: '/images/ventanas-abatibles.png', gallery: [], featured: true, active: true, createdAt: 2 },
  { id: 'static-3', title: 'Puertas Corredizas', description: 'Conecta tus espacios interiores y exteriores con elegancia y seguridad.', category: 'Puertas', imageUrl: '/images/puertas-corredizas.png', gallery: [], featured: true, active: true, createdAt: 3 },
  { id: 'static-4', title: 'Puertas de Entrada PVC', description: 'La primera impresión de tu hogar con diseños modernos y alta resistencia.', category: 'Puertas', imageUrl: '/images/puertas-pvc.png', gallery: [], featured: true, active: true, createdAt: 4 },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Product));
      setProducts(data.length === 0 ? STATIC_PRODUCTS : data);
    } catch {
      setProducts(STATIC_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (data: Omit<Product, 'id' | 'createdAt'>) => {
    const ref = await addDoc(collection(db, 'products'), { ...data, createdAt: Date.now() });
    await fetchProducts();
    return ref.id;
  };

  const updateProduct = async (id: string, data: Partial<Omit<Product, 'id'>>) => {
    await updateDoc(doc(db, 'products', id), data as Record<string, unknown>);
    await fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    await fetchProducts();
  };

  useEffect(() => { fetchProducts(); }, []);

  return { products, loading, refetch: fetchProducts, addProduct, updateProduct, deleteProduct };
}
