export type Data = {
  name: string;
  age: string;
  email: string;
  contact: string;
  family: {
    name: string;
    age: string;
    contact: string;
  }[];
  city: string;
  state: string;
  country: string;
  pincode: string;
  image: string;

  documents: Array<{
    number: string;
  }>;
};
