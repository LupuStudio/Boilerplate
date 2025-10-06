import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
const path = require('path')

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
 
};

export default withPayload(nextConfig);
