import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";


const GetItemsInOrder = gql`
query GetItemsInOrder($id: UUID!) {
  order {
    get(id: $id) {
      inventoryItems {
        sku {
          title
        }
        order {
          id
        }
      }
    }
  }
}
`

export default function OrderInfo() {
  const orderId = useLocalSearchParams().id

  console.log(orderId)

  const { called: calledGetItemsInOrder, loading: loadingGetItemsInOrder, error: errorGetItemsInOrder, data: dataGetItemsInOrder, refetch: refetchGetItemsInOrder } = useQuery(GetItemsInOrder, {
    variables: {
      id: orderId
    }
  })

  useFocusEffect(
    useCallback(() => {
      refetchGetItemsInOrder()
      return () => {
      };
    }, []),
  );

  console.log(dataGetItemsInOrder)
  return (
    <View className="m-4 flex gap-2">
      {dataGetItemsInOrder?.order.get.inventoryItems.map((item, i) => {
        return (
          <Card key={i}>
            <Text className="text-xl font-semibold">{item.sku.title}</Text>

          </Card>
        )
      })}
    </View>
  );
}
