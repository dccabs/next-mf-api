import { useState } from "react";

function useUpdateConfig() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const updateConfig = async ({remote_url, remote_name, id}) => {
        setLoading(true);
        setError(null);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ remote_url, remote_name, id }),
        };

        try {
            const response = await fetch("/api/updateConfig", requestOptions);

            if (!response.ok) {
                throw new Error("Error: " + response.status);
            }

            const data = await response.json();

            setLoading(false);
            setData(data);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return { updateConfig, loading, error, data };
}

export default useUpdateConfig;
