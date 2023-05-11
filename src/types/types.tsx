export type TAnimal = {
  name: string;
  age: number;
  species: string;
  adopted: boolean;
  microchipped: boolean;
  checkup: string;
  description?: string;
  image?: string;
  id: number;
};

export type TAnimalFormValues = Omit<TAnimal, "id">;

export type TDonations = {
  category: string;
  type: string;
  value: number;
  description?: string;
  id: number;
};

export type TDonationsFormValues = Omit<TDonations, "id" | "category">;

export type TNotification = {
  title: string;
  text: string;
  important: boolean;
  date: string;
  id: number;
};

export type TNotificationFormValues = Omit<TNotification, "id" | "date">;
