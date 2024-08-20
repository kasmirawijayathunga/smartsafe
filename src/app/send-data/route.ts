import { db } from "@/config/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export async function POST(req: Request){
    const { message } = await req.json();

    if(["locked", "unlocked", "wrong", "fire"].includes(message)){
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "data"), {
            message: message,
            createdAt: Timestamp.now()
        });
    
        return Response.json({
            success: true,
            id: docRef.id
        })
    } else {
        return Response.json({
            success: false,
            message: "invalid operation"
        })
    }
}