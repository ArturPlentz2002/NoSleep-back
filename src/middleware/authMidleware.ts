import { Request, Response, NextFunction } from 'express';

// Define a structure for our fake users
interface FakeUsers {
    [token: string]: string; // Maps token to userId
}

const FAKE_USERS: FakeUsers = {
    "user1_token": "user1",
    "user2_token": "user2"
};

// Extend the Express Request interface to include our custom 'user' property
declare global {
    namespace Express {
        interface Request {
            user?: { id: string };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const userId = FAKE_USERS[token];

        if (userId) {
            // Attach user ID to the request object
            req.user = { id: userId };
            return next(); // User authenticated, proceed
        }
    }

    // If no valid token is found or header is missing
    res.status(401).json({ message: "Authentication required" });
};

