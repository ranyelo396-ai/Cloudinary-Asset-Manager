import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface Settings {
  whatsapp: string;
  facebook: string;
  instagram: string;
  logoUrl?: string;
}

const DEFAULT_SETTINGS: Settings = {
  whatsapp: '50360707582',
  facebook: 'https://www.facebook.com/share/1CLdnaFaV9/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/instaluvi_elsalvador',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'settings', 'general');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setSettings(snapshot.data() as Settings);
      } else {
        setSettings(DEFAULT_SETTINGS);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, refetch: fetchSettings };
}
