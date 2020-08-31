export interface Search {
  featureRequest: {
    customerId: number;
    features: Array<{ name: string }>;
  };
}
