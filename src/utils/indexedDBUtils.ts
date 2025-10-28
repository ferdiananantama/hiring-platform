import type { JobConfigurationProps } from "@/types/job-configuration";
import type { JobListProps } from "@/types/job-list";
import { openDB } from "idb";

// Definisikan DB dan object store untuk pekerjaan dan profil
const DB_NAME = "TestDB";
const JOBS_STORE_NAME = "jobs";
const CONFIGURATION_STORE_NAME = "configuration"; // Object store untuk profil

// Fungsi untuk membuka database IndexedDB
const openDatabase = async () => {
  const db = await openDB(DB_NAME, 2, {
    upgrade(db) {
      // Buat store untuk "jobs" jika belum ada
      if (!db.objectStoreNames.contains(JOBS_STORE_NAME)) {
        db.createObjectStore(JOBS_STORE_NAME, {
          keyPath: "id",
        });
      }

      // Buat store baru untuk "Configuration"
      if (!db.objectStoreNames.contains(CONFIGURATION_STORE_NAME)) {
        db.createObjectStore(CONFIGURATION_STORE_NAME, {
          keyPath: "id", // ID untuk setiap profil
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
    const job = await db.get(JOBS_STORE_NAME, id); // Mengambil pekerjaan berdasarkan id
    return job;
  } catch (error) {
    console.error("Error fetching job by id from IndexedDB:", error);
    return undefined; // Jika terjadi error, kembalikan undefined
  }
};

// Fungsi untuk menambahkan data pekerjaan ke IndexedDB
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

// Fungsi untuk menambahkan profil ke IndexedDB
export const addConfigurationToIndexedDB = async (
  configuration: JobConfigurationProps
) => {
  try {
    const db = await openDatabase();

    const profileWithId = {
      ...configuration,
      // id: configuration.id || Date.now(), // Atur ID berdasarkan waktu jika tidak ada
    };

    await db.put(CONFIGURATION_STORE_NAME, profileWithId); // Menyimpan profil ke object store "Configuration"
  } catch (error) {
    console.error("Error adding profile to IndexedDB:", error);
  }
};

// Fungsi untuk mengambil semua data pekerjaan dari IndexedDB
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

// Fungsi untuk mengambil semua data profil dari IndexedDB
export const getAllConfigurationFromIndexedDB = async () => {
  try {
    const db = await openDatabase();
    const configurations = await db.getAll(CONFIGURATION_STORE_NAME);
    return configurations;
  } catch (error) {
    console.error("Error fetching Configuration from IndexedDB:", error);
  }
};

// Fungsi untuk menghapus semua data pekerjaan dari IndexedDB
export const clearJobsFromIndexedDB = async () => {
  try {
    const db = await openDatabase();
    await db.clear(JOBS_STORE_NAME);
    console.log("All jobs cleared from IndexedDB");
  } catch (error) {
    console.error("Error clearing jobs from IndexedDB:", error);
  }
};

// Fungsi untuk menghapus semua data profil dari IndexedDB
export const clearConfigurationFromIndexedDB = async () => {
  try {
    const db = await openDatabase();
    await db.clear(CONFIGURATION_STORE_NAME);
    console.log("All Configuration cleared from IndexedDB");
  } catch (error) {
    console.error("Error clearing Configuration from IndexedDB:", error);
  }
};
