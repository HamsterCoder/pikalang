import { styled } from 'styled-components';
import { Trophy } from 'lucide-react';

import { Badge } from '@components/ui/Badge';
import { ProgressBar } from '@components/ui/ProgressBar';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text/Text';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';

export interface UnitBannerProps {
    /** Position of the section on the path, counted from 1. */
    index: number;
    title: string;
    completed: number;
    total: number;
    className?: string;
}

const Banner = styled.section`
    padding: 1.5rem;
    border-radius: ${({ theme }) => theme.radius.l};

    color: ${({ theme }) => theme.color.textInverted};
    background-image: ${({ theme }) =>
        `linear-gradient(135deg, ${theme.color.accent}, ${theme.color.accentFaded})`};
    box-shadow: ${({ theme }) => theme.shadow.card};
`;

const Labels = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    margin-bottom: 0.5rem;
`;

const Progress = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;

    margin-top: 1rem;
`;

const ProgressTrack = styled(ProgressBar)`
    flex: 0 1 11rem;
    border-radius: ${({ theme }) => theme.radius.pill};
`;

const ProgressLabel = styled(Text)`
    && {
        font-size: ${({ theme }) => theme.text.chip.size};
        font-weight: 500;
    }
`;

/** The header of a section on the learning path. */
export const UnitBanner = ({
    index,
    title,
    completed,
    total,
    className,
}: UnitBannerProps) => {
    const isComplete = total > 0 && completed === total;
    const percent = total > 0 ? (completed / total) * 100 : 0;

    return (
        <Banner className={className}>
            <Labels>
                <Badge tone="inverted">
                    <I18N
                        textKey="lesson-path-unit-label"
                        lang={I18NLangs.RU}
                        values={{ index }}
                    />
                </Badge>
                {isComplete && (
                    <Badge tone="inverted" icon={<Trophy size="0.9em" />}>
                        <I18N
                            textKey="lesson-path-unit-complete"
                            lang={I18NLangs.RU}
                        />
                    </Badge>
                )}
            </Labels>

            <Heading size="m" color="inverted">
                {title}
            </Heading>

            <Progress>
                <ProgressTrack
                    tone="inverted"
                    value={percent}
                    aria-label={translate(
                        I18NLangs.RU,
                        'lesson-path-unit-progress',
                        { completed, total },
                    )}
                />
                <ProgressLabel
                    type="primary"
                    color="inverted"
                    withMargin={false}
                >
                    <I18N
                        textKey="lesson-path-unit-progress"
                        lang={I18NLangs.RU}
                        values={{ completed, total }}
                    />
                </ProgressLabel>
            </Progress>
        </Banner>
    );
};
