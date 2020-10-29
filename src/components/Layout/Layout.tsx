import { useSession } from 'next-auth/client';

import { Auth } from '../Auth';

export const Layout: React.FC = ({ children }) => {
    const [session, loading] = useSession();

    return loading ? (
        <span>Session loading...</span>
    ) : (
        <div>
            <Auth />
            {session && children}
        </div>
    );
};
