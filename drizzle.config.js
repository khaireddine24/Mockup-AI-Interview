/**@type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://interviewDB_owner:YerGJs4v7EId@ep-cool-fire-a57v22mx.us-east-2.aws.neon.tech/interviewDB?sslmode=require',
  }
};