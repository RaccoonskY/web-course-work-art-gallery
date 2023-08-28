import axios from "axios";

export const addAction = (user_id, username,user_type, action_type)=>{
    const newAction = {
        user_id: user_id,
        username: username,
        user_type:user_type,
        action_type: action_type,
        date: String(new Date())
    };

    console.log('newAct:',newAction);

    axios.post('http://localhost:3001' + '/action/add', newAction)
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error('Failed to add action:', error);
        });
}

export const getAllActions = () =>{
    axios.get('http://localhost:3001' + '/action/all',{
    }).then(res =>{
        console.log('Got logs:',res.data);
        return(res.data);
    }).catch(err=>console.error(err));
}

export const clearActions = () =>{
    axios.delete('http://localhost:3001' + '/action/all',{
    }).then(()=>{
        console.log("actions cleared!")
    }).catch(err=>console.error(err));
}


