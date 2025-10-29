import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { JobListProps } from "@/types/job-list";
import { useState } from "react";
import { addJobToIndexedDB } from "@/utils/indexedDBUtils";

interface JobModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  createJob?: (data: any) => void; // Fungsi untuk membuat pekerjaan baru
  jobList?: JobListProps; // Daftar pekerjaan yang ada
}

type ProfileRequirement = "mandatory" | "optional" | "off";

interface ProfileRequirements {
  fullName: ProfileRequirement;
  photoProfile: ProfileRequirement;
  gender: ProfileRequirement;
  domicile: ProfileRequirement;
  email: ProfileRequirement;
  phoneNumber: ProfileRequirement;
  linkedinLink: ProfileRequirement;
  dateOfBirth: ProfileRequirement;
}

const JobModal = ({ showModal, setShowModal }: JobModalProps) => {
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      jobName: "",
      jobDescription: "",
      minSalary: "",
      maxSalary: "",
      candidatesNeeded: "",
      jobType: "",
    },
  });

  const [profileRequirements, setProfileRequirements] =
    useState<ProfileRequirements>({
      fullName: "mandatory",
      photoProfile: "mandatory",
      gender: "mandatory",
      domicile: "mandatory",
      email: "mandatory",
      phoneNumber: "mandatory",
      linkedinLink: "mandatory",
      dateOfBirth: "mandatory",
    });
    

  const updateProfileRequirement = (
    field: keyof ProfileRequirements,
    value: ProfileRequirement
  ) => {
    setProfileRequirements((prev) => ({ ...prev, [field]: value }));
  };

  const getButtonStyles = (
    current: ProfileRequirement,
    target: ProfileRequirement
  ) => {
    if (current === target) {
      if (target === "mandatory" )
        return "bg-cyan-600 text-white border-cyan-600";
      if (target === "optional" )
        return "bg-slate-200 text-slate-700 border-slate-300";
      if (target === "off" )
        return "bg-slate-200 text-slate-700 border-slate-300";
    }
    return "bg-background text-muted-foreground border-border hover:bg-muted";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };


  const onSubmit = () => {
    try {
      const fields = [
        "fullName",
        "photoProfile",
        "gender",
        "domicile",
        "email",
        "phoneNumber",
        "linkedinLink",
        "dateOfBirth"
      ].map((key) => {
        // Use the `key` to access profileRequirements dynamically
        let required: boolean | null = null;

        // Check the value of the key in profileRequirements
        if (profileRequirements[key as keyof ProfileRequirements] === "mandatory") {
          required = true;
        } else if (profileRequirements[key as keyof ProfileRequirements] === "optional") {
          required = false;
        } else if (profileRequirements[key as keyof ProfileRequirements] === "off") {
          required = null;
        }

        return {
          key,
          validation: {
            required
          }
        };
      });
      const payload = {
        title: getValues("jobName"),
        slug: getValues("jobType"),
        status: "active",
        salary_range: {
          min: Number(getValues("minSalary")) || 0,
          max: Number(getValues("maxSalary")) || 0,
          currency: "IDR",
          display_text: `Rp${getValues("minSalary")} - Rp${getValues(
            "maxSalary"
          )}`,
        },
        list_card: {
          badge: "Active",
          started_on_text: `Started on ${new Date().toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )}`,
          cta: "Manage Jobs",
        },
        job_description: getValues("jobDescription"),
        fields: fields
      };
      addJobToIndexedDB(payload);
    }
     catch (error) {
      console.error("Error submitting job:", error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-[#1D1F20]/70 flex items-center justify-center z-50 p-4">
        <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-background border-b border-border px-8 py-5 flex items-center justify-between z-10">
            <h2 className="text-2xl font-semibold text-foreground">
              Job Opening
            </h2>
            <button
              onClick={handleCloseModal}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-8 space-y-6">
            {/* Job Name */}
            <div>
              <Label
                htmlFor="jobName"
                className="text-sm font-normal text-foreground mb-2 block"
              >
                Job Name<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="jobName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-full h-12 text-base"
                    required
                  />
                )}
              />
            </div>
            {/* Job Type */}
            <div>
              <label
                htmlFor="jobType"
                className="text-sm font-normal text-foreground mb-2 block"
              >
                Job Type<span className="text-red-500">*</span>
              </label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    required
                  >
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-Time">Full Time</SelectItem>
                      <SelectItem value="Part-Time">Part Time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {/* Job Description */}
            <div>
              <Label
                htmlFor="jobDescription"
                className="text-sm font-normal text-foreground mb-2 block"
              >
                Job Description<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="jobDescription"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="w-full min-h-32 text-base resize-none"
                    required
                  />
                )}
              />
            </div>
            {/* Number of Candidates */}
            <div>
              <Label
                htmlFor="candidatesNeeded"
                className="text-sm font-normal text-foreground mb-2 block"
              >
                Number of Candidates Needed
                <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="candidatesNeeded"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-full h-12 text-base"
                    required
                  />
                )}
              />
            </div>
            {/* Job Salary */}
            <div>
              <Label className="text-sm font-normal text-foreground mb-4 block">
                Job Salary
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="minSalary"
                    className="text-sm text-muted-foreground mb-2 block font-normal"
                  >
                    Minimum Estimated Salary
                  </Label>
                  <Controller
                    name="minSalary"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground text-base">
                          Rp
                        </span>
                        <Input
                          {...field}
                          className="pl-10 h-12 text-base"
                          type="number"
                          required
                        />
                      </div>
                    )}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="maxSalary"
                    className="text-sm text-muted-foreground mb-2 block font-normal"
                  >
                    Maximum Estimated Salary
                  </Label>
                  <Controller
                    name="maxSalary"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground text-base">
                          Rp
                        </span>
                        <Input
                          {...field}
                          className="pl-10 h-12 text-base"
                          type="number"
                          required
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-6 mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Minimum Profile Information Required
              </h3>
              <div className="space-y-1">
                {/* Full name */}
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-base text-foreground">Full name</span>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("fullName", "mandatory")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.fullName,
                        "mandatory"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Mandatory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("fullName", "optional")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.fullName,
                        "optional"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Optional
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("fullName", "off")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.fullName,
                        "off"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Off
                    </Button>
                  </div>
                </div>

                {/* Photo Profile */}
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-base text-foreground">
                    Photo Profile
                  </span>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("photoProfile", "mandatory")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.photoProfile,
                        "mandatory"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Mandatory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("photoProfile", "optional")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.photoProfile,
                        "optional"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Optional
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("photoProfile", "off")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.photoProfile,
                        "off"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Off
                    </Button>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-base text-foreground">Gender</span>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("gender", "mandatory")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.gender,
                        "mandatory"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Mandatory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("gender", "optional")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.gender,
                        "optional"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Optional
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateProfileRequirement("gender", "off")}
                      className={`${getButtonStyles(
                        profileRequirements.gender,
                        "off"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Off
                    </Button>
                  </div>
                </div>

                {/* Domicile */}
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-base text-foreground">Domicile</span>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("domicile", "mandatory")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.domicile,
                        "mandatory"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Mandatory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("domicile", "optional")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.domicile,
                        "optional"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Optional
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("domicile", "off")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.domicile,
                        "off"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Off
                    </Button>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-base text-foreground">Email</span>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("email", "mandatory")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.email,
                        "mandatory"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Mandatory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("email", "optional")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.email,
                        "optional"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Optional
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateProfileRequirement("email", "off")}
                      className={`${getButtonStyles(
                        profileRequirements.email,
                        "off"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Off
                    </Button>
                  </div>
                </div>

                {/* Phone number */}
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-base text-foreground">
                    Phone number
                  </span>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("phoneNumber", "mandatory")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.phoneNumber,
                        "mandatory"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Mandatory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("phoneNumber", "optional")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.phoneNumber,
                        "optional"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Optional
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("phoneNumber", "off")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.phoneNumber,
                        "off"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Off
                    </Button>
                  </div>
                </div>

                {/* LinkedIn link */}
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-base text-foreground">
                    LinkedIn link
                  </span>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("linkedinLink", "mandatory")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.linkedinLink,
                        "mandatory"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Mandatory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("linkedinLink", "optional")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.linkedinLink,
                        "optional"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Optional
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("linkedinLink", "off")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.linkedinLink,
                        "off"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Off
                    </Button>
                  </div>
                </div>

                {/* Date of birth */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-base text-foreground">
                    Date of birth
                  </span>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("dateOfBirth", "mandatory")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.dateOfBirth,
                        "mandatory"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Mandatory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("dateOfBirth", "optional")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.dateOfBirth,
                        "optional"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Optional
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProfileRequirement("dateOfBirth", "off")
                      }
                      className={`${getButtonStyles(
                        profileRequirements.dateOfBirth,
                        "off"
                      )} px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    >
                      Off
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-background border-t border-border px-8 py-5 flex justify-end">
            <Button
              className="bg-cyan-600 text-white hover:bg-cyan-700 text-base font-medium"
              onClick={handleSubmit(onSubmit)}
            >
              Publish Job
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default JobModal;
