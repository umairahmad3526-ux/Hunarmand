import { Linking, Alert } from 'react-native';
import { SkillWorker } from '../types';

export const openWorkerWhatsApp = (worker: SkillWorker) => {
  const cleanNumber = worker.whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Assalam-o-Alaikum / Hello ${worker.name},\n\nI found your verified profile on the Hunarmand app for "${worker.categoryTitle}".\nI am contacting you regarding home service assistance. Are you currently available?`;
  
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    Alert.alert(
      'Unable to open WhatsApp',
      `Please contact ${worker.name} directly via phone at: ${worker.displayPhone}`
    );
  });
};

export const openWorkerCall = (worker: SkillWorker) => {
  const cleanNumber = worker.displayPhone.replace(/[^0-9+]/g, '');
  Linking.openURL(`tel:${cleanNumber}`).catch(() => {
    Alert.alert('Unable to place call', `Worker Phone: ${worker.displayPhone}`);
  });
};

export const openShopMap = (worker: SkillWorker) => {
  const query = encodeURIComponent(`${worker.shopName}, ${worker.shopAddress}, ${worker.city}`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  Linking.openURL(mapUrl).catch(() => {
    Alert.alert('Map Location', `${worker.shopAddress}`);
  });
};
