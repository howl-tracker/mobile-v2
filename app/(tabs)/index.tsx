import EditScreenInfo from "@/components/EditScreenInfo";
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function TabOneScreen() {
  return (
    <View className="p-4">
      <Input>
        <InputField className="bg-white" placeholder="Search Inventory..." />
      </Input>
    </View>
  );
}
