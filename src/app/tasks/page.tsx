import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Wallet } from "lucide-react";
import logo from "@/assets/images/logo-list.png";
import { useEffect, useMemo, useState } from "react";
import type { JobListProps } from "@/types/job-list";
import {
  getAllJobsFromIndexedDB,
  getJobByIdFromIndexedDB,
} from "@/utils/indexedDBUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import PrivateRoute from "@/components/layouts/PrivateRoute";

const JobListingPage = () => {
  const route = useNavigate();
  const [jobs, setJobs] = useState<JobListProps[]>([]);
  const [job, setJob] = useState<JobListProps | null>(null);
  const [idx, setId] = useSearchParams();

  // Update the URL parameter with the selected job's id
  const onChangeId = (id: string) => {
    idx.set("id", id);
    setId(idx, { replace: true });
  };

  // Memoized logic to handle the selection of job id
  const idSelected = useMemo(() => {
    const idFromPath = idx.get("id");
    const defaultId = jobs.length > 0 ? jobs[0].id?.toString() : "";
    return idFromPath ?? defaultId;
  }, [idx, jobs]);

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs = await getAllJobsFromIndexedDB();
      setJobs(fetchedJobs); // Store jobs in state
    };
    fetchJobs(); // Fetch job data on component mount
  }, []); // Empty dependency to fetch jobs only once

  // When the job data or selected id changes, fetch the job details
  useEffect(() => {
    const fetchJobById = async (id: number) => {
      const jobFound = await getJobByIdFromIndexedDB(id);
      if (jobFound) {
        setJob(jobFound);
      }
    };

    const idParam = Number(idSelected); // Convert the selected id to a number
    if (idParam) {
      fetchJobById(idParam);
    }
  }, [idSelected, jobs]); // Trigger this effect when the selected id or jobs change

  return (
    <PrivateRoute>
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Job List</h1>
        <div className="w-10 h-10 rounded-full bg-gradient from-purple-400 to-pink-400 flex items-center justify-center">
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/62dd9201-a882-48a2-b79a-cf6bbe038773.png"
            alt="User profile avatar showing a person in business attire with a professional headshot against a neutral background"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Job Card */}
          <div className="lg:col-span-4 space-y-3">
            {jobs.length > 0 &&
              jobs.map((job) => (
                <Card
                  onClick={() => onChangeId(job.id ? job.id.toString() : "")}
                  className="border-2 border-[#01777F] hover:shadow-lg transition-shadow py-5"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                        <img src={logo} alt="Job logo" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground">
                          {job.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Rakamin
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Jakarta Selatan</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Wallet className="w-4 h-4" />
                      <span>{job.list_card.started_on_text}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Right Panel - Job Details */}
          <div className="lg:col-span-8">
            <Card className="border">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center">
                      <img src={logo} alt="Job logo" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-green-800 text-white dark:bg-green-900/30 dark:text-green-400">
                          {job?.slug}
                        </span>
                      </div>
                      <h1 className="text-2xl font-bold text-foreground">
                        {job?.title}
                      </h1>
                      <p className="text-muted-foreground mt-1">Rakamin</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => route(`/user/apply/${idSelected}`)}
                    className="bg-amber-400 hover:bg-amber-500 hover:text-slate-600 text-black font-medium px-6"
                  >
                    Apply
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">{job?.job_description}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </PrivateRoute>
  );
};

export default JobListingPage;
