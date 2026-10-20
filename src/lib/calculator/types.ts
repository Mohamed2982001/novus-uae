export type JurisdictionType = "mainland" | "freezone" | "offshore";

export type ActivityCategory =
  | "commercial"
  | "professional"
  | "industrial"
  | "general_trading";

export interface AddonServices {
  bankAccountAssistance: boolean;
  corporateTaxVat: boolean;
  physicalOfficeFlexi: boolean;
}

export interface SetupConfig {
  jurisdiction: JurisdictionType;
  activity: ActivityCategory;
  visaCount: number;
  goldenVisa: boolean;
  addons: AddonServices;
}

export type FeeCategory = "government" | "visas" | "office" | "advisory";

export interface ItemizedFee {
  id: string;
  labelEn: string;
  labelAr: string;
  amountAED: number;
  amountUSD: number;
  category: FeeCategory;
}

export interface CalculationResult {
  baseLicenseFee: number;
  activitySurcharge: number;
  visaTotalFee: number;
  officeFee: number;
  addonsTotal: number;
  subtotalAED: number;
  vatAED: number;
  totalAED: number;
  totalUSD: number;
  estimatedTimelineDays: {
    min: number;
    max: number;
  };
  itemizedBreakdown: ItemizedFee[];
}
