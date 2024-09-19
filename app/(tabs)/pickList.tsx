import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button";
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";
import React, { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField } from "@/components/ui/input";
import { ScrollView } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

export default function PickList() {
  const toast = useToast();
  const [toastId, setToastId] = React.useState("0");

  const handleRestockToast = () => {
    toast.closeAll();
    setTimeout(() => {
      showNewRestockToast();
    }, 100);
  };

  const handlePickedToast = () => {
    toast.closeAll();
    setTimeout(() => {
      showNewPickedToast();
    }, 100);
  };

  const showNewRestockToast = () => {
    const newId = Math.random().toString();
    setToastId(newId);
    toast.show({
      id: newId,
      placement: "bottom",
      duration: 3000,
      containerStyle: {
        bottom: 70,
      },
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            action="info"
            variant="outline"
            nativeID={uniqueToastId}
            className="p-4 gap-6 border-slate-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between"
          >
            <ToastTitle className="font-semibold text-slate-500">
              Item Restocked Successfully
            </ToastTitle>
          </Toast>
        );
      },
    });
  };

  const showNewPickedToast = () => {
    const newId = Math.random().toString();
    setToastId(newId);
    toast.show({
      id: newId,
      placement: "bottom",
      duration: 3000,
      containerStyle: {
        bottom: 70,
      },
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            action="info"
            variant="outline"
            nativeID={uniqueToastId}
            className="p-4 gap-6 border-slate-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between"
          >
            <ToastTitle className="font-semibold text-slate-500">
              Item Marked as Picked
            </ToastTitle>
          </Toast>
        );
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        toast.closeAll();
      };
    }, []),
  );

  const items = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

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
              <Card className="px-2 py-1" key={i}>
                <Heading>Some Inventory Item</Heading>
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
                <View className="flex flex-row gap-1 mt-2">
                  <Button className="flex-1" onPress={handleRestockToast}>
                    <ButtonText>Restock Item</ButtonText>
                  </Button>
                  <Button className="flex-1" onPress={handlePickedToast}>
                    <ButtonText>Picked</ButtonText>
                  </Button>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
