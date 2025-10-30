import useGetJob from "@/app/admin/job-list/hooks/useGetJob";
import useGetJobById from "@/app/admin/job-list/hooks/useGetJobById";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useJobListingModel() {
    const route = useNavigate();
    const [idx, setId] = useSearchParams();
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    //Api
    const dataJobsList = useGetJob();

    const idSelected = useMemo(() => {
        const idFromPath = idx.get("id");
        const defaultId = dataJobsList.data?.length > 0 ? dataJobsList.data[0].id?.toString() : "";
        return idFromPath ?? defaultId;
    }, [idx, dataJobsList.data]);

    //Api
    const dataJob = useGetJobById({id : Number(idSelected)});

    const onChangeId = (id: string) => {
        setSelectedJobId(id);
        idx.set("id", id);
        setId(idx, { replace: true });
    };

    return {
        selectedJobId,
        onChangeId,
        idSelected,
        dataJobsList,
        dataJob,
        route
    }
}