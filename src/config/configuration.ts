export default () => ({
    server: {
      port: parseInt(process.env.PORT, 10) || 3000,
    },
    mongo: {
      uri: process.env.MONGODB_URI,
    }
  });
  