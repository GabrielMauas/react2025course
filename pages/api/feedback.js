import { auth } from '@/lib/firebase-admin';
import { getUserFeedback } from '@/lib/db-admin';

export default async function handler(req, res) {
  try {
    const { token } = req.headers;
    const { uid } = await auth.verifyIdToken(token);
    const feedback = await getUserFeedback(uid);

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error });
  }
}
