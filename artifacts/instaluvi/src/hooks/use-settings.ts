import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface Settings {
  whatsapp: string;
  facebook: string;
  instagram: string;
  logoUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
}

const DEFAULT_SETTINGS: Settings = {
  whatsapp: '50360707582',
  facebook: 'https://www.facebook.com/share/1CLdnaFaV9/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/instaluvi_elsalvador',
  heroTitle: 'Ventanas y puertas que transforman tu hogar.',
  heroSubtitle: 'Diseño, calidad y durabilidad en cada proyecto. Más de 20 años brindando soluciones que combinan estética, confort y seguridad.',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const snapshot = await getDoc(doc(db, 'settings', 'general'));
      setSettings(snapshot.exists() ? (snapshot.data() as Settings) : DEFAULT_SETTINGS);
    } catch {
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (data: Settings) => {
    await setDoc(doc(db, 'settings', 'general'), data, { merge: true });
    setSettings(data);
  };

  useEffect(() => { fetchSettings(); }, []);

  return { settings, loading, refetch: fetchSettings, saveSettings };
}
