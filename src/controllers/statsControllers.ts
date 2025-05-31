import { Request, Response } from 'express';
import statsService from '../services/statsServices';

export const statsController = {
    /**
     * Handles the request to get user statistics.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    getUserStats: async (req: Request, res: Response): Promise<void> => {
        // req.user should exist due to authMiddleware
        const userId = req.user!.id;

        try {
            const userStats = await statsService.getUserStats(userId);
            res.status(200).json(userStats);
        } catch (error: any) {
            console.error(`Error getting stats for user ${userId}: ${error.message}`);
            // Send a more specific error message if the service threw one
            const errorMessage = error.message || "Error retrieving user statistics";
            res.status(500).json({ message: errorMessage });
        }
    }
};

