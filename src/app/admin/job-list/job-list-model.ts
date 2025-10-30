import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetJob from "./hooks/useGetJob";


export default function useJobListModel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const route = useNavigate();

  //Api
  const dataJobsList = useGetJob();
  
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "inactive":
        return "bg-red-50 text-red-700 border border-red-200";
      case "draft":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const createJob = () => {
    dataJobsList.refetch();
  };

  const filteredJobs = useMemo(() => {
    if (!searchQuery) {
      return dataJobsList.data;
    }

    return dataJobsList.data.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.salary_range.display_text
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, dataJobsList.data]);

  return {
    searchQuery,
    setSearchQuery,
    showModal,
    setShowModal,
    showToast,
    setShowToast,
    createJob,
    filteredJobs,
    getStatusBadgeStyles,
    getStatusText,
    route,
    dataJobsList
  }

}