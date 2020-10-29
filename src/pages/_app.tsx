import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'next-auth/client';

import { typography } from '../styles/typography';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <>
            <Head>
                <style
                    id={'typography.js'}
                    dangerouslySetInnerHTML={{
                        __html: typography.toString(),
                    }}
                />
            </Head>

            <Provider session={pageProps.session}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
