export type filterOption = {
  name: string;
  options: {
    [key: string]: {
      label: string;
      value: boolean;
    };
  };
};

const filters: filterOption = {
  name: "Dietary Restrictions",
  options: {
    vegetarian: { label: "Vegetarian", value: false },
    vegan: { label: "Vegan", value: false },
    glutenFree: { label: "Gluten Free", value: false },
    dairyFree: { label: "Dairy Free", value: false },
  },
};

export default filters;
