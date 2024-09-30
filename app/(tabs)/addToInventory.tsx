import React, { useEffect, useState } from "react";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
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
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { gql, useMutation, useLazyQuery, useQuery } from "@apollo/client";
import InventoryItemInfo from "../inventoryItemInfo";
import { InventoryItem } from "@/types/graphqlTypes";
import { AddIcon, CloseIcon, CheckIcon } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { Check, Plus } from "lucide-react-native"
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader } from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { Divider } from "@/components/ui/divider";
import DateTimePicker from "@react-native-community/datetimepicker"

const CreateInventorySku = gql`
mutation CreateInventorySku(
  $title: String!,
  $description: String!,
  $retailPrice: Float!,
  $listPrice: Float!,
  $quantity: Int!,
  $inventoryLocation: String,
  $deliveryMethodIds: [UUID!],
  $costPrice: Float,
  $conditionDescription: String,
  $categoryId: UUID,
  $conditionId: UUID,
  $lotId: UUID,
  $marketplaceIds: [UUID!],
  $purchaseDate: Date,
  $source: String,
) {
  sku {
    create(
      createSkuInput: {
      title: $title,
      description: $description,
      retailPrice: $retailPrice,
      listPrice: $listPrice,
      quantity: $quantity,
      inventoryLocation: $inventoryLocation,
      deliveryMethodIds: $deliveryMethodIds,
      costPrice: $costPrice,
      conditionDescription: $conditionDescription,
      categoryId: $categoryId,
      conditionId: $conditionId,
      lotId: $lotId,
      marketplaceIds: $marketplaceIds,
      purchaseDate: $purchaseDate,
      source: $source
      }
    ) {
      data {
        id
        skuCode
      }
      message
      success
      type
    }
  }
}
`

const CreateShippingInfo = gql`
mutation CreateShippingInfo($length: Float!, $width: Float!, $height: Float!, $pounds: Int!, $ounces: Int!, $skuId: UUID!) {
  shippingInfo {
    create(
      createShippingInfoInput: {
      length: $length, 
      width: $width, 
      height: $height, 
      pounds: $pounds, 
      ounces: $ounces
      }
      skuId: $skuId
    ) 
      {
    data {
        sku {
          id
        }
      }
      message
      success
      type
    }
  }
}
`

const GetConditions = gql`
query GetConditions {
  condition {
    all {
      id
      name
    }
  }
}
`

const GetCategories = gql`
query GetCategories {
  category {
    all {
      id
      name
    }
  }
}
`

const GetLots = gql`
query GetLots {
  lot {
    all {
      id
      name
    }
  }
}
`

const GetMarketplaces = gql`
query GetMarketplaces {
  marketplace {
    all {
      id
      name
    }
  }
}
`

const GetDeliveryMethods = gql`
query GetDeliveryMethods {
  deliveryMethod {
    all {
      id
      name
    }
  }
}
`

const CreateCategory = gql`
mutation CreateCategory($name: String!) {
  category {
    create(name: $name) {
      message
      success
      type
    }
  }
}
`

const CreateLot = gql`
mutation CreateLot($name: String!, $costPrice: Float!, $quantity: Int!, $purchaseDate: Date!) {
  lot {
    create(
      createLotInput: {name: $name, costPrice: $costPrice, quantity: $quantity, purchaseDate: $purchaseDate}
    ) {
      message
      success
      type
      data {
        id
        name
      }
    }
  }
}
`

type InventorySku = {
  title: string,
  description: string,
  retailPrice: number,
  listPrice: number,
  quantity: number,
  inventoryLocation: string,
  deliveryMethodIds: string[],
  costPrice: number,
  conditionDescription: string,
  categoryId: string,
  categoryName: string,
  conditionId: string,
  conditionName: string,
  lotId: string,
  lotName: string,
  marketplaceIds: string[],
  purchaseDate: Date | null,
  source: string,
}

type ShippingInfo = {
  length: number,
  width: number,
  height: number,
  pounds: number,
  ounces: number,
  skuId: string
}

type Lot = {
  name: string,
  costPrice: number,
  quantity: number,
  purchaseDate: Date
}


export default function AddToInventory() {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [inventorySkuInfo, setInventorySkuInfo] = useState<InventorySku>()
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>()
  const [lotInfo, setLotInfo] = useState<Lot>()
  const [createCategoryName, setCreateCategoryName] = useState('')
  const [createLotName, setCreateLotName] = useState('')

  const [marketplaceValues, setMarketplaceValues] = useState([])

  const handleClose = () => setShowActionsheet(false);

  const [createInventorySku, { called: calledCreateInventorySku, loading: loadingCreateInventorySku, error: errorCreateInventorySku, data: dataCreateInventorySku }] = useMutation(CreateInventorySku, {
    onCompleted(data) {
      createShippingInfo({
        variables: {
          length: shippingInfo?.length,
          width: shippingInfo?.width,
          height: shippingInfo?.height,
          pounds: shippingInfo?.pounds,
          ounces: shippingInfo?.ounces,
          skuId: data?.sku.create.data.id
        }
      })
    },
  })
  const [createShippingInfo, { called: calledCreateShippingInfo, loading: loadingCreateShippingInfo, error: errorCreateShippingInfo, data: dataCreateShippingInfo }] = useMutation(CreateShippingInfo)
  const { called: calledGetConditions, loading: loadingGetConditions, error: errorGetConditions, data: dataGetConditions, refetch: refetchGetConditions } = useQuery(GetConditions)
  const { called: calledGetCategories, loading: loadingGetCategories, error: errorGetCategories, data: dataGetCategories, refetch: refetchGetCategories } = useQuery(GetCategories)
  const [createCategory, { called: calledCreateCategory, loading: loadingCreateCategory, error: errorCreateCategory, data: dataCreateCategory }] = useMutation(CreateCategory)
  const [createLot, { called: calledCreateLot, loading: loadingCreateLot, error: errorCreateLot, data: dataCreateLot }] = useMutation(CreateLot)
  const { called: calledGetLots, loading: loadingGetLots, error: errorGetLots, data: dataGetLots, refetch: refetchGetLots } = useQuery(GetLots)
  const { called: calledGetMarketplaces, loading: loadingGetMarketplaces, error: errorGetMarketplaces, data: dataGetMarketplaces, refetch: refetchGetMarketplaces } = useQuery(GetMarketplaces)
  const { called: calledGetDeliveryMethods, loading: loadingGetDeliveryMethods, error: errorGetDeliveryMethods, data: dataGetDeliveryMethods, refetch: refetchGetDeliveryMethods } = useQuery(GetDeliveryMethods)

  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLotModal, setShowLotModal] = useState(false);
  const [showCreateLotModal, setShowCreateLotModal] = useState(false);

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
    setSkuField("marketplaceIds", marketplaceValues)
  }, [marketplaceValues])

  useEffect(() => {
    setSkuField("purchaseDate", new Date(date).toISOString().split('T')[0])
    setLotField("purchaseDate", new Date(date).toISOString().split('T')[0])

  }, [date])

  useEffect(() => {
    setSkuField("lotId", dataCreateLot?.lot.create.data.id)
    setSkuField("lotName", dataCreateLot?.lot.create.data.name)
  }, [dataCreateLot])



  useEffect(() => {
    console.log(JSON.stringify(inventorySkuInfo))
    console.log(JSON.stringify(shippingInfo))

  }, [inventorySkuInfo, shippingInfo])

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

  const handleSubmit = async () => {
    await createInventorySku({
      variables: {
        title: inventorySkuInfo?.title,
        description: inventorySkuInfo?.description,
        retailPrice: inventorySkuInfo?.retailPrice,
        listPrice: inventorySkuInfo?.listPrice,
        quantity: inventorySkuInfo?.quantity,
        inventoryLocation: inventorySkuInfo?.inventoryLocation,
        deliveryMethodIds: inventorySkuInfo?.deliveryMethodIds,
        costPrice: inventorySkuInfo?.costPrice,
        conditionDescription: inventorySkuInfo?.conditionDescription,
        categoryId: inventorySkuInfo?.categoryId,
        conditionId: inventorySkuInfo?.conditionId,
        lotId: inventorySkuInfo?.lotId,
        marketplaceIds: inventorySkuInfo?.marketplaceIds,
        purchaseDate: inventorySkuInfo?.purchaseDate,
        source: inventorySkuInfo?.source
      },
      onCompleted: () => {
        handleToast()
      }
    })
  }

  const setSkuField = (field: keyof InventorySku, value: string | number | Date | never[] | null) => {
    setInventorySkuInfo(prevSku => ({
      ...prevSku!,
      [field]: value,
    }))
  }

  const setLotField = (field: keyof Lot, value: string | number | Date | null) => {
    setLotInfo(prevLot => ({
      ...prevLot!,
      [field]: value,
    }))
  }

  const setShippingInfoField = (field: keyof ShippingInfo, value: string | number | Date | never[] | null) => {
    setShippingInfo(prevShippingInfo => ({
      ...prevShippingInfo!,
      [field]: value,
    }))
  }


  return (
    <View className="flex gap-2 p-2">
      <View>
        <Text>Title</Text>
        <Input isRequired={true} variant="outline" size="md" isDisabled={false}>
          <InputField
            className="bg-white"
            returnKeyType="done"
            onChangeText={text => setSkuField('title', text)}
          />
        </Input>
      </View>
      <View>
        <Text>Description</Text>
        <Textarea className="h-20" isRequired={true}>
          <TextareaInput
            className="bg-white"
            returnKeyType="done"
            onChangeText={text => setSkuField('description', text)}
          />
        </Textarea>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Lot</Text>
          <Button onPress={() => {
            setShowLotModal(true)
            refetchGetLots()
          }} className="pl-3 flex flex-row justify-between bg-white data-[active=true]:bg-gray-50 border border-gray-300 data-[active=true]:border-gray-400">
            <ButtonText className="text-gray-400 text-sm font-light">
              {inventorySkuInfo?.lotName ? <Text className="text-black font-normal">{inventorySkuInfo?.lotName}</Text> : <Text className="text-sm">Select/Create lot...</Text>}
            </ButtonText>
            {!inventorySkuInfo?.lotName && <Icon as={AddIcon} className="text-gray-300" />}
          </Button>
        </View>
        <View className="flex-1">
          <Text>Cost</Text>
          <Input variant="outline" size="md" isDisabled={inventorySkuInfo?.lotId ? true : false} className="bg-white data-[disabled=true]:bg-gray">
            <InputField
              onChangeText={text => setSkuField('costPrice', parseFloat(text))}
            />
          </Input>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Retail Price</Text>
          <Input isRequired={true} variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              onChangeText={text => setSkuField('retailPrice', parseFloat(text))}
            />
          </Input>
        </View>
        <View className="flex-1">
          <Text>List Price</Text>
          <Input isRequired={true} variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              onChangeText={text => setSkuField('listPrice', parseFloat(text))}
            />
          </Input>
        </View>
        <View className="flex-1">
          <Text>Quantity</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              onChangeText={text => setSkuField('quantity', parseInt(text))}
            />
          </Input>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Condition</Text>
          <Button onPress={() => setShowConditionModal(true)} className="pl-3 flex flex-row justify-between bg-white data-[active=true]:bg-gray-50 border border-gray-300 data-[active=true]:border-gray-400">
            <ButtonText className="text-gray-400 text-sm font-light">
              {inventorySkuInfo?.conditionId ? <Text className="text-black font-normal">{inventorySkuInfo?.conditionName}</Text> : <Text>Select condition...</Text>}
            </ButtonText>
          </Button>
        </View>
        <View className="flex-1">
          <Text>Condition Description</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              onChangeText={text => setSkuField('conditionDescription', text)}
            />
          </Input>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Purchase Date</Text>
          <View className="flex items-start">
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              is24Hour={true}
              onChange={onChange}
              disabled={inventorySkuInfo?.lotId ? true : false}
            />
          </View>
        </View>
        <View className="flex-1">
          <Text>Inventory Location</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              onChangeText={text => setSkuField('inventoryLocation', text)}
            />
          </Input>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Category</Text>
          <Button onPress={() => { setShowCategoryModal(true) }} className="pl-3 flex flex-row justify-between bg-white data-[active=true]:bg-gray-50 border border-gray-300 data-[active=true]:border-gray-400">
            <ButtonText className="text-gray-400 text-sm font-light">
              {inventorySkuInfo?.categoryId ? <Text className="text-black font-normal">{inventorySkuInfo?.categoryName}</Text> : <Text className="text-sm">Select/Create category...</Text>}
            </ButtonText>
            <Icon as={AddIcon} className="text-gray-300" />
          </Button>
        </View>
        <View className="flex-1">
          <Text>Source</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              onChangeText={text => setSkuField('source', text)}
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
        <CheckboxGroup value={marketplaceValues} onChange={(keys) => setMarketplaceValues(keys)} className="flex flex-row gap-4 flex-wrap">
          {dataGetMarketplaces?.marketplace.all.map((marketplace) => {
            return (
              <Checkbox value={marketplace.id} key={marketplace.id}>
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} className="text-white" />
                </CheckboxIndicator>
                <CheckboxLabel>{marketplace.name}</CheckboxLabel>
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      </View>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="gap-2">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Text className="font-bold text-2xl">Shipping Details</Text>
          <Text className="font-semibold">Dimensions (Inches)</Text>
          <View className="flex flex-row gap-4">
            <View className="flex-1">
              <Text>Length</Text>
              <Input>
                <InputField onChangeText={text => setShippingInfoField("length", parseFloat(text))} />
              </Input>
            </View>
            <View className="flex-1">
              <Text>Width</Text>
              <Input>
                <InputField onChangeText={text => setShippingInfoField("width", parseFloat(text))} />
              </Input>
            </View>
            <View className="flex-1">
              <Text>Height</Text>
              <Input>
                <InputField onChangeText={text => setShippingInfoField("height", parseFloat(text))} />
              </Input>
            </View>
          </View>
          <Text className="font-semibold mt-4">Weight</Text>
          <View className="flex flex-row gap-4">
            <View className="flex-1">
              <Text>Pounds</Text>
              <Input>
                <InputField onChangeText={text => setShippingInfoField("pounds", parseFloat(text))} />
              </Input>
            </View>
            <View className="flex-1">
              <Text>Ounces</Text>
              <Input>
                <InputField onChangeText={text => setShippingInfoField("ounces", parseFloat(text))} />
              </Input>
            </View>
          </View>
          <Button className="mb-4" onPress={handleClose}>
            <ButtonText>Save Shipping</ButtonText>
          </Button>
        </ActionsheetContent>
      </Actionsheet>
      <View className="flex items-center">
        <Button className="w-1/2" onPress={() => {
          handleSubmit()
        }}>
          <ButtonText>Add Item</ButtonText>
        </Button>
      </View>

      <Modal
        isOpen={showLotModal}
        onClose={() => {
          setShowLotModal(false)
        }}
        className="">

        <ModalBackdrop />
        <ModalContent className="m-0 pb-0 relative">
          <Pressable onPress={() => setShowLotModal(false)} className="absolute right-0 m-3">
            <Icon as={CloseIcon} className="text-gray-400" />
          </Pressable>
          <ModalHeader className="w-full flex flex-row justify-center items-center">
            <Text className="font-semibold text-xl">Lot</Text>
          </ModalHeader>
          <ModalBody>
            <Button onPress={async () => {
              setShowLotModal(false)
              setSkuField("lotId", null)
              setSkuField("lotName", "None")
            }} className="mt-4">
              <ButtonText>None</ButtonText>
            </Button>
            {dataGetLots?.lot.all.map((lot) => {
              return (
                <Button key={lot.id} onPress={async () => {
                  setShowLotModal(false)
                  setSkuField("lotId", lot.id)
                  setSkuField("lotName", lot.name)
                }} className="mt-4">
                  <ButtonText>{lot.name}</ButtonText>
                </Button>
              )
            })}
            <Divider className="my-4" />
            <Button onPress={() => setShowCreateLotModal(true)} className="mt-4">
              <ButtonText>Create New Lot</ButtonText>
            </Button>

          </ModalBody>

        </ModalContent>
      </Modal>

      <Modal
        isOpen={showCreateLotModal}
        onClose={() => {
          setShowCreateLotModal(false)
        }}
        className="">

        <ModalBackdrop />
        <ModalContent className="m-0 pb-0 relative">
          <Pressable onPress={() => setShowCreateLotModal(false)} className="absolute right-0 m-3">
            <Icon as={CloseIcon} className="text-gray-400" />
          </Pressable>
          <ModalHeader className="w-full flex flex-row justify-center items-center">
            <Text className="font-semibold text-xl">Create Lot</Text>
          </ModalHeader>
          <ModalBody>
            <View className="flex gap-4">
              <View>
                <Text>Name: </Text>
                <Input>
                  <InputField onChangeText={text => setLotField("name", text)} />
                </Input>
              </View>
              <View className="flex flex-row gap-4">
                <View className="flex-1">
                  <Text>Cost: </Text>
                  <Input>
                    <InputField onChangeText={text => setLotField("costPrice", parseFloat(text))} />
                  </Input>
                </View>
                <View className="flex-1">
                  <Text>Quantity:</Text>
                  <Input>
                    <InputField onChangeText={text => setLotField("quantity", parseInt(text))} />
                  </Input>
                </View>
              </View>
              <View className="flex flex-row items-center justify-between my-2">
                <Text>Purchase Date:</Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  is24Hour={true}
                  onChange={onChange}
                />
              </View>
            </View>
            <Button onPress={async () => {
              await createLot({ variables: { name: lotInfo?.name, costPrice: lotInfo?.costPrice, quantity: lotInfo?.quantity, purchaseDate: lotInfo?.purchaseDate } })
              await refetchGetLots()
              setShowCreateLotModal(false)
              setShowLotModal(false)
            }} className="mt-4">
              <ButtonText>Create</ButtonText>
            </Button>

          </ModalBody>

        </ModalContent>
      </Modal>

      <Modal
        isOpen={showConditionModal}
        onClose={() => {
          setShowConditionModal(false)
        }}
        className="">

        <ModalBackdrop />
        <ModalContent className="m-0 pb-0 pt-3 relative">
          <Pressable onPress={() => setShowConditionModal(false)} className="absolute right-0 m-3">
            <Icon as={CloseIcon} className="text-gray-400" />
          </Pressable>
          <ModalHeader className="w-full flex flex-row justify-center items-center">
            <Text className="font-semibold text-xl">Condition</Text>
          </ModalHeader>
          <ModalBody>
            {dataGetConditions?.condition.all.map((condition) => {
              return (
                <Button key={condition.id} onPress={async () => {
                  setShowConditionModal(false)
                  setSkuField("conditionId", condition.id)
                  setSkuField("conditionName", condition.name)
                }} className="mt-4">
                  <ButtonText>{condition.name}</ButtonText>
                </Button>
              )
            })}
          </ModalBody>

        </ModalContent>
      </Modal>

      <Modal
        isOpen={showCategoryModal}
        onClose={() => {
          setShowCategoryModal(false)
        }}
        className="">

        <ModalBackdrop />
        <ModalContent className="m-0 pb-0 relative">
          <Pressable onPress={() => setShowCategoryModal(false)} className="absolute right-0 m-3">
            <Icon as={CloseIcon} className="text-gray-400" />
          </Pressable>
          <ModalHeader className="w-full flex flex-row justify-center items-center">
            <Text className="font-semibold text-xl">Category</Text>
          </ModalHeader>
          <ModalBody>
            {dataGetCategories?.category.all.map((category) => {
              return (
                <Button key={category.id} onPress={async () => {
                  setShowCategoryModal(false)
                  setSkuField("categoryId", category.id)
                  setSkuField("categoryName", category.name)
                }} className="mt-4">
                  <ButtonText>{category.name}</ButtonText>
                </Button>
              )
            })}
            <Divider className="my-4" />
            <Text>Create New Category:</Text>
            <Input>
              <InputField onChangeText={text => setCreateCategoryName(text)} />
            </Input>
            <Button onPress={async () => {
              await createCategory({ variables: { name: createCategoryName } })
              await refetchGetCategories()
            }} className="mt-4">
              <ButtonText>Create</ButtonText>
            </Button>

          </ModalBody>

        </ModalContent>
      </Modal>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}
