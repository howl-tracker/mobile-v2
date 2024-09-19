import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { View } from "@/components/ui/view";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";

export default function AddToInventory() {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);

  const toast = useToast();

  const handleToast = () => {
    toast.closeAll();
    setTimeout(() => {
      showNewToast();
    }, 100);
  };

  const showNewToast = () => {
    const newId = Math.random().toString();
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
              Item Added Successfully
            </ToastTitle>
          </Toast>
        );
      },
    });
  };

  let platforms = ["Facebook", "Ebay", "KSL", "PoshMark", "Ebay"];

  return (
    <View className="flex gap-2 p-2">
      <View>
        <Text>Title</Text>
        <Input variant="outline" size="md" isDisabled={false}>
          <InputField
            className="bg-white"
            placeholder="Enter title here..."
            returnKeyType="done"
          />
        </Input>
      </View>
      <View>
        <Text>Description</Text>
        <Textarea className="h-20">
          <TextareaInput
            className="bg-white"
            placeholder="Your text goes here..."
          />
        </Textarea>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Retail Price</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              placeholder="Enter retail price here..."
            />
          </Input>
        </View>
        <View className="flex-1">
          <Text>List Price</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              placeholder="Enter list price here..."
            />
          </Input>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Cost</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField className="bg-white" placeholder="Enter cost here..." />
          </Input>
        </View>
        <View className="flex-1">
          <Text>Condition</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              placeholder="Enter condition here..."
            />
          </Input>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Cost</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField className="bg-white" placeholder="Enter cost here..." />
          </Input>
        </View>
        <View className="flex-1">
          <Text>Condition</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              placeholder="Enter condition here..."
            />
          </Input>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Cost</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField className="bg-white" placeholder="Enter cost here..." />
          </Input>
        </View>
        <View className="flex-1">
          <Text>Condition</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              placeholder="Enter condition here..."
            />
          </Input>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Cost</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField className="bg-white" placeholder="Enter cost here..." />
          </Input>
        </View>
        <View className="flex-1">
          <Text>Condition</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              placeholder="Enter condition here..."
            />
          </Input>
        </View>
      </View>
      <View className="flex items-center">
        <Button className="w-1/2" onPress={() => setShowActionsheet(true)}>
          <ButtonText>Edit Shipping Details</ButtonText>
        </Button>
      </View>

      <View className="flex items-center mt-2">
        <Text className="font-semibold mb-4">
          Where should the item be listed?
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
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="gap-2">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Text className="font-bold text-2xl">TO BE REDESIGNED</Text>
          <View>
            <Text>Shipping Rate</Text>
            <Input>
              <InputField />
            </Input>
          </View>
          <Text className="font-semibold">Dimensions (Inches)</Text>
          <View className="flex flex-row gap-4">
            <View className="flex-1">
              <Text>Length</Text>
              <Input>
                <InputField />
              </Input>
            </View>
            <View className="flex-1">
              <Text>Width</Text>
              <Input>
                <InputField />
              </Input>
            </View>
            <View className="flex-1">
              <Text>Height</Text>
              <Input>
                <InputField />
              </Input>
            </View>
          </View>
          <Text className="font-semibold">Weight</Text>
          <View className="flex flex-row gap-4">
            <View className="flex-1">
              <Text>Pounds</Text>
              <Input>
                <InputField />
              </Input>
            </View>
            <View className="flex-1">
              <Text>Ounces</Text>
              <Input>
                <InputField />
              </Input>
            </View>
          </View>
          <Button className="mb-4" onPress={handleClose}>
            <ButtonText>Save Shipping</ButtonText>
          </Button>
        </ActionsheetContent>
      </Actionsheet>
      <View className="flex items-center">
        <Button className="w-1/2" onPress={handleToast}>
          <ButtonText>Add Item</ButtonText>
        </Button>
      </View>
    </View>
  );
}
