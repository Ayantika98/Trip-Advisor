import axios from "axios";

export const getPlacesData = async (type, ne, sw) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw?.lat,
                tr_latitude: ne?.lat,
                bl_longitude: sw?.lng,
                tr_longitude: ne?.lng,
            },
            headers: {
                'X-RapidAPI-Key': '32f4932f8dmshb8a0f3df52af29ep1e7910jsn2435f2c11a99',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

