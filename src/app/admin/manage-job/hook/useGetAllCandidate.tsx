import type { CandidatListProps } from "@/types/candidat-list";
import { getAllCandidateFromIndexedDB } from "@/utils/indexedDBUtils";
import { useEffect, useState } from "react";

export default function useGetAllCandidate() {
    const [data, setData] = useState<CandidatListProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const fetchedS = await getAllCandidateFromIndexedDB();
            setData(fetchedS);
        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
      };

    useEffect(() => {
        const setTimeOut = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(setTimeOut);
    }, []);

    return { data, loading, error, refetch: fetchData };
}