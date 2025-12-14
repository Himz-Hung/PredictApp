interface SportImg {
  [key: string]: string;
}
interface StepCircleProps {
  active: boolean;
  number: number | string;
  label: string;
}
interface PackageType {
  id: string;
  title: string;
  description: string;
  price: string;
  limit: number;
}
interface UserPackageRespond {
  status: string;
  sports: string[];
  packageCode: string;
  expiresAt: string;
}
export type { SportImg, StepCircleProps, PackageType, UserPackageRespond };
