// components/MethodDropdown.tsx
"use client";
import Select from "react-select";

export interface Method {
    method: string;
    description: string;
    layer4: boolean;
    layer7: boolean;
    amplification: boolean;
    premium: boolean;
    proxy: boolean;
}

interface MethodOption {
    value: string;
    label: string;
    premium: boolean;
}

interface MethodDropdownProps {
    methods: Method[];
    value: string;
    onChange: (value: string) => void;
}

export default function MethodDropdown({ methods, value, onChange }: MethodDropdownProps) {
    const options: MethodOption[] = methods.map((m) => ({
        value: m.method,
        label: `${m.method} [${m.description}]`,
        premium: m.premium,
    }));

    const groupedOptions = [
        {
            label: "Normal",
            options: options.filter((o) => !o.premium),
        },
        {
            label: "Premium",
            options: options.filter((o) => o.premium),
        },
    ];

    return (
        <Select
            options={groupedOptions}
            value={options.find((opt) => opt.value === value) || null}
            onChange={(opt) => onChange(opt?.value || "")}
            isSearchable
            placeholder="Search method..."
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: "#2e2e30", // Tailwind bg-panel
                    borderColor: "#4b5563",
                    color: "white",
                }),
                singleValue: (base) => ({ ...base, color: "white" }),
                input: (base) => ({ ...base, color: "white" }),
                menu: (base) => ({ ...base, backgroundColor: "#2e2e30" }),
                option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected
                        ? "#2563eb"
                        : isFocused
                            ? "#374151"
                            : "transparent",
                    color: "white",
                }),
            }}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary: "#2563eb",
                    primary25: "#374151",
                },
            })}
        />
    );
}
