import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, X, CheckCircle2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import JobModal from "./components/add-job-list";
import { getAllJobsFromIndexedDB } from "@/utils/indexedDBUtils";
import type { JobListProps } from "@/types/job-list";
import emptyImg from "@/assets/images/empty-joblist.png";
import PrivateRoute from "@/components/layouts/PrivateRoute";
import Header from "@/components/navbar";

const JobListApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const route = useNavigate();

  const [jobs, setJobs] = useState<JobListProps[]>([]);

  const fetchJobs = async () => {
    const fetchedJobs = await getAllJobsFromIndexedDB();
    setJobs(fetchedJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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
    fetchJobs();
  };

  const filteredJobs = useMemo(() => {
    if (!searchQuery) {
      return jobs;
    }

    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.salary_range.display_text
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, jobs]);

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-50">
        <Header />

        <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
          <div className="flex-1">
            <div className="mb-6 relative">
              <Input
                type="text"
                placeholder="Search by job details"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-6 text-base bg-background"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-600" />
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.length > 0 &&
                filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="bg-background border py-6 shadow"
                  >
                    <CardContent className="flex justify-between">
                      <div>
                        <div className="mb-4">
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-sm text-sm font-medium ${getStatusBadgeStyles(
                                job.status
                              )}`}
                            >
                              {getStatusText(job.status)}
                            </span>
                            <span className="text-sm text-muted-foreground p-1.5 border rounded-sm">
                              {job.list_card.started_on_text}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {job.salary_range.display_text}
                        </p>
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={() => {
                            route(
                              `/dashboard/admin/manage-job/${String(job.id)}`
                            );
                          }}
                          variant="default"
                          className="bg-cyan-600 hover:bg-cyan-700 text-background"
                        >
                          Manage Job
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {filteredJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-auto min-h-[700px] py-8">
                  <img
                    src={emptyImg}
                    alt="No data illustration"
                    className="w-72 h-72 mb-4"
                  />
                  <div className="text-center flex flex-col gap-3">
                    <p className="text-xl font-semibold text-foreground">
                      No job openings available
                    </p>
                    <p>
                      Create a job opening now and start the candidate process.
                    </p>
                    <div>
                      <Button
                        onClick={() => setShowModal(true)}
                        className="bg-amber-400 hover:bg-amber-500 hover:text-slate-600 text-black font-medium px-6"
                      >
                        Create a new job
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <Card className="bg-slate-800 text-background border-0 sticky top-6 py-8">
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">
                  Recruit the best candidates
                </h2>
                <p className="text-white text-sm mb-6">
                  Create jobs, invite, and hire with ease
                </p>
                <Button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-background font-medium"
                >
                  Create a new job
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {showToast && (
          <div className="fixed bottom-6 left-6 bg-background border border-border rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm">
            <CheckCircle2 className="w-5 h-5 text-cyan-600" />
            <p className="text-sm text-foreground">
              Job vacancy successfully created
            </p>
            <button
              onClick={() => setShowToast(false)}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <JobModal
          showModal={showModal}
          setShowModal={setShowModal}
          createJob={createJob}
          setShowToast={setShowToast}
        />
      </div>
    </PrivateRoute>
  );
};

export default JobListApp;
