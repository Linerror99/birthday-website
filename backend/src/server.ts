import { createApp } from './app';
import { initializeFirebase } from './config/firebase';
import { env } from './config/environment';
import { logger } from './utils/logger';

async function startServer() {
  try {
    // Initialize Firebase Admin SDK
    initializeFirebase();
    logger.info('Firebase Admin SDK initialized');

    // Create Express app
    const app = createApp();

    // Start server
    const server = app.listen(env.port, () => {
      logger.info(`
╔═══════════════════════════════════════════════╗
║   Vesper Birthday API Server                  ║
╟───────────────────────────────────────────────╢
║   Environment: ${env.nodeEnv.padEnd(31)}║
║   Port: ${String(env.port).padEnd(37)}║
║   Project: ${env.gcpProjectId.padEnd(34)}║
║   Database: ${env.firebaseDatabaseId.padEnd(33)}║
╚═══════════════════════════════════════════════╝
      `);
      logger.info(`Server is running on http://localhost:${env.port}`);
      logger.info(`Health check: http://localhost:${env.port}/api/health`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`${signal} received, shutting down gracefully...`);
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
