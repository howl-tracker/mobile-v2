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
              <Link href="/orderInfo" key={i} asChild>
                <Pressable>
                  <Card className="px-2 py-1">
                    <View className="flex flex-row justify-between">
                      <Heading>#SFG983</Heading>
                      <Link href="/editOrderInfo" asChild className="p-1">
                        <Pressable>
                          <FontAwesome
                            name="edit"
                            size={20}
                            color={"darkslategray"}
                          />
                        </Pressable>
                      </Link>
                    </View>
                    <View className="flex flex-row mt-2 gap-3">
                      <View className="flex">
                        <Text className="text-sm">Delivery Method</Text>
                        <Divider />
                        <Text className="font-semibold text-sm">Ship</Text>
                      </View>
                      <View className="flex">
                        <Text className="text-sm">Order Date</Text>
                        <Divider />
                        <Text className="font-semibold text-sm">9/4/2024</Text>
                      </View>
                      <View className="flex">
                        <Text className="text-sm"># of Items</Text>
                        <Divider />
                        <Text className="font-semibold text-sm">2</Text>
                      </View>
                      <View className="flex">
                        <Text className="text-sm">All Items Picked?</Text>
                        <Divider />
                        <Text className="font-semibold text-sm">Yes</Text>
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
