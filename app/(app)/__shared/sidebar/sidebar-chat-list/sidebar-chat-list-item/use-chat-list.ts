import { Conversation } from "@/server/db/schema/conversations";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const useChatList = () => {
  const data = useSWR<Conversation[]>("/api/chat/list", fetcher);

  return data;
};
