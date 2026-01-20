import { createDefaultFilters } from "./filters.js";
import { presets } from "./presets.js";

let filters = createDefaultFilters();

const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;
let fileName = null;

const filtersContainer = document.querySelector(".filters");

const loader = document.querySelector(".loader");
setTimeout(() => {
    loader.classList.add("hidden");
}, 1200);


function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = `${name.charAt(0).toUpperCase() + name.slice(1)}: ${value}${unit}`;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
        filters[name].value = input.value;
        console.log(filters[name])
        p.innerText = `${name.charAt(0).toUpperCase() + name.slice(1)}: ${filters[name].value}${unit}`;

        applyFilters();
    });

    return div;
}

function createFilters() {
    Object.keys(filters).forEach(filterName => {
        let filterElement = createFilterElement(filterName, filters[filterName].unit, filters[filterName].value, filters[filterName].min, filters[filterName].max);

        filtersContainer.appendChild(filterElement);
    })
}

createFilters();

imageInput.addEventListener("change", (e) => {
    file = e.target.files[0];
    fileName = file.name;
    const placeholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    placeholder.style.display = "none";
    const img = new Image();
    img.src = URL.createObjectURL(file);
    resetBtn.click();
    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    }
})

function applyFilters() {
    if (!image) return;
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturate.value}${filters.saturate.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})`.trim();

    canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
    filters = createDefaultFilters();

    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
});

downloadBtn.addEventListener("click", () => {
    if (!image) return;
    const link = document.createElement("a");
    link.download = `edited-${fileName}` || "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});

Object.keys(presets).forEach(presetsName => {
    const presetButton = document.createElement("button");
    presetButton.classList.add("preset-btn", "btn");
    presetButton.innerText = presetsName.charAt(0).toUpperCase() + presetsName.slice(1);
    presetsContainer.appendChild(presetButton);

    presetButton.addEventListener("click", () => {
        const preset = presets[presetsName];
        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
        });
        applyFilters();
        filtersContainer.innerHTML = "";
        createFilters();
    })
})
