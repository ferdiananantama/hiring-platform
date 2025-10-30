import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Wallet } from "lucide-react";
import logo from "@/assets/images/logo-list.png";
import PrivateRoute from "@/components/layouts/PrivateRoute";
import Header from "@/components/navbar";
import useJobListingModel from "./job-listing-models";

const JobListingPage = () => {

  const model = useJobListingModel();

  return (
    <PrivateRoute requiredRole="user">
      <div className="min-h-screen bg-background">
        <Header />

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-3">
              {model.dataJobsList.data.length > 0 &&
                model.dataJobsList.data.map((job) => (
                  <Card
                    onClick={() => model.onChangeId(job.id ? job.id.toString() : "")}
                    className={`border hover:shadow-lg transition-shadow py-5 ${
                      model.selectedJobId === job.id?.toString()
                        ? "border-[#01777F]  border-2"
                        : "border-slate-300 bg-white"
                    }`}
                    key={job.id}
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
                            {model.dataJob.data?.slug}
                          </span>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">
                          {model.dataJob.data?.title}
                        </h1>
                        <p className="text-muted-foreground mt-1">Rakamin</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => model.route(`/user/apply/${model.idSelected}`)}
                      className="bg-amber-400 hover:bg-amber-500 hover:text-slate-600 text-black font-medium px-6"
                    >
                      Apply
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {model.dataJob.data?.job_description}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default JobListingPage;
