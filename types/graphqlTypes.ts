import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date scalar */
  Date: { input: any; output: any; }
  /** A time scalar */
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Category Type */
export type Category = {
  __typename?: 'Category';
  id: Scalars['UUID']['output'];
  inventoryItems: Array<InventoryItem>;
  name: Scalars['String']['output'];
  skus: Array<Sku>;
};

export type CategoryCustomResponse = {
  __typename?: 'CategoryCustomResponse';
  data?: Maybe<Category>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type CategoryMutation = {
  __typename?: 'CategoryMutation';
  create: CategoryCustomResponse;
  delete: CategoryCustomResponse;
  update: CategoryCustomResponse;
};


export type CategoryMutationCreateArgs = {
  name: Scalars['String']['input'];
};


export type CategoryMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type CategoryMutationUpdateArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type CategoryQuery = {
  __typename?: 'CategoryQuery';
  all: Array<Category>;
  get?: Maybe<Category>;
  search: Array<Category>;
};


export type CategoryQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type CategoryQuerySearchArgs = {
  name: Scalars['String']['input'];
};

/** Condition Type */
export type Condition = {
  __typename?: 'Condition';
  id: Scalars['UUID']['output'];
  inventoryItems: Array<InventoryItem>;
  name: Scalars['String']['output'];
  skus: Array<Sku>;
};

export type ConditionQuery = {
  __typename?: 'ConditionQuery';
  all: Array<Condition>;
  get?: Maybe<Condition>;
  search: Array<Condition>;
};


export type ConditionQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type ConditionQuerySearchArgs = {
  searchTerm: Scalars['String']['input'];
};

/** Customer Input */
export type CreateCustomerInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** Delivery Info Input */
export type CreateDeliveryInfoInput = {
  deliveryAddress: Scalars['String']['input'];
  deliveryDate: Scalars['Date']['input'];
  deliveryTime: Scalars['Time']['input'];
};

/** Input for creating a lot */
export type CreateLotInput = {
  costPrice: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  purchaseDate: Scalars['Date']['input'];
  quantity: Scalars['Int']['input'];
};

/** Input for creating a marketplace */
export type CreateMarketplaceInput = {
  name: Scalars['String']['input'];
};

/** Order Input */
export type CreateOrderInput = {
  buyerShippingCost: Scalars['Float']['input'];
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  deliveryMethodId: Scalars['UUID']['input'];
  marketplaceId?: InputMaybe<Scalars['UUID']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  sellerShippingCost: Scalars['Float']['input'];
  soldInventoryItems: Array<SoldInventoryItem>;
};

/** Input for creating shipping info */
export type CreateShippingInfoInput = {
  height: Scalars['Float']['input'];
  length: Scalars['Float']['input'];
  ounces: Scalars['Int']['input'];
  pounds: Scalars['Int']['input'];
  width: Scalars['Float']['input'];
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  currentRoles: Array<Scalars['String']['output']>;
  currentWorkspace?: Maybe<Workspace>;
  currentWorkspaceId?: Maybe<Scalars['UUID']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  workspaces: Array<Workspace>;
};

/** Customer Type */
export type Customer = {
  __typename?: 'Customer';
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  orders: Array<Order>;
  phone?: Maybe<Scalars['String']['output']>;
};


/** Customer Type */
export type CustomerOrdersArgs = {
  customerId: Scalars['UUID']['input'];
};

export type CustomerCustomResponse = {
  __typename?: 'CustomerCustomResponse';
  data?: Maybe<Customer>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type CustomerMutation = {
  __typename?: 'CustomerMutation';
  create: CustomerCustomResponse;
  delete: CustomerCustomResponse;
  update: CustomerCustomResponse;
};


export type CustomerMutationCreateArgs = {
  createCustomerInput: CreateCustomerInput;
};


export type CustomerMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type CustomerMutationUpdateArgs = {
  id: Scalars['UUID']['input'];
  updateCustomerInput: UpdateCustomerInput;
};

export type CustomerQuery = {
  __typename?: 'CustomerQuery';
  all: Array<Customer>;
  get?: Maybe<Customer>;
  search: Array<Customer>;
};


export type CustomerQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type CustomerQuerySearchArgs = {
  searchTerm: Scalars['String']['input'];
};

/** Delivery Info Type */
export type DeliveryInfo = {
  __typename?: 'DeliveryInfo';
  deliveryAddress: Scalars['String']['output'];
  deliveryDate: Scalars['Date']['output'];
  deliveryTime: Scalars['Time']['output'];
  order: Order;
};

export type DeliveryInfoCustomResponse = {
  __typename?: 'DeliveryInfoCustomResponse';
  data?: Maybe<DeliveryInfo>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type DeliveryInfoMutation = {
  __typename?: 'DeliveryInfoMutation';
  create: DeliveryInfoCustomResponse;
  delete: DeliveryInfoCustomResponse;
  update: DeliveryInfoCustomResponse;
};


export type DeliveryInfoMutationCreateArgs = {
  createDeliveryInfoInput: CreateDeliveryInfoInput;
  orderId: Scalars['UUID']['input'];
};


export type DeliveryInfoMutationDeleteArgs = {
  orderId: Scalars['UUID']['input'];
};


export type DeliveryInfoMutationUpdateArgs = {
  orderId: Scalars['UUID']['input'];
  updateDeliveryInfoInput: UpdateDeliveryInfoInput;
};

export type DeliveryInfoQuery = {
  __typename?: 'DeliveryInfoQuery';
  all: Array<DeliveryInfo>;
  get?: Maybe<DeliveryInfo>;
  search: Array<DeliveryInfo>;
};


export type DeliveryInfoQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type DeliveryInfoQuerySearchArgs = {
  deliveryAddress: Scalars['String']['input'];
};

/** Delivery Method Type */
export type DeliveryMethod = {
  __typename?: 'DeliveryMethod';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  orders: Array<Order>;
  skus: Array<Sku>;
};

export type DeliveryMethodQuery = {
  __typename?: 'DeliveryMethodQuery';
  all: Array<DeliveryMethod>;
  get?: Maybe<DeliveryMethod>;
  search: Array<DeliveryMethod>;
};


export type DeliveryMethodQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type DeliveryMethodQuerySearchArgs = {
  name: Scalars['String']['input'];
};

/** Inventory Item Type */
export type InventoryItem = {
  __typename?: 'InventoryItem';
  costPrice?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  inventoryItemStatus: InventoryItemStatus;
  listPrice: Scalars['Float']['output'];
  order?: Maybe<Order>;
  purchaseDate?: Maybe<Scalars['Date']['output']>;
  sku: Sku;
  soldDate?: Maybe<Scalars['Date']['output']>;
  soldPrice?: Maybe<Scalars['Float']['output']>;
  workspace: Workspace;
};

export type InventoryItemCustomResponse = {
  __typename?: 'InventoryItemCustomResponse';
  data?: Maybe<InventoryItem>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type InventoryItemMutation = {
  __typename?: 'InventoryItemMutation';
  changeStatus: InventoryItemCustomResponse;
  update: InventoryItemCustomResponse;
};


export type InventoryItemMutationChangeStatusArgs = {
  id: Scalars['UUID']['input'];
  inventoryItemStatusId: Scalars['UUID']['input'];
};


export type InventoryItemMutationUpdateArgs = {
  id: Scalars['UUID']['input'];
  updateInventoryItemInput: UpdateInventoryItem;
};

export type InventoryItemQuery = {
  __typename?: 'InventoryItemQuery';
  all: Array<InventoryItem>;
  get: InventoryItem;
  getAllFulfilled: Array<InventoryItem>;
  getAllPicked: Array<InventoryItem>;
  getAllQuantities: Array<QuantityBySku>;
  getAllSold: Array<InventoryItem>;
  search: Array<InventoryItem>;
};


export type InventoryItemQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type InventoryItemQuerySearchArgs = {
  searchTerm: Scalars['String']['input'];
};

/** Inventory Item Status Type */
export type InventoryItemStatus = {
  __typename?: 'InventoryItemStatus';
  /** The id of the inventory item status */
  id: Scalars['UUID']['output'];
  /** The inventory items with this status */
  inventoryItems: Array<InventoryItem>;
  /** The name of the inventory item status */
  name: Scalars['String']['output'];
};

export type InventoryItemStatusQuery = {
  __typename?: 'InventoryItemStatusQuery';
  all: Array<InventoryItemStatus>;
  get?: Maybe<InventoryItemStatus>;
  search: Array<InventoryItemStatus>;
};


export type InventoryItemStatusQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type InventoryItemStatusQuerySearchArgs = {
  searchTerm: Scalars['String']['input'];
};

/** Inventory Marketplace Link Type */
export type InventoryMarketplaceLink = {
  __typename?: 'InventoryMarketplaceLink';
  isListed: Scalars['Boolean']['output'];
  marketplace: Marketplace;
  marketplaceId: Scalars['UUID']['output'];
  marketplaceName: Scalars['String']['output'];
  sku: Sku;
};

export type InventoryMarketplaceLinkCustomResponse = {
  __typename?: 'InventoryMarketplaceLinkCustomResponse';
  data?: Maybe<InventoryMarketplaceLink>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type InvitedWorkspaceQuery = {
  __typename?: 'InvitedWorkspaceQuery';
  all: Array<Workspace>;
  get?: Maybe<Workspace>;
  search: Array<Workspace>;
};


export type InvitedWorkspaceQueryGetArgs = {
  workspaceId: Scalars['UUID']['input'];
};


export type InvitedWorkspaceQuerySearchArgs = {
  searchTerm: Scalars['String']['input'];
};

/** Lot Type */
export type Lot = {
  __typename?: 'Lot';
  /** Cost price of the lot in dollars */
  costPrice: Scalars['Float']['output'];
  id: Scalars['UUID']['output'];
  inventoryItems: Array<InventoryItem>;
  name: Scalars['String']['output'];
  /** Purchase date of the lot */
  purchaseDate: Scalars['Date']['output'];
  quantityAddedToInventory: Scalars['Int']['output'];
  quantityFulfilled: Scalars['Int']['output'];
  /** Quantity of the lot in the warehouse */
  quantityInLot: Scalars['Int']['output'];
  quantityPicked: Scalars['Int']['output'];
  quantitySold: Scalars['Int']['output'];
  /** Quantity of the lot to process */
  quantityToProcess: Scalars['Int']['output'];
  skus: Array<Sku>;
  workspace: Workspace;
};

export type LotCustomResponse = {
  __typename?: 'LotCustomResponse';
  data?: Maybe<Lot>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type LotMutation = {
  __typename?: 'LotMutation';
  create: LotCustomResponse;
  delete: LotCustomResponse;
  update: LotCustomResponse;
};


export type LotMutationCreateArgs = {
  createLotInput: CreateLotInput;
};


export type LotMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type LotMutationUpdateArgs = {
  id: Scalars['UUID']['input'];
  updateLotInput: UpdateLotInput;
};

export type LotQuery = {
  __typename?: 'LotQuery';
  all: Array<Lot>;
  get?: Maybe<Lot>;
  search: Array<Lot>;
};


export type LotQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type LotQuerySearchArgs = {
  name: Scalars['String']['input'];
};

/** Marketplace Type */
export type Marketplace = {
  __typename?: 'Marketplace';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  orders: Array<Order>;
};

export type MarketplaceCustomResponse = {
  __typename?: 'MarketplaceCustomResponse';
  data?: Maybe<Marketplace>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type MarketplaceMutation = {
  __typename?: 'MarketplaceMutation';
  create: MarketplaceCustomResponse;
  delete: MarketplaceCustomResponse;
  update: MarketplaceCustomResponse;
};


export type MarketplaceMutationCreateArgs = {
  createMarketplaceInput: CreateMarketplaceInput;
};


export type MarketplaceMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type MarketplaceMutationUpdateArgs = {
  id: Scalars['UUID']['input'];
  updateMarketplaceInput: UpdateMarketplaceInput;
};

export type MarketplaceQuery = {
  __typename?: 'MarketplaceQuery';
  all: Array<Marketplace>;
  get?: Maybe<Marketplace>;
  search: Array<Marketplace>;
};


export type MarketplaceQueryGetArgs = {
  id: Scalars['UUID']['input'];
  workspaceId: Scalars['UUID']['input'];
};


export type MarketplaceQuerySearchArgs = {
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  category: CategoryMutation;
  customer: CustomerMutation;
  deliveryInfo: DeliveryInfoMutation;
  inventoryItem: InventoryItemMutation;
  lot: LotMutation;
  marketplace: MarketplaceMutation;
  order: OrderMutation;
  shippingInfo: ShippingInfoMutation;
  sku: SkuMutation;
  skuMarketplaceLink: SkuMarketplaceLinkMutation;
  user: UserMutation;
  workspace: WorkspaceMutation;
};

/** Order Type */
export type Order = {
  __typename?: 'Order';
  buyerShippingCost: Scalars['Float']['output'];
  customer?: Maybe<Customer>;
  deliveryInfo?: Maybe<DeliveryInfo>;
  deliveryMethod?: Maybe<DeliveryMethod>;
  id: Scalars['UUID']['output'];
  inventoryItems: Array<InventoryItem>;
  marketplace?: Maybe<Marketplace>;
  orderNumber?: Maybe<Scalars['String']['output']>;
  pickUpInfo?: Maybe<PickUpInfo>;
  sellerShippingCost: Scalars['Float']['output'];
};

export type OrderCustomResponse = {
  __typename?: 'OrderCustomResponse';
  data?: Maybe<Order>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type OrderMutation = {
  __typename?: 'OrderMutation';
  createOrder: OrderCustomResponse;
  deleteOrder: OrderCustomResponse;
  updateOrder: OrderCustomResponse;
};


export type OrderMutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type OrderMutationDeleteOrderArgs = {
  id: Scalars['UUID']['input'];
};


export type OrderMutationUpdateOrderArgs = {
  id: Scalars['UUID']['input'];
  updateOrderInput: UpdateOrderInput;
};

export type OrderQuery = {
  __typename?: 'OrderQuery';
  all: Array<Order>;
  get?: Maybe<Order>;
  search: Array<Order>;
};


export type OrderQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type OrderQuerySearchArgs = {
  orderNumber: Scalars['String']['input'];
};

/** Pick Up Info Type */
export type PickUpInfo = {
  __typename?: 'PickUpInfo';
  contactName: Scalars['String']['output'];
  order: Order;
  pickupDate: Scalars['Date']['output'];
  pickupTime: Scalars['Time']['output'];
};

export type QuantityBySku = {
  __typename?: 'QuantityBySku';
  inventoryItem: InventoryItem;
  quantity: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  category: CategoryQuery;
  condition: ConditionQuery;
  customer: CustomerQuery;
  deliveryInfo: DeliveryInfoQuery;
  deliveryMethod: DeliveryMethodQuery;
  inventoryItem: InventoryItemQuery;
  inventoryItemStatus: InventoryItemStatusQuery;
  invitedWorkspace: InvitedWorkspaceQuery;
  lot: LotQuery;
  marketplace: MarketplaceQuery;
  order: OrderQuery;
  role: RoleQuery;
  shippingInfo: ShippingInfoQuery;
  sku: SkuQuery;
  skuMarketplaceLink: SkuMarketplaceLinkQuery;
  user: UserQuery;
  workspace: WorkspaceQuery;
};

/** Role Type */
export type Role = {
  __typename?: 'Role';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type RoleQuery = {
  __typename?: 'RoleQuery';
  /** Get a list of all available roles */
  all: Array<Role>;
  /** Search for roles by name */
  search: Array<Role>;
};


export type RoleQuerySearchArgs = {
  searchTerm: Scalars['String']['input'];
};

/** Shipping Info Type */
export type ShippingInfo = {
  __typename?: 'ShippingInfo';
  height: Scalars['Float']['output'];
  length: Scalars['Float']['output'];
  ounces: Scalars['Int']['output'];
  pounds: Scalars['Int']['output'];
  sku?: Maybe<Sku>;
  width: Scalars['Float']['output'];
};

export type ShippingInfoCustomResponse = {
  __typename?: 'ShippingInfoCustomResponse';
  data?: Maybe<ShippingInfo>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type ShippingInfoMutation = {
  __typename?: 'ShippingInfoMutation';
  create: ShippingInfoCustomResponse;
  delete: ShippingInfoCustomResponse;
  update: ShippingInfoCustomResponse;
};


export type ShippingInfoMutationCreateArgs = {
  createShippingInfoInput: CreateShippingInfoInput;
  skuId: Scalars['UUID']['input'];
};


export type ShippingInfoMutationDeleteArgs = {
  skuId: Scalars['UUID']['input'];
};


export type ShippingInfoMutationUpdateArgs = {
  skuId: Scalars['UUID']['input'];
  updateShippingInfoInput: UpdateShippingInfoInput;
};

export type ShippingInfoQuery = {
  __typename?: 'ShippingInfoQuery';
  all: Array<ShippingInfo>;
  get?: Maybe<ShippingInfo>;
};


export type ShippingInfoQueryGetArgs = {
  id: Scalars['UUID']['input'];
};

export type Sku = {
  __typename?: 'Sku';
  allInventoryItems?: Maybe<Array<InventoryItem>>;
  allInventoryItemsCount: Scalars['Int']['output'];
  category?: Maybe<Category>;
  condition?: Maybe<Condition>;
  conditionDescription?: Maybe<Scalars['String']['output']>;
  costPrice?: Maybe<Scalars['Float']['output']>;
  deliveryMethods?: Maybe<Array<DeliveryMethod>>;
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  inventoryItemsAvailable?: Maybe<Array<InventoryItem>>;
  inventoryItemsAvailableCount: Scalars['Int']['output'];
  inventoryItemsFulfilled?: Maybe<Array<InventoryItem>>;
  inventoryItemsFulfilledCount: Scalars['Int']['output'];
  inventoryItemsPicked?: Maybe<Array<InventoryItem>>;
  inventoryItemsPickedCount: Scalars['Int']['output'];
  inventoryItemsSold?: Maybe<Array<InventoryItem>>;
  inventoryItemsSoldCount: Scalars['Int']['output'];
  inventoryLocation?: Maybe<Scalars['String']['output']>;
  listPrice: Scalars['Float']['output'];
  lot?: Maybe<Lot>;
  purchaseDate?: Maybe<Scalars['Date']['output']>;
  quantity: Scalars['Int']['output'];
  retailPrice: Scalars['Float']['output'];
  shippingInfo?: Maybe<ShippingInfo>;
  skuCode: Scalars['String']['output'];
  skuMarketplaceLinks?: Maybe<Array<InventoryMarketplaceLink>>;
  source?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  workspace: Workspace;
};

export type SkuCreateInput = {
  categoryId?: InputMaybe<Scalars['UUID']['input']>;
  conditionDescription?: InputMaybe<Scalars['String']['input']>;
  conditionId?: InputMaybe<Scalars['UUID']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  deliveryMethodIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  description: Scalars['String']['input'];
  inventoryLocation?: InputMaybe<Scalars['String']['input']>;
  listPrice: Scalars['Float']['input'];
  lotId?: InputMaybe<Scalars['UUID']['input']>;
  marketplaceIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  purchaseDate?: InputMaybe<Scalars['Date']['input']>;
  quantity: Scalars['Int']['input'];
  retailPrice: Scalars['Float']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type SkuCustomResponse = {
  __typename?: 'SkuCustomResponse';
  data?: Maybe<Sku>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type SkuMarketplaceLinkMutation = {
  __typename?: 'SkuMarketplaceLinkMutation';
  create: InventoryMarketplaceLinkCustomResponse;
  delete: InventoryMarketplaceLinkCustomResponse;
  update: InventoryMarketplaceLinkCustomResponse;
};


export type SkuMarketplaceLinkMutationCreateArgs = {
  marketplaceId: Scalars['UUID']['input'];
  skuId: Scalars['UUID']['input'];
};


export type SkuMarketplaceLinkMutationDeleteArgs = {
  marketplaceId: Scalars['UUID']['input'];
  skuId: Scalars['UUID']['input'];
};


export type SkuMarketplaceLinkMutationUpdateArgs = {
  isListed: Scalars['Boolean']['input'];
  marketplaceId: Scalars['UUID']['input'];
  skuId: Scalars['UUID']['input'];
};

export type SkuMarketplaceLinkQuery = {
  __typename?: 'SkuMarketplaceLinkQuery';
  all: Array<InventoryMarketplaceLink>;
  get?: Maybe<InventoryMarketplaceLink>;
  getIsListed: Array<InventoryMarketplaceLink>;
  getNotListed: Array<InventoryMarketplaceLink>;
  search: Array<InventoryMarketplaceLink>;
};


export type SkuMarketplaceLinkQueryAllArgs = {
  skuId: Scalars['UUID']['input'];
};


export type SkuMarketplaceLinkQueryGetArgs = {
  marketplaceId: Scalars['UUID']['input'];
  skuId: Scalars['UUID']['input'];
};


export type SkuMarketplaceLinkQueryGetIsListedArgs = {
  skuId: Scalars['UUID']['input'];
};


export type SkuMarketplaceLinkQueryGetNotListedArgs = {
  skuId: Scalars['UUID']['input'];
};


export type SkuMarketplaceLinkQuerySearchArgs = {
  searchTerm: Scalars['String']['input'];
  skuId: Scalars['UUID']['input'];
};

export type SkuMutation = {
  __typename?: 'SkuMutation';
  create: SkuCustomResponse;
  delete: SkuCustomResponse;
  update: SkuCustomResponse;
};


export type SkuMutationCreateArgs = {
  createSkuInput: SkuCreateInput;
};


export type SkuMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type SkuMutationUpdateArgs = {
  id: Scalars['UUID']['input'];
  updateSkuInput: SkuUpdateInput;
};

export type SkuQuery = {
  __typename?: 'SkuQuery';
  all: Array<Sku>;
  get?: Maybe<Sku>;
  search: Array<Sku>;
};


export type SkuQueryGetArgs = {
  id: Scalars['UUID']['input'];
};


export type SkuQuerySearchArgs = {
  searchTerm: Scalars['String']['input'];
};

export type SkuUpdateInput = {
  categoryId?: InputMaybe<Scalars['UUID']['input']>;
  conditionDescription?: InputMaybe<Scalars['String']['input']>;
  conditionId?: InputMaybe<Scalars['UUID']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  deliveryMethodIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  inventoryLocation?: InputMaybe<Scalars['String']['input']>;
  listPrice?: InputMaybe<Scalars['Float']['input']>;
  lotId?: InputMaybe<Scalars['UUID']['input']>;
  marketplaceIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  purchaseDate?: InputMaybe<Scalars['Date']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  retailPrice?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Sold Inventory Item */
export type SoldInventoryItem = {
  inventoryItemId: Scalars['UUID']['input'];
  soldDate: Scalars['Date']['input'];
  soldPrice: Scalars['Float']['input'];
};

/** Customer Input */
export type UpdateCustomerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** Delivery Info Input */
export type UpdateDeliveryInfoInput = {
  deliveryAddress?: InputMaybe<Scalars['String']['input']>;
  deliveryDate?: InputMaybe<Scalars['Date']['input']>;
  deliveryTime?: InputMaybe<Scalars['Time']['input']>;
};

/** Input for updating an inventory item */
export type UpdateInventoryItem = {
  inventoryItemStatusId?: InputMaybe<Scalars['UUID']['input']>;
  orderId?: InputMaybe<Scalars['UUID']['input']>;
  soldDate?: InputMaybe<Scalars['Date']['input']>;
  soldPrice?: InputMaybe<Scalars['Float']['input']>;
};

/** Input for updating a lot */
export type UpdateLotInput = {
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  purchaseDate?: InputMaybe<Scalars['Date']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/** Input for updating a marketplace */
export type UpdateMarketplaceInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Order Input */
export type UpdateOrderInput = {
  buyerShippingCost?: InputMaybe<Scalars['Float']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  deliveryMethodId?: InputMaybe<Scalars['UUID']['input']>;
  marketplaceId?: InputMaybe<Scalars['UUID']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  sellerShippingCost?: InputMaybe<Scalars['Float']['input']>;
  soldInventoryItems?: InputMaybe<Array<SoldInventoryItem>>;
};

/** Input for updating shipping info */
export type UpdateShippingInfoInput = {
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  ounces?: InputMaybe<Scalars['Int']['input']>;
  pounds?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

/** User Type */
export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  roles: Array<Scalars['String']['output']>;
  workspace?: Maybe<Workspace>;
};

/** User Invitation Type */
export type UserInvitation = {
  __typename?: 'UserInvitation';
  id: Scalars['UUID']['output'];
  inviteEmail: Scalars['String']['output'];
  workspaceId: Scalars['UUID']['output'];
};

export type UserInvitationCustomResponse = {
  __typename?: 'UserInvitationCustomResponse';
  data?: Maybe<UserInvitation>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type UserMutation = {
  __typename?: 'UserMutation';
  inviteUserToWorkspace: UserInvitationCustomResponse;
  removeUserFromWorkspace: UserInvitationCustomResponse;
  revokeUserInviteToWorkspace: UserInvitationCustomResponse;
};


export type UserMutationInviteUserToWorkspaceArgs = {
  userEmail: Scalars['String']['input'];
};


export type UserMutationRemoveUserFromWorkspaceArgs = {
  userEmail: Scalars['String']['input'];
};


export type UserMutationRevokeUserInviteToWorkspaceArgs = {
  userEmail: Scalars['String']['input'];
};

export type UserQuery = {
  __typename?: 'UserQuery';
  all: Array<User>;
  current: CurrentUser;
  get?: Maybe<User>;
};


export type UserQueryAllArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderField?: InputMaybe<Scalars['String']['input']>;
};


export type UserQueryGetArgs = {
  id: Scalars['UUID']['input'];
};

export type Workspace = {
  __typename?: 'Workspace';
  categories: Array<Category>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type WorkspaceCustomResponse = {
  __typename?: 'WorkspaceCustomResponse';
  data?: Maybe<Workspace>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type WorkspaceMutation = {
  __typename?: 'WorkspaceMutation';
  connectToInvited: WorkspaceCustomResponse;
  create: WorkspaceCustomResponse;
  deselect: WorkspaceCustomResponse;
  disconnect: WorkspaceCustomResponse;
  reconnect: WorkspaceCustomResponse;
  select: WorkspaceCustomResponse;
};


export type WorkspaceMutationConnectToInvitedArgs = {
  workspaceId: Scalars['UUID']['input'];
};


export type WorkspaceMutationCreateArgs = {
  name: Scalars['String']['input'];
};


export type WorkspaceMutationDisconnectArgs = {
  workspaceId: Scalars['UUID']['input'];
};


export type WorkspaceMutationReconnectArgs = {
  workspaceId: Scalars['UUID']['input'];
};


export type WorkspaceMutationSelectArgs = {
  workspaceId: Scalars['UUID']['input'];
};

export type WorkspaceQuery = {
  __typename?: 'WorkspaceQuery';
  all: Array<Workspace>;
  get?: Maybe<Workspace>;
  search: Array<Workspace>;
};


export type WorkspaceQueryAllArgs = {
  order?: InputMaybe<Scalars['String']['input']>;
};


export type WorkspaceQueryGetArgs = {
  workspaceId: Scalars['UUID']['input'];
};


export type WorkspaceQuerySearchArgs = {
  order?: InputMaybe<Scalars['String']['input']>;
  searchTerm: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryCustomResponse: ResolverTypeWrapper<CategoryCustomResponse>;
  CategoryMutation: ResolverTypeWrapper<CategoryMutation>;
  CategoryQuery: ResolverTypeWrapper<CategoryQuery>;
  Condition: ResolverTypeWrapper<Condition>;
  ConditionQuery: ResolverTypeWrapper<ConditionQuery>;
  CreateCustomerInput: CreateCustomerInput;
  CreateDeliveryInfoInput: CreateDeliveryInfoInput;
  CreateLotInput: CreateLotInput;
  CreateMarketplaceInput: CreateMarketplaceInput;
  CreateOrderInput: CreateOrderInput;
  CreateShippingInfoInput: CreateShippingInfoInput;
  CurrentUser: ResolverTypeWrapper<CurrentUser>;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerCustomResponse: ResolverTypeWrapper<CustomerCustomResponse>;
  CustomerMutation: ResolverTypeWrapper<CustomerMutation>;
  CustomerQuery: ResolverTypeWrapper<CustomerQuery>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeliveryInfo: ResolverTypeWrapper<DeliveryInfo>;
  DeliveryInfoCustomResponse: ResolverTypeWrapper<DeliveryInfoCustomResponse>;
  DeliveryInfoMutation: ResolverTypeWrapper<DeliveryInfoMutation>;
  DeliveryInfoQuery: ResolverTypeWrapper<DeliveryInfoQuery>;
  DeliveryMethod: ResolverTypeWrapper<DeliveryMethod>;
  DeliveryMethodQuery: ResolverTypeWrapper<DeliveryMethodQuery>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InventoryItem: ResolverTypeWrapper<InventoryItem>;
  InventoryItemCustomResponse: ResolverTypeWrapper<InventoryItemCustomResponse>;
  InventoryItemMutation: ResolverTypeWrapper<InventoryItemMutation>;
  InventoryItemQuery: ResolverTypeWrapper<InventoryItemQuery>;
  InventoryItemStatus: ResolverTypeWrapper<InventoryItemStatus>;
  InventoryItemStatusQuery: ResolverTypeWrapper<InventoryItemStatusQuery>;
  InventoryMarketplaceLink: ResolverTypeWrapper<InventoryMarketplaceLink>;
  InventoryMarketplaceLinkCustomResponse: ResolverTypeWrapper<InventoryMarketplaceLinkCustomResponse>;
  InvitedWorkspaceQuery: ResolverTypeWrapper<InvitedWorkspaceQuery>;
  Lot: ResolverTypeWrapper<Lot>;
  LotCustomResponse: ResolverTypeWrapper<LotCustomResponse>;
  LotMutation: ResolverTypeWrapper<LotMutation>;
  LotQuery: ResolverTypeWrapper<LotQuery>;
  Marketplace: ResolverTypeWrapper<Marketplace>;
  MarketplaceCustomResponse: ResolverTypeWrapper<MarketplaceCustomResponse>;
  MarketplaceMutation: ResolverTypeWrapper<MarketplaceMutation>;
  MarketplaceQuery: ResolverTypeWrapper<MarketplaceQuery>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderCustomResponse: ResolverTypeWrapper<OrderCustomResponse>;
  OrderMutation: ResolverTypeWrapper<OrderMutation>;
  OrderQuery: ResolverTypeWrapper<OrderQuery>;
  PickUpInfo: ResolverTypeWrapper<PickUpInfo>;
  QuantityBySku: ResolverTypeWrapper<QuantityBySku>;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  RoleQuery: ResolverTypeWrapper<RoleQuery>;
  ShippingInfo: ResolverTypeWrapper<ShippingInfo>;
  ShippingInfoCustomResponse: ResolverTypeWrapper<ShippingInfoCustomResponse>;
  ShippingInfoMutation: ResolverTypeWrapper<ShippingInfoMutation>;
  ShippingInfoQuery: ResolverTypeWrapper<ShippingInfoQuery>;
  Sku: ResolverTypeWrapper<Sku>;
  SkuCreateInput: SkuCreateInput;
  SkuCustomResponse: ResolverTypeWrapper<SkuCustomResponse>;
  SkuMarketplaceLinkMutation: ResolverTypeWrapper<SkuMarketplaceLinkMutation>;
  SkuMarketplaceLinkQuery: ResolverTypeWrapper<SkuMarketplaceLinkQuery>;
  SkuMutation: ResolverTypeWrapper<SkuMutation>;
  SkuQuery: ResolverTypeWrapper<SkuQuery>;
  SkuUpdateInput: SkuUpdateInput;
  SoldInventoryItem: SoldInventoryItem;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateDeliveryInfoInput: UpdateDeliveryInfoInput;
  UpdateInventoryItem: UpdateInventoryItem;
  UpdateLotInput: UpdateLotInput;
  UpdateMarketplaceInput: UpdateMarketplaceInput;
  UpdateOrderInput: UpdateOrderInput;
  UpdateShippingInfoInput: UpdateShippingInfoInput;
  User: ResolverTypeWrapper<User>;
  UserInvitation: ResolverTypeWrapper<UserInvitation>;
  UserInvitationCustomResponse: ResolverTypeWrapper<UserInvitationCustomResponse>;
  UserMutation: ResolverTypeWrapper<UserMutation>;
  UserQuery: ResolverTypeWrapper<UserQuery>;
  Workspace: ResolverTypeWrapper<Workspace>;
  WorkspaceCustomResponse: ResolverTypeWrapper<WorkspaceCustomResponse>;
  WorkspaceMutation: ResolverTypeWrapper<WorkspaceMutation>;
  WorkspaceQuery: ResolverTypeWrapper<WorkspaceQuery>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CategoryCustomResponse: CategoryCustomResponse;
  CategoryMutation: CategoryMutation;
  CategoryQuery: CategoryQuery;
  Condition: Condition;
  ConditionQuery: ConditionQuery;
  CreateCustomerInput: CreateCustomerInput;
  CreateDeliveryInfoInput: CreateDeliveryInfoInput;
  CreateLotInput: CreateLotInput;
  CreateMarketplaceInput: CreateMarketplaceInput;
  CreateOrderInput: CreateOrderInput;
  CreateShippingInfoInput: CreateShippingInfoInput;
  CurrentUser: CurrentUser;
  Customer: Customer;
  CustomerCustomResponse: CustomerCustomResponse;
  CustomerMutation: CustomerMutation;
  CustomerQuery: CustomerQuery;
  Date: Scalars['Date']['output'];
  DeliveryInfo: DeliveryInfo;
  DeliveryInfoCustomResponse: DeliveryInfoCustomResponse;
  DeliveryInfoMutation: DeliveryInfoMutation;
  DeliveryInfoQuery: DeliveryInfoQuery;
  DeliveryMethod: DeliveryMethod;
  DeliveryMethodQuery: DeliveryMethodQuery;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  InventoryItem: InventoryItem;
  InventoryItemCustomResponse: InventoryItemCustomResponse;
  InventoryItemMutation: InventoryItemMutation;
  InventoryItemQuery: InventoryItemQuery;
  InventoryItemStatus: InventoryItemStatus;
  InventoryItemStatusQuery: InventoryItemStatusQuery;
  InventoryMarketplaceLink: InventoryMarketplaceLink;
  InventoryMarketplaceLinkCustomResponse: InventoryMarketplaceLinkCustomResponse;
  InvitedWorkspaceQuery: InvitedWorkspaceQuery;
  Lot: Lot;
  LotCustomResponse: LotCustomResponse;
  LotMutation: LotMutation;
  LotQuery: LotQuery;
  Marketplace: Marketplace;
  MarketplaceCustomResponse: MarketplaceCustomResponse;
  MarketplaceMutation: MarketplaceMutation;
  MarketplaceQuery: MarketplaceQuery;
  Mutation: {};
  Order: Order;
  OrderCustomResponse: OrderCustomResponse;
  OrderMutation: OrderMutation;
  OrderQuery: OrderQuery;
  PickUpInfo: PickUpInfo;
  QuantityBySku: QuantityBySku;
  Query: {};
  Role: Role;
  RoleQuery: RoleQuery;
  ShippingInfo: ShippingInfo;
  ShippingInfoCustomResponse: ShippingInfoCustomResponse;
  ShippingInfoMutation: ShippingInfoMutation;
  ShippingInfoQuery: ShippingInfoQuery;
  Sku: Sku;
  SkuCreateInput: SkuCreateInput;
  SkuCustomResponse: SkuCustomResponse;
  SkuMarketplaceLinkMutation: SkuMarketplaceLinkMutation;
  SkuMarketplaceLinkQuery: SkuMarketplaceLinkQuery;
  SkuMutation: SkuMutation;
  SkuQuery: SkuQuery;
  SkuUpdateInput: SkuUpdateInput;
  SoldInventoryItem: SoldInventoryItem;
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  UUID: Scalars['UUID']['output'];
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateDeliveryInfoInput: UpdateDeliveryInfoInput;
  UpdateInventoryItem: UpdateInventoryItem;
  UpdateLotInput: UpdateLotInput;
  UpdateMarketplaceInput: UpdateMarketplaceInput;
  UpdateOrderInput: UpdateOrderInput;
  UpdateShippingInfoInput: UpdateShippingInfoInput;
  User: User;
  UserInvitation: UserInvitation;
  UserInvitationCustomResponse: UserInvitationCustomResponse;
  UserMutation: UserMutation;
  UserQuery: UserQuery;
  Workspace: Workspace;
  WorkspaceCustomResponse: WorkspaceCustomResponse;
  WorkspaceMutation: WorkspaceMutation;
  WorkspaceQuery: WorkspaceQuery;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  inventoryItems?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skus?: Resolver<Array<ResolversTypes['Sku']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryCustomResponse'] = ResolversParentTypes['CategoryCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryMutation'] = ResolversParentTypes['CategoryMutation']> = {
  create?: Resolver<ResolversTypes['CategoryCustomResponse'], ParentType, ContextType, RequireFields<CategoryMutationCreateArgs, 'name'>>;
  delete?: Resolver<ResolversTypes['CategoryCustomResponse'], ParentType, ContextType, RequireFields<CategoryMutationDeleteArgs, 'id'>>;
  update?: Resolver<ResolversTypes['CategoryCustomResponse'], ParentType, ContextType, RequireFields<CategoryMutationUpdateArgs, 'id' | 'name'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryQuery'] = ResolversParentTypes['CategoryQuery']> = {
  all?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<CategoryQueryGetArgs, 'id'>>;
  search?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<CategoryQuerySearchArgs, 'name'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConditionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Condition'] = ResolversParentTypes['Condition']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  inventoryItems?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skus?: Resolver<Array<ResolversTypes['Sku']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConditionQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConditionQuery'] = ResolversParentTypes['ConditionQuery']> = {
  all?: Resolver<Array<ResolversTypes['Condition']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['Condition']>, ParentType, ContextType, RequireFields<ConditionQueryGetArgs, 'id'>>;
  search?: Resolver<Array<ResolversTypes['Condition']>, ParentType, ContextType, RequireFields<ConditionQuerySearchArgs, 'searchTerm'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrentUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrentUser'] = ResolversParentTypes['CurrentUser']> = {
  currentRoles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  currentWorkspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType>;
  currentWorkspaceId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workspaces?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<CustomerOrdersArgs, 'customerId'>>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerCustomResponse'] = ResolversParentTypes['CustomerCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerMutation'] = ResolversParentTypes['CustomerMutation']> = {
  create?: Resolver<ResolversTypes['CustomerCustomResponse'], ParentType, ContextType, RequireFields<CustomerMutationCreateArgs, 'createCustomerInput'>>;
  delete?: Resolver<ResolversTypes['CustomerCustomResponse'], ParentType, ContextType, RequireFields<CustomerMutationDeleteArgs, 'id'>>;
  update?: Resolver<ResolversTypes['CustomerCustomResponse'], ParentType, ContextType, RequireFields<CustomerMutationUpdateArgs, 'id' | 'updateCustomerInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerQuery'] = ResolversParentTypes['CustomerQuery']> = {
  all?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<CustomerQueryGetArgs, 'id'>>;
  search?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<CustomerQuerySearchArgs, 'searchTerm'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeliveryInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryInfo'] = ResolversParentTypes['DeliveryInfo']> = {
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deliveryTime?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeliveryInfoCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryInfoCustomResponse'] = ResolversParentTypes['DeliveryInfoCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['DeliveryInfo']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeliveryInfoMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryInfoMutation'] = ResolversParentTypes['DeliveryInfoMutation']> = {
  create?: Resolver<ResolversTypes['DeliveryInfoCustomResponse'], ParentType, ContextType, RequireFields<DeliveryInfoMutationCreateArgs, 'createDeliveryInfoInput' | 'orderId'>>;
  delete?: Resolver<ResolversTypes['DeliveryInfoCustomResponse'], ParentType, ContextType, RequireFields<DeliveryInfoMutationDeleteArgs, 'orderId'>>;
  update?: Resolver<ResolversTypes['DeliveryInfoCustomResponse'], ParentType, ContextType, RequireFields<DeliveryInfoMutationUpdateArgs, 'orderId' | 'updateDeliveryInfoInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeliveryInfoQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryInfoQuery'] = ResolversParentTypes['DeliveryInfoQuery']> = {
  all?: Resolver<Array<ResolversTypes['DeliveryInfo']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['DeliveryInfo']>, ParentType, ContextType, RequireFields<DeliveryInfoQueryGetArgs, 'id'>>;
  search?: Resolver<Array<ResolversTypes['DeliveryInfo']>, ParentType, ContextType, RequireFields<DeliveryInfoQuerySearchArgs, 'deliveryAddress'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeliveryMethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryMethod'] = ResolversParentTypes['DeliveryMethod']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  skus?: Resolver<Array<ResolversTypes['Sku']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeliveryMethodQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryMethodQuery'] = ResolversParentTypes['DeliveryMethodQuery']> = {
  all?: Resolver<Array<ResolversTypes['DeliveryMethod']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['DeliveryMethod']>, ParentType, ContextType, RequireFields<DeliveryMethodQueryGetArgs, 'id'>>;
  search?: Resolver<Array<ResolversTypes['DeliveryMethod']>, ParentType, ContextType, RequireFields<DeliveryMethodQuerySearchArgs, 'name'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryItem'] = ResolversParentTypes['InventoryItem']> = {
  costPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  inventoryItemStatus?: Resolver<ResolversTypes['InventoryItemStatus'], ParentType, ContextType>;
  listPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  purchaseDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['Sku'], ParentType, ContextType>;
  soldDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  soldPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  workspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryItemCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryItemCustomResponse'] = ResolversParentTypes['InventoryItemCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryItemMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryItemMutation'] = ResolversParentTypes['InventoryItemMutation']> = {
  changeStatus?: Resolver<ResolversTypes['InventoryItemCustomResponse'], ParentType, ContextType, RequireFields<InventoryItemMutationChangeStatusArgs, 'id' | 'inventoryItemStatusId'>>;
  update?: Resolver<ResolversTypes['InventoryItemCustomResponse'], ParentType, ContextType, RequireFields<InventoryItemMutationUpdateArgs, 'id' | 'updateInventoryItemInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryItemQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryItemQuery'] = ResolversParentTypes['InventoryItemQuery']> = {
  all?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  get?: Resolver<ResolversTypes['InventoryItem'], ParentType, ContextType, RequireFields<InventoryItemQueryGetArgs, 'id'>>;
  getAllFulfilled?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  getAllPicked?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  getAllQuantities?: Resolver<Array<ResolversTypes['QuantityBySku']>, ParentType, ContextType>;
  getAllSold?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  search?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType, RequireFields<InventoryItemQuerySearchArgs, 'searchTerm'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryItemStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryItemStatus'] = ResolversParentTypes['InventoryItemStatus']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  inventoryItems?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryItemStatusQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryItemStatusQuery'] = ResolversParentTypes['InventoryItemStatusQuery']> = {
  all?: Resolver<Array<ResolversTypes['InventoryItemStatus']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['InventoryItemStatus']>, ParentType, ContextType, RequireFields<InventoryItemStatusQueryGetArgs, 'id'>>;
  search?: Resolver<Array<ResolversTypes['InventoryItemStatus']>, ParentType, ContextType, RequireFields<InventoryItemStatusQuerySearchArgs, 'searchTerm'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryMarketplaceLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryMarketplaceLink'] = ResolversParentTypes['InventoryMarketplaceLink']> = {
  isListed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  marketplace?: Resolver<ResolversTypes['Marketplace'], ParentType, ContextType>;
  marketplaceId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  marketplaceName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['Sku'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryMarketplaceLinkCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryMarketplaceLinkCustomResponse'] = ResolversParentTypes['InventoryMarketplaceLinkCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['InventoryMarketplaceLink']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitedWorkspaceQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitedWorkspaceQuery'] = ResolversParentTypes['InvitedWorkspaceQuery']> = {
  all?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<InvitedWorkspaceQueryGetArgs, 'workspaceId'>>;
  search?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<InvitedWorkspaceQuerySearchArgs, 'searchTerm'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LotResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lot'] = ResolversParentTypes['Lot']> = {
  costPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  inventoryItems?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  purchaseDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  quantityAddedToInventory?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityFulfilled?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityInLot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityPicked?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantitySold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityToProcess?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skus?: Resolver<Array<ResolversTypes['Sku']>, ParentType, ContextType>;
  workspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LotCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LotCustomResponse'] = ResolversParentTypes['LotCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Lot']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LotMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['LotMutation'] = ResolversParentTypes['LotMutation']> = {
  create?: Resolver<ResolversTypes['LotCustomResponse'], ParentType, ContextType, RequireFields<LotMutationCreateArgs, 'createLotInput'>>;
  delete?: Resolver<ResolversTypes['LotCustomResponse'], ParentType, ContextType, RequireFields<LotMutationDeleteArgs, 'id'>>;
  update?: Resolver<ResolversTypes['LotCustomResponse'], ParentType, ContextType, RequireFields<LotMutationUpdateArgs, 'id' | 'updateLotInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LotQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['LotQuery'] = ResolversParentTypes['LotQuery']> = {
  all?: Resolver<Array<ResolversTypes['Lot']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['Lot']>, ParentType, ContextType, RequireFields<LotQueryGetArgs, 'id'>>;
  search?: Resolver<Array<ResolversTypes['Lot']>, ParentType, ContextType, RequireFields<LotQuerySearchArgs, 'name'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketplaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Marketplace'] = ResolversParentTypes['Marketplace']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketplaceCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarketplaceCustomResponse'] = ResolversParentTypes['MarketplaceCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Marketplace']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketplaceMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarketplaceMutation'] = ResolversParentTypes['MarketplaceMutation']> = {
  create?: Resolver<ResolversTypes['MarketplaceCustomResponse'], ParentType, ContextType, RequireFields<MarketplaceMutationCreateArgs, 'createMarketplaceInput'>>;
  delete?: Resolver<ResolversTypes['MarketplaceCustomResponse'], ParentType, ContextType, RequireFields<MarketplaceMutationDeleteArgs, 'id'>>;
  update?: Resolver<ResolversTypes['MarketplaceCustomResponse'], ParentType, ContextType, RequireFields<MarketplaceMutationUpdateArgs, 'id' | 'updateMarketplaceInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketplaceQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarketplaceQuery'] = ResolversParentTypes['MarketplaceQuery']> = {
  all?: Resolver<Array<ResolversTypes['Marketplace']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['Marketplace']>, ParentType, ContextType, RequireFields<MarketplaceQueryGetArgs, 'id' | 'workspaceId'>>;
  search?: Resolver<Array<ResolversTypes['Marketplace']>, ParentType, ContextType, RequireFields<MarketplaceQuerySearchArgs, 'name'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  category?: Resolver<ResolversTypes['CategoryMutation'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['CustomerMutation'], ParentType, ContextType>;
  deliveryInfo?: Resolver<ResolversTypes['DeliveryInfoMutation'], ParentType, ContextType>;
  inventoryItem?: Resolver<ResolversTypes['InventoryItemMutation'], ParentType, ContextType>;
  lot?: Resolver<ResolversTypes['LotMutation'], ParentType, ContextType>;
  marketplace?: Resolver<ResolversTypes['MarketplaceMutation'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['OrderMutation'], ParentType, ContextType>;
  shippingInfo?: Resolver<ResolversTypes['ShippingInfoMutation'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['SkuMutation'], ParentType, ContextType>;
  skuMarketplaceLink?: Resolver<ResolversTypes['SkuMarketplaceLinkMutation'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserMutation'], ParentType, ContextType>;
  workspace?: Resolver<ResolversTypes['WorkspaceMutation'], ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  buyerShippingCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  deliveryInfo?: Resolver<Maybe<ResolversTypes['DeliveryInfo']>, ParentType, ContextType>;
  deliveryMethod?: Resolver<Maybe<ResolversTypes['DeliveryMethod']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  inventoryItems?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  marketplace?: Resolver<Maybe<ResolversTypes['Marketplace']>, ParentType, ContextType>;
  orderNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pickUpInfo?: Resolver<Maybe<ResolversTypes['PickUpInfo']>, ParentType, ContextType>;
  sellerShippingCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderCustomResponse'] = ResolversParentTypes['OrderCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderMutation'] = ResolversParentTypes['OrderMutation']> = {
  createOrder?: Resolver<ResolversTypes['OrderCustomResponse'], ParentType, ContextType, RequireFields<OrderMutationCreateOrderArgs, 'createOrderInput'>>;
  deleteOrder?: Resolver<ResolversTypes['OrderCustomResponse'], ParentType, ContextType, RequireFields<OrderMutationDeleteOrderArgs, 'id'>>;
  updateOrder?: Resolver<ResolversTypes['OrderCustomResponse'], ParentType, ContextType, RequireFields<OrderMutationUpdateOrderArgs, 'id' | 'updateOrderInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderQuery'] = ResolversParentTypes['OrderQuery']> = {
  all?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<OrderQueryGetArgs, 'id'>>;
  search?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<OrderQuerySearchArgs, 'orderNumber'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PickUpInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PickUpInfo'] = ResolversParentTypes['PickUpInfo']> = {
  contactName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  pickupDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  pickupTime?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityBySkuResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuantityBySku'] = ResolversParentTypes['QuantityBySku']> = {
  inventoryItem?: Resolver<ResolversTypes['InventoryItem'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  category?: Resolver<ResolversTypes['CategoryQuery'], ParentType, ContextType>;
  condition?: Resolver<ResolversTypes['ConditionQuery'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['CustomerQuery'], ParentType, ContextType>;
  deliveryInfo?: Resolver<ResolversTypes['DeliveryInfoQuery'], ParentType, ContextType>;
  deliveryMethod?: Resolver<ResolversTypes['DeliveryMethodQuery'], ParentType, ContextType>;
  inventoryItem?: Resolver<ResolversTypes['InventoryItemQuery'], ParentType, ContextType>;
  inventoryItemStatus?: Resolver<ResolversTypes['InventoryItemStatusQuery'], ParentType, ContextType>;
  invitedWorkspace?: Resolver<ResolversTypes['InvitedWorkspaceQuery'], ParentType, ContextType>;
  lot?: Resolver<ResolversTypes['LotQuery'], ParentType, ContextType>;
  marketplace?: Resolver<ResolversTypes['MarketplaceQuery'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['OrderQuery'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['RoleQuery'], ParentType, ContextType>;
  shippingInfo?: Resolver<ResolversTypes['ShippingInfoQuery'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['SkuQuery'], ParentType, ContextType>;
  skuMarketplaceLink?: Resolver<ResolversTypes['SkuMarketplaceLinkQuery'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserQuery'], ParentType, ContextType>;
  workspace?: Resolver<ResolversTypes['WorkspaceQuery'], ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoleQuery'] = ResolversParentTypes['RoleQuery']> = {
  all?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  search?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<RoleQuerySearchArgs, 'searchTerm'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingInfo'] = ResolversParentTypes['ShippingInfo']> = {
  height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  length?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  ounces?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingInfoCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingInfoCustomResponse'] = ResolversParentTypes['ShippingInfoCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['ShippingInfo']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingInfoMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingInfoMutation'] = ResolversParentTypes['ShippingInfoMutation']> = {
  create?: Resolver<ResolversTypes['ShippingInfoCustomResponse'], ParentType, ContextType, RequireFields<ShippingInfoMutationCreateArgs, 'createShippingInfoInput' | 'skuId'>>;
  delete?: Resolver<ResolversTypes['ShippingInfoCustomResponse'], ParentType, ContextType, RequireFields<ShippingInfoMutationDeleteArgs, 'skuId'>>;
  update?: Resolver<ResolversTypes['ShippingInfoCustomResponse'], ParentType, ContextType, RequireFields<ShippingInfoMutationUpdateArgs, 'skuId' | 'updateShippingInfoInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingInfoQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingInfoQuery'] = ResolversParentTypes['ShippingInfoQuery']> = {
  all?: Resolver<Array<ResolversTypes['ShippingInfo']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['ShippingInfo']>, ParentType, ContextType, RequireFields<ShippingInfoQueryGetArgs, 'id'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sku'] = ResolversParentTypes['Sku']> = {
  allInventoryItems?: Resolver<Maybe<Array<ResolversTypes['InventoryItem']>>, ParentType, ContextType>;
  allInventoryItemsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['Condition']>, ParentType, ContextType>;
  conditionDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  costPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  deliveryMethods?: Resolver<Maybe<Array<ResolversTypes['DeliveryMethod']>>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  inventoryItemsAvailable?: Resolver<Maybe<Array<ResolversTypes['InventoryItem']>>, ParentType, ContextType>;
  inventoryItemsAvailableCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  inventoryItemsFulfilled?: Resolver<Maybe<Array<ResolversTypes['InventoryItem']>>, ParentType, ContextType>;
  inventoryItemsFulfilledCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  inventoryItemsPicked?: Resolver<Maybe<Array<ResolversTypes['InventoryItem']>>, ParentType, ContextType>;
  inventoryItemsPickedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  inventoryItemsSold?: Resolver<Maybe<Array<ResolversTypes['InventoryItem']>>, ParentType, ContextType>;
  inventoryItemsSoldCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  inventoryLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lot?: Resolver<Maybe<ResolversTypes['Lot']>, ParentType, ContextType>;
  purchaseDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retailPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shippingInfo?: Resolver<Maybe<ResolversTypes['ShippingInfo']>, ParentType, ContextType>;
  skuCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skuMarketplaceLinks?: Resolver<Maybe<Array<ResolversTypes['InventoryMarketplaceLink']>>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkuCustomResponse'] = ResolversParentTypes['SkuCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuMarketplaceLinkMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkuMarketplaceLinkMutation'] = ResolversParentTypes['SkuMarketplaceLinkMutation']> = {
  create?: Resolver<ResolversTypes['InventoryMarketplaceLinkCustomResponse'], ParentType, ContextType, RequireFields<SkuMarketplaceLinkMutationCreateArgs, 'marketplaceId' | 'skuId'>>;
  delete?: Resolver<ResolversTypes['InventoryMarketplaceLinkCustomResponse'], ParentType, ContextType, RequireFields<SkuMarketplaceLinkMutationDeleteArgs, 'marketplaceId' | 'skuId'>>;
  update?: Resolver<ResolversTypes['InventoryMarketplaceLinkCustomResponse'], ParentType, ContextType, RequireFields<SkuMarketplaceLinkMutationUpdateArgs, 'isListed' | 'marketplaceId' | 'skuId'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuMarketplaceLinkQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkuMarketplaceLinkQuery'] = ResolversParentTypes['SkuMarketplaceLinkQuery']> = {
  all?: Resolver<Array<ResolversTypes['InventoryMarketplaceLink']>, ParentType, ContextType, RequireFields<SkuMarketplaceLinkQueryAllArgs, 'skuId'>>;
  get?: Resolver<Maybe<ResolversTypes['InventoryMarketplaceLink']>, ParentType, ContextType, RequireFields<SkuMarketplaceLinkQueryGetArgs, 'marketplaceId' | 'skuId'>>;
  getIsListed?: Resolver<Array<ResolversTypes['InventoryMarketplaceLink']>, ParentType, ContextType, RequireFields<SkuMarketplaceLinkQueryGetIsListedArgs, 'skuId'>>;
  getNotListed?: Resolver<Array<ResolversTypes['InventoryMarketplaceLink']>, ParentType, ContextType, RequireFields<SkuMarketplaceLinkQueryGetNotListedArgs, 'skuId'>>;
  search?: Resolver<Array<ResolversTypes['InventoryMarketplaceLink']>, ParentType, ContextType, RequireFields<SkuMarketplaceLinkQuerySearchArgs, 'searchTerm' | 'skuId'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkuMutation'] = ResolversParentTypes['SkuMutation']> = {
  create?: Resolver<ResolversTypes['SkuCustomResponse'], ParentType, ContextType, RequireFields<SkuMutationCreateArgs, 'createSkuInput'>>;
  delete?: Resolver<ResolversTypes['SkuCustomResponse'], ParentType, ContextType, RequireFields<SkuMutationDeleteArgs, 'id'>>;
  update?: Resolver<ResolversTypes['SkuCustomResponse'], ParentType, ContextType, RequireFields<SkuMutationUpdateArgs, 'id' | 'updateSkuInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkuQuery'] = ResolversParentTypes['SkuQuery']> = {
  all?: Resolver<Array<ResolversTypes['Sku']>, ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType, RequireFields<SkuQueryGetArgs, 'id'>>;
  search?: Resolver<Array<ResolversTypes['Sku']>, ParentType, ContextType, RequireFields<SkuQuerySearchArgs, 'searchTerm'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  workspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInvitation'] = ResolversParentTypes['UserInvitation']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  inviteEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workspaceId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInvitationCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInvitationCustomResponse'] = ResolversParentTypes['UserInvitationCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['UserInvitation']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMutation'] = ResolversParentTypes['UserMutation']> = {
  inviteUserToWorkspace?: Resolver<ResolversTypes['UserInvitationCustomResponse'], ParentType, ContextType, RequireFields<UserMutationInviteUserToWorkspaceArgs, 'userEmail'>>;
  removeUserFromWorkspace?: Resolver<ResolversTypes['UserInvitationCustomResponse'], ParentType, ContextType, RequireFields<UserMutationRemoveUserFromWorkspaceArgs, 'userEmail'>>;
  revokeUserInviteToWorkspace?: Resolver<ResolversTypes['UserInvitationCustomResponse'], ParentType, ContextType, RequireFields<UserMutationRevokeUserInviteToWorkspaceArgs, 'userEmail'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserQuery'] = ResolversParentTypes['UserQuery']> = {
  all?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<UserQueryAllArgs, 'orderBy' | 'orderField'>>;
  current?: Resolver<ResolversTypes['CurrentUser'], ParentType, ContextType>;
  get?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<UserQueryGetArgs, 'id'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkspaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workspace'] = ResolversParentTypes['Workspace']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkspaceCustomResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkspaceCustomResponse'] = ResolversParentTypes['WorkspaceCustomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkspaceMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkspaceMutation'] = ResolversParentTypes['WorkspaceMutation']> = {
  connectToInvited?: Resolver<ResolversTypes['WorkspaceCustomResponse'], ParentType, ContextType, RequireFields<WorkspaceMutationConnectToInvitedArgs, 'workspaceId'>>;
  create?: Resolver<ResolversTypes['WorkspaceCustomResponse'], ParentType, ContextType, RequireFields<WorkspaceMutationCreateArgs, 'name'>>;
  deselect?: Resolver<ResolversTypes['WorkspaceCustomResponse'], ParentType, ContextType>;
  disconnect?: Resolver<ResolversTypes['WorkspaceCustomResponse'], ParentType, ContextType, RequireFields<WorkspaceMutationDisconnectArgs, 'workspaceId'>>;
  reconnect?: Resolver<ResolversTypes['WorkspaceCustomResponse'], ParentType, ContextType, RequireFields<WorkspaceMutationReconnectArgs, 'workspaceId'>>;
  select?: Resolver<ResolversTypes['WorkspaceCustomResponse'], ParentType, ContextType, RequireFields<WorkspaceMutationSelectArgs, 'workspaceId'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkspaceQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkspaceQuery'] = ResolversParentTypes['WorkspaceQuery']> = {
  all?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<WorkspaceQueryAllArgs, 'order'>>;
  get?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<WorkspaceQueryGetArgs, 'workspaceId'>>;
  search?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<WorkspaceQuerySearchArgs, 'order' | 'searchTerm'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>;
  CategoryCustomResponse?: CategoryCustomResponseResolvers<ContextType>;
  CategoryMutation?: CategoryMutationResolvers<ContextType>;
  CategoryQuery?: CategoryQueryResolvers<ContextType>;
  Condition?: ConditionResolvers<ContextType>;
  ConditionQuery?: ConditionQueryResolvers<ContextType>;
  CurrentUser?: CurrentUserResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerCustomResponse?: CustomerCustomResponseResolvers<ContextType>;
  CustomerMutation?: CustomerMutationResolvers<ContextType>;
  CustomerQuery?: CustomerQueryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeliveryInfo?: DeliveryInfoResolvers<ContextType>;
  DeliveryInfoCustomResponse?: DeliveryInfoCustomResponseResolvers<ContextType>;
  DeliveryInfoMutation?: DeliveryInfoMutationResolvers<ContextType>;
  DeliveryInfoQuery?: DeliveryInfoQueryResolvers<ContextType>;
  DeliveryMethod?: DeliveryMethodResolvers<ContextType>;
  DeliveryMethodQuery?: DeliveryMethodQueryResolvers<ContextType>;
  InventoryItem?: InventoryItemResolvers<ContextType>;
  InventoryItemCustomResponse?: InventoryItemCustomResponseResolvers<ContextType>;
  InventoryItemMutation?: InventoryItemMutationResolvers<ContextType>;
  InventoryItemQuery?: InventoryItemQueryResolvers<ContextType>;
  InventoryItemStatus?: InventoryItemStatusResolvers<ContextType>;
  InventoryItemStatusQuery?: InventoryItemStatusQueryResolvers<ContextType>;
  InventoryMarketplaceLink?: InventoryMarketplaceLinkResolvers<ContextType>;
  InventoryMarketplaceLinkCustomResponse?: InventoryMarketplaceLinkCustomResponseResolvers<ContextType>;
  InvitedWorkspaceQuery?: InvitedWorkspaceQueryResolvers<ContextType>;
  Lot?: LotResolvers<ContextType>;
  LotCustomResponse?: LotCustomResponseResolvers<ContextType>;
  LotMutation?: LotMutationResolvers<ContextType>;
  LotQuery?: LotQueryResolvers<ContextType>;
  Marketplace?: MarketplaceResolvers<ContextType>;
  MarketplaceCustomResponse?: MarketplaceCustomResponseResolvers<ContextType>;
  MarketplaceMutation?: MarketplaceMutationResolvers<ContextType>;
  MarketplaceQuery?: MarketplaceQueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderCustomResponse?: OrderCustomResponseResolvers<ContextType>;
  OrderMutation?: OrderMutationResolvers<ContextType>;
  OrderQuery?: OrderQueryResolvers<ContextType>;
  PickUpInfo?: PickUpInfoResolvers<ContextType>;
  QuantityBySku?: QuantityBySkuResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RoleQuery?: RoleQueryResolvers<ContextType>;
  ShippingInfo?: ShippingInfoResolvers<ContextType>;
  ShippingInfoCustomResponse?: ShippingInfoCustomResponseResolvers<ContextType>;
  ShippingInfoMutation?: ShippingInfoMutationResolvers<ContextType>;
  ShippingInfoQuery?: ShippingInfoQueryResolvers<ContextType>;
  Sku?: SkuResolvers<ContextType>;
  SkuCustomResponse?: SkuCustomResponseResolvers<ContextType>;
  SkuMarketplaceLinkMutation?: SkuMarketplaceLinkMutationResolvers<ContextType>;
  SkuMarketplaceLinkQuery?: SkuMarketplaceLinkQueryResolvers<ContextType>;
  SkuMutation?: SkuMutationResolvers<ContextType>;
  SkuQuery?: SkuQueryResolvers<ContextType>;
  Time?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserInvitation?: UserInvitationResolvers<ContextType>;
  UserInvitationCustomResponse?: UserInvitationCustomResponseResolvers<ContextType>;
  UserMutation?: UserMutationResolvers<ContextType>;
  UserQuery?: UserQueryResolvers<ContextType>;
  Workspace?: WorkspaceResolvers<ContextType>;
  WorkspaceCustomResponse?: WorkspaceCustomResponseResolvers<ContextType>;
  WorkspaceMutation?: WorkspaceMutationResolvers<ContextType>;
  WorkspaceQuery?: WorkspaceQueryResolvers<ContextType>;
};

