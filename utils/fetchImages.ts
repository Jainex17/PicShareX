import { storage } from "@/firebase";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";


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

export async function deleteImageWithUrl(url: string, filename: string) {
  const codeurl = url.split("/")[7];
  const secretcode = codeurl.split("%")[0];
  
  const storageRef = ref(storage, `${secretcode}/${filename}`);

  try {
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    return false;
  }
}