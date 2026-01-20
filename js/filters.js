export function createDefaultFilters() {
    return {
        brightness: { unit: "%", value: 100, min: 0, max: 200 },
        contrast: { unit: "%", value: 100, min: 0, max: 200 },
        saturate: { unit: "%", value: 100, min: 0, max: 200 },
        hueRotation: { unit: "deg", value: 0, min: 0, max: 360 },
        blur: { unit: "px", value: 0, min: 0, max: 20 },
        grayscale: { unit: "%", value: 0, min: 0, max: 100 },
        sepia: { unit: "%", value: 0, min: 0, max: 100 },
        opacity: { unit: "%", value: 100, min: 0, max: 100 },
        invert: { unit: "%", value: 0, min: 0, max: 100 },
    };
}
