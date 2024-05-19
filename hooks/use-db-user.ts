import { User } from "@/server/db/schema/users";
import useSWR from "swr";

const fetcher = async (url: string): Promise<User> => {
  return await fetch(url).then((res) => res.json());
};

export const useDBUser = () => {
  const data = useSWR<User>("/api/user", fetcher);

  return data;
};
