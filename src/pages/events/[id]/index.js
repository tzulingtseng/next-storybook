import React from 'react';
import { useRouter } from 'next/router';

function IdPage() {
    const router = useRouter();
    const eventId = router.query.id;
    return <div>{eventId}</div>;
}

export default IdPage;
