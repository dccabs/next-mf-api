import { useState, useEffect } from "react";

function useFetchConfig() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/getConfig")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error: " + response.status);
                }
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []); // Empty dependency array ensures this runs once on mount

    return { data, loading, error };
}

export default useFetchConfig;
