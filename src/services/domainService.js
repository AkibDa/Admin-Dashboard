import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    Timestamp
} from 'firebase/firestore';
import { db } from '../app/firebase';

const COLLEGE_ID = 'tMEBxMvwxTkfeYU5mXDW';

export const getCollegeDomains = async () => {
    try{
        console.log('🔵 Fetching college domains...')
        const collegeRef = doc(db,'colleges',COLLEGE_ID);
        const collegeSnap = await getDoc(collegeRef)

        if(!collegeSnap.exists()){
            throw new Error('College not found');
        }
        const data = collegeSnap.data();
        console.log('✅ Domains fetched:', data.domains);

        return{
            collegeName: data.name,
            domains:data.domains || [],
        };
    }
    catch(error){
        console.log('❌ Error fetching domains:', error)
        throw new Error('Failed to load domains. Please try again.')
    }
}

export const addDomain = async (domain) => {
    try{
        console.log('🔵 Adding domain:', domain)
        
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
        if(!domainRegex.test(domain)){
            throw new Error('Invalid domain format. Example: tint.edu.in');
        }
        const collegeRef = doc(db,'colleges',COLLEGE_ID);

        const collegeSnap = await getDoc(collegeRef);
        if(collegeSnap.exists){
            const currentDomains = collegeSnap.data().domains || [];
            if(currentDomains.includes(domain)){
                throw new Error('This domain already exists')
            }
        }
        await updateDoc(collegeRef,{
            domains:arrayUnion(domain),
            updatedAt:Timestamp.now()
        })

        console.log('Domain added successfully');
        return true;
    }
    catch(error){
        console.error('Error adding domain:', error)
        throw error;
    }
   
}
 export const removeDomain = async (domain) => {
        try{
            console.log('🔵 Removing domain:', domain)
            const collegeRef = doc(db,'colleges',COLLEGE_ID)

            await updateDoc(collegeRef,{
                domains:arrayRemove(domain),
                updatedAt:Timestamp.now()
            })
            console.log('Domain removed successfully');
            return true;
        }
        catch(error){
            console.error('Error removing domain:',error);
            throw new Error('Failed to remove domain. Please try again')
        }
}
export const isDomainAllowed = async (email) => {
  try {
    const { domains } = await getCollegeDomains();
    const emailDomain = email.split('@')[1];
    
    return domains.some(domain => emailDomain === domain);
  } catch (error) {
    console.error('Error validating domain:', error);
    return false;
  }
}
