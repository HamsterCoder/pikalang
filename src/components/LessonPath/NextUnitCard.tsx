import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { Compass, PartyPopper } from 'lucide-react';

import { Badge } from '@components/ui/Badge';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text/Text';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';

export interface NextUnitCardProps {
    /** Display name of the section that comes after the current one. */
    title: string;
    /** How many lessons it holds. */
    lessonCount: number;
    className?: string;
}

const Card = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    padding: 1.25rem;
    border: 1px dashed ${({ theme }) => theme.color.borderStrong};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surfaceSunken};
`;

const Marker = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 3rem;
    height: 3rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme }) => theme.color.hint};
    background-color: ${({ theme }) => theme.color.surfaceMuted};
`;

const Info = styled.div`
    flex: 1 1 14rem;
    min-width: 0;
`;

const Labels = styled.div`
    margin-bottom: 0.35rem;
`;

const Hint = styled(Text)`
    && {
        margin-top: 0.15rem;
        color: ${({ theme }) => theme.color.hint};
    }
`;

interface PreviewProps {
    icon: ReactNode;
    badge?: ReactNode;
    title: string;
    hint: ReactNode;
    aside?: ReactNode;
    className?: string;
}

const Preview = ({
    icon,
    badge,
    title,
    hint,
    aside,
    className,
}: PreviewProps) => (
    <Card className={className}>
        <Marker>{icon}</Marker>
        <Info>
            {badge && <Labels>{badge}</Labels>}
            <Heading size="s">{title}</Heading>
            <Hint type="secondary" withMargin={false}>
                {hint}
            </Hint>
        </Info>
        {aside}
    </Card>
);

/** A teaser for the section that unlocks once the current one is finished. */
export const NextUnitCard = ({
    title,
    lessonCount,
    className,
}: NextUnitCardProps) => (
    <Preview
        className={className}
        icon={<Compass size={24} aria-hidden="true" />}
        badge={
            <Badge tone="muted">
                <I18N textKey="lesson-path-next-unit" lang={I18NLangs.RU} />
            </Badge>
        }
        title={title}
        hint={<I18N textKey="lesson-path-next-unit-hint" lang={I18NLangs.RU} />}
        aside={
            <Badge tone="trophy">
                <I18N
                    textKey="lesson-path-next-unit-lessons"
                    lang={I18NLangs.RU}
                    values={{ count: lessonCount }}
                />
            </Badge>
        }
    />
);

/** Closes the path when there is no further section to preview. */
export const PathEnd = ({ className }: { className?: string }) => (
    <Preview
        className={className}
        icon={<PartyPopper size={24} aria-hidden="true" />}
        title={translate(I18NLangs.RU, 'lesson-path-finish')}
        hint={<I18N textKey="lesson-path-finish-hint" lang={I18NLangs.RU} />}
    />
);
