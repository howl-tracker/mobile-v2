import EditScreenInfo from "@/components/EditScreenInfo";
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { gql, useQuery } from "@apollo/client";
import { Heading } from "@/components/ui/heading";



const GetSkus = gql`
query GetSkus {
  sku {
    all {
      id
    }
  }
}
`

function countWeekdaysSinceAugust13(): number {
  const startDate = new Date('2024-08-13'); // You can update the year as needed
  const currentDate = new Date(); // Get the current date
  let weekdaysCount = 0;

  while (startDate < currentDate) {
    const dayOfWeek = startDate.getDay();
    // Check if the day is a weekday (Monday to Friday)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      weekdaysCount++;
    }
    // Move to the next day
    startDate.setDate(startDate.getDate() + 1);
  }

  return weekdaysCount;
}

export default function TabOneScreen() {

  const { called: calledGetSkus, loading: loadingGetSkus, error: errorGetSkus, data: dataGetSkus, refetch: refetchGetSkus } = useQuery(GetSkus)

  return (
    <View className="p-4">
      <Input>
        <InputField className="bg-white" placeholder="Search Inventory..." />
      </Input>
      <Card className="mt-4">
        <Heading>Total Items in Inventory: {dataGetSkus?.sku.all.length}</Heading>
      </Card>

      {/* <Card className="mt-4">
        <Heading>Total Hours Worked on Project: {(3 * 4) * countWeekdaysSinceAugust13()}</Heading>
      </Card> */}
    </View>
  );
}
