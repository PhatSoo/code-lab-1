import firebase_app from '../config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app);
export default async function getData(collectionName: string) {
  let docRef = collection(db, collectionName);

  let result: object[] = [];
  let error = null;

  try {
    const data = await getDocs(docRef);
    data.forEach((doc) => {
      result.push(doc.data());
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
