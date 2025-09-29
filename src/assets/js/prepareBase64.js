export default function prepareBase64 (file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => resolve({archive: reader.result, name: file.name});
    });
}