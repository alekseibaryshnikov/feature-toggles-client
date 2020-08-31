export default interface Feature {
    featureId: bigint;
    name: string;
    expired: Date;
    inverted: boolean;
    active: boolean;
}