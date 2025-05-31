import { FeedbackMongooseModel } from "../models/feedbackModel";
import { UserModel } from "../models/userModel"; // Adicionado para buscar o nome do usuário

// Interface for the stats data structure
export interface IUserStats {
    pts: number;
    streak: number;
    name: string; 
}

interface IStatsService {
    getUserStats(userId: string): Promise<IUserStats>;
}

const statsService: IStatsService = {
    /**
     * Calculates user statistics (points and streak) based on feedback data.
     * Handles potential database errors gracefully by returning default stats.
     * @param userId - The ID of the user whose stats are being requested.
     * @returns A promise that resolves to an object containing user stats.
     */
    getUserStats: async (userId: string): Promise<IUserStats> => {
        let points = 0;
        let streak = 0; // Placeholder value
        let name = "Usuário"; // Valor padrão caso não encontre o nome

        try {
            // Attempt to count feedbacks sent by the user.
            const feedbackCount = await FeedbackMongooseModel.countDocuments({ sender: userId });
            points = feedbackCount; // Simple example: 1 point per feedback sent

            // Buscar o nome do usuário no banco
            const user = await UserModel.findById(userId).select("name");
            if (user) {
                name = user.name;
            }

            // TODO: Implement actual streak calculation logic based on feedback timestamps.
            // This would also need error handling.

            console.log(`Successfully calculated stats for ${userId}: pts=${points}, streak=${streak}`); // Log success

        } catch (error: any) {
            // Log the error but don't throw, return default values instead
            console.error(`Error calculating stats for user ${userId} (returning defaults): ${error.message}`);
            // In a real app, you might want more specific error handling or logging
            // For now, we just ensure the endpoint doesn't crash
        }

        // Return calculated stats or defaults if an error occurred
        return {
            pts: points,
            streak: streak,
            name, // Retorno do nome
        };
    },
};

export default statsService;
