const deepFreeze = (value) => {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }

  return value;
};

export const PHOTO_ALBUM_CONFIG = deepFreeze({
  schemaVersion: 2,
  enabled: true,
  previewVisible: false,
  provider: "Apple Shared Albums",
  url: "https://www.icloud.com/sharedalbum/#B2KGgZLKuP9jvhH",
  linkLabel: "Abrir álbum compartido",
  instructions:
    "Los invitados podrán agregar y descargar las fotografías del Baby Shower.",
});
