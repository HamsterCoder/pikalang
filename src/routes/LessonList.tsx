import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import {
    CircularProgress,
    LinearProgress,
    linearProgressClasses,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';

import { listLessons, LessonListItem } from '@api/lessons';
import { CardListItem, CardList } from '@components/CardList';
import { Text } from '@components/Text/Text';
import { Heading } from '@components/Heading';
import { I18N, I18NLangs } from '@components/I18N/I18N';

// TODO: scroll to current active lesson on mobile and current active section on desktop
// TODO current active section is the first section with a locked lesson

interface LessonCardProps {
    locked: boolean;
}

const LessonLink = styled(Link)<LessonCardProps>`
    ${(props) => props.locked && 'pointer-events: none;'}
    display: block;
    height: 100%;
    text-decoration: none;
`;

const LessonCard = styled.div<LessonCardProps>`
    position: relative;

    width: 100%;
    height: 100%;
    padding: 1rem;
    padding-bottom: 1.5rem;

    display: flex;
    flex-direction: column;

    box-shadow:
        0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    border-radius: 0.25rem;
    color: var(--text-color);
    background-color: ${(props) =>
        props.locked ? 'rgba(208,208,208, 0.3)' : 'rgba(217, 175, 207, 0.2)'};

    overflow: hidden;
`;

const LessonHeading = styled(Heading)`
    && {
        display: flex;
        align-items: center;
        white-space: nowrap;
        margin-bottom: 0.5rem;
    }
`;

const LessonHeadingIcon = styled.span`
    &:not(:empty) {
        pointer-events: auto;
        margin-bottom: -6px;
        margin-right: 0.25rem;
    }
`;

const LessonHeadingText = styled.span`
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LessonProgress = styled(LinearProgress)<LessonCardProps>`
    && {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        height: 0.5rem;
    }

    &.${linearProgressClasses.colorPrimary} {
        background-color: ${(props) =>
            props.locked ? 'rgb(205, 205, 205)' : 'rgb(217, 175, 206)'};
    }
`;

// TODO tooltip for locked and completed lessons when hovering over the icon
function renderLessonList(lessons: LessonListItem[]) {
    return lessons.map((lesson) => (
        <CardListItem key={lesson.id}>
            <LessonLink to={`/lessons/${lesson.id}`} locked={lesson.locked}>
                <LessonCard locked={lesson.locked}>
                    <LessonHeading
                        size="s"
                        color={lesson.locked ? 'currentColor' : 'default'}
                    >
                        <Tooltip
                            title={
                                <I18N
                                    textKey="lesson-list-locked-message"
                                    lang={I18NLangs.RU}
                                ></I18N>
                            }
                            enterTouchDelay={0}
                            enterDelay={100}
                            leaveDelay={100}
                            arrow
                        >
                            <LessonHeadingIcon>
                                {lesson.locked && (
                                    <LockIcon fontSize="inherit" />
                                )}
                            </LessonHeadingIcon>
                        </Tooltip>

                        <LessonHeadingText>
                            {lesson.displayTopic} &middot; {lesson.displayName}
                        </LessonHeadingText>
                    </LessonHeading>
                    <Text type="primary" color="default" withMargin={false}>
                        {lesson.description}
                    </Text>
                    <LessonProgress
                        locked={lesson.locked}
                        variant="determinate"
                        value={lesson.progress}
                    ></LessonProgress>
                </LessonCard>
            </LessonLink>
        </CardListItem>
    ));
}

const SectionHeading = styled(Heading)`
    && {
        padding: 0 2rem;
        margin-bottom: 1rem;
    }
`;

const SectionContainer = styled.div`
    margin-bottom: 2rem;
`;

export const LessonList = () => {
    const {
        isPending,
        error,
        data: sections,
    } = useQuery({
        queryKey: ['listLessons', 'default'],
        queryFn: () => listLessons('default'),
    });

    if (error) {
        return 'An error has occurred: ' + error.message;
    }

    if (isPending) {
        return (
            <CircularProgress
                sx={{ marginLeft: 'auto', marginRight: 'auto' }}
            />
        );
    }

    console.log(sections);

    return sections.map((section) => (
        <SectionContainer key={section.name}>
            <SectionHeading size="m">{section.displayName}</SectionHeading>
            <CardList>{renderLessonList(section.lessons)}</CardList>
        </SectionContainer>
    ));
};
