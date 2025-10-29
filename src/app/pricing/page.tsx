import { ArrowLeft, Camera, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { CandidatListProps } from "@/types/candidat-list";
import { addCandidatToIndexedDB, getJobByIdFromIndexedDB } from "@/utils/indexedDBUtils";
import { useParams } from "react-router-dom";
import PrivateRoute from "@/components/layouts/PrivateRoute";
import type { JobListProps } from "@/types/job-list";

export default function ApplicationForm() {

  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [job, setJob] = useState<JobListProps | null>(null);
  const { id} = useParams();  

  const {register, handleSubmit, control, getValues} = useForm<CandidatListProps>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      domicile: "",
      gender: "",
      profile_picture: "1",
      linkedin_link: "",
    },
  });

  const onSubmit = () => {
    try {
      const payload = {
        fullName: getValues("fullName"),
        email: getValues("email"),
        phone: getValues("phone"),
        domicile: getValues("domicile"),
        gender: getValues("gender"),
        profile_picture: getValues("profile_picture"),
        linkedin_link: getValues("linkedin_link"),
        idJobList: Number(id)
      }
      addCandidatToIndexedDB(payload);
    } catch (error) {
        console.error("Error submitting candidat:", error);
    }
  };

   useEffect(() => {
      const fetchJobById = async (id: number) => {
        const jobFound = await getJobByIdFromIndexedDB(id);
        if (jobFound) {
          setJob(jobFound);
        }
      };
  
      const idParam = Number(id);
      if (idParam) {
        fetchJobById(idParam);
      }
    }, [id]); 

  return (
    <PrivateRoute>
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-foreground">
                Apply {job?.title ?? 'Jobs'} at Rakamin
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 rounded bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-medium">i</span>
              </div>
              <span>This field required to fill</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-10">
          <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
            <div className="text-sm text-destructive mb-6">* Required</div>

            {/* Photo Profile Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                Photo Profile
              </Label>
              <div className="flex flex-col items-start gap-4">
                <div className="w-28 h-28 rounded-full bg-gradient from-cyan-200 to-cyan-300 flex items-center justify-center overflow-hidden">
                  <svg
                    width="112"
                    height="112"
                    viewBox="0 0 112 112"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="56" cy="56" r="56" fill="#A5E5E5" />
                    <ellipse cx="56" cy="80" rx="28" ry="32" fill="#1A9B9B" />
                    <circle cx="56" cy="42" r="16" fill="#F4A261" />
                    <path
                      d="M40 42C40 42 42 38 46 38C50 38 52 42 52 42"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M60 42C60 42 62 38 66 38C70 38 72 42 72 42"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M48 48C48 48 52 52 56 52C60 52 64 48 64 48"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M38 30C38 30 40 25 48 25C52 25 54 28 54 28"
                      fill="#6B4E3D"
                    />
                    <path
                      d="M56 28C56 28 58 25 62 25C70 25 74 30 74 30"
                      fill="#6B4E3D"
                    />
                  </svg>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => console.log("Take picture clicked")}
                >
                  <Camera className="h-4 w-4" />
                  Take a Picture
                </Button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-foreground"
              >
                Full name<span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName")}
                className="bg-background"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="date" className="px-1">
                Date of birth<span className="text-destructive">*</span>
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0 bg-white border rounded-lg"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                    className="bg-white" // Make the calendar background white as well
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Pronoun (Gender) */}
            <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">
          Pronoun (gender)<span className="text-destructive">*</span>
        </Label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} 
              value={field.value} onValueChange={(value) => field.onChange(value)} required className="flex gap-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label
                  htmlFor="female"
                  className="font-normal cursor-pointer"
                >
                  She/her (Female)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="font-normal cursor-pointer">
                  He/him (Male)
                </Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

            {/* Domicile */}
            <div className="space-y-2">
              <Label
                htmlFor="domicile"
                className="text-sm font-medium text-foreground"
              >
                Domicile<span className="text-destructive">*</span>
              </Label>
              <Controller
              name="domicile"
              control={control}
              render={({ field }) => (
                <Select {...field} value={field.value} onValueChange={(value) => field.onChange(value)} required>
                  <SelectTrigger className="bg-background w-full">
                    <SelectValue placeholder="Choose your domicile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="bandung">Bandung</SelectItem>
                    <SelectItem value="surabaya">Surabaya</SelectItem>
                    <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="bali">Bali</SelectItem>
                  </SelectContent>
                </Select>
              )}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-foreground"
              >
                Phone number<span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-2">
                <Select defaultValue="+62">
                  <SelectTrigger className="w-24 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+62">
                      <span className="flex items-center gap-2">🇮🇩 +62</span>
                    </SelectItem>
                    <SelectItem value="+1">
                      <span className="flex items-center gap-2">🇺🇸 +1</span>
                    </SelectItem>
                    <SelectItem value="+65">
                      <span className="flex items-center gap-2">🇸🇬 +65</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                {...register("phone")}
                  id="phoneNumber"
                  placeholder="81XXXXXXXXX"
                  className="flex-1 bg-background"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email<span className="text-destructive">*</span>
              </Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="bg-background"
              />
            </div>

            {/* LinkedIn URL */}
            <div className="space-y-2">
              <Label
                htmlFor="linkedinUrl"
                className="text-sm font-medium text-foreground"
              >
                Link Linkedin<span className="text-destructive">*</span>
              </Label>
              <Input
                {...register("linkedin_link")}
                id="linkedinUrl"
                placeholder="https://linkedin.com/in/username"
                className="bg-background"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#17A2B8] hover:bg-[#138496] text-white font-medium py-6 text-base"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </PrivateRoute>
  );
}
