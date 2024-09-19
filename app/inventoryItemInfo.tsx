import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

export default function InventoryItemInfo({ id }: { id: string }) {
  let platforms = ["Facebook", "Ebay", "KSL", "PoshMark", "Ebay"];

  return (
    <Card className="m-4 p-3 bg-white">
      <Heading>Some Inventory Item</Heading>
      <Text className="text-lg">Description</Text>
      <Divider />

      <Text>
        This ones a game changer. Introducing the first at home coffee maker to
        make truly cold iced coffee, cold as the coffee shop. Enjoy full
        flavored, perfectly chilled iced beverages in just 3 minutes or less.
      </Text>

      {/* TODO: convert to map of key value */}
      <View className="flex flex-row flex-wrap mb-2">
        <View className="w-1/3 p-2">
          <Text className="text-sm">Item SKU</Text>
          <Divider />
          <Text>A13</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Inv. Location</Text>
          <Divider />
          <Text>G2A3</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Quantity on Hand</Text>
          <Divider />
          <Text>3</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Retail Price</Text>
          <Divider />
          <Text>$44.95</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">List Price</Text>
          <Divider />
          <Text>$35.97</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Cost</Text>
          <Divider />
          <Text>$22.17</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Condition</Text>
          <Divider />
          <Text>New</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Source</Text>
          <Divider />
          <Text>AMZ Pallet</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Purchase Date</Text>
          <Divider />
          <Text>8/23/2024</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Lot ID</Text>
          <Divider />
          <Text>N/A</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Category</Text>
          <Divider />
          <Text className="text-xs">Mobile Electronics</Text>
        </View>
      </View>
      <View>
        <Text className="text-sm font-semibold">
          Check each box as it is listed on the platform
        </Text>
        <View className="flex flex-row gap-4 justify-center flex-wrap">
          {platforms.map((platform, key) => {
            return (
              <Checkbox key={key}>
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
                <CheckboxLabel>{platform}</CheckboxLabel>
              </Checkbox>
            );
          })}
        </View>
      </View>
      <View className="flex items-center">
        <Button className="mt-8 w-1/2">
          <ButtonText>Add to Order</ButtonText>
        </Button>
      </View>
    </Card>
  );
}
