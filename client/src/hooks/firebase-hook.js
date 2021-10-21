import { useState, useEffect} from 'react'

const useFirebase = () => {

    const [data, setData] = useState([]); 

    useEffect(async () => {
        const filesList = await app.firestore().collection("images").get();  //Firebase nos da un objeto
        setFiles(filesList.docs.map((doc) => doc.data())); 
      }, [])

}

export default useFirebase