import useGetJobById from "@/app/admin/job-list/hooks/useGetJobById";
import type { CandidatListProps } from "@/types/candidat-list";
import { addCandidatToIndexedDB } from "@/utils/indexedDBUtils";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type Webcam from "react-webcam";
import * as handTrack from "handtrackjs"; // Importing correctly


export default function useApplicationFormModel() {
    const route = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isPoseDetected, setIsPoseDetected] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const webcamRef = useRef<Webcam | null>(null); 
    const [model, setModel] = useState<any>(null);

    const { id } = useParams();

    //Api
    const job = useGetJobById({id : Number(id)});

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


    const inputFullName = useMemo(() => {
        return job.data?.fields.find((field) => field.key === "fullName")?.validation
        ?.required;
    }, [job.data?.fields]);

    const inputPhotoProfile = useMemo(() => {
        return job.data?.fields.find((field) => field.key === "photoProfile")?.validation
        ?.required;
    }, [job.data?.fields]);

    const inputGender = useMemo(() => {
        return job.data?.fields.find((field) => field.key === "gender")?.validation
        ?.required;
    }, [job.data?.fields]);

    const inputDomicile = useMemo(() => {
        return job.data?.fields.find((field) => field.key === "domicile")?.validation
        ?.required;
    }, [job.data?.fields]);

    const inputEmail = useMemo(() => {
        return job.data?.fields.find((field) => field.key === "email")?.validation
        ?.required;
    }, [job.data?.fields]);

    const inputPhoneNumber = useMemo(() => {
        return job.data?.fields.find((field) => field.key === "phoneNumber")?.validation
        ?.required;
    }, [job.data?.fields]);

    const inputLinkedInLink = useMemo(() => {
        return job.data?.fields.find((field) => field.key === "linkedinLink")?.validation
        ?.required;
    }, [job.data?.fields]);

    const inputDateOfBirth = useMemo(() => {
        return job.data?.fields.find((field) => field.key === "dateOfBirth")?.validation
        ?.required;
    }, [job.data?.fields]);

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
        }, 100); 

        return () => clearInterval(interval);
        }
    }, [model, isVideoLoaded]);

    const handleVideoOnLoad = () => {
        setIsVideoLoaded(true); 
    };

    const captureImage = () => {
        if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc); 
        setIsModalOpen(false);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return {
        open,
        setOpen,
        date,
        setDate,
        isModalOpen,
        setIsModalOpen,
        capturedImage,
        setCapturedImage,
        captureImage,
        isPoseDetected,
        setIsPoseDetected,
        isVideoLoaded,
        setIsVideoLoaded,
        webcamRef,
        model,
        handleOpenModal,
        handleCloseModal,
        getValues,
        handleSubmit,
        control,
        errors,
        register,
        job,
        inputFullName,
        inputPhotoProfile,
        inputGender,
        inputDomicile,
        inputEmail,
        inputPhoneNumber,
        inputLinkedInLink,        
        inputDateOfBirth,
        onSubmit,
        handleVideoOnLoad,
        route
    }
}