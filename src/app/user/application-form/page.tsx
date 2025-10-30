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
import { Controller} from "react-hook-form";
import Webcam from "react-webcam";
import useApplicationFormModel from "./application-form-model";
import PrivateRoute from "@/components/layouts/PrivateRoute";

export default function ApplicationForm() {
  const model = useApplicationFormModel();

  return (
    <PrivateRoute requiredRole="user">
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="bg-background">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => model.route(-1)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold text-foreground">
                  Apply {model.job.data?.title ?? "Jobs"} at Rakamin
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
            <form onSubmit={model.handleSubmit(model.onSubmit)} className="space-y-6">
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
                    onClick={model.handleOpenModal}
                  >
                    <Camera className="h-4 w-4" />
                    Take a Picture
                  </Button>
                </div>
              </div>

              {model.inputFullName !== null && (
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
                    {...model.register("fullName")}
                    className="bg-background"
                    required={model.inputFullName ?? false}
                  />
                </div>
              )}

              {model.inputDateOfBirth !== null && (
                <div className="space-y-2">
                  <Label htmlFor="date" className="px-1">
                    Date of birth<span className="text-destructive">*</span>
                  </Label>
                  <Popover open={model.open} onOpenChange={model.setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                      >
                        {model.date ? model.date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0 bg-white border rounded-lg"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={model.date}
                        required={model.inputDateOfBirth ?? false}
                        captionLayout="dropdown"
                        onSelect={(date: any) => {
                          model.setDate(date);
                          model.setOpen(false);
                        }}
                        className="bg-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {model.inputGender !== null && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">
                    Pronoun (gender)<span className="text-destructive">*</span>
                  </Label>
                  <Controller
                    name="gender"
                    control={model.control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        required={model.inputGender ?? false}
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

              {model.inputDomicile !== null && (
                <div className="space-y-2">
                  <Label
                    htmlFor="domicile"
                    className="text-sm font-medium text-foreground"
                  >
                    Domicile<span className="text-destructive">*</span>
                  </Label>
                  <Controller
                    name="domicile"
                    control={model.control}
                    rules={{ required: "Domicile is required" }}
                    render={({ field }) => (
                      <Select
                        required={model.inputDomicile ?? false}
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
                  {model.errors.domicile && (
                    <span className="text-red-500 text-sm">
                      {model.errors.domicile.message}
                    </span>
                  )}
                </div>
              )}

              {model.inputPhoneNumber !== null && (
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
                      {...model.register("phone")}
                      id="phoneNumber"
                      placeholder="81XXXXXXXXX"
                      className="flex-1 bg-background"
                      required={model.inputPhoneNumber ?? false}
                    />
                  </div>
                </div>
              )}

              {model.inputEmail !== null && (
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email<span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...model.register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-background"
                    required={model.inputEmail ?? false}
                  />
                </div>
              )}

              {model.inputLinkedInLink !== null && (
                <div className="space-y-2">
                  <Label
                    htmlFor="linkedinUrl"
                    className="text-sm font-medium text-foreground"
                  >
                    Link Linkedin<span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...model.register("linkedin_link")}
                    id="linkedinUrl"
                    placeholder="https://linkedin.com/in/username"
                    className="bg-background"
                    required={model.inputLinkedInLink ?? false}
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
          {model.isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D1F20]/50">
              <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-4 relative">
                <button
                  aria-label="Close"
                  className="absolute top-4 right-4 text-black text-xl font-bold"
                  onClick={model.handleCloseModal}
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
                  ref={model.webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                  videoConstraints={{
                    facingMode: "user",
                    width: 1280,
                    height: 720,
                  }}
                  onCanPlay={model.handleVideoOnLoad}
                />

                {model.isPoseDetected && (
                  <div className="mt-4 flex justify-center gap-6">
                    <Button
                      onClick={model.captureImage}
                      className="bg-green-500 text-white"
                    >
                      Capture Photo
                    </Button>
                  </div>
                )}

                {model.capturedImage && (
                  <div className="mt-4">
                    <h3 className="font-bold">Preview:</h3>
                    <img
                      src={model.capturedImage}
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
