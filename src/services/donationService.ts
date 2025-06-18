import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export interface DonationFormData {
  name: string;
  message?: string;
  submittedAt: Timestamp;
  submittedFrom: string;
  type: "bank" | "card";
}

export const submitDonation = async (formData: {
  name: string;
  message?: string;
  type: "bank" | "card";
}) => {
  try {
    const donationData: DonationFormData = {
      name: formData.name,
      message: formData.message || "",
      submittedAt: Timestamp.now(),
      submittedFrom: "web",
      type: formData.type,
    };

    const docRef = await addDoc(collection(db, "donations"), donationData);
    console.log("Donation submitted with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting donation: ", error);
    throw new Error("Failed to submit donation. Please try again.");
  }
};
