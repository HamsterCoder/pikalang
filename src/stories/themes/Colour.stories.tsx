import type { Meta, StoryObj } from '@storybook/react-vite';
import { styled } from 'styled-components';

import { tokens } from '@themes/tokens';

type Rgba = { r: number; g: number; b: number; a: number };

function parse(colour: string): Rgba {
    const rgba = colour.match(/rgba?\(([^)]+)\)/);

    if (rgba) {
        const [r, g, b, a = '1'] = rgba[1]
            .split(',')
            .map((part) => part.trim());
        return { r: +r, g: +g, b: +b, a: +a };
    }

    const hex = colour.replace('#', '');
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: 1,
    };
}

/** Flattens a translucent colour onto what sits behind it. */
function over(colour: string, backdrop: string): Rgba {
    const top = parse(colour);
    const back = parse(backdrop);

    return {
        r: top.r * top.a + back.r * (1 - top.a),
        g: top.g * top.a + back.g * (1 - top.a),
        b: top.b * top.a + back.b * (1 - top.a),
        a: 1,
    };
}

function luminance({ r, g, b }: Rgba): number {
    const channel = (value: number) => {
        const c = value / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };

    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(foreground: string, background: string): number {
    const bg = over(background, '#ffffff');
    const fg = over(foreground, `rgba(${bg.r},${bg.g},${bg.b},1)`);
    const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);

    return (hi + 0.05) / (lo + 0.05);
}

/** Saturation and lightness, the two numbers the palette is built on. */
function satLight(colour: string): string | null {
    if (colour.startsWith('rgba')) {
        return null;
    }

    const { r, g, b } = parse(colour);
    const [max, min] = [Math.max(r, g, b) / 255, Math.min(r, g, b) / 255];
    const l = (max + min) / 2;

    if (max === min) {
        return `hue — · sat 0% · light ${Math.round(l * 100)}%`;
    }

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    const [rr, gg, bb] = [r / 255, g / 255, b / 255];
    let h: number;
    if (max === rr) {
        h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6;
    } else if (max === gg) {
        h = ((bb - rr) / d + 2) / 6;
    } else {
        h = ((rr - gg) / d + 4) / 6;
    }

    return `hue ${Math.round(h * 360)} · sat ${Math.round(s * 100)}% · light ${Math.round(l * 100)}%`;
}

const Sheet = styled.div`
    font-family: ${({ theme }) => theme.font.base};
    color: ${({ theme }) => theme.color.text};
`;

const Note = styled.p`
    max-width: 44rem;
    margin: 0 0 2rem;

    font-size: ${({ theme }) => theme.text.text_primary.size};
    line-height: 1.6;
    color: ${({ theme }) => theme.color.hint};
`;

const GroupName = styled.h3`
    margin: 2rem 0 0.25rem;
    font-size: ${({ theme }) => theme.text.heading_xs.size};
    color: ${({ theme }) => theme.color.heading};
`;

const GroupNote = styled.p`
    max-width: 44rem;
    margin: 0 0 1rem;
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    color: ${({ theme }) => theme.color.hint};
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 0.75rem;
`;

const Tile = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};
    background-color: ${({ theme }) => theme.color.surface};
`;

/** Half the chip sits on the page ground, so a tint is not read as opaque. */
const Swatch = styled.span<{ $colour: string }>`
    flex-shrink: 0;

    width: 3rem;
    height: 3rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.m};

    background-image:
        ${({ $colour }) => `linear-gradient(to right, ${$colour}, ${$colour})`},
        ${({ theme }) =>
            `linear-gradient(to right, ${theme.color.surface} 50%, ${theme.color.surfaceSunken} 50%)`};
`;

const Meta = styled.div`
    min-width: 0;
`;

const Name = styled.div`
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    font-weight: 500;
`;

const Value = styled.div`
    font-size: ${({ theme }) => theme.text.chip.size};
    color: ${({ theme }) => theme.color.hint};
    font-variant-numeric: tabular-nums;
`;

type Group = {
    name: string;
    note: string;
    keys: (keyof typeof tokens.color)[];
};

const GROUPS: Group[] = [
    {
        name: 'Brand',
        note: 'The anchor. The accent sits at hue 315 and 55% saturation, and everything below is placed against those two numbers.',
        keys: [
            'accent',
            'accentFaded',
            'heading',
            'accentTrack',
            'accentBorder',
            'accentSoft',
            'accentWash',
        ],
    },
    {
        name: 'Text',
        note: 'The neutrals carry the brand hue at 7 to 14% saturation: enough to agree with the tinted surfaces, not enough to look coloured.',
        keys: ['heading', 'text', 'hint', 'textInverted'],
    },
    {
        name: 'Surfaces',
        note: 'White for cards, a barely tinted neutral for the page behind them.',
        keys: ['surface', 'surfaceMuted', 'surfaceSunken', 'overlay'],
    },
    {
        name: 'Lines',
        note: 'Every rule in the app is a tint, never a full-strength colour. A line that reads as a stroke is too loud.',
        keys: ['border', 'borderStrong'],
    },
    {
        name: 'Status',
        note: 'Success sits near the brand’s complement, which is what makes the pair read as deliberate; error keeps a red hue so it can never be mistaken for the brand. Both are dark enough to carry white.',
        keys: [
            'success',
            'successHover',
            'successSurface',
            'successText',
            'successBorder',
            'error',
            'errorHover',
            'errorSurface',
            'errorText',
            'errorBorder',
        ],
    },
    {
        name: 'Warm',
        note: 'One family for the warning and the reward, rather than two that overlapped.',
        keys: ['warning', 'trophy', 'trophySurface', 'trophyBorder'],
    },
    {
        name: 'States',
        note: 'Tinted with the brand hue like the rest of the neutrals.',
        keys: ['disabledSurface', 'disabledText'],
    },
];

const Palette = () => (
    <Sheet>
        <Note>
            The palette is anchored on the accent. Status and reward colours are
            placed against its hue and saturation rather than picked at full
            strength, so nothing on screen shouts louder than the brand. Each
            chip is drawn half on a card and half on the page ground, so a
            translucent token reads as the tint it is.
        </Note>
        {GROUPS.map((group) => (
            <div key={group.name}>
                <GroupName>{group.name}</GroupName>
                <GroupNote>{group.note}</GroupNote>
                <Grid>
                    {group.keys.map((key) => (
                        <Tile key={key}>
                            <Swatch $colour={tokens.color[key]} />
                            <Meta>
                                <Name>{key}</Name>
                                <Value>{tokens.color[key]}</Value>
                                <Value>{satLight(tokens.color[key])}</Value>
                            </Meta>
                        </Tile>
                    ))}
                </Grid>
            </div>
        ))}
    </Sheet>
);

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    max-width: 44rem;

    font-size: ${({ theme }) => theme.text.controlSmall.size};
`;

const Cell = styled.td`
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Head = styled.th`
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.borderStrong};

    text-align: left;
    font-weight: 500;
    color: ${({ theme }) => theme.color.hint};
`;

const Ratio = styled(Cell)<{ $pass: boolean }>`
    font-variant-numeric: tabular-nums;
    color: ${({ theme, $pass }) =>
        $pass ? theme.color.successText : theme.color.errorText};
`;

const Sample = styled.span<{ $fg: string; $bg: string }>`
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: ${({ theme }) => theme.radius.m};

    color: ${({ $fg }) => $fg};
    background-color: ${({ $bg }) => $bg};
    white-space: nowrap;
`;

const PAIRS: {
    fg: keyof typeof tokens.color;
    bg: keyof typeof tokens.color;
    need: number;
    what: string;
}[] = [
    { fg: 'text', bg: 'surface', need: 4.5, what: 'Body text on a card' },
    {
        fg: 'text',
        bg: 'surfaceSunken',
        need: 4.5,
        what: 'Body text on the page',
    },
    { fg: 'hint', bg: 'surface', need: 4.5, what: 'Hint on a card' },
    { fg: 'hint', bg: 'surfaceMuted', need: 4.5, what: 'Hint on a muted chip' },
    {
        fg: 'accent',
        bg: 'surface',
        need: 4.5,
        what: 'Accent text, text button',
    },
    {
        fg: 'accent',
        bg: 'accentWash',
        need: 4.5,
        what: 'Accent on its own wash',
    },
    { fg: 'heading', bg: 'surface', need: 4.5, what: 'Heading' },
    {
        fg: 'textInverted',
        bg: 'accent',
        need: 4.5,
        what: 'White on the accent button',
    },
    {
        fg: 'textInverted',
        bg: 'success',
        need: 4.5,
        what: 'White on the success button',
    },
    {
        fg: 'successText',
        bg: 'successSurface',
        need: 4.5,
        what: 'Success message',
    },
    { fg: 'errorText', bg: 'errorSurface', need: 4.5, what: 'Error message' },
    {
        fg: 'textInverted',
        bg: 'error',
        need: 3,
        what: 'Icon on the error disc',
    },
    { fg: 'trophy', bg: 'trophySurface', need: 4.5, what: 'Trophy badge' },
];

const Contrast = () => (
    <Sheet>
        <Note>
            Every pair the app actually renders, measured. Normal text needs
            4.5, an icon or a large control needs 3. A pair that fails here is a
            bug in the palette, not something to work around in a component.
        </Note>
        <Table>
            <thead>
                <tr>
                    <Head>Where</Head>
                    <Head>Sample</Head>
                    <Head>Ratio</Head>
                    <Head>Needs</Head>
                </tr>
            </thead>
            <tbody>
                {PAIRS.map(({ fg, bg, need, what }) => {
                    const ratio = contrast(tokens.color[fg], tokens.color[bg]);

                    return (
                        <tr key={`${fg}-${bg}-${what}`}>
                            <Cell>{what}</Cell>
                            <Cell>
                                <Sample
                                    $fg={tokens.color[fg]}
                                    $bg={tokens.color[bg]}
                                >
                                    Пример текста
                                </Sample>
                            </Cell>
                            <Ratio $pass={ratio >= need}>
                                {ratio.toFixed(2)}
                            </Ratio>
                            <Cell>{need}</Cell>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    </Sheet>
);

const meta = {
    title: 'Design/Colour',
    parameters: {
        layout: 'padded',
    },
} satisfies Meta;

export default meta;

/** Every colour token, grouped by the job it does. */
export const Tokens: StoryObj = {
    render: () => <Palette />,
};

/** The text pairs the app renders, measured against WCAG AA. */
export const ContrastCheck: StoryObj = {
    render: () => <Contrast />,
};
