import React from 'react';
import { useRouter } from 'next/router';

function SlugPage() {
    const router = useRouter();
    const queryData = router.query.slug;
    console.log(queryData);

    if (!queryData) {
        return <p>Loading</p>;
    }

    const queryYear = queryData[0];
    const queryMonth = queryData[1];

    const numYear = +queryYear;
    const numMonth = +queryMonth;

    // 前端再判斷
    // if(numYear||numMonth){

    // }

    return (
        <>
            <h1>
                Slug Page{numYear}
                {numMonth}
            </h1>
        </>
    );
}

export default SlugPage;
