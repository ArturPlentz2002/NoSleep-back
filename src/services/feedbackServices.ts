import { Feedback, IFeedback } from "../models/feedbackModels";

// In-memory storage for demonstration
const feedbacksDb: IFeedback[] = [];

interface IFeedbackService {
    sendFeedback(senderId: string, text: string, tags?: string[], anonymous?: boolean): object;
    getReceivedFeedback(userId: string): object[];
    getSentFeedback(userId: string): object[];
}

const feedbackService: IFeedbackService = {
    /**
     * Creates and stores a new feedback entry.
     * @param senderId - The ID of the user sending the feedback.
     * @param text - The feedback text.
     * @param [tags=[]] - Optional tags for the feedback.
     * @param [anonymous=false] - Whether the feedback is anonymous.
     * @returns The created feedback object (serialized).
     */
    sendFeedback: (senderId: string, text: string, tags: string[] = [], anonymous: boolean = false): object => {
        const feedback = new Feedback(senderId, text, tags, anonymous);
        feedbacksDb.push(feedback);
        console.log(`Feedback sent: ${JSON.stringify(feedback.toJSON())}`); // Log for debugging
        return feedback.toJSON();
    },

    /**
     * Retrieves feedbacks potentially intended for the user (Placeholder logic).
     * @param userId - The ID of the user requesting received feedback.
     * @returns An array of received feedback objects (serialized).
     */
    getReceivedFeedback: (userId: string): object[] => {
        // Simplified: Returns all feedback *not* sent by the user for demo.
        const received = feedbacksDb
            .filter(fb => fb._originalSenderId !== userId)
            .map(fb => fb.toJSON());
        console.log(`Feedbacks received for ${userId}: ${JSON.stringify(received)}`); // Log for debugging
        return received;
    },

    /**
     * Retrieves feedbacks sent by the user.
     * @param userId - The ID of the user requesting sent feedback.
     * @returns An array of sent feedback objects (serialized).
     */
    getSentFeedback: (userId: string): object[] => {
        const sent = feedbacksDb
            .filter(fb => fb._originalSenderId === userId && !fb.anonymous)
            .map(fb => fb.toJSON());
        console.log(`Feedbacks sent by ${userId}: ${JSON.stringify(sent)}`); // Log for debugging
        return sent;
    }
};

export default feedbackService;

