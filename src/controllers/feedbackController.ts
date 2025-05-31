import { Request, Response } from 'express';
import feedbackService from '../services/feedbackServices';

// Define an interface for the expected request body for sending feedback
interface SendFeedbackRequestBody {
    text: string;
    tags?: string[];
    anon?: boolean;
}

export const feedbackController = {
    /**
     * Handles the request to send feedback.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    send: (req: Request<{}, {}, SendFeedbackRequestBody>, res: Response): void => {
        // req.user should exist due to authMiddleware
        const userId = req.user!.id;
        const { text, tags, anon } = req.body;

        if (!text) {
            res.status(400).json({ message: "Missing required field: text" });
            return;
        }

        try {
            const sentFeedback = feedbackService.sendFeedback(
                userId,
                text,
                tags, // Service handles default
                anon  // Service handles default
            );
            res.status(201).json(sentFeedback);
        } catch (error: any) {
            console.error(`Error sending feedback: ${error.message}`);
            res.status(500).json({ message: "Error processing feedback" });
        }
    },

    /**
     * Handles the request to get received feedback.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    getInbox: (req: Request, res: Response): void => {
        const userId = req.user!.id;
        try {
            const receivedFeedbacks = feedbackService.getReceivedFeedback(userId);
            res.status(200).json(receivedFeedbacks);
        } catch (error: any) {
            console.error(`Error getting inbox: ${error.message}`);
            res.status(500).json({ message: "Error retrieving received feedback" });
        }
    },

    /**
     * Handles the request to get sent feedback.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    getSent: (req: Request, res: Response): void => {
        const userId = req.user!.id;
        try {
            const sentFeedbacks = feedbackService.getSentFeedback(userId);
            res.status(200).json(sentFeedbacks);
        } catch (error: any) {
            console.error(`Error getting sent feedback: ${error.message}`);
            res.status(500).json({ message: "Error retrieving sent feedback" });
        }
    }
};

