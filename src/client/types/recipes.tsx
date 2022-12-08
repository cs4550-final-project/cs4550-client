type Ingredients = {
    id: number,
    name: string,
    localizedName: string,
    image: string
}

type Step = {
    number: number,
    step: string,
    ingredients: Ingredients[],
}

type Instructions = {
    name: string;
    steps: Step[]
}

export type Recipe = {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    sourceName: string;
    pricePerServing: number;
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    // cuisines: [];
    // dishTypes: string[];
    // diets: [];
    // occasions: [];
    analyzedInstructions: Instructions[]
}