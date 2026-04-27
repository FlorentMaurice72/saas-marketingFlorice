// Redirects to /api/demo-request for backward compatibility
import { NextRequest } from "next/server"
import { POST as handler } from "../demo-request/route"

export const POST = (req: NextRequest) => handler(req)
