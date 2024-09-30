import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { ScrollView } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader } from "@/components/ui/modal";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Minus } from "lucide-react-native";


const GetOrders = gql`
  query GetOrders {
    order {
      all {
        id
        orderNumber
        sellerShippingCost
        buyerShippingCost
        deliveryMethod {
          name
        }
      inventoryItems {
        id
        sku {
          title
        }
      }
      }
    }
  }
`

const DeleteOrder = gql`
  mutation DeleteOrder($id: UUID!) {
    order {
      deleteOrder(id: $id) {
        message
        success
        type
      }
    }
  }
`

export default function Profile() {

  const { called: calledGetOrders, loading: loadingGetOrders, error: errorGetOrders, data: dataGetOrders, refetch: refetchGetOrders } = useQuery(GetOrders)

  const [deleteOrder, { called: calledDeleteOrder, loading: loadingDeleteOrder, error: errorDeleteOrder, data: dataDeleteOrder }] = useMutation(DeleteOrder)

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDeleteOrderId, setCurrentDeleteOrderId] = useState('');


  useFocusEffect(
    useCallback(() => {
      refetchGetOrders();
      return () => {
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
          {dataGetOrders?.order.all.map((item, i) => {
            return (
              <Pressable key={item.id} onPress={() => {
                console.log(item)
                router.push({
                  pathname: '/orderInfo',
                  params: { id: item.id },
                })
              }}>
                <Card className="px-2 py-1">
                  <View className="flex flex-row justify-between">
                    <Heading>{`Order #: ${item.orderNumber}`}</Heading>
                    <Pressable onPress={() => {
                      setShowDeleteModal(true)
                      setCurrentDeleteOrderId(item.id)

                    }}>
                      <Icon as={Minus} />
                    </Pressable>
                  </View>
                  <View className="flex flex-row mt-2 gap-3">
                    <View className="flex">
                      <Text className="text-sm">Delivery Method</Text>
                      <Divider />
                      <Text className="font-semibold text-sm">{item.deliveryMethod.name}</Text>
                    </View>
                    <View className="flex">
                      <Text className="text-sm">Order Date</Text>
                      <Divider />
                      <Text className="font-semibold text-sm">{item.orderDate}</Text>
                    </View>
                    <View className="flex">
                      <Text className="text-sm"># of Items</Text>
                      <Divider />
                      <Text className="font-semibold text-sm">{item.inventoryItems.length}</Text>
                    </View>
                    <View className="flex">
                      <Text className="text-sm">All Items Picked?</Text>
                      <Divider />
                      <Text className="font-semibold text-sm">placeholder</Text>
                    </View>
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
        }}
        className="">

        <ModalBackdrop />
        <ModalContent className="m-0 pb-0 relative">
          <Pressable onPress={() => setShowDeleteModal(false)} className="absolute right-0 m-3">
            <Icon as={CloseIcon} className="text-gray-400" />
          </Pressable>
          <ModalHeader className="w-full flex flex-row justify-center items-center">
            <Text className="font-semibold text-xl">Delete Order?</Text>
          </ModalHeader>
          <ModalBody>
            <Button onPress={() => {
              deleteOrder({
                variables: {
                  id: currentDeleteOrderId
                },
                onCompleted: () => {
                  setShowDeleteModal(false)
                  refetchGetOrders()
                }
              })
            }}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalBody>

        </ModalContent>
      </Modal>

    </View>
  );
}
