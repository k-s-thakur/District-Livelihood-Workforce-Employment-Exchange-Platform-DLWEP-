import { create } from "zustand";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Job {
  id: string;
  skill: string;
  description: string;
  block: string;
  village: string;
  lat: number;
  lng: number;
  status: "created" | "matched" | "worker_selected" | "completed" | "cancelled";
  workerId?: string;
  workerName?: string;
  workerMobile?: string;
}

interface NotificationState {
  notifications: AppNotification[];
  activeToast: { title: string; message: string } | null;
  jobs: Job[];
  addNotification: (title: string, message: string) => void;
  dismissToast: () => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  
  // Job lifecycle actions
  createJob: (job: Omit<Job, "status">) => void;
  updateJobStatus: (jobId: string, status: Job["status"], workerId?: string, workerName?: string, workerMobile?: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: "n-init-1",
      title: "Welcome to DLWEP",
      message: "Your account is active. Select 'Request Labor' to find nearby certified skills.",
      isRead: false,
      createdAt: new Date(Date.now() - 3600000).toISOString()
    }
  ],
  activeToast: null,
  jobs: [
    {
      id: "req-101",
      skill: "Electrician",
      description: "Repairing high-voltage fuse box in agricultural pump house.",
      block: "Murwara (Katni)",
      village: "Pipariya",
      lat: 23.814,
      lng: 80.419,
      status: "created"
    }
  ],

  addNotification: (title, message) => set((state) => {
    const newNotif: AppNotification = {
      id: `n-${Math.random().toString(36).substr(2, 9)}`,
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    return {
      notifications: [newNotif, ...state.notifications],
      activeToast: { title, message }
    };
  }),

  dismissToast: () => set({ activeToast: null }),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, isRead: true }))
  })),

  clearNotifications: () => set({ notifications: [] }),

  createJob: (newJob) => set((state) => {
    const job: Job = { ...newJob, status: "created" };
    
    // Simulate background matching notifications after 1 second
    setTimeout(() => {
      useNotificationStore.getState().addNotification(
        "Geodetic Match Found",
        `2 verified ${newJob.skill}s matched within 15km of ${newJob.village}.`
      );
    }, 1500);

    return {
      jobs: [job, ...state.jobs]
    };
  }),

  updateJobStatus: (jobId, status, workerId, workerName, workerMobile) => set((state) => {
    const updatedJobs = state.jobs.map((j) => {
      if (j.id === jobId) {
        const update: Partial<Job> = { status };
        if (workerId) update.workerId = workerId;
        if (workerName) update.workerName = workerName;
        if (workerMobile) update.workerMobile = workerMobile;
        return { ...j, ...update };
      }
      return j;
    });

    const targetJob = state.jobs.find(j => j.id === jobId);
    const skillName = targetJob?.skill || "Worker";

    // Trigger system notifications based on status change
    setTimeout(() => {
      if (status === "worker_selected" && workerName) {
        useNotificationStore.getState().addNotification(
          "Worker Confirmed",
          `${workerName} has been dispatched to ${targetJob?.village || "your site"}.`
        );
      } else if (status === "completed") {
        useNotificationStore.getState().addNotification(
          "Job Completed",
          `The ${skillName} task in ${targetJob?.village || "Katni"} is marked as completed.`
        );
      }
    }, 1000);

    return { jobs: updatedJobs };
  })
}));
