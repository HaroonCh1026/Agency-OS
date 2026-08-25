import { createConsumer } from "@rails/actioncable";
import { getToken } from "@/utils/storage";

const CABLE_URL = process.env.NEXT_PUBLIC_CABLE_URL;

export function createCableConsumer() {
  const token = getToken();

  if (!token) {
    return null;
  }

  return createConsumer(`${CABLE_URL}?token=${encodeURIComponent(token)}`);
}
