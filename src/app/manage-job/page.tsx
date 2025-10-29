import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, User } from "lucide-react";
import { useEffect, useState } from "react";
import type { CandidatListProps } from "@/types/candidat-list";
import { getAllCandidateFromIndexedDB, getJobByIdFromIndexedDB } from "@/utils/indexedDBUtils";
import { useParams } from "react-router-dom";
import type { JobListProps } from "@/types/job-list";
import emptyImg from "@/assets/images/empty-joblist.png";
import PrivateRoute from "@/components/layouts/PrivateRoute";


export default function ManageCandidate() {
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(
    new Set()
  );
  const { id } = useParams();
  const [candidats, setCandidates] = useState<CandidatListProps[]>([]);
  const [job, setJob] = useState<JobListProps>();  

 useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Fetch all candidates from IndexedDB
        const fetchedCandidates = await getAllCandidateFromIndexedDB();
        
        // Filter candidates based on idJobList matching the current job id from the params
        const filteredCandidates = fetchedCandidates.filter(
          (candidate) => candidate.idJobList === Number(id)
        );

        // Update state with the filtered candidates
        setCandidates(filteredCandidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates(); // Call the fetch function
  }, [id]);

  useEffect(() => {
      const fetchJobById = async (id: number) => {
        const jobFound = await getJobByIdFromIndexedDB(id);
        if (jobFound) {
          setJob(jobFound);
        }
      };
  
      const idParam = Number(id); // Convert the selected id to a number
      if (idParam) {
        fetchJobById(idParam);
      }
    }, [id]);


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

  return (
    <PrivateRoute>
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b border-border flex items-center px-6 py-4 gap-2 text-sm">
        <Button
          onClick={() => {
            window.history.back();
          }}
          variant="outline"
          size="sm"
          className="rounded-md bg-white"
        >
          Job list
        </Button>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <Button variant="outline" size="sm" className="rounded-md bg-slate-200">
          Manage Candidate
        </Button>
        <div className="ml-auto">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Breadcrumb Navigation */}

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-foreground">
          {job?.title ?? "Job Title"}
        </h1>

        {/* Candidate Table */}
        {
          candidats.length > 0 ? (
            <Card className="overflow-hidden bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 font-medium text-sm text-foreground">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleSelectAll}
                            className="w-5 h-5 rounded border-2 border-cyan-500 text-cyan-500 focus:ring-cyan-500 cursor-pointer accent-cyan-500"
                          />
                          <span className="uppercase text-xs font-semibold tracking-wide">
                            NAMA LENGKAP
                          </span>
                        </div>
                      </th>
                      <th className="text-left p-4 font-semibold text-xs text-foreground uppercase tracking-wide">
                        EMAIL ADDRESS
                      </th>
                      <th className="text-left p-4 font-semibold text-xs text-foreground uppercase tracking-wide">
                        PHONE NUMBERS
                      </th>
                      <th className="text-left p-4 font-semibold text-xs text-foreground uppercase tracking-wide">
                        DATE OF BIRTH
                      </th>
                      <th className="text-left p-4 font-semibold text-xs text-foreground uppercase tracking-wide">
                        DOMICILE
                      </th>
                      <th className="text-left p-4 font-semibold text-xs text-foreground uppercase tracking-wide">
                        GENDER
                      </th>
                      <th className="text-left p-4 font-semibold text-xs text-foreground uppercase tracking-wide">
                        LINK LINKEDIN
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidats.map((candidate, index) => (
                      <tr
                        key={candidate.id}
                        className={`border-b border-border hover:bg-muted/20 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-muted/10"
                        }`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedCandidates.has(String(candidate.id) ?? "")}
                              onChange={() => toggleCandidate(String(candidate.id) ?? "")}
                              className="w-5 h-5 rounded border-2 border-cyan-500 text-cyan-500 focus:ring-cyan-500 cursor-pointer accent-cyan-500"
                            />
                            <span className="text-sm text-foreground font-medium">
                              {candidate.fullName}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-foreground">
                          {candidate.email}
                        </td>
                        <td className="p-4 text-sm text-foreground">
                          {candidate.phone}
                        </td>
                        <td className="p-4 text-sm text-foreground">
                          {'-'}
                        </td>
                        <td className="p-4 text-sm text-foreground">
                          {candidate.domicile}
                        </td>
                        <td className="p-4 text-sm text-foreground">
                          {candidate.gender}
                        </td>
                        <td className="p-4">
                          <a
                            href={candidate.linkedin_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-cyan-500 hover:text-cyan-600 hover:underline transition-colors"
                          >
                            {candidate.linkedin_link}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Card className="flex flex-col items-center justify-center h-auto min-h-[700px]">
                <img
                  src={emptyImg}
                  alt="No data illustration"
                  className="w-72 h-72 mb-4"
                />
                <div className="text-center flex flex-col gap-3">
                  <p className="text-xl font-semibold text-foreground">
                    No candidates found
                  </p>
                  <p>
                    Create a job opening now and start the candidate process.
                  </p>
                </div>
            </Card>
          )
        }
      </div>
    </div>
    </PrivateRoute>
  );
}
