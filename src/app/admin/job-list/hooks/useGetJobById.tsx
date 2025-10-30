import type { JobListProps } from "@/types/job-list";
import {  getJobByIdFromIndexedDB } from "@/utils/indexedDBUtils";
import { useEffect, useState } from "react";

export default function useGetJobById(props : { id : number}) {
    const [data, setData] = useState<JobListProps>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const fetchedS = await getJobByIdFromIndexedDB(props.id);
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
    }, [props.id]);

    return { data, loading, error, refetch: fetchData };
}