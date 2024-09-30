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
import { InventoryItem } from "@/types/graphqlTypes";
import { AddIcon, CloseIcon, CheckIcon } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { Check, Plus } from "lucide-react-native"
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader } from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { Divider } from "@/components/ui/divider";
import DateTimePicker from "@react-native-community/datetimepicker"
import { router, useLocalSearchParams } from "expo-router";


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
const UpdateInventorySku = gql`
mutation UpdateInventorySku($id: UUID!, $description: String, $inventoryLocation: String, $listPrice: Float, $quantity: Int, $retailPrice: Float, $source: String, $title: String) {
  sku {
    update(
      id: $id
      updateSkuInput: {
      description: $description,
      inventoryLocation: $inventoryLocation,
      listPrice: $listPrice, 
      quantity: $quantity,
      retailPrice: $retailPrice,
      source: $source,
      title: $title
      }
    ) {
      message
      success
      type
    }
  }
}
`

const UpdateShippingInfo = gql`
mutation UpdateShippingInfo($skuId: UUID!, $length: Float, $height: Float, $width: Float, $pounds: Int, $ounces: Int) {
  shippingInfo {
    update(
      skuId: $skuId
      updateShippingInfoInput: {
      length: $length
      height: $height
      width: $width
      pounds: $pounds
      ounces: $ounces
      }
    ) {
      message
      success
      type
    }
  }
}
`

type InventorySku = {
  id: string,
  title: string,
  description: string,
  retailPrice: number,
  listPrice: number,
  quantity: number,
  inventoryLocation: string,
  costPrice: number,
  conditionDescription: string,
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

  const item = useLocalSearchParams();

  const itemInfo: InventorySku = {
    id: item.id as string,
    title: item.title as string,
    description: item.description as string,
    retailPrice: item.retailPrice as unknown as number,
    listPrice: item.listPrice as unknown as number,
    quantity: item.quantity as unknown as number,
    inventoryLocation: item.inventoryLocation as string,
    costPrice: item.costPrice as unknown as number,
    conditionDescription: item.conditionDescription as string,
    source: item.source as string
  }

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [inventorySkuInfo, setInventorySkuInfo] = useState<InventorySku>(itemInfo)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>()
  const [lotInfo, setLotInfo] = useState<Lot>()
  const [createCategoryName, setCreateCategoryName] = useState('')

  const [marketplaceValues, setMarketplaceValues] = useState([])

  const handleClose = () => setShowActionsheet(false);

  const [updateInventorySku, { called: calledUpdateInventorySku, loading: loadingUpdateInventorySku, error: errorUpdateInventorySku, data: dataUpdateInventorySku }] = useMutation(UpdateInventorySku, {
    onCompleted(data) {
      router.back()
    },
  })
  const [updateShippingInfo, { called: calledUpdateShippingInfo, loading: loadingUpdateShippingInfo, error: errorUpdateShippingInfo, data: dataUpdateShippingInfo }] = useMutation(UpdateShippingInfo)
  const { called: calledGetConditions, loading: loadingGetConditions, error: errorGetConditions, data: dataGetConditions, refetch: refetchGetConditions } = useQuery(GetConditions)
  const { called: calledGetCategories, loading: loadingGetCategories, error: errorGetCategories, data: dataGetCategories, refetch: refetchGetCategories } = useQuery(GetCategories)
  const [createCategory, { called: calledCreateCategory, loading: loadingCreateCategory, error: errorCreateCategory, data: dataCreateCategory }] = useMutation(CreateCategory)
  const [createLot, { called: calledCreateLot, loading: loadingCreateLot, error: errorCreateLot, data: dataCreateLot }] = useMutation(CreateLot)
  const { called: calledGetLots, loading: loadingGetLots, error: errorGetLots, data: dataGetLots, refetch: refetchGetLots } = useQuery(GetLots)
  const { called: calledGetMarketplaces, loading: loadingGetMarketplaces, error: errorGetMarketplaces, data: dataGetMarketplaces, refetch: refetchGetMarketplaces } = useQuery(GetMarketplaces)

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
    await updateInventorySku({
      variables: {
        id: inventorySkuInfo?.id,
        title: inventorySkuInfo?.title,
        description: inventorySkuInfo?.description,
        retailPrice: parseFloat(inventorySkuInfo?.retailPrice.toString()),
        listPrice: parseFloat(inventorySkuInfo?.listPrice.toString()),
        quantity: parseInt(inventorySkuInfo?.quantity.toString()),
        inventoryLocation: inventorySkuInfo?.inventoryLocation,
        source: inventorySkuInfo?.source
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
            value={inventorySkuInfo?.title}
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
            value={inventorySkuInfo?.description}
            onChangeText={text => setSkuField('description', text)}
          />
        </Textarea>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Retail Price</Text>
          <Input isRequired={true} variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              value={inventorySkuInfo?.retailPrice as unknown as string}
              onChangeText={text => setSkuField('retailPrice', parseFloat(text))}
            />
          </Input>
        </View>
        <View className="flex-1">
          <Text>List Price</Text>
          <Input isRequired={true} variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              value={inventorySkuInfo?.listPrice as unknown as string}
              onChangeText={text => setSkuField('listPrice', parseFloat(text))}
            />
          </Input>
        </View>
        <View className="flex-1">
          <Text>Quantity</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              value={inventorySkuInfo?.quantity as unknown as string}
              onChangeText={text => setSkuField('quantity', parseInt(text))}
            />
          </Input>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>Inventory Location</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              value={inventorySkuInfo?.inventoryLocation}
              onChangeText={text => setSkuField('inventoryLocation', text)}
            />
          </Input>
        </View>
        <View className="flex-1">
          <Text>Source</Text>
          <Input variant="outline" size="md" isDisabled={false}>
            <InputField
              className="bg-white"
              value={inventorySkuInfo?.source}
              onChangeText={text => setSkuField('source', text)}
            />
          </Input>
        </View>
      </View>

      <View className="flex items-center mt-4">
        <Button className="w-1/2" onPress={() => {
          handleToast()
          handleSubmit()
        }}>
          <ButtonText>Update Item</ButtonText>
        </Button>
      </View>

    </View>
  );
}
