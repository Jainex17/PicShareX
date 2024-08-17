import { storage } from "@/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";


export async function fetchImages(secretcode: string) {
  const storageRef = ref(storage, secretcode);
  const res = await listAll(storageRef);

  const urlPromises = res.items.map(async (itemRef) => {
    const url = await getDownloadURL(itemRef);
    const fileName = itemRef.name;
    return [fileName, url];
  });

  return Promise.all(urlPromises);
}