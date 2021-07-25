export type TTask = {
  name: string;
  order: number;
  content: string;
  extraData: string;
}

export type TDay = {
  id: number;
  name: string;
  description: string;
  tasks: TTask[];
}