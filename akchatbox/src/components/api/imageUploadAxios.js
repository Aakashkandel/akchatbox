import Axios from 'axios';

const Axiosapi = Axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      
    }
});

export default Axiosapi;