import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { ScrollView } from "react-native";
import { Link, useFocusEffect, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { Minus } from "lucide-react-native";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader } from "@/components/ui/modal";
import { Button, ButtonText } from "@/components/ui/button";


const GetInventorySkus = gql`
  query GetInventorySkus {
  sku {
    all {
      title
      skuCode
      description
      id
      inventoryLocation
      quantity
      retailPrice
      listPrice
      costPrice
      condition {
        name
      }
      source
      purchaseDate
      lot {
        name
      }
      category {
        name
      }
    }
  }
}
`

const DeleteSku = gql`
  mutation DeleteSku($id: UUID!) {
  sku {
    delete(id: $id) {
      message
      success
      type
    }
  }
}
`

type itemInfo = {
  title: string,
  skuCode: string,
  description: string,
  id: string,
  inventoryLocation: string,
  quantity: number,
  retailPrice: number,
  listPrice: number,
  costPrice: number,
  condition: string | null,
  source: string,
  purchaseDate: string,
  lotName: string,
  category: string,
}



export default function Profile() {
  const { called: calledGetInventorySkus, loading: loadingGetInventorySkus, error: errorGetInventorySkus, data: dataGetInventorySkus, refetch: refetchGetInventorySkus } = useQuery(GetInventorySkus)

  const [deleteSku, { called: calledDeleteSku, loading: loadingDeleteSku, error: errorDeleteSku, data: dataDeleteSku }] = useMutation(DeleteSku)

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDeleteItemId, setCurrentDeleteItemId] = useState('');

  const router = useRouter();


  useFocusEffect(
    useCallback(() => {
      refetchGetInventorySkus()

      return () => {
      }
    }, [])
  )

  const items = []

  dataGetInventorySkus?.sku.all.forEach((item, i) => {
    const newItem: itemInfo = {
      title: item.title,
      skuCode: item.skuCode,
      description: item.description,
      id: item.id,
      inventoryLocation: item.inventoryLocation,
      quantity: item.quantity,
      retailPrice: item.retailPrice,
      listPrice: item.listPrice,
      costPrice: item.costPrice,
      condition: item.condition ? item.condition.name : null,
      source: item.source,
      purchaseDate: item.purchaseDate,
      lotName: item.lot ? item.lot.name : null,
      category: item.category ? item.category.name : null
    }

    items.push(newItem)

  })


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
          {calledGetInventorySkus && loadingGetInventorySkus && <Text>Loading...</Text>}
          {items.map((item) => {
            return (
              <Pressable key={item.id} onPress={() => {
                console.log(item)
                router.push({
                  pathname: '/inventoryItemInfo',
                  params: item,

                })
              }}>
                <Card className="px-2 py-1">
                  <View className="flex flex-row justify-between">
                    <Heading>{item.title}</Heading>
                    <View className="flex flex-row gap-4">
                      <Pressable onPress={() => {
                        router.push({
                          pathname: '/editInventoryItemInfo',
                          params: item,
                        })
                      }}>
                        <FontAwesome
                          name="edit"
                          size={20}
                          color={"darkslategray"}
                        />
                      </Pressable>
                      <Pressable onPress={() => {
                        setShowDeleteModal(true)
                        setCurrentDeleteItemId(item.id)

                      }}>
                        <Icon as={Minus} />
                      </Pressable>
                    </View>
                  </View>
                  <View className="flex flex-row mt-2 gap-8">
                    <View className="flex">
                      <Text>Inventory Location</Text>
                      <Divider />
                      <Text className="font-semibold">{item.inventoryLocation}</Text>
                    </View>
                    <View className="flex">
                      <Text>Item SKU</Text>
                      <Divider />
                      <Text className="font-semibold">{item.skuCode}</Text>
                    </View>
                    <View className="flex">
                      <Text>Quantity</Text>
                      <Divider />
                      <Text className="font-semibold">{item.quantity}</Text>
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
            <Text className="font-semibold text-xl">Delete Item?</Text>
          </ModalHeader>
          <ModalBody>
            <Button onPress={() => {
              deleteSku({
                variables: {
                  id: currentDeleteItemId
                },
                onCompleted: () => {
                  setShowDeleteModal(false)
                  refetchGetInventorySkus()
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
