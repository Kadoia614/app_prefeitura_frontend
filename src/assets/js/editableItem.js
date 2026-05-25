  const editableItem = (key, value, setTarget) => {
    const keys = key.split(".");
    setTarget((prev) => {
      let updated = { ...prev };
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  export default editableItem;