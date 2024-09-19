import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { ScrollView } from "react-native";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const items = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

export default function Profile() {
  return (
    <View className="flex gap-2 p-4">
      <View className="flex flex-row gap-2 items-center">
        <Input className="flex-1 bg-white">
          <InputField placeholder="Search here..." />
        </Input>
        <Pressable>
          <Text>Sort By...</Text>
        </Pressable>
      </View>
      <ScrollView>
        <View className="mt-2 gap-3">
          {items.map((item, i) => {
            return (
              <Link href="/inventoryItemInfo" key={i} asChild>
                <Pressable>
                  <Card className="px-2 py-1">
                    <View className="flex flex-row justify-between">
                      <Heading>Some Inventory Item</Heading>
                      <Link
                        href="/editInventoryItemInfo"
                        asChild
                        className="p-1"
                      >
                        <Pressable>
                          <FontAwesome
                            name="edit"
                            size={20}
                            color={"darkslategray"}
                          />
                        </Pressable>
                      </Link>
                    </View>
                    <View className="flex flex-row mt-2 gap-8">
                      <View className="flex">
                        <Text>Inventory Location</Text>
                        <Divider />
                        <Text className="font-semibold">G2B2</Text>
                      </View>
                      <View className="flex">
                        <Text>Item SKU</Text>
                        <Divider />
                        <Text className="font-semibold">A14</Text>
                      </View>
                      <View className="flex">
                        <Text>Quantity</Text>
                        <Divider />
                        <Text className="font-semibold">3</Text>
                      </View>
                    </View>
                  </Card>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
