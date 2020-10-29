import { signIn, signOut, useSession } from 'next-auth/client';
import classNames from 'classnames/bind';

import styles from './Auth.module.css';
const cx = classNames.bind(styles);

export const Auth: React.FC = () => {
    const [session] = useSession();

    return !session ? (
        <div className={cx('signIn')}>
            <p>Please sign in</p>
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    ) : (
        <div className={cx('signOut')}>
            <span>Signed in as {session.user.name}</span>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};
