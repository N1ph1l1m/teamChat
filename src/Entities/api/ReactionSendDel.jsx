
import {Parameters} from "../../App/Parameters/Parametrs"
export async function sendReaction(messageId, reactionId, chatSocket) {
    try {
      const messageData = {
        message_id: messageId,
        reaction_id: reactionId,
        request_id:Parameters.request_id,
        action: "update_message_reactions",
      };

      chatSocket.send(JSON.stringify(messageData));
    } catch (error) {
      console.error(
        "Ошибка при отправке реакции:",
        error.response?.data || error.message
      );
    }
  }
