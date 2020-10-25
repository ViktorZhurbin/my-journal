import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';

import '../styles/global.css';

export default function MyApp({
    Component,
    pageProps,
}: AppProps): ReactElement {
    return <Component {...pageProps} />;
}
