import { useContext } from 'react';
import { styled } from 'styled-components';
import { Star } from 'lucide-react';

import { StatPill } from '@components/ui/StatPill';
import { Brand } from '@components/AppHeader/Brand';
import { HeaderNav } from '@components/AppHeader/HeaderNav';
import { MobileDock } from '@components/AppHeader/MobileDock';
import { appNavLinks, AppNavLink } from '@components/AppHeader/navLinks';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { EnvContext } from '@routes/EnvContext';

export interface AppHeaderProps {
    xp?: number;
    /** Overridable so stories and future courses can supply their own. */
    links?: AppNavLink[];
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

const Nav = styled(HeaderNav)`
    margin: 0 auto 0 1rem;
`;

const Stats = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    margin-left: auto;
`;

const Course = styled(StatPill)`
    /* The course is context, not a control; it yields first when space runs out. */
    @media (max-width: 1080px) {
        display: none;
    }
`;

/**
 * The application header: brand, destinations and the learner's counters.
 *
 * On phones the destinations move to a bottom dock, so the bar keeps only the
 * brand and the counters. `EnvContext` decides which of the two is rendered,
 * rather than rendering both and hiding one.
 */
export const AppHeader = ({
    xp = 0,
    links = appNavLinks,
    className,
}: AppHeaderProps) => {
    const { mobile } = useContext(EnvContext);

    return (
        <>
            <Bar className={className}>
                <Brand />
                {!mobile && <Nav links={links} />}
                <Stats>
                    {!mobile && (
                        <Course
                            aria-label={translate(I18NLangs.RU, 'course-label')}
                        >
                            🇷🇸 {translate(I18NLangs.RU, 'course-name')}
                        </Course>
                    )}
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
                </Stats>
            </Bar>
            {mobile && <MobileDock links={links} />}
        </>
    );
};
