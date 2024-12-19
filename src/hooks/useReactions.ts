import { useEffect, useState } from "react";
export type EmojiReactions = {
  [date: string]: Reaction[];
};
type Reaction = {
  userId: string;
  emoji: string;
};
export const useReactions = () => {
  const [reactions, setReactions] = useState<EmojiReactions>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReactions = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3001/getReactions");
        const data = await res.json();
        setReactions(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch reactions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReactions();
  }, []);

  return { reactions, loading, error };
};
