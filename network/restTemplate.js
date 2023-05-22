import axios from "axios";

const getUserInfo = async () => {
    try {
        const response = await axios.get('http://localhost:3000/user');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error occurred');
    }
};

export default getUserInfo;