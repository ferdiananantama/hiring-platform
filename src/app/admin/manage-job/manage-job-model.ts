import {  useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAllCandidate from "./hook/useGetAllCandidate";
import useGetJobById from "../job-list/hooks/useGetJobById";

export default function useManageJobModel() {
     const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(
    new Set()
  );
  const { id } = useParams();

  //Api
  const job = useGetJobById({id : Number(id)})
  const dataCandidates = useGetAllCandidate();

  const candidats = useMemo(() => {
    if (!dataCandidates?.data) return []; 

    return dataCandidates.data.filter((candidate) => candidate.idJobList === Number(id));
  }, [dataCandidates?.data, id]);

  const toggleCandidate = (id: string) => {
    const newSelected = new Set(selectedCandidates);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCandidates(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedCandidates.size === candidats.length) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(candidats.map((c) => String(c.id) ?? "")));
    }
  };

  const allSelected =
    selectedCandidates.size === candidats.length && candidats.length > 0;

    return {
        selectedCandidates,
        setSelectedCandidates,
        candidats,
        job,
        toggleCandidate,
        toggleSelectAll,
        allSelected,
        dataCandidates
    }
}