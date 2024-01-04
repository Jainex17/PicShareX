import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    // const body = await request.json()
    // console.log(body);
    return new Response('Hello world!')
}