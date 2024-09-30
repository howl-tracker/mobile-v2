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
import { gql, useMutation, useQuery } from "@apollo/client";


const GetItemsPicked = gql`
query GetItemsPicked {
  inventoryItem {
    getAllPicked {
      id
      sku {
        title
        skuCode
        id
      }
      soldDate
      soldPrice
    }
  }
}
`

const GetInventoryItemStatusIds = gql`
query GetInventoryItemStatusIds {
  inventoryItemStatus {
    all {
      id
      name
    }
  }
}
`

const UpdateItem = gql`
mutation UpdateItem($id: UUID!, $inventoryItemStatusId: UUID!) {
  inventoryItem {
    changeStatus(id: $id, inventoryItemStatusId: $inventoryItemStatusId) {
      message
      success
      type
    }
  }
}
`


export default function PickList() {
  const { called: calledGetItemsPicked, loading: loadingGetItemsPicked, error: errorGetItemsPicked, data: dataGetItemsPicked, refetch: refetchGetItemsPicked } = useQuery(GetItemsPicked)
  const { called: calledGetInventoryItemStatusIds, loading: loadingGetInventoryItemStatusIds, error: errorGetInventoryItemStatusIds, data: dataGetInventoryItemStatusIds, refetch: refetchGetInventoryStatusIds } = useQuery(GetInventoryItemStatusIds)

  const [updateItem, { called: calledUpdateItem, loading: loadingUpdateItem, error: errorUpdateItem, data: dataUpdateItem }] = useMutation(UpdateItem)


  const toast = useToast();
  const [toastId, setToastId] = React.useState("0");

  const handleUnpickToast = () => {
    toast.closeAll();
    setTimeout(() => {
      showNewUnpickToast();
    }, 100);
  };

  const handleFulfillToast = () => {
    toast.closeAll();
    setTimeout(() => {
      showNewFulfillToast();
    }, 100);
  };

  const showNewUnpickToast = () => {
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
              Item Unpicked Successfully
            </ToastTitle>
          </Toast>
        );
      },
    });
  };

  const showNewFulfillToast = () => {
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
            <ToastTitle className="font-semibold text-slate-500">Item Fulfilled Successfully</ToastTitle>
          </Toast>
        );
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      refetchGetItemsPicked();
      return () => {
        toast.closeAll();
      };
    }, []),
  );



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
          {dataGetItemsPicked?.inventoryItem.getAllPicked.map((item, i) => {
            return (
              <Card className="px-2 py-1" key={i}>
                <Heading>{item.sku.title}</Heading>
                <View className="flex flex-row mt-2 gap-8">
                  <View className="flex">
                    <Text>Item SKU</Text>
                    <Divider />
                    <Text className="font-semibold">{item.sku.skuCode}</Text>
                  </View>
                  <View className="flex">
                    <Text>Sold Date</Text>
                    <Divider />
                    <Text className="font-semibold">{item.soldDate}</Text>
                  </View>
                  <View className="flex">
                    <Text>Sold Price</Text>
                    <Divider />
                    <Text className="font-semibold">{item.soldPrice}</Text>
                  </View>
                </View>
                <View className="flex flex-row gap-1 mt-2">
                  <Button className="flex-1" onPress={() => {
                    updateItem({
                      variables: {
                        id: item.id,
                        inventoryItemStatusId: dataGetInventoryItemStatusIds?.inventoryItemStatus.all.find(item => item.name === "SOLD")?.id
                      },
                      onCompleted: () => {
                        refetchGetItemsPicked();
                        handleUnpickToast()
                      }
                    })
                  }}>
                    <ButtonText>Unpick Item</ButtonText>
                  </Button>
                  <Button className="flex-1" onPress={() => {
                    updateItem({
                      variables: {
                        id: item.id,
                        inventoryItemStatusId: dataGetInventoryItemStatusIds?.inventoryItemStatus.all.find(item => item.name === "FULFILLED")?.id
                      },
                      onCompleted: () => {
                        refetchGetItemsPicked();
                        handleFulfillToast()
                      }
                    })
                  }}>
                    <ButtonText>Fulfill Item</ButtonText>
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
