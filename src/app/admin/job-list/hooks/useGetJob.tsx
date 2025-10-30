import type { JobListProps } from "@/types/job-list";
import { getAllJobsFromIndexedDB } from "@/utils/indexedDBUtils";
import { useEffect, useState } from "react";

export default function useGetJob() {
    const [data, setData] = useState<JobListProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const fetchedJobs = await getAllJobsFromIndexedDB();
            setData(fetchedJobs);
        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
      };

    useEffect(() => {
        const setTimeOut = setTimeout(() => {
            fetchJobs();
        }, 500);

        return () => clearTimeout(setTimeOut);
    }, []);

    return { data, loading, error, refetch: fetchJobs };
}