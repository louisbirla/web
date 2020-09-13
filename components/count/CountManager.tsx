import { CountCrement } from './CountCrement'
import { CountDisplay } from './CountDisplay'
import { useQuery, useMutation, gql } from '@apollo/client'
import { UpdateCount } from './gql/UpdateCount'
import { CountQuery } from './gql/CountQuery'

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
export const CountManager: React.FC<{pollInterval?: number}> = ({pollInterval = 500}) => {
  const { data, refetch } = useQuery<CountQuery>(COUNT, {
    pollInterval,
  })
  const [updateCount] = useMutation<UpdateCount>(UPDATE_COUNT)

  const handleCrement = (by: number) => {
    updateCount({
      variables: { by },
    })
    refetch()
  }

  return (
    <>
      <CountCrement by={1} updateCount={handleCrement} />
      <CountDisplay count={data?.count} />
      <CountCrement by={-1} updateCount={handleCrement} />
    </>
  )
}
