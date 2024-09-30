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


const GetItemsSold = gql`
query GetItemsSold {
  inventoryItem {
    getAllSold {
      id
      sku {
        title
        inventoryLocation
        skuCode
      }
    }
  }
}
`

const RestockItem = gql`
mutation RestockItem($id: UUID!, $inventoryItemStatusId: UUID!, $orderId: UUID, $soldDate: Date, $soldPrice: Float) {
  inventoryItem {
    update(
      id: $id
      updateInventoryItemInput: {
      inventoryItemStatusId: $inventoryItemStatusId,
      orderId: $orderId,
      soldDate: $soldDate,
      soldPrice: $soldPrice
      }
    ) {
      message
      success
      type
    }
  }
}
`

const PickItem = gql`
mutation PickItem($id: UUID!, $inventoryItemStatusId: UUID!) {
  inventoryItem {
    changeStatus(id: $id, inventoryItemStatusId: $inventoryItemStatusId) {
      message
      success
      type
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


export default function PickList() {
  const { called: calledGetItemsSold, loading: loadingGetItemsSold, error: errorGetItemsSold, data: dataGetItemsSold, refetch: refetchGetItemsSold } = useQuery(GetItemsSold)
  const { called: calledGetInventoryItemStatusIds, loading: loadingGetInventoryItemStatusIds, error: errorGetInventoryItemStatusIds, data: dataGetInventoryItemStatusIds, refetch: refetchGetInventoryStatusIds } = useQuery(GetInventoryItemStatusIds)
  const [restockItem, { called: calledRestockItem, loading: loadingRestockItem, error: errorRestockItem, data: dataRestockItem }] = useMutation(RestockItem)
  const [pickItem, { called: calledPickItem, loading: loadingPickItem, error: errorPickItem, data: dataPickItem }] = useMutation(PickItem)


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
      refetchGetItemsSold();
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
          {dataGetItemsSold?.inventoryItem.getAllSold.map((item, i) => {
            return (
              <Card className="px-2 py-1" key={i}>
                <Heading>{item.sku.title}</Heading>
                <View className="flex flex-row mt-2 gap-8">
                  <View className="flex">
                    <Text>Inventory Location</Text>
                    <Divider />
                    <Text className="font-semibold">{item.sku.inventoryLocation}</Text>
                  </View>
                  <View className="flex">
                    <Text>Item SKU</Text>
                    <Divider />
                    <Text className="font-semibold">{item.sku.skuCode}</Text>
                  </View>
                  {/* <View className="flex">
                    <Text>Quantity</Text>
                    <Divider />
                    <Text className="font-semibold">3</Text>
                  </View> */}
                </View>
                <View className="flex flex-row gap-1 mt-2">
                  <Button className="flex-1" onPress={() => {
                    const restocked = dataGetInventoryItemStatusIds?.inventoryItemStatus.all.find(item => item.name === "ADDED TO INVENTORY");
                    console.log(restocked?.id)
                    console.log(item?.id)
                    restockItem({
                      variables: {
                        id: item.id,
                        inventoryItemStatusId: restocked?.id,
                        orderId: null,
                        soldDate: null,
                        soldPrice: null,
                      },
                      onCompleted: () => {
                        handleRestockToast();
                        refetchGetItemsSold();
                      }
                    })
                  }}>
                    <ButtonText>Restock Item</ButtonText>
                  </Button>
                  <Button className="flex-1" onPress={() => {
                    pickItem({
                      variables: {
                        id: item.id,
                        inventoryItemStatusId: dataGetInventoryItemStatusIds?.inventoryItemStatus.all.find(item => item.name === "PICKED")?.id
                      },
                      onCompleted: () => {
                        refetchGetItemsSold();
                        handlePickedToast()
                      }
                    })
                  }}>
                    <ButtonText>Picked</ButtonText>
                  </Button>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView >
    </View >
  );
}
