import { auth, database } from "../../firebaseConfig";
import { collection, addDoc } from 'firebase/firestore';
import { getTariffFlag } from "./tariffUtils";

type ResidenceData = {
  name: string;
  state: string;
  hasSolarPanel: boolean;
};

const createResidence = async (data: ResidenceData) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    const tariffFlag = getTariffFlag(data.state);

    const docRef = await addDoc(collection(database, 'residences'), {
      name: data.name,
      state: data.state,
      hasSolarPanel: data.hasSolarPanel,
      createdAt: new Date(),
      userId: userId,
      tariffFlag: tariffFlag
    });
    console.log("Residence created successfully!", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating residence: ", error);
  }
};

export { createResidence, ResidenceData };
