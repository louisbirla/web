import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/core"
import { atom, useAtom } from "jotai"
import { useMutation } from "urql"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { ArrowLeft } from "react-feather"
import { IconButton } from '@chakra-ui/core';

export const signupPanelOpen = atom(false)

const SignupMutation = `
  mutation ($username: String!, $password: String!, $email: String!) {
    signup(username: $username, password: $password, email: $email) {
      sessionCode
    }
  }
`

type SignupMutationResult = { signup: { sessionCode: string } }

type SignupMutationVars = { username: string; password: string; email: string }

const SignupStep: React.FC<{ next: (username: string, sessionCode: string) => void }> = ({ next }) => {
  const [signupResult, signupMut] = useMutation<SignupMutationResult, SignupMutationVars>(SignupMutation)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm<SignupMutationVars>()

  const signup = (formData: SignupMutationVars) => {
    setIsLoading(true)
    signupMut(formData).then(({ data }) => {
      setIsLoading(false)
      if (data != undefined) {
        next(formData.username, data.signup.sessionCode)
      }
    })
  }

  let error = signupResult.error && <Text color='red.500'>{signupResult.error.message.replace(/\[\w+\]/g, "")}</Text>

  return (
    <form onSubmit={handleSubmit(signup)}>
      <ModalHeader>Sign up</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={3}>
          <Input ref={register} placeholder='username' name='username' />
          <Input placeholder='password' type='password' name='password' ref={register} />
          <Input placeholder='email' type='email' name='email' ref={register} />
        </Stack>
        {error}
      </ModalBody>
      <ModalFooter>
        <Button type='submit' isLoading={isLoading} colorScheme='blue' variant='outline'>
          Send verification code
        </Button>
      </ModalFooter>
    </form>
  )
}

const ConfirmMutation = `
  mutation ($username: String!, $sessionCode: String!, $verificationCode: String!) {
    confirmEmail(username: $username, sessionCode: $sessionCode, verificationCode: $verificationCode) {
      token
    }
  }
`

type ConfirmMutationResult = { confirmEmail: { token: string } }

type ConfirmMutationVars = { username: string; sessionCode: string; verificationCode: string }

const ConfirmStep: React.FC<{ username: string; sessionCode: string; back: () => void }> = ({
  username,
  sessionCode,
  back,
}) => {
  const [confirmResult, confirmMut] = useMutation<ConfirmMutationResult, ConfirmMutationVars>(ConfirmMutation)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm<{ code: string }>()

  const confirmEmail = (data: { code: string }) => {
    setIsLoading(true)
    confirmMut({ username, sessionCode, verificationCode: data.code }).then(({ data }) => {
      setIsLoading(false)
      if (data != undefined) {
        const token = data.confirmEmail.token
        localStorage.setItem("token", token)
        location.reload()
      }
    })
  }

  let error = confirmResult.error && <Text color='red.500'>{confirmResult.error.message.replace(/\[\w+\]/g, "")}</Text>

  return (
    <form onSubmit={handleSubmit(confirmEmail)}>
      <ModalHeader>
        <IconButton aria-label="back to signup" icon={<ArrowLeft size={20} />} size='xs' onClick={back} />{" "}
        Confirm Email
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text as='label'>Enter verification code from email</Text>
        <Input placeholder='verification code' type='number' name='code' ref={register} />
        {error}
      </ModalBody>
      <ModalFooter>
        <Button type='submit' isLoading={isLoading} colorScheme='blue' variant='outline'>
          Confirm
        </Button>
      </ModalFooter>
    </form>
  )
}

export const SignupPanel: React.FC = () => {
  const [isShown, setShown] = useAtom(signupPanelOpen)
  const [sessionCode, setSessionCode] = useState("")
  const [username, setUsername] = useState("")
  const [mode, setMode] = useState<"signup" | "confirm">("signup")

  const closePanel = () => {
    setShown(false)
  }

  const afterSignup = (username: string, sessionCode: string) => {
    setUsername(username)
    setSessionCode(sessionCode)
    setMode("confirm")
  }

  const content =
    mode === "signup" ? (
      <SignupStep next={afterSignup} />
    ) : (
      <ConfirmStep username={username} sessionCode={sessionCode} back={() => setMode("signup")} />
    )

  return (
    <Modal isOpen={isShown} onClose={closePanel}>
      <ModalOverlay />
      <ModalContent m='auto'>{content}</ModalContent>
    </Modal>
  )
}
