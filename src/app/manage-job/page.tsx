import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, User } from "lucide-react";
import { useState } from "react";

interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  domicile: string;
  gender: "Male" | "Female";
  linkedinUrl: string;
}

export default function ManageCandidate() {
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(
    new Set()
  );

  const candidates: Candidate[] = [
    {
      id: "1",
      fullName: "Aurelie Yukiko",
      email: "aurelieyukiko.yahoo.com",
      phone: "082120908766",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Female",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "2",
      fullName: "Dityo Hendyawan",
      email: "dityohendyawan@yaho...",
      phone: "081184180678",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Female",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "3",
      fullName: "Mira Workman",
      email: "miraworkman@yahoo.c...",
      phone: "081672007108",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Female",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "4",
      fullName: "Paityn Culhane",
      email: "paitynculhane@yahoo....",
      phone: "081521500714",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "5",
      fullName: "Emerson Baptista",
      email: "emersonbaptista@yah...",
      phone: "082167008244",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "6",
      fullName: "Indra Zein",
      email: "indrazein@yahoo.com",
      phone: "081181630568",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "7",
      fullName: "Joyce",
      email: "joyce@yahoo.com",
      phone: "084288771015",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "8",
      fullName: "Eriberto",
      email: "eriberto@yahoo.com",
      phone: "083862419121",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "9",
      fullName: "Javon",
      email: "javon@yahoo.com",
      phone: "083283445502",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "10",
      fullName: "Emory",
      email: "emory@yahoo.com",
      phone: "087188286367",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "11",
      fullName: "Ella",
      email: "ella@yahoo.com",
      phone: "088306913834",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
    {
      id: "12",
      fullName: "Sylvan",
      email: "sylvan@yahoo.com",
      phone: "087752105228",
      dateOfBirth: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedinUrl: "https://www.linkedin.com/in/use...",
    },
  ];

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
    if (selectedCandidates.size === candidates.length) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(candidates.map((c) => c.id)));
    }
  };

  const allSelected =
    selectedCandidates.size === candidates.length && candidates.length > 0;

  return (
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
          Front End Developer
        </h1>

        {/* Candidate Table */}
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
                {candidates.map((candidate, index) => (
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
                          checked={selectedCandidates.has(candidate.id)}
                          onChange={() => toggleCandidate(candidate.id)}
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
                      {candidate.dateOfBirth}
                    </td>
                    <td className="p-4 text-sm text-foreground">
                      {candidate.domicile}
                    </td>
                    <td className="p-4 text-sm text-foreground">
                      {candidate.gender}
                    </td>
                    <td className="p-4">
                      <a
                        href={candidate.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-500 hover:text-cyan-600 hover:underline transition-colors"
                      >
                        {candidate.linkedinUrl}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
