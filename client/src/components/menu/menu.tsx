import { useAuthContext } from '@/context/AuthContext';
import { getMemberAvatarUrl } from '@/lib/discord/utils/getMemberAvatarUrl';

import '@/components/menu/menu.scss';

export default function MenuComp() {
    const ctx = useAuthContext();

    return (
        <div className="menu">
            <img 
                src={getMemberAvatarUrl(
                    {
                        member: ctx.member,
                        user: ctx.user
                    })
                }
                className="avatar"
            />
        </div>
    );
}