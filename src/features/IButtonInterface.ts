export interface IButtonInterface {
    active: boolean;
    isFavorite: boolean
    onClick: (featureName: string) => void;
    onFavorite: (featureName: string, favorite: boolean) => void;
}