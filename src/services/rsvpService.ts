
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export interface RsvpData {
  guestName: string;
  plusOnes: number;
  message?: string;
  submittedAt: Timestamp;
  submittedFrom: string;
}

export interface RsvpFormData {
  guestName: string;
  plusOnes: number;
  message?: string;
}

export const submitRsvp = async (formData: RsvpFormData): Promise<string> => {
  try {
    const rsvpData: RsvpData = {
      ...formData,
      submittedAt: Timestamp.now(),
      submittedFrom: "web",
    };

    const docRef = await addDoc(collection(db, "guests"), rsvpData);
    console.log("RSVP submitted with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error submitting RSVP: ", error);
    throw new Error("Failed to submit RSVP. Please try again.");
  }
};

export const getRsvps = async (): Promise<RsvpData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "guests"));
    const rsvps: RsvpData[] = [];
    querySnapshot.forEach((doc) => {
      rsvps.push({ ...doc.data() } as RsvpData);
    });
    return rsvps;
  } catch (error) {
    console.error("Error fetching RSVPs: ", error);
    throw new Error("Failed to fetch RSVPs");
  }
};
