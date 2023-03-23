import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "react-native-dotenv";

const useFetch = (endpoint, query) => {
    const rapidApiKey = RAPID_API_KEY;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert("There was an error fetching data. Please try again later." + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
      fetchData();

    }, []);

    const refetching = () => {
        setIsLoading(true);
        fetchData();
    }
    
    return { data, isLoading, error, refetching };
}

export default useFetch;