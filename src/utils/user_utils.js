import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001',
});


const getAllUsers = async ()=>{
    try{
        const res = await instance.get('user/all',{
            baseURL: 'http://localhost:3001',
            responseType: 'json'
        });
        console.log(res);
        return res;
    }catch (err){
        console.error(err);
    }
}

export default getAllUsers;