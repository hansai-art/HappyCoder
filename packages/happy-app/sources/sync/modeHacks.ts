export type HackableMode = {
    key: string;
    name: string;
    description?: string | null;
};

function isRepeatedModeLabel(label: string, modeKey: string): boolean {
    const parts = label.split(/[,/]/).map((part) => part.trim()).filter(Boolean);
    return parts.length > 0 && parts.length <= 2 && parts.every((part) => part === modeKey);
}

export function hackMode<T extends HackableMode>(mode: T): T {
    const normalizedName = mode.name.trim().toLowerCase();
    const normalizedKey = mode.key.trim().toLowerCase();
    const normalizedLabel = normalizedName.replace(/\s+/g, ' ');

    if (normalizedKey === 'build' && isRepeatedModeLabel(normalizedLabel, normalizedKey)) {
        return { ...mode, name: 'Build' };
    }
    if (normalizedKey === 'plan' && isRepeatedModeLabel(normalizedLabel, normalizedKey)) {
        return { ...mode, name: 'Plan' };
    }
    return mode;
}

export function hackModes<T extends HackableMode>(modes: T[]): T[] {
    return modes.map(hackMode);
}
