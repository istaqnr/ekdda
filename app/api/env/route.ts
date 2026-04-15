import { NextResponse } from "next/server";

export async function GET() {
   // Filter environment variables that start with PUBLIC_
   const exposedEnv = Object.keys(process.env)
      .filter((key) => key.startsWith("PUBLIC_"))
      .reduce(
         (acc, key) => {
            acc[key] = process.env[key] || "";
            return acc;
         },
         {} as Record<string, string>
      );

   return NextResponse.json(exposedEnv);
}
