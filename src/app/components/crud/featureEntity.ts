export interface FeatureEntity {
    featureId: string;
    displayName: string;
    technicalName: string;
    expiresOn: Date;
    description: string;
    inverted: boolean;
    archived: boolean;
}