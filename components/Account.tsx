import { Session } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'
import { Alert, Pressable, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { Input } from './ui/input'
import { Button, ButtonText } from './ui/button'
import { Text } from './ui/text'
import { Link, useFocusEffect } from 'expo-router'
import { gql, NetworkStatus, useQuery } from '@apollo/client'


const GetActiveWorkspace = gql`
query GetActiveWorkspaceQuery {
  user {
    current {
      currentWorkspace {
        id
        name
      }
    }
  }
}
`

export default function Account({ session }: { session: Session }) {
    const { called: calledActiveWorkspace, loading: loadingActiveWorkspace, error: errActiveWorkspace, data: dataActiveWorkspace, refetch: refetchActiveWorkspace, networkStatus: netStatusActiveWorkspace } = useQuery(GetActiveWorkspace, {
        notifyOnNetworkStatusChange: true,
    })

    useFocusEffect(
        useCallback(() => {
            refetchActiveWorkspace()

            return () => {
            }
        }, [])
    )
    return (
        <View className="mt-40 p-12 flex justify-center">
            <View className="py-4 mt-20">
                <Text className="text-center text-2xl font-bold">{session?.user?.email}</Text>
            </View>

            <Text>Active Workspace:</Text>


            {dataActiveWorkspace && <Text>{dataActiveWorkspace.user.current.currentWorkspace != null ? dataActiveWorkspace.user.current.currentWorkspace.name : "No Active Workspace"}</Text>}

            <View className="py-4 mt-4 flex gap-2">
                <Button onPress={() => supabase.auth.signOut()}>
                    <ButtonText>Sign Out</ButtonText>
                </Button>
                <Link href="/workspaceSelect" asChild>
                    <Button>
                        <ButtonText>Workspace Select</ButtonText>
                    </Button>
                </Link>
            </View>
        </View>
    )

}
