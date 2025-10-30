import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, X, CheckCircle2 } from "lucide-react";
import JobModal from "./components/add-job-list";
import emptyImg from "@/assets/images/empty-joblist.png";
import PrivateRoute from "@/components/layouts/PrivateRoute";
import Header from "@/components/navbar";
import useJobListModel from "./job-list-model";
import SkeletonJobList from "@/app/admin/job-list/components/skeleton-job-list";

const JobListApp = () => {
  const model = useJobListModel();
  console.log(model.dataJobsList.loading);
  
  return (
    <PrivateRoute requiredRole="admin">
      <div className="min-h-screen bg-slate-50">
        <Header />

        <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
          <div className="flex-1">
            <div className="mb-6 relative">
              <Input
                type="text"
                placeholder="Search by job details"
                value={model.searchQuery}
                onChange={(e) => model.setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-6 text-base bg-background"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-600" />
            </div>

            <div className="space-y-4">
              {model.filteredJobs.length === 0 && model.dataJobsList.loading ? (
               <SkeletonJobList />
              ) : (
                model.filteredJobs.map((job) => (
                  <Card key={job.id} className="bg-background border py-6 shadow">
                    <CardContent className="flex justify-between">
                      <div>
                        <div className="mb-4">
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-sm text-sm font-medium ${model.getStatusBadgeStyles(job.status)}`}
                            >
                              {model.getStatusText(job.status)}
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
                            model.route(`/dashboard/admin/manage-job/${String(job.id)}`);
                          }}
                          variant="default"
                          className="bg-cyan-600 hover:bg-cyan-700 text-background"
                        >
                          Manage Job
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
              {model.filteredJobs.length === 0 && !model.dataJobsList.loading && (
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
                        onClick={() => model.setShowModal(true)}
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
                  onClick={() => model.setShowModal(true)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-background font-medium"
                >
                  Create a new job
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {model.showToast && (
          <div className="fixed bottom-6 left-6 bg-background border border-border rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm">
            <CheckCircle2 className="w-5 h-5 text-cyan-600" />
            <p className="text-sm text-foreground">
              Job vacancy successfully created
            </p>
            <button
              onClick={() => model.setShowToast(false)}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <JobModal
          showModal={model.showModal}
          setShowModal={model.setShowModal}
          createJob={model.createJob}
          setShowToast={model.setShowToast}
        />
      </div>
    </PrivateRoute>
  );
};

export default JobListApp;
