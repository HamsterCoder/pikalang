import { useContext } from 'react';
import { styled } from 'styled-components';
import { NavLink } from 'react-router';
import { Settings as SettingsIcon, Star } from 'lucide-react';

import { StatPill } from '@components/ui/StatPill';
import { Tooltip } from '@components/ui/Tooltip';
import { I18N } from '@components/I18N/I18N';
import { Brand } from '@components/AppShell/Brand';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { EnvContext } from '@routes/EnvContext';

export interface AppHeaderProps {
    xp?: number;
    className?: string;
}

const Bar = styled.header`
    position: sticky;
    z-index: 5;
    top: 0;

    display: flex;
    align-items: center;
    gap: 1rem;

    padding: 0.75rem 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    background-color: ${({ theme }) => theme.color.surface};

    @media (max-width: 640px) {
        padding: 0.75rem 1rem;
    }
`;

const Stats = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    margin-left: auto;
`;

/**
 * The settings live behind an icon rather than in the nav: they are somewhere
 * the learner goes once, not one of the places the course is taught. It is a
 * real link, not an `IconButton`, because a button inside an anchor is not
 * valid markup and a link keeps open-in-new-tab working.
 */
const SettingsLink = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 8px;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme }) => theme.color.hint};
    text-decoration: none;

    transition:
        color ${({ theme }) => theme.transition.fast},
        background-color ${({ theme }) => theme.transition.fast};

    &:hover {
        color: ${({ theme }) => theme.color.accent};
        background-color: ${({ theme }) => theme.color.accentWash};
    }

    &.active {
        color: ${({ theme }) => theme.color.accent};
        background-color: ${({ theme }) => theme.color.accentSoft};
    }
`;

/**
 * The top bar: the learner's own state, and nothing else.
 *
 * Destinations live in `SideNav` on wide layouts and in `MobileDock` on
 * phones, which leaves this bar free for what belongs to the learner rather
 * than to the app. The brand only appears here on phones, where there is no
 * rail to hold it.
 */
export const AppHeader = ({ xp = 0, className }: AppHeaderProps) => {
    const { mobile } = useContext(EnvContext);

    return (
        <Bar className={className}>
            {mobile ? (
                <Brand />
            ) : (
                <StatPill aria-label={translate(I18NLangs.RU, 'course-label')}>
                    🇷🇸 {translate(I18NLangs.RU, 'course-name')}
                </StatPill>
            )}
            <Stats>
                <StatPill
                    tone="accent"
                    icon={
                        <Star
                            size="1em"
                            fill="currentColor"
                            aria-hidden="true"
                        />
                    }
                    aria-label={translate(I18NLangs.RU, 'xp-label')}
                >
                    {xp}
                </StatPill>

                <Tooltip
                    title={
                        <I18N textKey="settings-heading" lang={I18NLangs.RU} />
                    }
                    side="bottom"
                >
                    <SettingsLink
                        to="/settings/"
                        aria-label={translate(I18NLangs.RU, 'settings-heading')}
                    >
                        <SettingsIcon size={20} aria-hidden="true" />
                    </SettingsLink>
                </Tooltip>
            </Stats>
        </Bar>
    );
};
