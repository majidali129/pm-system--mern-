import { User } from "@/models/user.model";
import { connectDB } from "./connect-db";

const users = [
  {
    name: "Alice Khan",
    email: "alice.khan@example.com",
    password: "Password123!",
    role: "user",
    domain: "Design",
  },
  {
    name: "Bilal Ahmed",
    email: "bilal.ahmed@example.com",
    password: "Password123!",
    role: "user",
    domain: "Development",
  },
  {
    name: "Sana Iqbal",
    email: "sana.iqbal@example.com",
    password: "Password123!",
    role: "user",
    domain: "Marketing",
  },
  {
    name: "Hassan Raza",
    email: "hassan.raza@example.com",
    password: "Password123!",
    role: "user",
    domain: "Finance",
  },
  {
    name: "Maria Gul",
    email: "maria.gul@example.com",
    password: "Password123!",
    role: "user",
    domain: "Education",
  },
  {
    name: "Usman Tariq",
    email: "usman.tariq@example.com",
    password: "Password123!",
    role: "user",
    domain: "Health",
  },
  {
    name: "Zara Malik",
    email: "zara.malik@example.com",
    password: "Password123!",
    role: "user",
    domain: "E-commerce",
  },
  {
    name: "Hamza Farooq",
    email: "hamza.farooq@example.com",
    password: "Password123!",
    role: "user",
    domain: "Technology",
  },
  {
    name: "Iqra Javed",
    email: "iqra.javed@example.com",
    password: "Password123!",
    role: "user",
    domain: "Travel",
  },
  {
    name: "Ali Nawaz",
    email: "ali.nawaz@example.com",
    password: "Password123!",
    role: "user",
    domain: "Real Estate",
  },
];

const seed = async () => {
  await connectDB();
  //   const result = await User.insertMany(users);
  const res = await Promise.all(users.map(async (u) => await User.create(u)));
  console.log(res);
};

seed();
