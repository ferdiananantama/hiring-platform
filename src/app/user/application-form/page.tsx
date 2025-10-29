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
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { CandidatListProps } from "@/types/candidat-list";
import {
  addCandidatToIndexedDB,
  getJobByIdFromIndexedDB,
} from "@/utils/indexedDBUtils";
import { useNavigate, useParams } from "react-router-dom";
import PrivateRoute from "@/components/layouts/PrivateRoute";
import type { JobListProps } from "@/types/job-list";
import * as handTrack from "handtrackjs"; // Importing correctly
import Webcam from "react-webcam";

export default function ApplicationForm() {
  const route = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [job, setJob] = useState<JobListProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isPoseDetected, setIsPoseDetected] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // To track video load status
  const webcamRef = useRef<Webcam | null>(null); // Specify the type as Webcam
  const [model, setModel] = useState<any>(null);

  // onClick for take picture button
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<CandidatListProps>({
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
        idJobList: Number(id),
      };
      addCandidatToIndexedDB(payload);
      route("/dashboard/success/apply");
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

  const inputFullName = useMemo(() => {
    return job?.fields.find((field) => field.key === "fullName")?.validation
      ?.required;
  }, [job?.fields]);

  const inputPhotoProfile = useMemo(() => {
    return job?.fields.find((field) => field.key === "photoProfile")?.validation
      ?.required;
  }, [job?.fields]);

  console.log("inputPhotoProfile:", inputPhotoProfile);

  const inputGender = useMemo(() => {
    return job?.fields.find((field) => field.key === "gender")?.validation
      ?.required;
  }, [job?.fields]);

  const inputDomicile = useMemo(() => {
    return job?.fields.find((field) => field.key === "domicile")?.validation
      ?.required;
  }, [job?.fields]);

  const inputEmail = useMemo(() => {
    return job?.fields.find((field) => field.key === "email")?.validation
      ?.required;
  }, [job?.fields]);

  const inputPhoneNumber = useMemo(() => {
    return job?.fields.find((field) => field.key === "phoneNumber")?.validation
      ?.required;
  }, [job?.fields]);

  const inputLinkedInLink = useMemo(() => {
    return job?.fields.find((field) => field.key === "linkedinLink")?.validation
      ?.required;
  }, [job?.fields]);

  const inputDateOfBirth = useMemo(() => {
    return job?.fields.find((field) => field.key === "dateOfBirth")?.validation
      ?.required;
  }, [job?.fields]);

  useEffect(() => {
    handTrack
      .load()
      .then((loadedModel) => {
        setModel(loadedModel);
        console.log("Model loaded successfully.");
      })
      .catch((error) => {
        console.error("Error loading handTrack model:", error);
      });
  }, []);

  const detectGesture = async () => {
    if (webcamRef.current && model && isVideoLoaded) {
      const predictions = await model.detect(webcamRef.current.video);

      if (predictions.length > 0) {
        const hand = predictions[0];
        const landmarks = hand.landmarks;

        // Detect 3️⃣ pose (3 fingers)
        const fingerCount = landmarks ? landmarks.length : 0;

        if (fingerCount >= 3) {
          setIsPoseDetected(true);
        } else {
          setIsPoseDetected(false);
        }
      } else {
        setIsPoseDetected(false);
      }
    }
  };

  useEffect(() => {
    if (model && webcamRef.current) {
      const interval = setInterval(() => {
        detectGesture();
      }, 100); // Check every 100ms for gestures

      return () => clearInterval(interval);
    }
  }, [model, isVideoLoaded]);

  // Ensure video is loaded before detecting gestures
  const handleVideoOnLoad = () => {
    setIsVideoLoaded(true); // Video data is now loaded
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // Capture the screenshot
      setCapturedImage(imageSrc); // Store captured image
      setIsModalOpen(false); // Close modal after capture
    }
  };

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
                  Apply {job?.title ?? "Jobs"} at Rakamin
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-sm text-destructive mb-6">* Required</div>

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
                    onClick={handleOpenModal}
                  >
                    <Camera className="h-4 w-4" />
                    Take a Picture
                  </Button>
                </div>
              </div>

              {inputFullName !== null && (
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
                    required={inputFullName ?? false}
                  />
                </div>
              )}

              {inputDateOfBirth !== null && (
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
                        required={inputDateOfBirth ?? false}
                        captionLayout="dropdown"
                        onSelect={(date: any) => {
                          setDate(date);
                          setOpen(false);
                        }}
                        className="bg-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {inputGender !== null && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">
                    Pronoun (gender)<span className="text-destructive">*</span>
                  </Label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        required={inputGender ?? false}
                        className="flex gap-8"
                      >
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
                          <Label
                            htmlFor="male"
                            className="font-normal cursor-pointer"
                          >
                            He/him (Male)
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>
              )}

              {inputDomicile !== null && (
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
                    rules={{ required: "Domicile is required" }}
                    render={({ field }) => (
                      <Select
                        required={inputDomicile ?? false}
                        {...field}
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
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
                  {errors.domicile && (
                    <span className="text-red-500 text-sm">
                      {errors.domicile.message}
                    </span>
                  )}
                </div>
              )}

              {inputPhoneNumber !== null && (
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
                          <span className="flex items-center gap-2">
                            🇮🇩 +62
                          </span>
                        </SelectItem>
                        <SelectItem value="+1">
                          <span className="flex items-center gap-2">🇺🇸 +1</span>
                        </SelectItem>
                        <SelectItem value="+65">
                          <span className="flex items-center gap-2">
                            🇸🇬 +65
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      {...register("phone")}
                      id="phoneNumber"
                      placeholder="81XXXXXXXXX"
                      className="flex-1 bg-background"
                      required={inputPhoneNumber ?? false}
                    />
                  </div>
                </div>
              )}

              {inputEmail !== null && (
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
                    required={inputEmail ?? false}
                  />
                </div>
              )}

              {inputLinkedInLink !== null && (
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
                    required={inputLinkedInLink ?? false}
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#17A2B8] hover:bg-[#138496] text-white font-medium py-6 text-base"
              >
                Submit
              </Button>
            </form>
          </CardContent>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D1F20]/50">
              <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-4 relative">
                <button
                  aria-label="Close"
                  className="absolute top-4 right-4 text-black text-xl font-bold"
                  onClick={handleCloseModal}
                >
                  ×
                </button>
                <h2 className="text-lg font-bold mb-1">
                  Raise Your Hand to Capture
                </h2>
                <p className="mb-4 text-sm text-slate-500">
                  We'll take the photo once your hand pose is detected
                </p>

                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                  videoConstraints={{
                    facingMode: "user",
                    width: 1280,
                    height: 720,
                  }}
                  onCanPlay={handleVideoOnLoad}
                />

                {isPoseDetected && (
                  <div className="mt-4 flex justify-center gap-6">
                    <Button
                      onClick={captureImage}
                      className="bg-green-500 text-white"
                    >
                      Capture Photo
                    </Button>
                  </div>
                )}

                {capturedImage && (
                  <div className="mt-4">
                    <h3 className="font-bold">Preview:</h3>
                    <img
                      src={capturedImage}
                      alt="Captured"
                      className="w-full"
                    />
                  </div>
                )}

                <p className="my-4 text-sm text-gray-700">
                  To take a picture, follow the hand poses in the order shown
                  below. The system will automatically capture the image once
                  the final pose is detected.
                </p>
                <div className="flex justify-center gap-6">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/194/194933.png"
                    alt="Pose 1"
                    className="h-14 w-14"
                  />
                  <span className="inline-flex items-center text-gray-500 font-bold text-xl">
                    &gt;
                  </span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/194/194935.png"
                    alt="Pose 2"
                    className="h-14 w-14"
                  />
                  <span className="inline-flex items-center text-gray-500 font-bold text-xl">
                    &gt;
                  </span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/194/194934.png"
                    alt="Pose 3"
                    className="h-14 w-14"
                  />
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PrivateRoute>
  );
}
