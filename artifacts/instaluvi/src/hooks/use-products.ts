import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
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
  whatsappMsg?: string;
  createdAt: number;
}

const STATIC_PRODUCTS: Product[] = [
  {
    id: 'static-1',
    title: 'Ventanas Corredizas',
    description: 'Sistema ideal para maximizar espacios con deslizamiento suave y hermético.',
    category: 'Ventanas',
    imageUrl: '/images/ventanas-corredizas.png',
    gallery: [],
    featured: true,
    active: true,
    createdAt: Date.now()
  },
  {
    id: 'static-2',
    title: 'Ventanas Abatibles',
    description: 'Apertura tradicional que ofrece excelente ventilación y aislamiento acústico.',
    category: 'Ventanas',
    imageUrl: '/images/ventanas-abatibles.png',
    gallery: [],
    featured: true,
    active: true,
    createdAt: Date.now()
  },
  {
    id: 'static-3',
    title: 'Puertas Corredizas',
    description: 'Conecta tus espacios interiores y exteriores con elegancia y seguridad.',
    category: 'Puertas',
    imageUrl: '/images/puertas-corredizas.png',
    gallery: [],
    featured: true,
    active: true,
    createdAt: Date.now()
  },
  {
    id: 'static-4',
    title: 'Puertas de Entrada PVC',
    description: 'La primera impresión de tu hogar con diseños modernos y alta resistencia.',
    category: 'Puertas',
    imageUrl: '/images/puertas-pvc.png',
    gallery: [],
    featured: true,
    active: true,
    createdAt: Date.now()
  }
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      
      if (data.length === 0) {
        setProducts(STATIC_PRODUCTS);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(STATIC_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, refetch: fetchProducts };
}
