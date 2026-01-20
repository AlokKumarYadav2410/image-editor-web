const filters = {
    brightness: {
        unit: "%",
        value: 100,
        min: 0,
        max: 200,
    },
    contrast: {
        unit: "%",
        value: 100,
        min: 0,
        max: 200,
    },
    exposure: {
        unit: "%",
        value: 100,
        min: 0,
        max: 200,
    },
    saturation: {
        unit: "%",
        value: 100,
        min: 0,
        max: 200,
    },
    hueRotation: {
        unit: "deg",
        value: 0,
        min: 0,
        max: 360,
    },
    blur: {
        unit: "px",
        value: 0,
        min: 0,
        max: 20,
    },
    grayscale: {
        unit: "%",
        value: 0,
        min: 0,
        max: 100,
    },
    sepia: {
        unit: "%",
        value: 0,
        min: 0,
        max: 100,
    },
    opacity: {
        unit: "%",
        value: 100,
        min: 0,
        max: 100,
    },
    invert: {
        unit: "%",
        value: 0,
        min: 0,
        max: 100,
    },
}

const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, unit="%", value, min, max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    // p.innerText = `${name.charAt(0).toUpperCase() + name.slice(1)}: ${value}${unit}`;
    p.innerText = name

    div.appendChild(p);
    div.appendChild(input);

    return div;
}

Object.keys(filters).forEach(filterName => {
    let filterElement = createFilterElement(filterName, filters[filterName].unit, filters[filterName].value, filters[filterName].min, filters[filterName].max);

    filtersContainer.appendChild(filterElement);
})

