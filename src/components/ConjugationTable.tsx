import styled from 'styled-components';
import { Text } from './Text/Text';

// Needs a more permanent backend solution
import { understand } from '../lessons/srb-ru/verbs/understand';
import { I18NLangs } from './I18N/I18N';

const verbs: Record<
    string,
    {
        infinitive: string;
        base: string;
        conjugation: [string, string][];
    }
> = {
    understand,
};

export type TIME = 'present' | 'past' | 'future';

export interface ConjugationTableProps {
    verb: keyof typeof verbs;
    time?: TIME;
}

const Table = styled.table`
    border-spacing: 0;

    border: 1px solid black;
    border-radius: 0.5rem;

    & tr:last-of-type td {
        border-bottom: none;
    }

    // TODO move it to outer component
    margin-bottom: 1rem;
`;

const TableCell = styled.td`
    padding: 0.5rem;
    border-right: 1px solid black;
    border-bottom: 1px solid black;

    &:last-of-type {
        border-right: none;
    }
`;

const TableHeaderCell = styled.th`
    text-align: left;

    padding: 0.5rem;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    &:last-of-type {
        border-right: none;
    }
`;

const CellTextWrapper = styled.div`
    & span {
        font-style: italic;
        font-weight: bold;
    }
`;

const pronouns = [
    ['Ja', 'Mi'],
    ['Ti', 'Vi'],
    ['On, Ona, Ono', 'Oni, One, Ona'],
];

function getAnnotation(lang: 'ru' | 'en', verb: string, time: TIME) {
    const base = {
        en: `Take a look at the verb ${verb} conjugation `,
        ru: `Посмотрите на спряжение глагола ${verb} `,
    }[lang];

    let timeAnnotation;

    switch (time) {
        case 'present':
            timeAnnotation = {
                en: `in the present.`,
                ru: `в настоящем времени.`,
            }[lang];
            break;
        case 'past':
            timeAnnotation = {
                en: `in the past.`,
                ru: `в прошедшем времени.`,
            }[lang];
            break;
        case 'future':
            timeAnnotation = {
                en: `in the future.`,
                ru: `в будущем времени.`,
            }[lang];
            break;
        default:
            return '.';
    }

    return base + timeAnnotation;
}

const dictionary = {
    singular: {
        en: 'Singular',
        ru: 'Единственное число',
    },
    plural: {
        en: 'Plural',
        ru: 'Множественное число',
    },
};

export const ConjugationTable = ({
    verb,
    time = 'present',
}: ConjugationTableProps) => {
    const { base, conjugation, infinitive } = verbs[verb];
    const rows = conjugation.map(
        ([singular, plural]: [string, string], index: number) => {
            return (
                <tr key={index}>
                    <TableCell>{pronouns[index][0]}</TableCell>
                    <TableCell>
                        <CellTextWrapper>
                            <Text type="primary" withMargin={false}>
                                {base}
                                <span>{singular}</span>
                            </Text>
                        </CellTextWrapper>
                    </TableCell>
                    <TableCell>{pronouns[index][1]}</TableCell>
                    <TableCell>
                        <CellTextWrapper>
                            <Text type="primary" withMargin={false}>
                                {base}
                                <span>{plural}</span>
                            </Text>
                        </CellTextWrapper>
                    </TableCell>
                </tr>
            );
        },
    );
    return (
        <>
            <Text type="primary" color="default">
                {getAnnotation(I18NLangs.RU, infinitive, time)}
            </Text>
            <Table>
                <thead>
                    <tr>
                        <TableHeaderCell colSpan={2}>
                            {dictionary['singular'][I18NLangs.RU]}
                        </TableHeaderCell>
                        <TableHeaderCell colSpan={2}>
                            {dictionary['plural'][I18NLangs.RU]}
                        </TableHeaderCell>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
};
