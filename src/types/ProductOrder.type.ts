export default interface ProductOrder {
  sku: string;
  name: string;
  stock: number;
  priceList: number;
  priceOfferDirector: number;
  priceOfferPartner: number;
  quantity: number;
  image: string;
  state: number;
}
