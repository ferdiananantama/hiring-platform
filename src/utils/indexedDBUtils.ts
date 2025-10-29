import type { CandidatListProps } from "@/types/candidat-list";
import type { JobListProps } from "@/types/job-list";
import type { UserProps } from "@/types/user";
import { openDB } from "idb";

const DB_NAME = "TestDB";
const JOBS_STORE_NAME = "jobs";
const CANDIDATS_STORE_NAME = "candidats";
const USERS_STORE_NAME = "users";

const openDatabase = async () => {
  const db = await openDB(DB_NAME, 3, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(JOBS_STORE_NAME)) {
        db.createObjectStore(JOBS_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains(CANDIDATS_STORE_NAME)) {
        db.createObjectStore(CANDIDATS_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains(USERS_STORE_NAME)) {
        db.createObjectStore(USERS_STORE_NAME, {
          keyPath: "email",
        });
      }
    },
  });
  return db;
};

export const getJobByIdFromIndexedDB = async (
  id: number
): Promise<JobListProps | undefined> => {
  try {
    const db = await openDatabase();
    const job = await db.get(JOBS_STORE_NAME, id);
    return job;
  } catch (error) {
    console.error("Error fetching job by id from IndexedDB:", error);
    return undefined;
  }
};

export const addJobToIndexedDB = async (job: JobListProps) => {
  try {
    const db = await openDatabase();
    const jobWithId = {
      ...job,
      id: job.id || Date.now(),
    };
    await db.put(JOBS_STORE_NAME, jobWithId);
  } catch (error) {
    console.error("Error adding job to IndexedDB:", error);
  }
};

export const addCandidatToIndexedDB = async (
  configuration: CandidatListProps
) => {
  try {
    const db = await openDatabase();

    const profileWithId = {
      ...configuration,
      id: configuration.id || Date.now(),
    };

    await db.put(CANDIDATS_STORE_NAME, profileWithId);
  } catch (error) {
    console.error("Error adding profile to IndexedDB:", error);
  }
};

export const getAllJobsFromIndexedDB = async (): Promise<JobListProps[]> => {
  try {
    const db = await openDatabase();
    const jobs = await db.getAll(JOBS_STORE_NAME);
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs from IndexedDB:", error);
    return [];
  }
};

export const getAllCandidateFromIndexedDB = async (): Promise<
  CandidatListProps[]
> => {
  try {
    const db = await openDatabase();
    const candidates = await db.getAll(CANDIDATS_STORE_NAME);
    return candidates;
  } catch (error) {
    console.error("Error fetching Configuration from IndexedDB:", error);
    return [];
  }
};

export const addUserToIndexedDB = async (user: UserProps) => {
  try {
    const db = await openDatabase();
    const userWithId = {
      ...user,
    };
    await db.put(USERS_STORE_NAME, userWithId);
    console.log("User added to IndexedDB successfully");
  } catch (error) {
    console.error("Error adding user to IndexedDB:", error);
  }
};

export const getUserByEmail = async (email: string, password: string) => {
  try {
    const db = await openDatabase();
    const user = await db.get(USERS_STORE_NAME, email);

    if (user && user.password === password) {
      return user;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching user from IndexedDB:", error);
    return undefined;
  }
};
