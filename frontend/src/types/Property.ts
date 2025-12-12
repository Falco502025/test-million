export interface PropertyImage {
  id: string;
  imageUrl: string;
  isMainImage: boolean;
}

export interface Owner {
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface PropertyTrace {
  dateSale: string;
  name: string;
  value: number;
  tax: number;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  propertyType: string;
  mainImage: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  codeInternal: string;
  year: number;
  owner: Owner;
}

export interface PropertyDetail extends Property {
  description: string;
  traces: PropertyTrace[];
  images: PropertyImage[];
  createdAt: string;
  updatedAt: string | null;
}
