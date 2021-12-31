import { db } from '@/lib/firebase-admin';

export default async function handler(req, res) {
    const sitesRef = db.collection('sites');

    const snapshot = await sitesRef.get();
    const sites = []

    snapshot.forEach((doc) => {
        sites.push({ id: doc.id, ...doc.data() });
    })

    res.status(200).json({ sites });
}
