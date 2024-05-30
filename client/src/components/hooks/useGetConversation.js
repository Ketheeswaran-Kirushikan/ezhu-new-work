import { useEffect, useState } from "react";
import axios from "axios";

const useGetConversation = (_id, token) => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.BACK_END_URL}/Ezhu/chat/getuser/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
            },
          }
        );
        setConversations(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [_id, token]);
  console.log("con", conversation);
  return { loading, conversation };
  // Return loading state and conversation data as an object
};

export default useGetConversation;
