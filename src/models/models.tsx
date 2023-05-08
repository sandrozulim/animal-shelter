export type TAnimal = {
  name: string;
  age: number;
  species: string;
  adopted: boolean;
  microchipped: boolean;
  checkup: string;
  description: string;
  image: string;
  id: number;
};

export type TAnimalFormValues = Omit<TAnimal, "id">;
