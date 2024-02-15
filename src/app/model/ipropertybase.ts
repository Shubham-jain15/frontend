export interface IPropertyBase{
    id: number;
    sellRent: number;
    name: string;
    propertyType: string;
    furnishingType: string;
    price: number;
    photo?: string;
    bhk: number;
    builtArea: number;
    city: string;    
    estPossessionOn:string;
    readyToMove: boolean;
}