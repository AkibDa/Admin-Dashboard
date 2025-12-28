import { 
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    Timestamp
 } from "firebase/firestore";
import { db } from "../app/firebase"; 

const COLLEGE_COLLECTION = 'colleges';

export const getOrCreateCollege = async (collegeId, collegeName, domains) => {
    try{
        const collegeRef = doc(db,COLLEGE_COLLECTION, collegeId)
        const collegeSnap = await getDoc(collegeRef);

        if(!collegeSnap.exists()){
            const collegeData = {
                name:collegeName,
                domains: domains,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            };
            await setDoc(collegeRef,collegeData)
            console.log('College Created',collegeName)
            return{ id:collegeId, ...collegeData}
        }
        return { id:collegeSnap.id, ...collegeSnap.data()};
    }
    catch(error){
        console.error('Error with college', error)
        throw error;
    }
}

export const getAllColleges = async() => {
    try{
        const querySnapshot = await getDocs(collection(db,COLLEGE_COLLECTION))
        const colleges = [];

        querySnapshot.forEach((doc) => {
            colleges.push({
                id:doc.id,
                ...doc.data(),
            })
        })
        return colleges;
    }
    catch(error) {
        console.error('Error fetching colleges:', error)
        throw error;
    }
}