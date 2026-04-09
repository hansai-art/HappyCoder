export type HackableMode = {
    key: string;
    name: string;
    description?: string | null;
};

export function hackMode<T extends HackableMode>(mode: T): T {
    const normalizedName = mode.name.trim().toLowerCase();
    const normalizedKey = mode.key.trim().toLowerCase();
    const normalizedLabel = normalizedName.replace(/\s+/g, ' ');

    if (normalizedKey === 'build' && /^build(?:\s*[,/]\s*build)?$/.test(normalizedLabel)) {
        return { ...mode, name: 'Build' };
    }
    if (normalizedKey === 'plan' && /^plan(?:\s*[,/]\s*plan)?$/.test(normalizedLabel)) {
        return { ...mode, name: 'Plan' };
    }
    return mode;
}

export function hackModes<T extends HackableMode>(modes: T[]): T[] {
    return modes.map(hackMode);
}
