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
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useSegments } from "expo-router";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader } from "@/components/ui/modal";
import { Pressable, ScrollView } from "react-native";
import { ChevronDownIcon, CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import DateTimePicker from "@react-native-community/datetimepicker"



const CreateOrder = gql`
mutation CreateOrder($orderNumber: String!, $sellerShippingCost: Float!, $buyerShippingCost: Float!, $deliveryMethodId: UUID!, $inventoryItemId: UUID!, $soldPrice: Float!, $soldDate: Date!) {
  order {
    createOrder(
      createOrderInput: {
        sellerShippingCost: $sellerShippingCost,
        buyerShippingCost: $buyerShippingCost, 
        deliveryMethodId: $deliveryMethodId,
        orderNumber: $orderNumber,
        soldInventoryItems: {
          inventoryItemId: $inventoryItemId, 
          soldPrice: $soldPrice, 
          soldDate: $soldDate
        }
      }
    ) {
      message
      success
      type
    }
  }
}
`

const GetOrders = gql`
  query GetOrders {
    order {
      all {
        id
        orderNumber
      }
    }
  }
`

const GetDeliveryMethodIds = gql`
  query GetDeliveryMethodIds {
    deliveryMethod {
      all {
        id
        name
      }
    }
  }
`

const GetInventoryItems = gql`
query GetInventoryItems($id: UUID!) {
  sku {
    get(id: $id) {
      inventoryItemsAvailable {
        id
      }
    }
  }
}
`

const AddInventoryItemToOrder = gql`
mutation AddInventoryItemToOrder($id: UUID!, $inventoryItemStatusId: UUID!, $orderId: UUID!, $soldDate: Date!, $soldPrice: Float!) {
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


type Order = {
  sellerShippingCost: number
  buyerShippingCost: number
  inventoryItemId: string
  orderNumber: string,
  deliveryMethodId: string
  soldPrice: number
  soldDate: string
}

export default function InventoryItemInfo() {
  const item = useLocalSearchParams();


  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState<Order>()
  const [createOrder, { called: calledCreateOrder, loading: loadingCreateOrder, error: errorCreateOrder, data: dataCreateOrder }] = useMutation(CreateOrder)
  const [addInventoryItemToOrder, { called: calledAddInventoryItemToOrder, loading: loadingAddInventoryItemToOrder, error: errorAddInventoryItemToOrder, data: dataAddInventoryItemToOrder }] = useMutation(AddInventoryItemToOrder)
  const { called: calledGetOrders, loading: loadingGetOrders, error: errorGetOrders, data: dataGetOrders, refetch: refetchGetOrders } = useQuery(GetOrders)
  const { called: calledGetDeliveryMethodIds, loading: loadingGetDeliveryMethodIds, error: errorGetDeliveryMethodIds, data: dataGetDeliveryMethodIds, refetch: refetchGetDeliveryMethodIds } = useQuery(GetDeliveryMethodIds)
  const { called: calledGetInventoryItemStatusIds, loading: loadingGetInventoryItemStatusIds, error: errorGetInventoryItemStatusIds, data: dataGetInventoryItemStatusIds, refetch: refetchGetInventoryStatusIds } = useQuery(GetInventoryItemStatusIds)
  const { called: calledGetInventoryItems, loading: loadingGetInventoryItems, error: errorGetInventoryItems, data: dataGetInventoryItems, refetch: refetchGetInventoryItems } = useQuery(GetInventoryItems, {
    variables: {
      id: item?.id
    }
  })



  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    setOrderField("soldDate", new Date(date).toISOString().split('T')[0])

  }, [date])

  console.log(item)

  useEffect(() => {
    console.log(orderInfo)
  }, [orderInfo])

  const setOrderField = (field: keyof Order, value: string | number | Date | never[] | null) => {
    setOrderInfo(prevOrder => ({
      ...prevOrder!,
      [field]: value,
    }))
  }




  return (
    <Card className="m-4 p-3 bg-white">
      <Heading>{item?.title}</Heading>
      <Text className="text-lg">Description</Text>
      <Divider />

      <Text>{item?.description}</Text>

      {/* TODO: convert to map of key value */}
      <View className="flex flex-row flex-wrap mb-2">
        <View className="w-1/3 p-2">
          <Text className="text-sm">Item SKU</Text>
          <Divider />
          <Text>{item?.skuCode}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Inv. Location</Text>
          <Divider />
          <Text>{item?.inventoryLocation}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Quantity on Hand</Text>
          <Divider />
          <Text>{item?.quantity}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Retail Price</Text>
          <Divider />
          <Text>{item?.retailPrice}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">List Price</Text>
          <Divider />
          <Text>{item?.listPrice}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Cost</Text>
          <Divider />
          <Text>{item?.costPrice}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Condition</Text>
          <Divider />
          <Text>{item?.condition}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Source</Text>
          <Divider />
          <Text>{item?.source}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Purchase Date</Text>
          <Divider />
          <Text>{item?.purchaseDate}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Lot Name</Text>
          <Divider />
          <Text>{item?.lotName}</Text>
        </View>
        <View className="w-1/3 p-2">
          <Text className="text-sm">Category</Text>
          <Divider />
          <Text className="text-xs">{item?.category}</Text>
        </View>
      </View>
      <View className="flex items-center">
        <Button className="mt-8 w-1/2" onPress={() => setShowOrderModal(true)}>
          <ButtonText>Add to Order</ButtonText>
        </Button>
      </View>


      <Modal
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false)
        }}
        className="">

        <ModalBackdrop />
        <ModalContent className="m-0 pb-0 relative">
          <Pressable onPress={() => setShowOrderModal(false)} className="absolute right-0 m-3">
            <Icon as={CloseIcon} className="text-gray-400" />
          </Pressable>
          <ModalHeader className="w-full flex flex-row justify-center items-center">
            <Text className="font-semibold text-xl">Add to Order</Text>
          </ModalHeader>
          <ModalBody>
            <View className="flex flex-row gap-4 mb-4">
              <View className="my-2 flex-1">
                <Text>Sold Price</Text>
                <Input>
                  <InputField onChangeText={(text) => setOrderField("soldPrice", text)} />
                </Input>
              </View>
              <View className="my-2 flex-1">
                <Text>Sold Date</Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  is24Hour={true}
                  onChange={onChange}
                />
              </View>
            </View>
            <Text className="text-xl mb-2 text-center">Orders</Text>
            <View className="flex gap-2">
              {dataGetOrders?.order.all.map((order) => (
                <Button key={order.id} className="flex flex-row gap-2 border" onPress={() => {
                  const shipped = dataGetInventoryItemStatusIds?.inventoryItemStatus.all.find(item => item.name === "SOLD");
                  console.log(shipped?.id)
                  addInventoryItemToOrder({
                    variables: {
                      orderId: order.id,
                      inventoryItemStatusId: shipped?.id,
                      id: dataGetInventoryItems?.sku.get.inventoryItemsAvailable[0].id,
                      soldPrice: parseFloat(orderInfo?.soldPrice as unknown as string),
                      soldDate: orderInfo?.soldDate,
                    }
                  })
                  setShowOrderModal(false)
                }}>
                  <ButtonText>{order.orderNumber ? order.orderNumber : "null"}</ButtonText>
                </Button>
              ))}
            </View>
            <Divider className="my-4" />
            <Button onPress={async () => {
              setShowCreateOrderModal(true)
            }} className="mt-4">
              <ButtonText>Create New Order</ButtonText>
            </Button>

          </ModalBody>

        </ModalContent>
      </Modal>


      <Modal
        isOpen={showCreateOrderModal}
        onClose={() => {
          setShowCreateOrderModal(false)
        }}
        className="">

        <ModalBackdrop />
        <ModalContent className="m-0 pb-0 relative">
          <Pressable onPress={() => setShowCreateOrderModal(false)} className="absolute right-0 m-3">
            <Icon as={CloseIcon} className="text-gray-400" />
          </Pressable>
          <ModalHeader className="w-full flex flex-row justify-center items-center">
            <Text className="font-semibold text-xl">Create New Order</Text>
          </ModalHeader>
          <ModalBody>
            <Text className="font-semibold">Order Number</Text>
            <Input>
              <InputField onChangeText={(text) => setOrderField("orderNumber", text)} />
            </Input>
            <Text className="font-semibold">Shipping Cost</Text>
            <View className="flex flex-row gap-4">
              <View className="my-2 flex-1">
                <Text>Seller</Text>
                <Input>
                  <InputField onChangeText={(text) => setOrderField("sellerShippingCost", text)} />
                </Input>
              </View>
              <View className="my-2 flex-1">
                <Text>Buyer</Text>
                <Input>
                  <InputField onChangeText={(text) => setOrderField("buyerShippingCost", text)} />
                </Input>
              </View>
            </View>
            <View className="flex flex-row gap-4">
              <View className="my-2 flex-1">
                <Text>Sold Price</Text>
                <Input>
                  <InputField onChangeText={(text) => setOrderField("soldPrice", text)} />
                </Input>
              </View>
              <View className="my-2 flex-1">
                <Text>Sold Date</Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  is24Hour={true}
                  onChange={onChange}
                />
              </View>
            </View>
            <Text>Delivery Method</Text>
            <Select onValueChange={(value) => setOrderField("deliveryMethodId", value)}>
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select option" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Shipping" value={dataGetDeliveryMethodIds?.deliveryMethod.all[0].id} />
                  <SelectItem label="Pickup" value={dataGetDeliveryMethodIds?.deliveryMethod.all[1].id} />
                  <SelectItem label="Delivery" value={dataGetDeliveryMethodIds?.deliveryMethod.all[2].id} className="mb-8" />
                </SelectContent>
              </SelectPortal>
            </Select>
            <Button onPress={async () => {
              await createOrder({
                variables: {
                  sellerShippingCost: parseFloat(orderInfo?.sellerShippingCost as unknown as string),
                  buyerShippingCost: parseFloat(orderInfo?.buyerShippingCost as unknown as string),
                  inventoryItemId: dataGetInventoryItems?.sku.get.inventoryItemsAvailable[0].id,
                  orderNumber: orderInfo?.orderNumber,
                  deliveryMethodId: orderInfo?.deliveryMethodId,
                  soldPrice: parseFloat(orderInfo?.soldPrice as unknown as string),
                  soldDate: orderInfo?.soldDate,
                }
              })
              await refetchGetOrders()
              setShowCreateOrderModal(false)
              setShowOrderModal(false)
            }} className="mt-4">
              <ButtonText>Create</ButtonText>
            </Button>

          </ModalBody>

        </ModalContent>
      </Modal>
    </Card >
  );
}
