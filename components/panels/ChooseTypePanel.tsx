import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
} from "@chakra-ui/react"
import { CreationObject } from "display-api"
import { gql, useQuery, useMutation } from "urql"
import { ComponentDelegate } from "../display/ComponentDelegate"
import { Button } from "@chakra-ui/react"
import { populate_template } from "../display/method"
import { useState } from "react"

const TypesQuery = gql`
    query {
        blockTypes {
            desc
            name
            icon
        }
    }
`
type TypesQueryResult = { blockTypes: Array<{desc: string, name: string, icon: Icon}> }
type TypesQueryArgs = { type: string; input: string }

export const ChooseTypePanel: React.FC<{enabled?: {reject: () => void, resolve: (name: string) => void}}> = ({enabled}) => {
    let reject = enabled?.reject || () => {}
    let resolve = enabled?.resolve() || (_: string) => {}
    return (
        <Modal isOpen={enabled != undefined} onClose={reject}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                {creating && <CreateBlockContent done={close} type={creating} />}
            </ModalContent>
        </Modal>
    )
}

const CreateBlockContent: React.FC<{ type: string; done: () => void }> = ({ type, done }) => {
    let [error, setError] = useState<string>()
    let [, createBlockMut] = useMutation<TypesQueryResult, TypesQueryArgs>(CreateBlockQuery)
    let [displayResult] = useQuery<CreationDisplayResult, CreationDisplayArgs>({
        query: CreationDisplayQuery,
        variables: { type },
    })

    const createBlock = async (template: string) => {
        let input = populate_template(template)
        const res = await createBlockMut({
            type,
            input,
        })

        if (res.error) {
            setError(res.error.message)
        } else {
            done()
        }
    }

    if (displayResult.data?.blockCreationDisplay != undefined) {
        let creationObject: CreationObject = JSON.parse(displayResult.data.blockCreationDisplay)
        return (
            <>
                <ModalHeader>
                    <ComponentDelegate component={creationObject.header_component} />
                </ModalHeader>
                <ModalBody>
                    <ComponentDelegate component={creationObject.main_component} />
                    {error && <Text colorScheme='red'>{error}</Text>}
                </ModalBody>
                <ModalFooter>
                    <Button mt={5} colorScheme='blue' color='white' onClick={() => createBlock(creationObject.input_template)}>
                        Create
                    </Button>
                </ModalFooter>
            </>
        )
    }

    if (displayResult.error?.message) {
        return (
            <ModalBody>
                <Text colorScheme='red'>{displayResult.error.message}</Text>
            </ModalBody>
        )
    }
    return (
        <ModalBody>
            <Spinner />
        </ModalBody>
    )
}
