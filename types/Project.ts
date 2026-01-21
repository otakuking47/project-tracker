export type Task = {
  id: string;
  text: string;
  done: boolean;
}

export type Project = {
    id: string;
    title: string;
    progress: number;
    lastTouchedAt: string;
    tasks: []
};