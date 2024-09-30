import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { Input, InputField } from './ui/input'
import { Button, ButtonText } from './ui/button'
import { gql, useMutation } from '@apollo/client'

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL

const authUrl = backendUrl + "auth"

const CreateDefaultWorkspace = gql`
mutation CreateDefaultWorkspace($name: String!) {
  workspace {
    create(name: $name) {
      message
      success
      type
      data {
        id
      }
    }
  }
}
`

const SelectWorkspace = gql`
mutation SelectWorkspaceMutation($workspaceId: UUID!){
    workspace {
        select(workspaceId: $workspaceId) {
            message
            success
            type
        }
    }
}
`

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [createWorkspace, { called: calledCreateWorkspace, loading: loadingCreateWorkspace, error: errCreateWorkspace, data: dataCreateWorkspace }] = useMutation(CreateDefaultWorkspace)
  const [selectWorkspace, { called: calledselectWorkspace, loading: loadingselectWorkspace, error: errselectWorkspace, data: dataselectWorkspace }] = useMutation(SelectWorkspace)


  async function signInWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    const response = await fetch(authUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
        RefreshToken: `RefreshToken ${session?.refresh_token}`,
      },
    });

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    try {

      setLoading(true)
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) Alert.alert(error.message)
      if (!session) Alert.alert('Please check your inbox for email verification!')
      setLoading(false)

      const response = await fetch(authUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
          RefreshToken: `RefreshToken ${session?.refresh_token}`,
        },
      });

      await createWorkspace({
        variables: { name: email + "'s Workspace" },
        onCompleted(data, clientOptions) {
          selectWorkspace({ variables: { workspaceId: data.workspace.create.data.id } })
        },
      })

    } catch (error) {
      console.log("Error: " + error);
    }
  }

  return (
    <View className="mt-40 p-12">
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input aria-label="Email">
          <InputField
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
            returnKeyType='done'
          />
        </Input>
      </View>
      <View style={styles.verticallySpaced}>
        <Input aria-label="Password">
          <InputField
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            placeholder="Password"
            autoCapitalize={'none'}
            type='password'
            returnKeyType='done'
          />
        </Input>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={loading} onPress={() => signInWithEmail()}>
          <ButtonText>Sign in</ButtonText>
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Button disabled={loading} onPress={() => signUpWithEmail()}>
          <ButtonText>Sign Up</ButtonText>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})