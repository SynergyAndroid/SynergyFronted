// 웹의 localstorage 와 똑같은데 async await 을 사용해줘야함 
import EncryptStorage from 'react-native-encrypted-storage';

const setEncryptStorage = async<T>(key:string, data:T)=>{
    await EncryptStorage.setItem(key, JSON.stringfy(data));

};

//가져옴
const getEncryptStorage = async(key:string)=>{
    //저장된 데이터가 있으면 가져오기
    const storedData = await getEncryptStorage.getItem(key);

    return storedData ?JSON.parse(storedData):null;

};

// 지우는거

const removeEncryptStorage = async(key:string) => {
    const data = await getEncryptStorage(key);
    if (data){
        await getEncryptStorage.removeItem(key);
        //만약 데이터가 있으면 지우는거 
    }
};

export{setEncryptStorage,getEncryptStorage,removeEncryptStorage}
