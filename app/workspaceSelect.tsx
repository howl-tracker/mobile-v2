import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { FontAwesome } from "@expo/vector-icons";
import { gql, useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Modal, ModalBackdrop, ModalBody, ModalContent } from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField } from "@/components/ui/input";

const CreateWorkspace = gql`
mutation MyMutation($name: String!) {
  workspace {
    create(name: $name) {
      message
      success
      type
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

const GetWorkspaces = gql`
query MyQuery {
  workspace {
    all {
      id
      name
    }
  }
}
`

type Workspace = {
    id: string
    name: string
}

export default function WorkspaceSelect() {
    const [createWorkspaceName, setCreateWorkspaceName] = useState('')
    const [createWorkspace, { called: calledCreateWorkspace, loading: loadingCreateWorkspace, error: errCreateWorkspace, data: dataCreateWorkspace }] = useMutation(CreateWorkspace)
    const [selectWorkspace, { called: calledselectWorkspace, loading: loadingselectWorkspace, error: errselectWorkspace, data: dataselectWorkspace }] = useMutation(SelectWorkspace)
    const { called: calledGetWorkspaces, loading: loadingGetWorkspaces, error: errGetWorkspaces, data: dataGetWorkspaces, refetch: refetchGetWorkspaces } = useQuery(GetWorkspaces)

    const [showModal, setShowModal] = useState(false)

    return (
        <View className="flex items-center p-4">
            <Text className="m-8 text-2xl font-bold text-black">Select a workspace</Text>

            <View className="m-4 flex items-center gap-2">
                {dataGetWorkspaces && dataGetWorkspaces.workspace.all?.map((workspace: Workspace) => {
                    return (
                        <Button className="bg-slate-500" key={workspace.id} onPress={() => selectWorkspace({ variables: { workspaceId: workspace.id } })}>
                            <ButtonText key={workspace.id}>{workspace.name}</ButtonText>
                        </Button>
                    )
                })}
            </View>


            <Button onPress={() => { setShowModal(true) }} className="mt-8">
                <ButtonText>Create Workspace</ButtonText>
            </Button>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                className=""
            >

                <ModalBackdrop />
                <ModalContent className="m-0 pb-0 relative">
                    <Pressable onPress={() => setShowModal(false)} className="absolute right-0 m-3">
                        <FontAwesome name="close" size={20} color={"gray"} />
                    </Pressable>
                    <ModalBody>
                        <Text>Workspace Name</Text>
                        <Input>
                            <InputField onChangeText={text => setCreateWorkspaceName(text)} />
                        </Input>
                        <Button onPress={async () => {
                            setShowModal(false)
                            await createWorkspace({ variables: { name: createWorkspaceName } })
                            await refetchGetWorkspaces()
                        }} className="mt-4">
                            <ButtonText>Create</ButtonText>
                        </Button>

                    </ModalBody>

                </ModalContent>
            </Modal>

            <Divider className="w-1/2 mt-4" />
            <Text className="text-lg font-semibold mt-4">Workspace Invites</Text>


            <View className="m-4 flex gap-3 w-5/6">
                {/* {spaces.map((space, i) => {
                    return (
                        <Card className="flex flex-row items-center gap-2 justify-between" key={i}>
                            <Button size="xs" className="bg-red-600">
                                <FontAwesome
                                    name="close"
                                    size={20}
                                    color={"white"}
                                />
                            </Button>
                            <Text className="text-lg font-semibold">Workspace {i + 4}</Text>
                            <Button size="xs" className="bg-green-600">
                                <FontAwesome
                                    name="check"
                                    size={20}
                                    color={"white"}
                                />
                            </Button>
                        </Card>
                    )
                })} */}
            </View>

        </View >
    )
}