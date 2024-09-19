/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/addToInventory` | `/(tabs)/fulfillment` | `/(tabs)/inventory` | `/(tabs)/orders` | `/(tabs)/pickList` | `/(tabs)/profile` | `/_sitemap` | `/addToInventory` | `/editInventoryItemInfo` | `/editOrderInfo` | `/fulfillment` | `/inventory` | `/inventoryItemInfo` | `/modal` | `/orderInfo` | `/orders` | `/pickList` | `/profile` | `/workspaceSelect`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
