
import { JSX, useEffect, useState } from 'react';
import GenerateUUID from './GenerateUUID/GenerateUUIDButton'
import { Features } from './features.enum';
import GenerateUUIDPage from './GenerateUUID/GenerateUUIDPage';
import { featuresStore } from '../store';
import GenerateCpfCnpjButton from './GenerateCpfCnpj/GenerateCpfCnpjButton';
import GenerateCpfCnpjPage from './GenerateCpfCnpj/GenerateCpfCnpjPage';

interface Feature {
    feature: string;
    featureElement: any;
    featurePage: JSX.Element;
}

export const FEATURES_LIST: Feature[] = [
    {
        feature: Features.UUID_GENERATOR_V4,
        featureElement: GenerateUUID,
        featurePage: <GenerateUUIDPage />
    },
    {
        feature: Features.GENERATE_CPF_CNPJ,
        featureElement: GenerateCpfCnpjButton,
        featurePage: <GenerateCpfCnpjPage />
    }
]

interface ListFeaturesProps {
    onlyFavorites?: boolean;
    onSelectFeature: (jsx: JSX.Element) => void;
}

export default function ListFeatures({ onlyFavorites = false, onSelectFeature }: ListFeaturesProps) {

    const [selectedFeature, setSelectedFeature] = useState("");
    const [featureList, setFeatureList] = useState<Feature[]>([])

    const featureListStore = featuresStore((state) => state.favorites)
    const setFavorite = featuresStore((state) => state.setFavorite)

    function checkActiveFeature(feature: string): boolean {
        return selectedFeature === feature;
    }

    function handleFeatureClick(feature: Feature) {
        setSelectedFeature(feature.feature)
        onSelectFeature(feature.featurePage);
    }

    function favoriteFeatureHandler(featureName: string, isFavorite: boolean) {
        setFavorite(featureName, isFavorite);
    }
    function checkFavoriteFeature(featureName: string): boolean {
        return featureListStore.includes(featureName);
    }

    useEffect(() => {
        if (onlyFavorites) {
            const FEATURES_LIST_FAVORITE = FEATURES_LIST.filter((item) => checkFavoriteFeature(item.feature));
            setFeatureList(FEATURES_LIST_FAVORITE)
        } else {
            setFeatureList(FEATURES_LIST);
        }
    }, [featureListStore])

    return (
        <div>
            <div className="gap-4">
                {onlyFavorites && featureList.length === 0 && <div className="alert alert-info alert-dash shadow-lg"><div><span>You don't have any favorites yet. see <b>All Tools</b> </span></div></div>}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list bg-base-100 gap-4 rounded-box" >
                    {featureList.map((item, index) => (
                        <item.featureElement key={index} isFavorite={checkFavoriteFeature(item.feature)} active={checkActiveFeature(item.feature)} onClick={()=>handleFeatureClick(item)} onFavorite={favoriteFeatureHandler} />
                    ))}
                </ul>

            </div>

        </div>

    )
}
