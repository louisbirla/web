import { Layout } from '../components/Layout'
import { CountDisplay } from '../components/count/CountDisplay'
import { Center } from '@chakra-ui/core'
import { CountCrement } from '../components/count/CountCrement'
import { gql, useQuery, useMutation } from '@apollo/client'
import { CountQuery } from './gql/CountQuery'
import { UpdateCount } from './gql/UpdateCount'

export const COUNT = gql`
  query CountQuery {
    count
  }
`

export const UPDATE_COUNT = gql`
  mutation UpdateCount($by: Int!) {
    updateCount(by: $by)
  }
`

const IndexPage = () => {
  const { data, refetch } = useQuery<CountQuery>(COUNT, {
    pollInterval: 1000,
  })
  const [updateCount] = useMutation<UpdateCount>(UPDATE_COUNT)

  const handleCrement = (by: number) => {
    updateCount({
      variables: { by },
    })
    refetch()
  }

  return (
    <Layout title='Count | Loop'>
      <Center>
        <CountCrement by={1} updateCount={handleCrement} />
        <CountDisplay count={data?.count} />
        <CountCrement by={-1} updateCount={handleCrement} />
      </Center>
    </Layout>
  )
}

export default IndexPage
