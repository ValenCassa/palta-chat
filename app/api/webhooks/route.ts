import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { env } from "@/utils/env";
import { db } from "@/server/db/client";
import { users } from "@/server/db/schema/users";

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(env.WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console

  if (evt.type !== "user.created") {
    return new Response("Error occured -- invalid event type", {
      status: 400,
    });
  }

  try {
    await db.insert(users).values({
      id: evt.data.id,
      email: evt.data.email_addresses[0].email_address,
      profileThumbnail: evt.data.image_url,
    });
  } catch (e) {
    clerkClient.users.deleteUser(evt.data.id);
  }

  return new Response("", { status: 200 });
}
